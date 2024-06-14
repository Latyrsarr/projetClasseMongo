// const express = require('express');
// const mongoose = require('mongoose');
// const bodyParser = require('body-parser');

// const app = express();
// const port = 3000;

// // Configuration d'Express pour utiliser EJS et body-parser
// app.set('view engine', 'ejs');
// app.use(bodyParser.urlencoded({ extended: true }));


// // Servir les fichiers statiques à partir du répertoire public
// app.use(express.static('public'));

// // Connexion à MongoDB
// const mongoURI = 'mongodb://localhost:27017,localhost:27018,localhost:27019/dblp?replicaSet=rs0';
// mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
//   .then(() => console.log('Connected to MongoDB replica set'))
//   .catch(err => console.error('Error connecting to MongoDB', err));

// // Définir un schéma pour les publications
// const publicationSchema = new mongoose.Schema({
//   title: String,
//   authors: [String],
//   year: Number,
//   venue: String
// });

// const Publication = mongoose.model('Publication', publicationSchema);

// // Route pour afficher les publications
// app.get('/', async (req, res) => {
//   try {
//     const publications = await Publication.find().limit(10);
//     res.render('index', { publications });
//   } catch (err) {
//     console.error(err);
//     res.status(500).send('Error retrieving publications');
//   }
// });

// // Route pour afficher le formulaire d'ajout
// app.get('/add', (req, res) => {
//   res.render('add');
// });

// // Route pour gérer l'ajout de publications
// app.post('/add', async (req, res) => {
//   const { title, authors, year, venue } = req.body;
//   const newPublication = new Publication({
//     title,
//     authors: authors.split(',').map(author => author.trim()),
//     year: parseInt(year),
//     venue
//   });
//   try {
//     await newPublication.save();
//     res.redirect('/');
//   } catch (err) {
//     console.error(err);
//     res.status(500).send('Error adding publication');
//   }
// });

// // Route pour afficher le formulaire de modification
// app.get('/edit/:id', async (req, res) => {
//   try {
//     const publication = await Publication.findById(req.params.id);
//     res.render('edit', { publication });
//   } catch (err) {
//     console.error(err);
//     res.status(500).send('Error retrieving publication');
//   }
// });

// // Route pour gérer la modification de publications
// app.post('/edit/:id', async (req, res) => {
//   const { title, authors, year, venue } = req.body;
//   try {
//     await Publication.findByIdAndUpdate(req.params.id, {
//       title,
//       authors: authors.split(',').map(author => author.trim()),
//       year: parseInt(year),
//       venue
//     });
//     res.redirect('/');
//   } catch (err) {
//     console.error(err);
//     res.status(500).send('Error updating publication');
//   }
// });

// // Route pour gérer la suppression de publications
// app.post('/delete/:id', async (req, res) => {
//   try {
//     await Publication.findByIdAndRemove(req.params.id);
//     res.redirect('/');
//   } catch (err) {
//     console.error(err);
//     res.status(500).send('Error deleting publication');
//   }
// });

// // Route de recherche dans app.js
// app.get('/search', async (req, res) => {
//     const query = req.query.query;
//     try {
//       const publications = await Publication.find({
//         $or: [
//           { title: new RegExp(query, 'i') },
//           { authors: new RegExp(query, 'i') },
//           { year: parseInt(query) || -1 }
//         ]
//       });
//       res.render('index', { publications });
//     } catch (err) {
//       console.error(err);
//       res.status(500).send('Error retrieving publications');
//     }
//   });

// app.listen(port, () => {
//   console.log(`Server is running on http://localhost:${port}`);
// });



const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

// Configuration d'Express pour utiliser EJS et body-parser
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));

// Servir les fichiers statiques à partir du répertoire public
app.use(express.static('public'));

// Connexion à MongoDB
const mongoURI = 'mongodb://localhost:27017,localhost:27018,localhost:27019/dblp?replicaSet=rs0';
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB replica set'))
  .catch(err => console.error('Error connecting to MongoDB', err));

// Définir un schéma pour les publications
const publicationSchema = new mongoose.Schema({
  title: String,
  authors: [String],
  year: Number,
  venue: String
});

const Publication = mongoose.model('Publication', publicationSchema);

// Route pour afficher les publications
app.get('/', async (req, res) => {
  try {
    const publications = await Publication.find().limit(10);
    res.render('index', { publications });
  } catch (err) {
    console.error(err);
    res.status(500).send('Error retrieving publications');
  }
});

// Route pour afficher le formulaire d'ajout
app.get('/add', (req, res) => {
  res.render('add');
});

// Route pour gérer l'ajout de publications
app.post('/add', async (req, res) => {
  const { title, authors, year, venue } = req.body;
  const newPublication = new Publication({
    title,
    authors: authors.split(',').map(author => author.trim()),
    year: parseInt(year),
    venue
  });
  try {
    await newPublication.save();
    res.redirect('/');
  } catch (err) {
    console.error(err);
    res.status(500).send('Error adding publication');
  }
});

// Route pour afficher le formulaire de modification
app.get('/edit/:id', async (req, res) => {
  try {
    const publication = await Publication.findById(req.params.id);
    res.render('edit', { publication });
  } catch (err) {
    console.error(err);
    res.status(500).send('Error retrieving publication');
  }
});

// Route pour gérer la modification de publications
app.post('/edit/:id', async (req, res) => {
  const { title, authors, year, venue } = req.body;
  try {
    await Publication.findByIdAndUpdate(req.params.id, {
      title,
      authors: authors.split(',').map(author => author.trim()),
      year: parseInt(year),
      venue
    });
    res.redirect('/');
  } catch (err) {
    console.error(err);
    res.status(500).send('Error updating publication');
  }
});

// Route pour gérer la suppression de publications
app.post('/delete/:id', async (req, res) => {
  try {
    await Publication.findByIdAndDelete(req.params.id);  // Utilisation de findByIdAndDelete
    res.redirect('/');
  } catch (err) {
    console.error(err);
    res.status(500).send('Error deleting publication');
  }
});

// Route de recherche dans app.js
app.get('/search', async (req, res) => {
  const query = req.query.query;
  try {
    const publications = await Publication.find({
      $or: [
        { title: new RegExp(query, 'i') },
        { authors: new RegExp(query, 'i') },
        { year: parseInt(query) || -1 }
      ]
    });
    res.render('index', { publications });
  } catch (err) {
    console.error(err);
    res.status(500).send('Error retrieving publications');
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
