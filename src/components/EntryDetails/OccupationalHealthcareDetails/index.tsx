import { useContext } from "react";
import { DiagnosisContext } from "../../../contexts/DiagnosisContext";
import { OccupationalHealthcareEntry } from "../../../types";

export interface OccupationalHealthcareDetailsProps {
  entry: OccupationalHealthcareEntry;
}

const OccupationalHealthcareDetails = ({
  entry: e,
}: OccupationalHealthcareDetailsProps) => {
  const diagnoses = useContext(DiagnosisContext);

  return (
    <div
      style={{ border: "1px solid black", padding: "8px", marginBottom: "8px" }}
    >
      <i>{e.date}</i>
      <p>{`Type: ${e.type}`}</p>
      <p>{`Employer Name: ${e.employerName}`}</p>
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
      {e.sickLeave && (
        <>
          <p>{`Sick leave started: ${e.sickLeave.startDate}`}</p>
          <p>{`Sick leave ended: ${e.sickLeave.endDate}`}</p>
        </>
      )}
      <p>{`Seen by: ${e.specialist}`}</p>
    </div>
  );
};

export default OccupationalHealthcareDetails;
