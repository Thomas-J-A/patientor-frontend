import { useContext } from "react";
import { DiagnosisContext } from "../../../contexts/DiagnosisContext";
import { HospitalEntry } from "../../../types";

export interface HospitalDetailsProps {
  entry: HospitalEntry;
}

const HospitalDetails = ({ entry: e }: HospitalDetailsProps) => {
  const diagnoses = useContext(DiagnosisContext);

  return (
    <div
      style={{ border: "1px solid black", padding: "8px", marginBottom: "8px" }}
    >
      <i>{e.date}</i>
      <p>{`Type: ${e.type}`}</p>
      <p>{e.description}</p>
      {e.diagnosisCodes && (
        <ul>
          {e.diagnosisCodes.map((code) => (
            <li key={code}>{`${code}: ${
              diagnoses.find((d) => d.code === code)?.name
            }`}</li>
          ))}
        </ul>
      )}
      <p>{`Discharged on ${e.discharge.date}. ${e.discharge.criteria}`}</p>
      <p>{`Seen by: ${e.specialist}`}</p>
    </div>
  );
};

export default HospitalDetails;
