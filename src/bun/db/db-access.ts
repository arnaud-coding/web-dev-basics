// Regrouper dans une classe dans ce fichier toutes les fonctions de manipulation de la base
// - fonctions a regrouper :
//    - insertPersonQuery /film...
//    - insertPeopleTransactions / film...

import { PersonDB, FilmDB } from './types.ts'
import { Database } from 'bun:sqlite'

export class DBAcess {
  private db: Database

  private peopleMap = new Map<number, number>()
  private filmsMap = new Map<number, number>()

  constructor(db: Database) {
    this.db = db
  }

  execSQL(query: string) {
    this.db.run(query)
  }

  /**
   * compile a SQL query and return a statement object that insert a person into the People table
   * @returns the created table entry
   */
  private insertPerson(person: PersonDB) {
    const query = this.db.prepare(
      'INSERT INTO People (name, mass, height) VALUES ($name, $mass, $height) RETURNING id;'
    )
    return query.get(person)
  }

  /**
   * compile a SQL query and return a statement object that insert a film into the Films table
   * @returns the created table entry
   */
  private insertFilm(film: FilmDB) {
    const query = this.db.prepare(
      'INSERT INTO Films (title, episode_id, director, opening_crawl, release_date) VALUES ($title, $episode_id, $director, $opening, $date) RETURNING id;'
    )
    return query.get(film)
  }

  /**
   * compile a SQL query and return a statement object that insert a film into the Films table
   * @returns the created table entry
   */
  private insertPersonFilm() {
    const query = this.db.prepare('INSERT INTO people_films (person_id, film_id) VALUES ($left_id, $right_id)')
    // todo : finir transfert ici
    return query.get()
  }

  /**
   * insert given people into the People table
   * @param people the people to insert
   */
  insertPeople(people: PersonDB[]) {
    // create the transaction that will insert the given people
    const transaction = this.db.transaction(() => {
      let index = 0
      for (const person of people) {
        // insère un personnage et récupère son id (créé par la base)
        const response = this.insertPerson(person)

        // ajoute le lien entre le personnage et son index (key= index tableau, value= id base)
        this.peopleMap.set(index, (response as any).id)
        index++
      }
    })

    // call the created transaction to insert the people
    transaction(people)
  }

  /**
   * insert given films into the Films table
   * @param films the films to insert
   */
  insertFilms(films: FilmDB[]) {
    // create the transaction that will insert the given films
    const transaction = this.db.transaction((films: FilmDB[]) => {
      let index = 0
      for (const film of films) {
        // insère un film et récupère son id (créé par la base)
        const response = this.insertFilm(film)

        // ajoute le lien entre le film et son index (key= index tableau, value= id base)
        this.filmsMap.set(index, (response as any).id)
        index++
      }
    })

    // call the created transaction to insert the films
    transaction(films)
  }
}
