import { useState } from "react";
import DiagnosisSelectInput from "../DiagnosisSelectInput";
import { NewEntry, NewOccupationalHealthcareEntry } from "../../../types";

export interface OccupationalHealthcareFormProps {
  addEntry: (newEntry: NewEntry) => Promise<void>;
}

const OccupationalHealthcareForm = ({
  addEntry,
}: OccupationalHealthcareFormProps) => {
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [specialist, setSpecialist] = useState("");
  const [diagnosisCodes, setDiagnosisCodes] = useState("");
  const [employerName, setEmployerName] = useState("");
  const [sickLeaveStart, setSickLeaveStart] = useState("");
  const [sickLeaveEnd, setSickLeaveEnd] = useState("");

  const onSubmitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Create new entry
    const newEntry: NewOccupationalHealthcareEntry = {
      type: "OccupationalHealthcare",
      description,
      date,
      specialist,
      ...(diagnosisCodes && { diagnosisCodes: diagnosisCodes.split(", ") }), // Add field only if value is set
      employerName,
      ...(sickLeaveStart && {
        sickLeave: { startDate: sickLeaveStart, endDate: sickLeaveEnd },
      }),
    };

    // Call parent function which submits to backend
    addEntry(newEntry);

    // Reset form fields
    setDescription("");
    setDate("");
    setSpecialist("");
    setDiagnosisCodes("");
    setEmployerName("");
    setSickLeaveStart("");
    setSickLeaveEnd("");
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
            type="date"
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
          <DiagnosisSelectInput
            state={diagnosisCodes}
            setState={setDiagnosisCodes}
          />
        </label>
      </div>
      <div>
        <label>
          Employer Name:
          <input
            type="text"
            value={employerName}
            onChange={(e) => setEmployerName(e.target.value)}
          />
        </label>
      </div>
      <div>
        <label>
          Sick Leave Start:
          <input
            type="date"
            value={sickLeaveStart}
            onChange={(e) => setSickLeaveStart(e.target.value)}
          />
        </label>
      </div>
      <div>
        <label>
          Sick Leave End:
          <input
            type="date"
            value={sickLeaveEnd}
            onChange={(e) => setSickLeaveEnd(e.target.value)}
          />
        </label>
      </div>
      <button type="submit">Add Entry</button>
    </form>
  );
};

export default OccupationalHealthcareForm;
