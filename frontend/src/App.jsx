import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AccueilPage from "./pages/AccueilPage";
import TestPage from "./pages/TestPage";

function App() {
  const [data, setData] = useState(null);
  const [allData, setAllData] = useState(null);

  useEffect(() => {
    fetch('http://localhost:5001/api/tests')
      .then(response => response.json())
      .then(data => setData(data))
      .catch(error => console.error('Error fetching tests:', error));

    fetch('http://localhost:5001/api/tests/all')
      .then(response => response.json())
      .then(data => setAllData(data))
      .catch(error => console.error('Error fetching all tests:', error));
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<AccueilPage data={data} allData={allData} />} />
        <Route path="/test/:id" element={<TestPage />} />
      </Routes>
    </Router>
  )
}

export default App;