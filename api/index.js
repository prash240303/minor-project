const express = require('express');
const cors = require('cors');
const mongoose = require("mongoose");
const User = require('./models/User');
const Dataset = require('./models/Dataset');

// var admin = require("firebase-admin");
// const serviceAccount = require('../mydatasets-7a305-firebase-adminsdk-kibwx-4708d55395.json'); // Change this to your key path
const bcrypt = require('bcryptjs');
const app = express();
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const multer = require('multer');
const uploadMiddleware = multer({ dest: 'uploads/' });
const fs = require('fs');

const salt = bcrypt.genSaltSync(10);
const secret = 'asdfe45we45w345wegw345werjktjwertkj';
app.use(cors({ credentials: true, origin: 'http://localhost:3000' }));
app.use(express.json());
app.use(cookieParser());
app.use('/uploads', express.static(__dirname + '/uploads'));



// // Initialize Firebase Admin SDK
// admin.initializeApp({
//   credential: admin.credential.cert(serviceAccount),
//   storageBucket: 'mydatasets-7a305.appspot.com',
// });

// const bucket = admin.storage().bucket();

mongoose.connect('mongodb+srv://blog:0zXyrWabeG2ah6ny@cluster0.dbu5fu8.mongodb.net/?retryWrites=true&w=majority')
  .then(() => {
    console.log("DB connection successful.");
  })
  .catch((err) => {
    console.log(`DB connection error:${err}`);
  });

app.post('/register', async (req, res) => {
  const { username, password } = req.body;
  try {
    const userDoc = await User.create({
      username,
      password: bcrypt.hashSync(password, salt),
    });
    res.json(userDoc);
  } catch (e) {
    console.log(e);
    res.status(400).json(e);
  }
});

app.post('/login', async (req, res) => {
  const { username, password } = req.body;
  const userDoc = await User.findOne({ username });
  const passOk = bcrypt.compareSync(password, userDoc.password);
  if (passOk) {
    // logged in
    jwt.sign({ username, id: userDoc._id }, secret, {}, (err, token) => {
      if (err) throw err;
      res.cookie('token', token).json({
        id: userDoc._id,
        username,
      });
    });
  } else {
    res.status(400).json('wrong credentials');
  }
});

app.get('/profile', (req, res) => {
  const { token } = req.cookies;
  jwt.verify(token, secret, {}, (err, info) => {
    if (err) throw err;
    res.json(info);
  });
});

app.post('/logout', (req, res) => {
  res.cookie('token', '').json('ok');
});



// dataset 
app.post('/dataset', uploadMiddleware.fields([{ name: 'coverimage', maxCount: 1 }, { name: 'dataset', maxCount: 1 }]), async (req, res) => {
  const { coverimage, dataset } = req.files;
  
  // Handle image file
  const imageFile = coverimage[0];
  const imagePath = imageFile.path;
  const imageParts = imageFile.originalname.split('.');
  const imageExt = imageParts[imageParts.length - 1];
  const newImagePath = imagePath + '.' + imageExt;
  fs.renameSync(imagePath, newImagePath);

  // Handle dataset file
  const datasetFile = dataset[0];
  const datasetPath = datasetFile.path;
  const datasetParts = datasetFile.originalname.split('.');
  const datasetExt = datasetParts[datasetParts.length - 1];
  const newDatasetPath = datasetPath + '.' + datasetExt;
  fs.renameSync(datasetPath, newDatasetPath);

  const { token } = req.cookies;
  jwt.verify(token, secret, {}, async (err, info) => {
    if (err) throw err;
    console.log('request body', req.body)

    const { title, summary,tag,doi, content, subtitle } = req.body;
    const datasetDoc = await Dataset.create({
      title,
      summary,
      tag,
      doi,
      content,
      subtitle,
      coverimage: newImagePath, 
      dataset: newDatasetPath, 
      author: info.id,
    });
    console.log("doc:" , datasetDoc)
    res.json(datasetDoc);
  });
});

// app.post('/dataset', uploadMiddleware.fields([{ name: 'coverimage', maxCount: 1 }, { name: 'dataset', maxCount: 1 }]), async (req, res) => {
//   const { coverimage, dataset } = req.files;
  
//   // Handle image file
//   const imageFile = coverimage[0];
//   const imagePath = imageFile.path;
//   const imageParts = imageFile.originalname.split('.');
//   const imageExt = imageParts[imageParts.length - 1];
//   const newImagePath = imagePath + '.' + imageExt;

//   // Upload image to Firebase Storage
//   await bucket.upload(newImagePath, {
//     destination: `datasets/${imageFile.filename}.${imageExt}`,
//   });

//   // Handle dataset file
//   const datasetFile = dataset[0];
//   const datasetPath = datasetFile.path;
//   const datasetParts = datasetFile.originalname.split('.');
//   const datasetExt = datasetParts[datasetParts.length - 1];
//   const newDatasetPath = datasetPath + '.' + datasetExt;

//   // Upload dataset to Firebase Storage
//   await bucket.upload(newDatasetPath, {
//     destination: `datasets/${datasetFile.filename}.${datasetExt}`,
//   });

//   // Delete local files
//   fs.unlinkSync(newImagePath);
//   fs.unlinkSync(newDatasetPath);

//   const { token } = req.cookies;
//   jwt.verify(token, secret, {}, async (err, info) => {
//     if (err) throw err;

//     const { title, summary, tag, doi, content } = req.body;
//     const coverImageUrl = `datasets/${imageFile.filename}.${imageExt}`;
//     const datasetUrl = `datasets/${datasetFile.filename}.${datasetExt}`;

//     const datasetDoc = await Dataset.create({
//       title,
//       summary,
//       tag,
//       doi,
//       content,
//       coverimage: coverImageUrl,
//       dataset: datasetUrl,
//       author: info.id,
//     });

//     res.json(datasetDoc);
//   });
// });

app.get('/dataset', async (req,res) => {
  res.json(
    await Dataset.find()
      .populate('author', ['username'])
      .sort({createdAt: -1})
      .limit(20)
  );
});


app.get('/dataset/:id', async (req, res) => {
  const { id } = req.params;
  const datasetDoc = await Dataset.findById(id).populate('author', ['username']);
  res.json(datasetDoc);
})


app.listen(4000);
