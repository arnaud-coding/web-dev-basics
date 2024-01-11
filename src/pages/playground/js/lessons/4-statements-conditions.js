// IIFE pour isoler les noms de variables
;(() => {
  /** ===========================================================================
   * * Choices                      
   ============================================================================== */

  /** ------------------------------------------------------
    * if ... else if ... else 
   --------------------------------------------------------- */
  const ifHour = (hours) => {
    if (hours < 6) {
      console.log(`il est ${hours} heures, bonne fin de nuit`)
    } else if (hours < 12) {
      console.log(`il est ${hours} heures, bonne matinée`)
    } else if (hours > 22) {
      console.log(`il est ${hours} heures, bonne nuit`)
    } else {
      console.log(`il est ${hours} heures, bonne après-midi`)
    }
  }

  ifHour(3)
  ifHour(11)
  ifHour(15)
  ifHour(23)

  /** ------------------------------------------------------
    * switch (plus facile mais ne peut PAS utiliser les "> ou <")
   --------------------------------------------------------- */
  const switchHour = (hours) => {
    switch (hours) {
      case 8:
      case 12:
      case 20:
        console.log(`il est ${hours} heures, à table !`)
        break

      case 19:
        console.log(`il est ${hours} heures, go home !`)
        break

      default:
        console.log(`il est ${hours} heures`)
    }
  }

  switchHour(8)
  switchHour(10)
  switchHour(19)
  switchHour(20)
})()
