const express = require("express");
const router = express.Router();

const mongoose = require("mongoose");
const eschema = mongoose.Schema;

const eschemaUser = new eschema({
  username: String,
  nombre: String,
  email: String,
  telefono: String,
  iduser: String,
});

const ModelUser = mongoose.model("user", eschemaUser);

module.exports = router;

// INSERTAR USUARIO
router.post("/NuevoUser", (req, res) => {
  const nuevoUser = new ModelUser({
    username: req.body.username,
    nombre: req.body.nombre,
    email: req.body.email,
    telefono: req.body.telefono,
    iduser: req.body.iduser,
  });
  nuevoUser.save((err) => {
    if (!err) {
      res.send("Usuario agregado");
    } else {
      res.send("Error" + err);
    }
  });
});

// LISTAR LOS USUARIOS
router.get("/User", (req, res) => {
  ModelUser.find().then((docs) => {
    res.json(docs);
  });
});

//#Editar and Actualizar

// OBTENER USUARIOS
router.post("/obtenerUser", (req, res) => {
  ModelUser.find({ iduser: req.body.iduser })
    .then((docs) => {
      res.json(docs);
    })
    .catch((err) => {
      console.log(err);
    });
});

// To Update The USER
router.post("/editarUser", (req, res) => {
  ModelUser.findOneAndUpdate(
    { iduser: req.body.iduser },
    {
      username: req.body.username,
      nombre: req.body.nombre,
      email: req.body.email,
      telefono: req.body.telefono,
    }
  )
    .then(() => {
      res.json("Usuario actualizado");
    })
    .catch((err) => {
      res.status(400).send("No fue posible guardar el usuario " + err);
    });

});

// Para Elimiar Usuario
router.post("/deleteUser", (req, res) => {
  ModelUser.findOneAndDelete({ iduser: req.body.iduser }).then(
    (user,err) => {
      if (err) res.json(err);
      else res.json("Usuario " + user + "  eliminado");
    }
  );
});