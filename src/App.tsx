import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomeView from "./views/HomeView";
import UserDetailsView from "./views/userDetailsView";
import "./App.css";

const App = () => {
  return (
    <Router
      future={{
        v7_startTransition: true,
        v7_relativeSplatPath: true,
      }}
    >
      <Routes>
        <Route path="/" element={<HomeView />} />
        <Route path="/details/:id" element={<UserDetailsView />} />
      </Routes>
    </Router>
  );
};

export default App;
