import express from "express";
import diagnosisRouter from "./routes/diagnosis";
import patientRouter from "./routes/patients";
// import cors from "cors";

const app = express();

// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
const cors = require("cors");

// eslint-disable-next-line @typescript-eslint/no-unsafe-call
app.use(cors());
app.use(express.json());

const PORT = 3000;

app.get("/api/ping", (_req, res) => {
  console.log("someone pinged here");
  res.send("pong");
});

app.use("/api/diagnoses", diagnosisRouter);

app.use("/api/patients", patientRouter);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
