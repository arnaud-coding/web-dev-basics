export const getPersonas = (): Persona[] => {
  return [
    new Persona('John', 'Doe', new Date(1990, 0, 1), 'M'),
    new Persona('Jane', 'Doe', new Date(1991, 11, 31), 'F'),
    new Persona('Baby', 'Doe', new Date(2022, 7, 1), 'M')
  ]
}

type Gender = 'M' | 'F' | 'X'

export class Persona {
  readonly firstname: string
  readonly lastname: string
  readonly birthday: Date
  readonly gender: Gender

  constructor(firstname: string, lastname: string, birthday: Date, gender: Gender) {
    this.firstname = firstname
    this.lastname = lastname
    this.birthday = birthday
    this.gender = gender
    console.log(`creating persona ${this.getName()}`)
  }

  getName(): string {
    return `${this.firstname} ${this.lastname}`
  }

  getAge(): number {
    const diff = Date.now() - this.birthday.getTime()
    const age = new Date(diff)
    return age.getFullYear() - 1970
  }

  getProfile(): string {
    return `${this.getName()} (gender: ${this.getGender()}, ${this.getAge()} y/o)`
  }

  private getGender(): string {
    if (this.gender === 'M') return 'male'
    return this.gender === 'F' ? 'female' : 'unknown'
  }
}
