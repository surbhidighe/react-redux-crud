import React from "react";
import UserList from "./Components/UserList";
import UserDetails from "./Components/UserDetails";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<UserList/>} />
        <Route path="/user-details/:id" element={<UserDetails/>} />
      </Routes>
    </Router>
  );
};

export default App;