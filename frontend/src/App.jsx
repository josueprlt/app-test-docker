import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AccueilPage from "./pages/AccueilPage";
import TestPage from "./pages/TestPage";

function App() {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch('http://localhost:5001/api/tests')
      .then(response => response.json())
      .then(data => setData(data))
      .catch(error => console.error('Error fetching tests:', error));
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<AccueilPage data={data} />} />
        <Route path="/test/:id" element={<TestPage />} />
      </Routes>
    </Router>
  )
}

export default App;