// récupere les input "pseudo" et "psw"
// ------------------------------------
const elPseudo = document.getElementById('pseudo')
const elPsw = document.getElementById('psw')

// relie le click du bouton login à la fonction submit
// ------------------------------------
const btn = document.getElementById('loginBtn')
if (btn) {
  btn.addEventListener('click', submit)
}

function submit() {
  console.log('bouton cliqué')

  // récupere pseudo et mot de passe
  // ------------------------------------------------------
  // @ts-ignore
  const pseudo = elPseudo?.value
  // @ts-ignore
  const psw = elPsw?.value
  console.log('submit ~ pseudo/psw:', pseudo, psw)

  // vérification pseudo et mot de passe
  // ------------------------------------------------------
  const check = pseudo === 'arnaud' && psw === '123456'

  // SI identifiants reconnus
  // ------------------------------------------------------
  if (check) {
    // VICTOIRE : on est logué
    console.log('identifiants reconnus')

    // 1°) masquer la div de login
    const login = document.getElementById('login')
    if (login) {
      login.hidden = true
    }

    // 2°) afficher un message de bienvenue
    const welcome = document.getElementById('welcome')
    if (welcome) {
      welcome.hidden = false
      welcome.innerHTML = `hello ${pseudo}, vous etes connecté `
    }
  }
  // SINON (identifiants non reconnus)
  // ------------------------------------------------------
  else {
    alert("vos identifiants n'ont pas été reconnus")
  }
}
