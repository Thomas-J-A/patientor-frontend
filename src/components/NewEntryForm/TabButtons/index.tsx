import { EntryTypes } from "../../../types";

export interface TabButtonsProps {
  setType: React.Dispatch<React.SetStateAction<EntryTypes>>;
}

const TabButtons = ({ setType }: TabButtonsProps) => {
  return (
    <div>
      <button type="button" onClick={() => setType("HealthCheck")}>
        Health Check
      </button>
      <button type="button" onClick={() => setType("OccupationHealthcare")}>
        Occupational Healthcare
      </button>
      <button type="button" onClick={() => setType("Hospital")}>
        Hospital
      </button>
    </div>
  );
};

export default TabButtons;
