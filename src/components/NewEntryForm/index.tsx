import { useState } from "react";
import { isAxiosError } from "axios";
import Error from "../Error";
import patientService from "../../services/patients";
import { NewHealthCheckEntry, Patient } from "../../types";

export interface NewEntryFormProps {
  patientId: string;
  setDetails: React.Dispatch<React.SetStateAction<Patient | null>>;
}

const NewEntryForm = ({ patientId, setDetails }: NewEntryFormProps) => {
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [specialist, setSpecialist] = useState("");
  const [diagnosisCodes, setDiagnosisCodes] = useState("");
  const [healthCheckRating, setHealthCheckRating] = useState("");
  const [errMsg, setErrMsg] = useState<string | null>(null);

  const addEntry = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Create entry object
    const newEntry: NewHealthCheckEntry = {
      type: "HealthCheck",
      description,
      date,
      specialist,
      ...(diagnosisCodes && { diagnosisCodes: diagnosisCodes.split(", ") }), // Add field only if value is set
      healthCheckRating: Number(healthCheckRating),
    };

    // Submit to backend
    try {
      const res = await patientService.addEntry(newEntry, patientId);

      // Update local state
      setDetails((prev) =>
        prev ? { ...prev, entries: [...prev.entries, res] } : null
      );

      // Reset input fields
      setDescription("");
      setDate("");
      setSpecialist("");
      setDiagnosisCodes("");
      setHealthCheckRating("");
    } catch (err) {
      if (isAxiosError(err)) {
        setErrMsg(err.response?.data.error as string);
        setTimeout(() => setErrMsg(null), 5000);
      } else {
        setErrMsg("Unknown error occurred");
        setTimeout(() => setErrMsg(null), 5000);
      }
    }
  };

  return (
    <div
      style={{
        border: "1px dotted black",
        padding: "8px",
        marginBottom: "8px",
      }}
    >
      <h3>Add New Entry</h3>
      <form onSubmit={addEntry}>
        {errMsg && <Error msg={errMsg} />}
        <div>
          <label>
            Description:
            <input
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </label>
        </div>
        <div>
          <label>
            Date:
            <input
              type="text"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </label>
        </div>
        <div>
          <label>
            Specialist:
            <input
              type="text"
              value={specialist}
              onChange={(e) => setSpecialist(e.target.value)}
            />
          </label>
        </div>
        <div>
          <label>
            Diagnosis Codes:
            <input
              type="text"
              value={diagnosisCodes}
              onChange={(e) => setDiagnosisCodes(e.target.value)}
            />
          </label>
        </div>
        <div>
          <label>
            Health Check Rating:
            <input
              type="text"
              value={healthCheckRating}
              onChange={(e) => setHealthCheckRating(e.target.value)}
            />
          </label>
        </div>
        <button type="submit">Add Entry</button>
      </form>
    </div>
  );
};

export default NewEntryForm;
