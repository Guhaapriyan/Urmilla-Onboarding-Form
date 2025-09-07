import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import StepperForm from "./pages/StepperForm";
import ThankYou from "./pages/ThankYou";

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<StepperForm />} />
          <Route path="/thank-you" element={<ThankYou />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
