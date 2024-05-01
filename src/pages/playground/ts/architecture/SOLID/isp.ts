/**
 * ISP = Interface Segregation Principle
 *  (le I de SOLID)
 *
 * Principe : Une classe ne doit pas être forcée d'implémenter des méthodes dont elle n'a pas besoin
 */

const textAreas = document.getElementsByTagName('textarea')
if (textAreas.length > 0) {
  const textArea = textAreas[0]
  textArea.value = 'ISP - Interface Segregation Principle\n\nThis is the "I" in "SOLID" principles'
}

// ----------------------------------------------------------------------------
// Bad practice : Interface trop générique
//                -> L'interface n'est pas cohérente
// ----------------------------------------------------------------------------

interface BadVehicle {
  //! En spécifiant ride() et fly(), on va obliger TOUS les véhicules à rouler et voler
  ride(speed: number): void
  fly(altitude: number): void
}

class BadCar implements BadVehicle {
  ride(speed: number) {
    console.log(`la voiture roule à ${speed} km/h`)
  }
  fly(altitude: number) {
    //! Violation ISP : la classe 'Car' est obligée d'implémenter la méthode 'fly' dont elle n'a pas besoin !
    console.error('je suis une voiture, je ne vole pas !', altitude)
  }
}

const suv = new BadCar()
suv.fly(5000) // une voiture qui vole ???

// ----------------------------------------------------------------------------
// Good practice : Ségrégation en plusieurs interfaces
//                 -> Les interfaces sont cohérentes
// ----------------------------------------------------------------------------

interface Riding {
  ride(speed: number): void
}

interface Flying {
  fly(altitude: number): void
}

class Car implements Riding {
  ride(speed: number): void {
    console.log(`la voiture roule à ${speed} km/h`)
  }
}

const taco = new Car()
taco.ride(50)

class Plane implements Riding, Flying {
  ride(speed: number): void {
    console.log(`l'avion roule sur le tarmac à ${speed} km/h`)
  }
  fly(altitude: number): void {
    console.log(`l'avion vole à ${altitude} m`)
  }
}

const A380 = new Plane()
A380.ride(20)
A380.fly(5000)

function goodMove(vehicle: Riding | Flying) {
  //* ici, violation acceptable de OCP parce que :
  //  - Riding correspond à tous types de vehicules roulants (voitures, bus, camions, vélos...)
  //  - Flying correspond à tous types de vehicules volants (avions, hélicoptères, fusées, deltaplanes...)
}

function badMove(vehicle: Car | Plane) {
  //! Ici, violation inacceptable de OCP parce que :
  //  - ajouter un bus, une camion... forcerait à modifier move() à chaque fois
}

goodMove(taco)
