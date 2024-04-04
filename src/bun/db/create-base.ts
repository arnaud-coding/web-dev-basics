import { Database } from "bun:sqlite";
import { PersonDB, FilmDB} from './types.ts'

/**
 * Créer et remplir une base de données :
 *
 *
 * base de données relationnelle :
 *  - un ensemble de tables reliées par des relations
 *
 * - logique :
 *    - une base de données obéit à ses propres règles de conception (formes normales 1 à 6) qui ne sont pas celles des langages objets (comme JS)
 *    - il faudra convertir, grace à des objets DTO ou ORM, les données :
 *      - depuis JS vers la base pour écrire dans la base
 *      - depuis la base vers JS pour lire des données dans la base
 *
 * - schéma :
 *    - décrit de manière graphique la base de données (les tables et leurs relations)
 *
 * - table :
 *    - tableau à 2 dimensions ( ex.: feuille excel)
 *    - colonne (attribut) : définit le contenu de la table (ex.: id, name...)
 *      - chaque colonne a un type (ex.: integer, float (décimal), string, date, JSON, blob), les types de données doivent correspondre
 * -    - une colonne doit contenir une clé primaire (ex.: un nombre auto incrémenté) qui identifie de manière unique un enregistrement
 *    - ligne (enregistrement) : contient les données de la table
 *
 *  - relations :
 *    - définissent des liens entre les tables (ex.: luke <=> vaisseaux)
 *    - relation "one to one" : ex.: luke a un sabre laser qui n'est qu'à lui
 *    - relation "one to many" : ex.: luke a plusieurs véhicules
 *    - relation "many to many" : ex: luke apparait dans plusieurs films ET chaque film contient plusieurs autres personnages
 *
 *  - requêtes :
 *    - ensemble de commandes envoyées à une base de données, (pour la créer, lire des enregistrements, ajouter des enregistrements)
 *    - language utilisé : le SQL (ex.: create, alter, drop, insert, select...)
 *    - jointures : technique permettant de requêter plusieurs tables à la fois (ex.: tous les personnages qui apparaissent dans un film et qui sont des droides)
 *    - transactions : exécute plusieurs requêtes de manière ACID (toutes les requêtes réussisent, ou sinon la base n'est pas modifiée)
 *
 * - outils pour converitr les données :
 *    - DB designer : un outil graphique qui permet de définir le schéma de la base de données
 *    - DTO :
 *      - nom générique (ex.: peopleDTO) donné aux classes qui vont convertir les données (JS <=> base)
 *      - souvent écrit manuellement (un peu pénible, plus rapide, plus sujet à erreurs)
 *    - ORM :
 *      - des outils graphiques qui vont convertir les données (JS <=> base)
 *      - génère automatiquement les objets JS basés sur les tables
 */

(async () => {
  /**
   * exécute un ensemble de requêtes SQL (script) sur la base donnée
   * @param filename fichier qui contient la ou les requète SQL à exécuter
   */
  const execSqlFile = async (filename: string) => {
    // lit le fichier pour récupérer le SQL qu'il contient
    const file = Bun.file(filename);
    const queryContent = await file.text();

    // exécute la requête lue sr la base
    db.run(queryContent);
  };
  console.info("\nThis script creates the star-wars database, based on data collected on xxx API.\n");

  // ouverture de la base si elle existe, sinon création d'une base vide
  console.log("Creating database...");
  const db = new Database("star-wars.sqlite");

  // efface les tables existantes
  console.log("Removing existing tables...");
  await execSqlFile("star-wars_drop.sql");

  // créer les tables et leurs relations
  console.log("Creating tables...");
  await execSqlFile("star-wars_create.sql");

  debugger;

  // Map : tous les liens entre "un index personnage dans tableau JS" (Map key) et "un id personnage dans la base" (Map value)
  const peopleMap = new Map<number, number>();
  const filmsMap = new Map<number, number>();
  
  //#region DB queries & transactions
  
  //  requête : insére un personnage dans sa table
  const insertPersonQuery = db.prepare(
    "INSERT INTO People (name, mass, height) VALUES ($name, $mass, $height) RETURNING id;"
  );

  //  requête : insére un film dans sa table
  const insertFilmQuery = db.prepare(
    "INSERT INTO Films (title, episode_id, director, opening_crawl, release_date) VALUES ($title, $episode_id, $director, $opening, $date) RETURNING id;"
  );

  //  requête : insére un lien entre un personnage et un film
  const insertPersonFilmQuery = db.prepare(
    "INSERT INTO people_films (person_id, film_id) VALUES ($left_id, $right_id)"
  );

  // transaction : insère tous les personnages dans la table
  const insertPeopleTransaction = db.transaction((people: PersonDB[]) => {
    let index = 0;
    for (const person of people) {
      // insère un personnage et récupère son id (créé par la base)
      const response = insertPersonQuery.get(person);

      // ajoute le lien entre le personnage et son index (key= index tableau, value= id base)
      peopleMap.set(index, (response as any).id);
      index++;
    }
  });

  // transaction : insère tous les personnages dans la table
  const insertFilmsTransaction = db.transaction((films: FilmDB[]) => {
    let index = 0;
    for (const film of films) {
      // insère un film et récupère son id (créé par la base)
      const response = insertFilmQuery.get(film);

      // ajoute le lien entre le film et son index (key= index tableau, value= id base)
      filmsMap.set(index, (response as any).id);
      index++;
    }
  });

  // transaction : insère tous les personnages dans la table
  const insertPeopleFilmsTransaction = db.transaction((people: PersonDB[]) => {
    let index = 0;
    for (const _ of people) {
      // récupère l'id dans la base du personnage courant
      const personId = peopleMap.get(index);
      if (personId === undefined) {
        continue;
      }

      // récupère les id de films dans la base pour le personnage courant
      // todo
      const filmsId: number[] = [1,2];

      // insère un film et récupère son id (créé par la base)
      for (const filmId of filmsId) {
        insertPersonFilmQuery.get({$left_id: personId,$right_id: filmId});
      }

      index++;
    }
  });

  //#endregion

  console.log("Inserting people...");

  // tmp : faux tableaux de personnages et de films (plus tard, ils viendront de l'API)
  const people: PersonDB[] = [
    { $name: "Luke", $mass: 68, $height: 177 },
    { $name: "C-3PO", $mass: 50, $height: 185 },
  ];
  insertPeopleTransaction(people);

  console.log("Inserting films...");
  const films: FilmDB[] = [
    {
      $title: "A new hope",
      $episode_id: 4,
      $director: "Georges Lucas",
      $opening: "once upon a time...",
      $date: "1980-01-01",
    },
    {
      $title: "The empire strikes back",
      $episode_id: 5,
      $director: "Lucas George",
      $opening: "...",
      $date: "1981-01-01",
    },
  ];
  insertFilmsTransaction(films);

  console.log("Inserting people-films relations...");
  insertPeopleFilmsTransaction(people);
  
  console.log("\nDebuging the map of people... (map people array indexes to people table id");
  for (let index = 0; index < people.length; index++) {
    const person = people[index];
    console.log(person.$name, "-> People array index:", index , ", table id:", peopleMap.get(index));
  }
  console.log("\nDebuging the map of films... (map films array indexes to films table id");
  for (let index = 0; index < films.length; index++) {
    const film = films[index];
    console.log(film.$title, "-> Films array index:", index, ", table id: ", filmsMap.get(index));
  }

  db.close();
  console.log("\nDatabase created and filled");
})();
