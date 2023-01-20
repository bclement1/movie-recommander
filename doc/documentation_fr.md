# Documentation 

Ce fichier explique le fonctionnement du système de recommandation de films.

## Fonctionnement

Le code est composée : 
- du frontend en html, css et javascript qui collecte les préférences de l'utilisateur et affiche les films
- du backend Python qui communique avec la base de connaissances DBpedia dans le but de trouver des films qui correspondent aux goûts de l'utilisateur

## Présentation des différentes pages

### Page d'accueil

[](./images/home_page.png)

Cette page recueille les préférences de l'utilisateur à travers quatre questions avec quatres réponses possibles : 

- Quel est votre genre de film préféré ? 
- Qui est votre acteur préféré ? 
- Quelle durée de film souhaitez-vous ?
- Les notes du film ont-elles une importance pour vous ? 

### Page d'affichage des films 

Cette page montre des informations sur des films pouvant plaire à l'utilisateur. Le titre du film, sa durée et son résumé sont affichés dans des rectangles disposés en carrousel. L'utilisateur peut faire défiler les informations des films à l'aide de flèches sur les côtés. Il y a trois carrousels : 

- le premier affiche les films qui respectent tous les critères de l'utilisateur
- le deuxième montre les films avec le même acteur que la réponse de l'utilisateur
- le troisième expose les films du même genre que la réponse de l'utilisateur

Les réponses aux questions étant prédéfinies, ces deux derniers carrousels permettent d'étendre la proposition de films faite à l'utilisateur.
