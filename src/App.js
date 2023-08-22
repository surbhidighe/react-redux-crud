import React from "react";
import UserList from "./Components/UserList";
import UserDetails from "./Components/UserDetails";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

const App = () => {
  return (
    <div className="p-5">
    <Router>
      <Routes>
        <Route path="/" element={<UserList/>} />
        <Route path="/user-details/:id" element={<UserDetails/>} />
      </Routes>
    </Router>
    </div>
  );
};

export default App;
