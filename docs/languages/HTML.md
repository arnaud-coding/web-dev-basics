# HTML language

Goal:

* Define the content and the structure of the web page (i.e. list the HTML elements to displayed on the page)

* Do NOT styles and the layout the web pages (*which is done by the CSS*)

## Help pages

* [MDN - HTML reference](https://developer.mozilla.org/fr/docs/Web/HTML)
* [W3Schools - HTML tutorial](https://www.w3schools.com/html/default.asp)
* [W3Schools - HTML examples](https://www.w3schools.com/html/html_examples.asp)
* [web.dev](https://web.dev/learn/)
* [web.dev - HTML](https://web.dev/learn/html)
* [tutorial grafikart](https://www.youtube.com/playlist?list=PLjwdMgw5TTLUeixVGPNl1uZNeJy4UY6qX)

## Reminders

* [HTML element](https://www.w3schools.com/html/html_elements.asp) An HTML element is defined by a start tag, some content, and an end tag.

## Questions

* c'est quoi la structure d'une page HTML ?
  * une ligne avec balise !DOCTYPE qui dit que c'est une page HTML
  * 1 élément "html", avec un attribut "lang" et qui contient 2 enfants
    * 1 élément head: Donne des infos sur la page pas pour le client, sauf pour le titre de l'onglet qui est affiché dans le navigateur
    * 1 élément body: tout les éléments HTML qui constituent la page (ceux qui seront affichés dans le navigateur)

* c'est quoi une balise ?
  * un texte entouré par des crochets: ce texte correspondant à des élément html existant: button, input, body...
  * balise ouvrante: Pour démarrer un élément HTML. Ex. `<button>`
  * balise fermante: Pour terminer un élément HTML. Un '/' + Le texte de la balise ouvrante. Ex.: ``</button>``

* c'est quoi un élément HTML ?
  * balise ouvrante + un contenu + une balise fermante
  * il n'y a pas toujours du contenu
  * le contenu peut imbriqué un ou plusieurs autres élément HTML

* donne moi des exemples d'éléments HTML
  * input, button, label, checkbox, ul + li, a, div
  
* c'est quoi un attribut d'élément HTML ?
  * fait suite à l'élément html à l'intérieur de la balise. ex: `<button type="button">Click Me!</button>`
  * configure l'élement html ou ajuste son comportement de différentes manières pour répondre aux critères souhaités par les utilisateurs.

* c'est quoi un élément HTML sémantique ?
  * Des balises qui définissent la signification du contenu qu'elles renferment. Par exemple, des balises comme "header", "article", et "footer" sont des balises sémantiques HTML. Elles indiquent clairement le rôle du contenu qu'elles renferment.
  * Exemples: nav,  section, header,article, aside, div, span

* donne moi des exemples d'attributs pour un élément HTML de type "button"
  * disabled
  * autofocus
  * type
  * value
  * name
  * color
  * border
  * ...

* donne moi des exemples d'attributs pour un élément HTML de type "input"
  * `<input type="button">`
  * `<input type="checkbox">`
  * `<input type="radio">`
  * `<input type="email">`
  * `<input type="search">`
  * `<input type="text">` (default value)
  * `<input type="file">`
  * `<input type="password">`


* c'est quoi des attributs génériques ?
  * des attributs qui peuvent s'appliquer à TOUS les éléments HTML existants.
  * Exemples: 
    * accesskey
    * class
    * dir (spécifie la direction du texte pour le contenu dans un élément).
    * hidden (spécifie qu'élément n'est pas encore, ou n'est plus visible).
    * id (spécifie un identitifiant unique pour un élément).
    * lang
    * spellcheck
    * style (specifies an inline CSS style for an element)
