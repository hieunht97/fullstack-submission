const mongoose = require("mongoose");

if (process.argv.length < 3) {
  console.log("give password as argument");
  process.exit(1);
}

// const password = process.argv[2];

const url =
  "mongodb+srv://fullstack:hieuvi20@fullstack.hnar4w1.mongodb.net/testNoteApp?retryWrites=true&w=majority";

mongoose.set("strictQuery", false);
mongoose.connect(url);

const noteSchema = new mongoose.Schema({
  content: String,
  important: Boolean,
});

const Note = mongoose.model("Note", noteSchema);

// const note = new Note({
//   content: "HTML is easy",
//   important: true,
// });

// const note2 = new Note({
//   content: "JavaScript is also easy",
//   important: true,
// });

// note.save().then(() => {
//   console.log("note saved!");
//   mongoose.connection.close();
// });

// note2.save().then(() => {
//   console.log("note 2 saved!");
//   mongoose.connection.close();
// });

// Note.find({}).then((result) => {
//   result.forEach((note) => {
//     console.log(note);
//   });
//   mongoose.connection.close();
// });

const main = async () => {
  const note = await new Note({
    content: "HTML is easy",
    important: true,
  });
  const note2 = await new Note({
    content: "JS is fun",
    important: true,
  });

  await note.save();
  await note2.save();

  const notes = await Note.find({});
  console.log("returned nodes", notes);

  // const response = await notes[0].deleteOne();
  // console.log("deleted first note");
  mongoose.connection.close();
};

main();
