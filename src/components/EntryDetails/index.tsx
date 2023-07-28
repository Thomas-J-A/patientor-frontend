import HospitalDetails from "./HosptialDetails";
import OccupationalHealthcareDetails from "./OccupationalHealthcareDetails";
import HealthCheckDetails from "./HealthCheckDetails";
import { assertNever } from "../../utils/assertNever";
import { Entry } from "../../types";

export interface EntryDetailsProps {
  entry: Entry;
}

const EntryDetails = ({ entry }: EntryDetailsProps) => {
  switch (entry.type) {
    case "Hospital":
      return <HospitalDetails entry={entry} />;
    case "OccupationalHealthcare":
      return <OccupationalHealthcareDetails entry={entry} />;
    case "HealthCheck":
      return <HealthCheckDetails entry={entry} />;
    default:
      return assertNever(entry);
  }
};

export default EntryDetails;
