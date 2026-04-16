import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import Courses from "./pages/Courses";
import DetailsPage from './pages/DetailsPage';

function App() {
  return (
    <Router basename="/coursea">
      <div className="h-screen w-full ">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/courses" element={<Courses />} />
          <Route path="/details" element={<DetailsPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
