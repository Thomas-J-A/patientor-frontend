import { useState, useEffect } from "react";
import axios from "axios";
import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";
import { Button, Divider, Container, Typography } from "@mui/material";

import { apiBaseUrl } from "./constants";
import { Patient, Diagnosis } from "./types";

import patientService from "./services/patients";
import diagnosisService from "./services/diagnosis";
import PatientListPage from "./components/PatientListPage";
import PatientDetailsPage from "./components/PatientDetailsPage";

import { DiagnosisContext } from "./contexts/DiagnosisContext";

const App = () => {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [diagnoses, setDiagnoses] = useState<Diagnosis[]>([]);

  // Fetch initial patients list
  useEffect(() => {
    void axios.get<void>(`${apiBaseUrl}/ping`);

    const fetchPatientList = async () => {
      const patients = await patientService.getAll();
      setPatients(patients);
    };

    void fetchPatientList();
  }, []);

  // Fetch list of diagnoses
  useEffect(() => {
    const fetchDiagnosisList = async () => {
      const diagnoses = await diagnosisService.getAll();
      setDiagnoses(diagnoses);
    };

    fetchDiagnosisList();
  }, []);

  return (
    <div className="App">
      <DiagnosisContext.Provider value={diagnoses}>
        <Router>
          <Container>
            <Typography variant="h3" style={{ marginBottom: "0.5em" }}>
              Patientor
            </Typography>
            <Button component={Link} to="/" variant="contained" color="primary">
              Home
            </Button>
            <Divider hidden />
            <Routes>
              <Route
                path="/"
                element={
                  <PatientListPage
                    patients={patients}
                    setPatients={setPatients}
                  />
                }
              />
              <Route path="/patients/:id" element={<PatientDetailsPage />} />
            </Routes>
          </Container>
        </Router>
      </DiagnosisContext.Provider>
    </div>
  );
};

export default App;
