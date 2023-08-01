import { useContext, useMemo } from "react";
import { DiagnosisContext } from "../../../contexts/DiagnosisContext";

export interface DiagnosisSelectInputProps {
  state: string;
  setState: React.Dispatch<React.SetStateAction<string>>;
}

const DiagnosisSelectInput = ({
  state,
  setState,
}: DiagnosisSelectInputProps) => {
  const diagnoses = useContext(DiagnosisContext);

  const codes = useMemo(() => diagnoses.map((d) => d.code), [diagnoses]);

  const onChangeHandler = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setState(e.target.value);
  };

  return (
    <select value={state} onChange={onChangeHandler}>
      <option value="">--- Choose a code ---</option>
      {codes.map((c) => (
        <option key={c} value={c}>
          {c}
        </option>
      ))}
    </select>
  );
};

export default DiagnosisSelectInput;
