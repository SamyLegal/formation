# Mise en place d'un réseau de containers Docker déployés au travers de multiples machines

## Création de la machine "web-server" qui sera la machine master de notre cluster swarm

Basé sur un fichier

docker-machine create -d virtualbox --swarm --swarm-master --swarm-discovery=file:///tmp/my_cluster web-server

Basé sur un token
docker run swarm create
docker-machine create -d virtualbox --swarm --swarm-master --swarm-discovery=file:///tmp/my_cluster web-server

## Installation de consul sur la machine "web-server"

Consul est un logiciel qui permet de stocker les informations de l'ensemble des machines constituant notre réseau.
https://www.consul.io/

A l'heure actuelle "docker network" ne supporte que 3 types de serveur clés/valeurs :
* consul
* etcd
* zookeeper

docker $(docker-machine config web-server) run -d \
    -p "8500:8500" \
    -h "consul" \
    --name consul \
    progrium/consul -server -bootstrap

Le paramètre "-h" permet de définir le hostname du container.

## Création de la machine "data-server"

docker-machine create \
    -d virtualbox \
    --engine-opt="cluster-store=consul://$(docker-machine ip web-server):8500" \
    --engine-opt="cluster-advertise=eth1:0" \
    data-server

docker-machine create -d virtualbox --swarm --swarm-discovery=file:///tmp/my_cluster data-server

## Afficher la liste des networks sur chacune des machines

docker $(docker-machine config web-server) network ls
docker $(docker-machine config data-server) network ls

## Création d'un réseau

On va lister les machines auxquelles on a accès sur notre poste et éteindre toutes celles dont on a besoin

docker-machine ls
docker-machine stop default

On définit la machine web-server comme machine active par défaut

eval "$(docker-machine env web-server)"

Création de notre réseau
docker $(docker-machine config data-server) network create --driver overlay portal-web

## Vérification des processus par machine

docker $(docker-machine config web-server) ps
docker $(docker-machine config data-server) ps