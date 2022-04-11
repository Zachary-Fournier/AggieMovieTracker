import React from "react";
import './App.css';
import { HashRouter, Route, Routes } from "react-router-dom";
import { Navbar, NavbarBrand, NavItem, NavLink, Nav } from 'reactstrap';
import HomePage from "./pages/HomePage";
import ProfilePage from "./pages/ProfilePage";

function App() {

  return (
    <div className="App">
      <HashRouter basename="/">
        <Navbar expand="md">
          <NavbarBrand href="/" className="mr-auto">
            Aggie Movie Tracker
          </NavbarBrand>
          <Nav className="me-auto"
          navbar>
            <NavItem>
              <NavLink href="/#/profile">Profile</NavLink>
            </NavItem>
          </Nav>
        </Navbar>
        <Routes>
          <Route exact path="/" element={<HomePage />}/>
          <Route path="/profile" element={<ProfilePage />}/>
        </Routes>
      </HashRouter>
    </div>
  );
}

export default App;
