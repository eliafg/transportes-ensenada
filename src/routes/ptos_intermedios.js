const express = require("express");
const router = express.Router();

const mongoose = require("mongoose");
const eschema = mongoose.Schema;

const eschemaPto_Intermedio = new eschema({
  idPto_Intermedio: String,
  coordenadaXY: Array,
  nombrePto_Intermedio: String,
  idruta: String,
  idzona: String,
});

const ModelPto_Intermedio = mongoose.model("pto_intermedio", eschemaPto_Intermedio);

module.exports = router;

// INSERTAR Punto Intermedio
router.post("/nuevoPto_Intermedio", (req, res) => {
  const nuevoPto_Intermedio = new ModelPto_Intermedio({
    idPto_Intermedio: req.body.idPto_Intermedio,
    coordenadaXY: req.body.coordenadaXY,
    nombrePto_Intermedio: req.body.nombrePto_Intermedio,
    idruta: req.body.idruta,
    idzona: req.body.idzona,
  });
  nuevoPto_Intermedio.save((err) => {
    if (!err) {
      res.send("Punto Intermedio agregado");
    } else {
      res.send("Error" + err);
    }
  });
});

// LISTAR TODOS LOS PUNTOS INTERMEDIOS
router.get("/Puntos_Intermedios", (req, res) => {
  ModelPto_Intermedio.find().then((docs) => {
    res.json(docs);
  });
});
// LISTAR LOS PUNTOS INTERMEDIOS x ID
router.get("/Puntos_Intermedios/:idPto_Intermedio", (req, res) => { const {idPto_Intermedio} = req.params
ModelPto_Intermedio.findById(idPto_Intermedio.trim()).then((docs) => {
    res.json(docs);
   });
});
//#Edit and Update


// PARA ACTUALIZAR LoS PUNTOS INTERMEDIOS
router.post("/editarPto_Intermedio", (req, res) => {
  ModelPto_Intermedio.findOneAndUpdate(
    { idPto_Intermedio: req.body.idPto_Intermedio },
    {
        coordenadaXY: req.body.coordenadaXY,
        nombrePto_Intermedio: req.body.nombrePto_Intermedio,
        idPto_Intermedio: req.body.idPto_Intermedio,
    }
  )
    .then(() => {
      res.json("Punto Intermedio Actualizado");
    })
    .catch((err) => {
      res.status(400).send("No fue posible actualizar el Punto Intermedio" + err);
    });

});

// Para eliminar PUNTO INTERMEDIO
router.delete("/eliminarPto_Intermedio/:idPto_Intermedio", (req, res) => { const {idPto_Intermedio} = req.params
  const eliminarPunto = ModelPto_Intermedio.findById(idPto_Intermedio.trim()).then(
        (eliminarPunto, err) => {
          eliminarPunto.delete()
          console.log
      if (err)
        res.json(err);

      else
        res.json("Punto Intermedio " + idPto_Intermedio + " Eliminado");
    }
  );
});