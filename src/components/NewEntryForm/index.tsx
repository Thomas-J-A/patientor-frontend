import { useState } from "react";
import { isAxiosError } from "axios";
import TabButtons from "./TabButtons";
import HealthCheckForm from "./HealthCheckForm";
import HospitalForm from "./HospitalForm";
import OccupationalHealthcareForm from "./OccupationHealthcareForm";
import Error from "../Error";
import patientService from "../../services/patients";
import { Patient, EntryTypes, NewEntry } from "../../types";

export interface NewEntryFormProps {
  patientId: string;
  setDetails: React.Dispatch<React.SetStateAction<Patient | null>>;
}

const NewEntryForm = ({ patientId, setDetails }: NewEntryFormProps) => {
  const [type, setType] = useState<EntryTypes>("HealthCheck");
  const [errMsg, setErrMsg] = useState<string | null>(null);

  const addEntry = async (newEntry: NewEntry) => {
    // Submit to backend
    try {
      const res = await patientService.addEntry(newEntry, patientId);

      // Update local state
      setDetails((prev) =>
        prev ? { ...prev, entries: [...prev.entries, res] } : null
      );
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

  // Conditionally render different form fields depending on type state
  let form: JSX.Element;

  switch (type) {
    case "HealthCheck":
      form = <HealthCheckForm addEntry={addEntry} />;
      break;
    case "OccupationHealthcare":
      form = <OccupationalHealthcareForm addEntry={addEntry} />;
      break;
    case "Hospital":
      form = <HospitalForm addEntry={addEntry} />;
      break;
  }

  return (
    <div
      style={{
        border: "1px dotted black",
        padding: "8px",
        marginBottom: "8px",
      }}
    >
      <h3>Add New Entry</h3>
      <TabButtons setType={setType} />
      {errMsg && <Error msg={errMsg} />}
      {form}
    </div>
  );
};

export default NewEntryForm;
