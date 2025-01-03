// Fonction pour obtenir tous les livres depuis l'API
async function obtenirLivres() {
    const response = await fetch('/api/livres');
    const livres = await response.json();
    afficherLivres(livres);
  }
  
  // Fonction pour afficher la liste des livres
  function afficherLivres(livres) {
    const ul = document.getElementById('livres-list');
    ul.innerHTML = ''; // Réinitialiser l'affichage
  
    livres.forEach(livre => {
      const li = document.createElement('li');
      li.textContent = `${livre.titre} de ${livre.auteur}`;
      
      // Ajouter un bouton pour supprimer le livre
      const supprimerBtn = document.createElement('button');
      supprimerBtn.textContent = 'Supprimer';
      supprimerBtn.onclick = () => supprimerLivre(livre.id);
      li.appendChild(supprimerBtn);
      
      ul.appendChild(li);
    });
  }
  
  // Fonction pour ajouter un livre via l'API
  async function ajouterLivre() {
    const titre = document.getElementById('titre').value;
    const auteur = document.getElementById('auteur').value;
  
    if (titre && auteur) {
      const response = await fetch('/api/livres', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ titre, auteur })
      });
      const newLivre = await response.json();
      console.log('Livre ajouté:', newLivre);
      obtenirLivres(); // Recharger la liste des livres
    }
  }
  
  // Fonction pour supprimer un livre via l'API
  async function supprimerLivre(id) {
    const response = await fetch(`/api/livres/${id}`, {
      method: 'DELETE'
    });
    if (response.ok) {
      obtenirLivres(); // Recharger la liste des livres après suppression
    }
  }
  
  // Fonction de recherche de livre
  async function rechercherLivre() {
    const recherche = document.getElementById('recherche').value.toLowerCase();
    const response = await fetch('/api/livres');
    const livres = await response.json();
  
    // Filtrer les livres en fonction du titre ou de l'auteur
    const livresFiltres = livres.filter(livre => 
      livre.titre.toLowerCase().includes(recherche) || 
      livre.auteur.toLowerCase().includes(recherche)
    );
  
    // Afficher les livres filtrés
    afficherLivres(livresFiltres);
  }
  
  // Charger la liste des livres au démarrage
  obtenirLivres();
  
  // Ajout d'un événement pour le champ de recherche
  document.getElementById('recherche').addEventListener('input', rechercherLivre);
  