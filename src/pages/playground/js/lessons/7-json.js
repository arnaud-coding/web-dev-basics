// TODO JSON

// https://www.w3schools.com/jsref/jsref_obj_json.asp

// le JSON est la version texte d'un objet JS (dans la mémoire de l'ordinateur, un objet JS n'est pas du tout une string, c'est du binaire)
// il a deux utilités :
// - sauver des données sur le disque
// - échanger des données avec un autre programme
//   (les données qu'on obtient d'internet sont quasi sytématiquement en JSON)

;(() => {
  const boys = [
    { firstname: 'Thomas', male: true, birthday: new Date(1994, 8, 25) },
    { firstname: 'Arnaud', male: true, birthday: new Date(1995, 7, 22) }
  ]
  console.log('Object original:', boys[0])

  // convertit l'objet "boys" en une chaine JSON
  const json = JSON.stringify(boys)
  console.log('json:', json)

  // convertit la chaine JSON en un nouvel objet JS
  // (regarder birthday dans l'objet copié : c'est une chaine car JSON ne sait pas "parser" les dates)
  const brothers = JSON.parse(json)
  console.log('Objet parsé', brothers[0])

  // convertit la date version chaine de caracère en une vraie date
  brothers[0].birthday = new Date(brothers[0].birthday)
  console.log('Objet corrigé', brothers[0])
})()
