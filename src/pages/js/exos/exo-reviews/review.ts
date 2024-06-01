import { getPersonas } from './personas.ts'
const personasBtn = document.getElementById('personas')
const ul = document.querySelector('ul')

if (personasBtn instanceof HTMLButtonElement) {
  personasBtn.addEventListener('click', loadPersonas)
}

function loadPersonas() {
  // charge toute la famille
  const ps = getPersonas()

  // affiche tout les membres
  for (const p of ps) {
    addPersona(p.getProfile())
  }

  // affiche le nombre de garcons
  const males = document.getElementById('males')
  if (males instanceof HTMLLabelElement) {
    males.innerText = ps.reduce((acc, cur) => (cur.gender === 'M' ? ++acc : acc), 0) + ' males'
  }
  disableElement(personasBtn)
}

function addPersona(name: string) {
  if (ul instanceof HTMLUListElement) {
    const li = document.createElement('li')
    li.appendChild(document.createTextNode(name))
    ul.appendChild(li)
  }
}

function disableElement(element: HTMLElement | null) {
  if (element instanceof HTMLButtonElement) {
    element.disabled = true
  }
}
