import { useState } from "react";
import { NewEntry, NewHospitalEntry } from "../../../types";

export interface HospitalFormProps {
  addEntry: (newEntry: NewEntry) => Promise<void>;
}

const HospitalForm = ({ addEntry }: HospitalFormProps) => {
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [specialist, setSpecialist] = useState("");
  const [diagnosisCodes, setDiagnosisCodes] = useState("");
  const [dischargeDate, setDischargeDate] = useState("");
  const [dischargeCriteria, setDischargeCriteria] = useState("");

  const onSubmitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Create new entry
    const newEntry: NewHospitalEntry = {
      type: "Hospital",
      description,
      date,
      specialist,
      ...(diagnosisCodes && { diagnosisCodes: diagnosisCodes.split(", ") }), // Add field only if value is set
      discharge: {
        date: dischargeDate,
        criteria: dischargeCriteria,
      },
    };

    // Call parent function which submits to backend
    addEntry(newEntry);

    // Reset form fields
    setDescription("");
    setDate("");
    setSpecialist("");
    setDiagnosisCodes("");
    setDischargeDate("");
    setDischargeCriteria("");
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
          Discharge Date:
          <input
            type="text"
            value={dischargeDate}
            onChange={(e) => setDischargeDate(e.target.value)}
          />
        </label>
      </div>
      <div>
        <label>
          Discharge Criteria:
          <input
            type="text"
            value={dischargeCriteria}
            onChange={(e) => setDischargeCriteria(e.target.value)}
          />
        </label>
      </div>
      <button type="submit">Add Entry</button>
    </form>
  );
};

export default HospitalForm;
