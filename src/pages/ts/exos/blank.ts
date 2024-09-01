;(() => {
  const textAreas = document.getElementsByTagName('textarea')
  if (textAreas.length > 0) {
    const textArea = textAreas[0]
    textArea.value = 'This file is for testing some code'
  }
})()
