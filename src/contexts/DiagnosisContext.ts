import { createContext } from "react";
import { Diagnosis } from "../types";

export const DiagnosisContext = createContext<Diagnosis[]>([]);
