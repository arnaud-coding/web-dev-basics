(async () => {
  const p = document.getElementById("api-result");
  if (p) {
    // adresse de l'API
    const url = "https://jsonplaceholder.typicode.com/";

    // effectue la requête HTTP et attend la réponse
    const response = await fetch(url + "users/1");

    // si la requête est réussie, le "ok" sera true ...
    if (response.ok) {
      // la requête a réussi : on a une réponse JSON et on en extrait un objet JS (qu'on met dans "user")
      const user = await response.json();

      // juste pour débugger, on log l'objet qu'on a reçu
      const json = JSON.stringify(user);
      console.log("json:", json);

      // exemple d'utilisation de l'objet
      p.innerHTML = `${user.name} lives in ${user.address.city} and works for ${user.company.name}.<br>
      Contact her/him at ${user.phone} or ${user.email}.`;
    }
  }
})();
