import express from "express";
import cors from "cors";
// import dayjs from "dayjs";
import dotenv from 'dotenv';
dotenv.config();
import { MongoClient } from "mongodb";
import joi from 'joi';

// const dayjs = require("dayjs");
const app = express();

app.use(cors());
app.use(express.json());

const mongoClient = new MongoClient(process.env.DATABASE_URL);
let db;
mongoClient.connect()
  .then(() => { db = mongoClient.db();
  }).catch((err) => console.log(err.message))

app.post("/participants", (req, res) => {
  const { name } = req.body

  const participantsSchema = joi.object({
    name: joi.string().required(),
  });

  const validation = participantsSchema.validate(name, { abortEarly: false });

  if (validation. error) {
    response.status(422).send("Todos os campos são obrigatórios!");
    return;
  }

  const nomeExiste = db.collection("participants").findOne({ name });
  if (nomeExiste) return res.sendStatus(409);

  const promise = db.collection("participants").insertOne({ name: name, lastStatus: Date.now() });
  promise.then(() => res.sendStatus(201));
  promise.catch(() => res.sendStatus(500));

  const message = db.collection("messages").insertOne({ 
    from: name, 
    to: 'Todos', 
    text: 'entra na sala...', 
    type: 'status', 
    time: 'HH:mm:ss' 
  });
})

app.get("/participants", (req, res) => {
    const participants = db.collection("/participants").find().toArray()
    if(!participants){
      participants.catch((err) => res.status(404).send([]))
    } else {
      participants.then((participants) => res.status(200).send(participants))}     
})

app.post("/messages", (req, res) => {

  
})

app.get("/messages", (req, resp) => {

  
})

app.post("/status", (req, resp) => {

  
})

const PORT = 5000;
app.listen(PORT, () => { console.log(`servidor rodando na porta ${PORT}`) });