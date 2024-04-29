import {
  NewPatient,
  Gender,
  Entry,
  Diagnosis,
  NewHealthCheckEntry,
  HealthCheckRating,
  EntryWithoutId,
  NewOccupationalHealthcareEntry,
  SickLeave,
  NewHospitalEntry,
  Discharge,
} from "./types";

const isString = (text: unknown): text is string => {
  return typeof text === "string" || text instanceof String;
};

const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

const isGender = (param: string): param is Gender => {
  return Object.values(Gender)
    .map((v) => v.toString())
    .includes(param);
};

const parseGender = (gender: unknown): Gender => {
  if (!gender || !isString(gender) || !isGender(gender)) {
    throw new Error("Incorrect or missing gender: " + gender);
  }
  return gender;
};

const parseName = (name: unknown): string => {
  if (!name || !isString(name)) {
    throw new Error("Incorrect or missing name");
  }
  return name;
};

const parseDateOfBirth = (dateOfBirth: unknown): string => {
  if (!dateOfBirth || !isString(dateOfBirth) || !isDate(dateOfBirth)) {
    throw new Error("Incorrect or missing DOB: " + dateOfBirth);
  }
  return dateOfBirth;
};

const parseOccupation = (occupation: unknown): string => {
  if (!occupation || !isString(occupation)) {
    throw new Error("Incorrect or missing occupation");
  }
  return occupation;
};

const parseSsn = (ssn: unknown): string => {
  if (!ssn || !isString(ssn)) {
    throw new Error("Incorrect or missing ssn");
  }
  return ssn;
};

const parseDiagnosisCodes = (object: unknown): Array<Diagnosis["code"]> => {
  if (!object || typeof object !== "object" || !("diagnosisCodes" in object)) {
    // we will just trust the data to be in correct form
    return [] as Array<Diagnosis["code"]>;
  }

  return object.diagnosisCodes as Array<Diagnosis["code"]>;
};

const parseDescription = (description: unknown): string => {
  if (!description || !isString(description)) {
    throw new Error("Incorrect or missing description");
  }
  return description;
};

const parseSpecialist = (specialist: unknown): string => {
  if (!specialist || !isString(specialist)) {
    throw new Error("Incorrect or missing specialist");
  }
  return specialist;
};

export const toNewPatient = (object: unknown): NewPatient => {
  if (!object || typeof object !== "object") {
    throw new Error("Incorrect or missing data");
  }

  if (
    "name" in object &&
    "dateOfBirth" in object &&
    "gender" in object &&
    "occupation" in object &&
    "ssn" in object &&
    "entries" in object
  ) {
    const newPatient: NewPatient = {
      name: parseName(object.name),
      dateOfBirth: parseDateOfBirth(object.dateOfBirth),
      gender: parseGender(object.gender),
      occupation: parseOccupation(object.occupation),
      ssn: parseSsn(object.ssn),
      entries: (object.entries as Entry[]).map((entry: Entry) => {
        return {
          ...entry,
          diagnosisCodes: parseDiagnosisCodes(entry.diagnosisCodes),
        };
      }),
    };

    return newPatient;
  }

  throw new Error("Incorrect data: some fields are missing");
};

export const toNewEntry = (object: unknown): EntryWithoutId => {
  console.log("Received object:", object);
  if (!object || typeof object !== "object") {
    throw new Error("Incorrect or missing data");
  }

  if (
    "description" in object &&
    "date" in object &&
    "specialist" in object &&
    "diagnosisCodes" in object &&
    "type" in object &&
    typeof object.type === "string"
  ) {
    const type: string = object.type;

    switch (type) {
      case "HealthCheck":
        if ("healthCheckRating" in object) {
          const newEntry: NewHealthCheckEntry = {
            description: parseDescription(object.description),
            date: parseDateOfBirth(object.date),
            specialist: parseSpecialist(object.specialist),
            diagnosisCodes: parseDiagnosisCodes(object),
            healthCheckRating: object.healthCheckRating as HealthCheckRating,
            type: "HealthCheck",
          };

          console.log("New Health Check Entry:", newEntry); // Log newEntry

          return newEntry;
        }
        // Handle the case where healthCheckRating is missing
        throw new Error(
          "Missing 'healthCheckRating' property for HealthCheck entry"
        );
      case "OccupationalHealthcare":
        if ("employerName" in object) {
          const newEntry: NewOccupationalHealthcareEntry = {
            description: parseDescription(object.description),
            date: parseDateOfBirth(object.date),
            specialist: parseSpecialist(object.specialist),
            diagnosisCodes: parseDiagnosisCodes(object),
            employerName: object.employerName as string,
            type: "OccupationalHealthcare",
          };
          // Check if sickLeave is present before including it
          if ("sickLeave" in object) {
            newEntry.sickLeave = object.sickLeave as SickLeave;
          }

          return newEntry;
        }
        // Handle the case where employerName is missing
        throw new Error(
          "Missing 'employerName' property for HealthCheck entry"
        );
      case "Hospital":
        if ("discharge" in object) {
          const newEntry: NewHospitalEntry = {
            description: parseDescription(object.description),
            date: parseDateOfBirth(object.date),
            specialist: parseSpecialist(object.specialist),
            diagnosisCodes: parseDiagnosisCodes(object),
            discharge: object.discharge as Discharge,
            type: "Hospital",
          };
          return newEntry;
        }
        throw new Error("Missing property for HealthCheck entry");
      default:
        // Handle unknown entry types
        throw new Error(`Unsupported entry type: ${type}`);
    }
  }

  throw new Error("Incorrect data: some fields are missing");
};
