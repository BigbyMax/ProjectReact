# Dillinger

[![N|Solid](https://cldup.com/dTxpPi9lDf.thumb.png)](https://nodesource.com/products/nsolid)

[![Build Status](https://travis-ci.org/joemccann/dillinger.svg?branch=master)](https://travis-ci.org/joemccann/dillinger)

4th.art est le résultat de la collaboration entre Antoine Lamé et Maxime Faragalla. Ce titre est une référence à la musique et sa place parmi les arts. 4th est un dashboard qui permet d'afficher de nombreuses statistiques sur ses artistes préféré.e.s. Il permet notamment :

  - D'afficher le nombre de likes générés par un.e artiste
  - D'ajouter des artistes à la base de données
  - D'avoir une note correcte en Technologies Web

D'après l'[énonce du projet](https://pedago-ece.campusonline.me/mod/resource/view.php?id=47914), le but est de faire un dashboard qui pourrait être déployé.

> L’objectif du projet est de créer votre propre dashboard. Ce projet est séparé en deux parties bien distinctes. 


### Tech

Nous avons utilisé plusieurs technologies différentes pour arriver à ce résultat :

* [ReactJS](https://reactjs.org/) - Une librairie Javascript pour développer des interfaces
* [Twitter Bootstrap](https://getbootstrap.com/) - Une technologie front adaptée aux web apps
* [ReactStrap](https://www.npmjs.com/package/reactstrap) - Stateless React Components for Boostrap 4
* [node.js] - evented I/O for the backend
* [Express] - fast node.js network app framework [@tjholowaychuk]

Ce readme.md a été fait sur Dilinger.io.

### Installation

Il suffit de lancer un npm i dans le répertoire de l'application. Cela installera les dépencdances nécessaires comme mongoose notamment. 


## Fonctionnement
Le dashboard possède plusieurs pages. La première permet d'afficher plusieurs widgets qui affichent des informations sur les musiques, albums et artistes stockés dans une base de données.
La seconde page permet d'intéragir avec ladite base de données à l'aide d'un formulaire.

## Développement
La partie Front a été développée par Antoine Lamé. Elle est constituée de nombreux widgets divers qui permettent d'afficher des informations sur un.e artiste spécifique, un album en particulier ou bien encore des informations sur l'ensemble de la base de données.

La partie Back a été développée par Maxime Faragalla. C'est elle qui fait le lien entre le Front et la base de données.Elle est constituée de nombreuses routes qui permettent d'accéder aux informations souhaitées. 