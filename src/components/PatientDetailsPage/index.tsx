import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { isAxiosError } from "axios";
import patientService from "../../services/patients";
import { Patient } from "../../types";

const PatientDetailsPage = () => {
  const [details, setDetails] = useState<Patient | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const { id } = useParams();

  useEffect(() => {
    try {
      const fetchDetails = async () => {
        const patient = await patientService.getSingle(id as string);
        setDetails(patient);
      };

      fetchDetails();
    } catch (e: unknown) {
      if (isAxiosError(e)) {
        if (e?.response?.data && typeof e?.response?.data === "string") {
          const message = e.response.data.replace(
            "Something went wrong. Error: ",
            ""
          );
          console.error(message);
          setError(message);
        } else {
          setError("Unrecognized axios error");
        }
      } else {
        console.error("Unknown error", e);
        setError("Unknown error");
      }
    } finally {
      setIsLoading(false);
    }
  }, [id]);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div>
      <h2>{details?.name}</h2>
      <p>{`Name: ${details?.name}`}</p>
      <p>{`Gender: ${details?.gender}`}</p>
      <p>{`DOB: ${details?.dateOfBirth}`}</p>
      <p>{`Occupation: ${details?.occupation}`}</p>
      <p>{`SSN: ${details?.ssn}`}</p>
    </div>
  );
};

export default PatientDetailsPage;
