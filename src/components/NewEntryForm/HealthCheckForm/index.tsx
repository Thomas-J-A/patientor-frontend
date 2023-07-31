import { useState } from "react";
import { NewEntry, NewHealthCheckEntry } from "../../../types";

export interface HealthCheckFormProps {
  addEntry: (newEntry: NewEntry) => Promise<void>;
}

const HealthCheckForm = ({ addEntry }: HealthCheckFormProps) => {
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [specialist, setSpecialist] = useState("");
  const [diagnosisCodes, setDiagnosisCodes] = useState("");
  const [healthCheckRating, setHealthCheckRating] = useState("");

  const onSubmitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Create new entry
    const newEntry: NewHealthCheckEntry = {
      type: "HealthCheck",
      description,
      date,
      specialist,
      ...(diagnosisCodes && { diagnosisCodes: diagnosisCodes.split(", ") }), // Add field only if value is set
      healthCheckRating: Number(healthCheckRating),
    };

    // Call parent function which submits to backend
    addEntry(newEntry);

    // Reset form fields
    setDescription("");
    setDate("");
    setSpecialist("");
    setDiagnosisCodes("");
    setHealthCheckRating("");
  };

  return (
    <form onSubmit={onSubmitHandler}>
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
  );
};

export default HealthCheckForm;
