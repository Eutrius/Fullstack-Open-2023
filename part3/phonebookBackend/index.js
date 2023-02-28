/* eslint-disable */

require("dotenv").config();
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const app = express();
const Person = require("./models/person");

app.use(cors());
app.use(express.static("build"));
app.use(express.json());
app.use(
  morgan((tokens, req, res) => {
    return [
      tokens.method(req, res),
      tokens.url(req, res),
      tokens.status(req, res),
      tokens.res(req, res, "content-length"),
      "-",
      tokens["response-time"](req, res),
      "ms",
      JSON.stringify(req.body),
    ].join(" ");
  })
);

let persons = [
  {
    id: 1,
    name: "Arto Hellas",
    number: "040-123456",
  },
  {
    id: 2,
    name: "Ada Lovelace",
    number: "39-44-5323523",
  },
  {
    id: 3,
    name: "Dan Abramov",
    number: "12-43-234345",
  },
  {
    id: 4,
    name: "Mary Poppendieck",
    number: "39-23-6423122",
  },
];

const errorHandler = (error, request, response, next) => {
  console.error(error.message);
  next(error);
};

app.get("/api/persons", (request, response) => {
  Person.find({}).then((person) => {
    response.json(person);
  });
});

app.get("/api/info", (request, response) => {
  response.send(
    `<div>
    <p>Phonebook has info for ${persons.length} people</p>
    <p>${new Date().toString()}</p>
    </div>`
  );
});

app.get("/api/persons/:id", (request, response) => {
  const id = Number(request.params.id);
  const person = persons.find((person) => person.id === id);
  if (person) {
    response.json(person);
  } else {
    response.status(404).end();
  }
});

app.delete("/api/persons/:id", (request, response) => {
  Person.findByIdAndRemove(request.params.id)
    .then((result) => {
      response.status(204).end();
    })
    .catch((error) => console.log(error));
});

app.post("/api/persons", (request, response) => {
  const body = request.body;

  if (!body.name || !body.number) {
    return response.status(400).json({
      error: "missing name or number",
    });
  }

  if (checkPersonsNames(body.name)) {
    return response.status(400).json({
      error: "name must be unique",
    });
  }
  const person = new Person({
    name: body.name,
    number: body.number,
  });

  person.save().then((result) => {
    console.log(`added ${result.name} number ${result.number} to phonebook`);
    response.json(result);
  });
});

app.use(errorHandler);

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

const generateId = () => {
  const maxId = 1000000;
  return Math.floor(Math.random() * maxId);
};

const checkPersonsNames = (name) => {
  return persons
    .map((person) => person.name.toLowerCase())
    .includes(name.toLowerCase());
};
