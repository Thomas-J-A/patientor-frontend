import { useContext } from "react";
import { DiagnosisContext } from "../../../contexts/DiagnosisContext";
import { HealthCheckEntry } from "../../../types";

export interface HealthCheckDetailsProps {
  entry: HealthCheckEntry;
}

const HealthCheckDetails = ({ entry: e }: HealthCheckDetailsProps) => {
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
      <p>{`Health rating (0 = Healthy, 3 = Dying): ${e.healthCheckRating}`}</p>
      <p>{`Seen by: ${e.specialist}`}</p>
    </div>
  );
};

export default HealthCheckDetails;
