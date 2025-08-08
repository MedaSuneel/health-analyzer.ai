import Home from './components/Home';
import Header from './components/Header';
import SymptomForm from './components/SymptomForm'
import ReportUpload from './components/ReportUpload'
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import React, { useState } from 'react';

function App() {
  const [response, setResponse] = useState(null);

  return (
    <Router>
      <div className="min-h-screen">
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/symptom-analyzer" element={<SymptomForm setResponse={setResponse} response={response}/>} />
          <Route path="/report-analyzer" element={<ReportUpload setResponse={setResponse} response={response}/>} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
