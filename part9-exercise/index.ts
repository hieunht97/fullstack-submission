import express from "express";
import { calculateBmi } from "./bmiCalculator";
import { calculateExercises } from "./exerciseCalculator";

const app = express();

app.use(express.json());

app.get("/hello", (_req, res) => {
  res.send("Hello Full Stack!");
});

app.get("/bmi", (req, res) => {
  const height = Number(req.query.height);
  const weight = Number(req.query.weight);

  if (isNaN(height) || isNaN(weight) || height <= 0 || weight <= 0) {
    return res.status(400).json({ error: "malformatted parameters" });
  }

  const bmiResult = calculateBmi(height, weight);
  return res.json(bmiResult);
});

app.post("/exercise", (req, res) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { daily_exercises, target } = req.body;

  if (!daily_exercises || !target) {
    return res.status(400).send({ error: "parameters missing" });
  } else if (
    !Array.isArray(daily_exercises) ||
    !daily_exercises.every((day) => typeof day === "number") ||
    isNaN(Number(target))
  ) {
    return res.status(400).send({ error: "malformatted parameters" });
  }

  const result = calculateExercises(
    daily_exercises as number[],
    Number(target)
  );

  return res.send({ result });
});

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
