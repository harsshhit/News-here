import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import AllNews from "./components/AllNews";
import NewsDetails from "./components/NewsDetails";
import AdminPanel from "./pages/AdminPanel";

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<AllNews />} />
        <Route path="/news/:id" element={<NewsDetails />} />{" "}
        {/* Dynamic route */}
        <Route path="/admin" element={<AdminPanel/>} />
      </Routes>
    </Router>
  );
}

export default App;
