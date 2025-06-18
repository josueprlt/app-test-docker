import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AccueilPage from "./pages/AccueilPage.jsx";
import TestsPage from "./pages/TestsPage.jsx";
import TestPage from "./pages/TestPage.jsx";
import { fetchTests } from './api/test/GetTests.jsx';
import { fetchAllTests } from './api/test/GetAllTests.jsx';

function App() {
  const [tests, setTests] = useState(null);
  const [allTests, setAllTests] = useState(null);

  useEffect(() => {
    fetchTests()
        .then(setTests)
        .catch((err) => console.error('Error fetching tests :', err));

    fetchAllTests()
        .then(setAllTests)
        .catch((err) => console.error('Error fetching all tests :', err));
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<AccueilPage data={tests} allData={allTests} />} />
        <Route path="/tests" element={<TestsPage data={tests} />} />
        <Route path="/test/:id" element={<TestPage />} />
      </Routes>
    </Router>
  )
}

export default App;