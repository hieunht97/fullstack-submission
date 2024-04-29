import patients from "../../data/patients";
import { v1 as uuid } from "uuid";

import {
  Patient,
  NonSensitivePatient,
  NewPatient,
  EntryWithoutId,
} from "../types";

const getPatients = (): Patient[] => {
  return patients;
};

const getPatientById = (id: string): Patient | undefined => {
  const patient = patients.find((p) => p.id === id);
  return patient;
};

const getNonSensitivePatients = (): NonSensitivePatient[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
  }));
};

const addPatient = (entry: NewPatient): Patient => {
  const newId = uuid();
  const newPatient = {
    id: newId,
    ...entry,
  };

  patients.push(newPatient);
  return newPatient;
};

const addPatientEntry = (
  id: string,
  entry: EntryWithoutId
): Patient | undefined => {
  const patientIndex = patients.findIndex((p) => p.id === id);
  if (patientIndex !== -1) {
    const newId = uuid();
    const newEntry = {
      id: newId,
      ...entry,
    };
    patients[patientIndex].entries.push(newEntry);
    return patients[patientIndex];
  }
  return undefined;
};

export default {
  getPatients,
  getNonSensitivePatients,
  addPatient,
  getPatientById,
  addPatientEntry,
};
