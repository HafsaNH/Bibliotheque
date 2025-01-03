const express = require('express');
const app = express();
const port = 3000;

// Liste des livres (stockée en mémoire)
let livres = [
  { id: 1, titre: "Le Petit Prince", auteur: "Antoine de Saint-Exupéry" },
  { id: 2, titre: "1984", auteur: "George Orwell" },
  { id: 3, titre: "To Kill a Mockingbird", auteur: "Harper Lee" }
];

// Configuration pour servir des fichiers statiques (HTML, CSS, JS)
app.use(express.static('public'));

// Middleware pour parser les données JSON
app.use(express.json());

// Route pour obtenir la liste des livres
app.get('/api/livres', (req, res) => {
  res.json(livres);
});

// Route pour ajouter un livre
app.post('/api/livres', (req, res) => {
  const { titre, auteur } = req.body;
  const newLivre = { id: livres.length + 1, titre, auteur };
  livres.push(newLivre);
  res.status(201).json(newLivre);
});

// Route pour supprimer un livre
app.delete('/api/livres/:id', (req, res) => {
  const id = parseInt(req.params.id);
  livres = livres.filter(livre => livre.id !== id);
  res.status(204).send();
});

// Démarrer le serveur
app.listen(port, () => {
  console.log(`Serveur démarré sur http://localhost:${port}`);
});
