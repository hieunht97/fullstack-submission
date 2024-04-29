import express from "express";
import patientService from "../services/patientService";
import { toNewEntry, toNewPatient } from "../utils";

const router = express.Router();

router.get("/", (_req, res) => {
  res.send(patientService.getNonSensitivePatients());
});

router.get("/:id", (req, res) => {
  try {
    const id = req.params.id;
    const patient = patientService.getPatientById(id);
    if (!patient) {
      res.status(404).send("Patient not found");
    }
    res.send(patient);
  } catch (error: unknown) {
    let errorMessage = "Something went wrong.";
    if (error instanceof Error) {
      errorMessage += " Error: " + errorMessage;
    }
    res.status(400).send(errorMessage);
  }
});

router.post("/:id/entries/", (req, res) => {
  try {
    const newEntry = toNewEntry(req.body);
    const id = req.params.id;
    const addedEntry = patientService.addPatientEntry(id, newEntry);
    res.json(addedEntry);
  } catch (error: unknown) {
    let errorMessage = "Something went wrong.";
    if (error instanceof Error) {
      errorMessage += " Error: " + error.message;
    }
    res.status(400).send(errorMessage);
  }
});

router.post("/", (req, res) => {
  try {
    const newPatient = toNewPatient(req.body);
    const addedPatient = patientService.addPatient(newPatient);
    res.json(addedPatient);
  } catch (error: unknown) {
    let errorMessage = "Something went wrong.";
    if (error instanceof Error) {
      errorMessage += " Error: " + error.message;
    }
    res.status(400).send(errorMessage);
  }
});

export default router;
