import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Register from "./components/Register";
import Login from "./components/Login";
import Chat from "./components/Chat"; // ✅ Import Chat

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/chat" element={<Chat />} /> {/* ✅ Chat route */}
      </Routes>
    </Router>
  );
};

export default App;
