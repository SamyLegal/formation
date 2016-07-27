# OpenDJ

Ce module à pour but de se former à l'utilisation d'un annuaire LDAP au travers de l'application OpenDJ.

## Exemples d'instructions LDAP

### Rechercher une entrée



### Création d'une entrée

Pour ajouter une entrée dans un annuaire LDAP, on utilise la commande "ldapadd".
L'entrée que l'on souhaite insérée dans l'annuaire doit être spécifié dans un fichier.

*Exemple d'une entréé LDAP que l'on peut spécifier dans un fichier*

dn: cn=John Smith,ou=people,dc=example,dc=com
objectclass: inetOrgPerson
cn: John Smith
cn: John J Smith
sn: Smith
uid: jsmith
userpassword: jSmitH
carlicense: HISCAR 124
homephone: 555-111-2223
mail: j.smith@example.com
mail: jsmith@example.com
mail: john.smith@example.com
ou: Sales

ldapadd -f user

cn=BLACHE14,ou=users,dc=crpldeva,dc=mgdis,dc=fr