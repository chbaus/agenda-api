const { response } = require("express");
const express = require("express");
const { v4: uuidv4 } = require("uuid");
const cors = require("cors");
const { logger, logger2 } = require("./middlewares");
const app = express();
const PORT = process.env.PORT || 5001;

const unknownEndPoint = (request, response) => {
  response.status(404).json({ error: "unknown endpoint" });
};
const requestLogger = (request, response, next) => {
  console.log("Method:", request.method);
  console.log("Method:", request.path);
  console.log("Method:", request.body);
  console.log("---");
  next();
};

const personas = [];

app.use(cors());
app.use(express.json());
app.use(logger2);

app.get("/", ((req, res)=>{
  res.send("<h1>Hello World</h1>");
}))

// devuelve todas las personas
app.get("/api/personas", (req, res) => {
  res.json(personas);
});

// alta persona
app.post("/api/personas", (req, res) => {
  let body = req.body;
  if (!(body.name && body.number)) {
    res.status(400).json({
      ok: false,
      message: "falta name o number",
    });
  }
  let { name, number } = body;
  const newPersona = {
    id: uuidv4(),
    name: name,
    number: number,
  };
  personas.push(newPersona);
  res.status(201).json(newPersona);
});

// delete persona
app.delete("/api/personas/:id", (req, res) => {
  let id = Number(req.params.id);
  let index = personas.findIndex((persona) => persona.id === id);
  personas.splice(index, 1);
  res.status(204).end();
});

app.get("/info", (req, res) => {
  let fecha = new Date().toTimeString();
  let cant = personas.length;
  res.send(`<p>La agenda tiene ${cant} personas</p><br><p>${fecha}</p>`);
});

// get persona por id
app.get("/api/personas/:id", (req, res) => {
  let id = req.params.id;
  //console.log(id);
  let persona = personas.find((p) => p.id === id);
  console.log(persona);

  persona ? res.json(persona) : res.status(404).end();
});

// update persona por id
app.put("/api/personas/", (req, res) => {
  const persona = req.body;
  
  let index = personas.findIndex((p) => p.id === persona.id);
  if (index != -1) {
    for (const key in persona) {
      if (Object.hasOwnProperty.call(personas[index], key)) {
        personas[index][key] = persona[key];
      }
    }

    res.status(200).json(personas[index]);
  } else {
    res.status(404).end();
  }
  res.status(400).json({ error: "bad request" });
});

// middleware para capturar cualquier url e informar 404
app.use(unknownEndPoint);

// levanto server
app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});
