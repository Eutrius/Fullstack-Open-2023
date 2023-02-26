const mongoose = require("mongoose");

const args = process.argv.length;

if (args < 3) {
  printUsage();
}

const password = process.argv[2];

const url = `mongodb+srv://eutrius:${password}@cluster0.pqy0x9f.mongodb.net/Phonebook?retryWrites=true&w=majority`;

mongoose.set("strictQuery", false);
mongoose.connect(url);

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
});

const Person = mongoose.model("Person", personSchema);

if (args === 3) {
  Person.find({}).then((person) => {
    console.log(person);
    mongoose.connection.close();

    process.exit(1);
  });
} else if (args === 5) {
  const person = new Person({
    name: process.argv[3],
    number: process.argv[4],
  });

  person.save().then((result) => {
    console.log(`added ${result.name} number ${result.number} to phonebook`);
    mongoose.connection.close();
  });
} else printUsage();

function printUsage() {
  console.log(`Usage:
    node mongo.js <password>  To display all entires in the Phonebook
    node mongo.js <password> <name> <number>  To add a new entry to the Phonebook`);
  process.exit(1);
}
