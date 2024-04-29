import diagnosis from "../../data/diagnosis";

import { Diagnosis } from "../types";

const getEntries = (): Diagnosis[] => {
  return diagnosis;
};

export default { getEntries };
