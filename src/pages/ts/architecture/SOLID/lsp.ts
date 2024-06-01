const textAreas = document.getElementsByTagName('textarea')
if (textAreas.length > 0) {
  const textArea = textAreas[0]
  textArea.value = 'Liskov substitution Principle\n\nThis is the "L" in "SOLID" principles'
}
