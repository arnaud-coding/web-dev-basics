# web-dev-basics

But de cet projet: Apprendre les bases du développement d'un site web.
Je me limite aux technologies de base: HTML/CSS/JS.

## Web Technologies languages

* [HTML](docs/languages/HTML.md)
* [CSS](docs/languages/CSS.md)
* [JavaScript](docs/languages/JavaScript.md)

## Tools

### Visual Studio code (**VS Code**)

### Git

### Markdown (md)

langage pour décrire des pages d'aide dans VScode et dans Github.

[syntaxe du langage MD](https://docs.github.com/fr/get-started/writing-on-github/getting-started-with-writing-and-formatting-on-github/basic-writing-and-formatting-syntax)

#### Web sites

* Github
* [MDN](https://developer.mozilla.org/fr/)
* [W3Schools](https://www.w3schools.com/)

## [Keyboard shortcuts](docs/shortcuts.md)

## [Glossary](docs/glossary.md)

## Questions

* c'est quoi le web ?
  * Un ensemble d'ordinateurs reliés entre eux pour s'échanger des messages contenant des informations.
  * Le web définit comment on s'échange les messages: Ce sont les protocoles HTTP et TCP/IP qui définissent comment on s'échange des messages.
  * Le web ne définit **PAS** le contenu des messages **NI** ce qu'on en fait: Ce sont les sites web qui décident de ce qu'ils font des messages. (Par exemple, 'Google.com' utilise les messages pour faire de la recherche sur Internet, 'GMAIL' utilise les messages pour échanger des Mails, ...)
  
* c'est quoi un serveur ?
  * Un ordinateur sans écran, qui appartient à une compagnie et qui est connecté au web pour y stocker des sites web. Ex.: Microsoft utilisent des milliers de serveur pour héberger 'Outlook'

* c'est quoi un site web ?
  * Ensemble de pages Web reliées entre elles et avec un but commun: gérer une messagerie (Outlook, GMail, ...), diffuser des vidéos (Youtube), ...

* c'est quoi une page web ?
  * Une partie du site qui effectue 1 tache précise: login, page d'accueil, voir mes comptes, ...

* c'est quoi un développeur web ?
  * conçoit des sites web à l'aide d'outils de dévelopement (VSCode).

* c'est quoi le rapport entre Chrome et une page web ?
  * Chrome est un navigateur Internet:
    * il sait afficher des pages web
    * il permet de naviguer entre des pages web soit:
      * en tapant une adresse web dans la barre d'adresse
      * en cliquant sur un favori
      * en cliquant sur un lien
      * quand le site web le demande
    * il ne sait PAS ce que font les pages qu'il affiche: il sait juste les afficher !

* Donne moi des noms de navigateurs web
  * Chrome (de Google), Edge (Microsoft), Safari (Apple), Firefox (Mozilla)

* C'est quoi 'Bing' ou 'Google'
  * ce sont des sites web spécialisés dans la recherche d'autres pages
  
* De quoi est constitué une page web ?
  * de 1 fichier HTML (obligatoire)
  * de 1 fichier CSS (optionel, mais toujours utilisé sinon la page est trop moche)
  * de 1 fichier JavaScript (optionel, mais sans lui, la page web ne peut pas interagir avec l'utilisateur, elle ne peut que afficher des données)

* c'est quoi une page web statique ?
  * c'est une page qui n'interagit pas avec l'utilisateur: elle ne fait que présenter des données
  * elle peut contenir des liens pour aller sur autre pages
  * Exemple: La page "menu" d'un restaurant est statique : elle contient un lien pour retourner à la page d'accueil, mais PAS de boutons, de zones de textes, ...

* c'est quoi et ça sert à quoi le HTML ?
  * C'est un language
  * Il définit le contenu de la page : des boutons, des textes, des liens, des images...
  * Il ne définit PAS l'organisation (layout) ni le style de la page ni les interactions avec l'utilisateur.
  * le navigateur s'en sert pour savoir QUOI afficher

* c'est quoi et ça sert à quoi le CSS ?
  * C'est un language
  * Il définit l'organisation du contenu de la page (layout)
  * Il définit le style de la page
  * le navigateur s'en sert pour savoir COMMENT afficher

* c'est quoi et ça sert à quoi le JavaScript ?
  * C'est un language
  * Il définit les interactions avec l'utilisateurs.
    Ex.: Il sait quoi faire quand l'utilisateur appuie sur une bouton
  * le navigateur s'en sert pour executer n'IMPORTE quelle action définit par le code (*le navigateur ne sait pas ce que va faire la fonction*).

* avec quel outil(s) on écrit du code ?
  * Un éditeur de code (IDE): VSCode, Eclipse, WebStorm, ... Bloc-note (pour les andouilles)

* c'est quoi un Repository ?
  * Un endroit dans le cloud (remote repo) ou dans mon ordinateur (local repo) ou on stocke du code dans le but de:
    * de partager le code avec d'autres
      * on peut pousser les modifications vers le stockage local (commit)
      * on peut pousser les modifications depuis me stockage local vers le repo distant (push)
      * on peut ramener les modifications depuis repo distant vers le repo local (pull)
    * d'avoir un historique des modifications
    * de gérer des branches (un système qui permet de faire des modofications en s'isolant temporairement de la branche principale: les modifications pas encore terminées sont stockées sur la branche dans le repo distant, mais ne gènent pas les autres developpeurs)
  
* c'est quoi GitHub ?
  * C'est un site internet gratuit qui permet de :
    * stocker ses propres repos
    * de voir les repos des autres (pour apprendre)
    * de chercher de l'aide

* c'est quoi Git ?
  * c'est l'outil qui permet de manipuler les repos (*commit, push, pull*)
  * il est intégré à VSCode QUAND il est installé dans l'ordinateur

* c'est quoi Markdown ?
  * c'est un language (abreviation: MD)
  * il sert pour faire des pages de texte simples avec un peu de texte, des images, des liens et un peu de style (cette page est une page MD)
  * GitHub sait afficher les fichiers MD
  * On s'en sert souvent pour faire des pages d'aide, ou des guides

* c'est quoi Bash ?
  * Une ligne de commande pour les systèmes Linux (*et pour git avec 'git bash'*).
  * Une ligne de commande permet de rentrer des commandes exécutées par l'ordinateur pour: démarrer un programme; lister les fichiers, changer de dossier... il y a des centaines de commandes parfois très complexe...
  * sur windows, les équivallents sont "invites de commandes" (cmd) et "Power Shell
  * sert souvent pour automatiser des actions

* c'est quoi le frontend ?
  * la partie d'un site web qui tourne sur le navigateur du client

* c'est quoi le backend ?
  * la partie d'un site web qui tourne sur un serveur

* quels raccourci pour ...
