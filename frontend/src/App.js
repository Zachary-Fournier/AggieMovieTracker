import React from 'react';
import './App.css';
import { HashRouter, Route, Routes } from 'react-router-dom';
import { Navbar, NavbarBrand, NavItem, NavLink, Nav } from 'reactstrap';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import ProfilePage from './pages/ProfilePage';
import MoviePage from './pages/MoviePage';
import RegisterPage from './pages/RegisterPage';
import NewsFeedPage from './pages/NewsFeedPage';

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
            <NavItem>
              <NavLink href="/#/login">Login</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="/#/newsfeed">News Feed</NavLink>
            </NavItem>
          </Nav>
        </Navbar>
        <Routes>
          <Route exact path="/" element={<HomePage />}/>
          <Route path="/profile" element={<ProfilePage />}/>
          <Route path="/login" element={<LoginPage />}/>
          <Route path="/register" element={<RegisterPage />}/>
          <Route path="/newsfeed" element={<NewsFeedPage />}/>
          <Route path={`/movie/:movieID`} element={<MoviePage />} />
        </Routes>
      </HashRouter>
    </div>
  );
}

export default App;
