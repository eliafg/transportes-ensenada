const express = require("express");
const router = express.Router();

const mongoose = require("mongoose");
const eschema = mongoose.Schema;

const eschemaRutas = new eschema({
  idruta: String,
  origen: String,
  destino: String,
  coordenadaXYOrigen: Array,
  coordenadaXYDestino: Array,
  compañia: String,
  //lista de ptos_intermedios
  //lista de zonas
});

const ModelRutas = mongoose.model("rutasensenada", eschemaRutas);

module.exports = router;

// INSERTAR Ruta
router.post("/nuevaRuta", (req, res) => {
  const nuevaRuta = new ModelRutas({
    idruta: req.body.idruta,
    origen: req.body.origen,
    destino: req.body.destino,
    coordenadaXYOrigen: req.body.coordenadaXYOrigen,
    coordenadaXYDestino: req.body.coordenadaXYDestino,
    compañia: req.body.compañia,
        
  });
  nuevaRuta.save((err) => {
    if (!err) {
      res.send("Ruta agregada correctamente");
    } else {
      res.send("Error" + err);
    }
  });
});

// LISTAR TODAS LAS RUTAS
router.get("/Rutas", (req, res) => {
  ModelRutas.find().then((docs) => {
    res.json(docs);
  });
});
// LISTAR RUTAS por ID
router.get("/Rutas/:idruta", (req, res) => { const {idruta} = req.params
ModelRutas.findById(idruta.trim()).then((docs) => {
    res.json(docs);
   });
});
//#Edit and Update

// PARA ACTUALIZAR LAS RUTAS
router.put("/cambioRuta", (req, res) => {
  ModelRutas.findOneAndUpdate(
    { idruta: req.body.idruta },
    {
    idruta: req.body.idruta,
    origen: req.body.origen,
    destino: req.body.destino,
    coordenadaXYOrigen: req.body.coordenadaXYOrigen,
    coordenadaXYDestino: req.body.coordenadaXYDestino,
    compañia: req.body.compañia,
    }
  )
    .then(() => {
      res.json("Ruta Actualizada");
    })
    .catch((err) => {
      res.status(400).send("No fue posible actualizar la Ruta" + err);
    });

});

// Para eliminar Ruta
router.delete("/eliminarRuta/:idruta", (req, res) => { const {idruta} = req.params
  const eliminarRuta = ModelRutas.findById(idruta.trim()).then(
        (eliminarRuta, err) => {
          eliminarRuta.delete()
      if (err)
        res.json(err);

      else
        res.json("Ruta " + idruta + " Eliminada");
    }
  );
});
