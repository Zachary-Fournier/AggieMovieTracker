import React, { useEffect, useState } from 'react';
import './App.css';
import { HashRouter, Route, Routes, useNavigate } from 'react-router-dom';
import { Navbar, NavbarBrand, NavItem, NavLink, Nav } from 'reactstrap';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import ProfilePage from './pages/ProfilePage';
import MoviePage from './pages/MoviePage';
import RegisterPage from './pages/RegisterPage';
import NewsFeedPage from './pages/NewsFeedPage';

function App() {

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  /**
   * check to see if user is logged in, if it is, then show profile page
   */
  useEffect(() => {
    if(localStorage.getItem('userInfo')) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
    console.log(isLoggedIn)
  }, [localStorage.getItem('userInfo')]);

  return (
    <div className="App">
      <HashRouter basename="/">
        <Navbar expand="md">
          <NavbarBrand href="/" className="mr-auto">
            Aggie Movie Tracker
          </NavbarBrand>
          <Nav className="me-auto"
          navbar>
            {isLoggedIn ?
            <>
              <NavItem>
                <NavLink href="/#/profile">Profile</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="/#/newsfeed">News Feed</NavLink>
              </NavItem>
            </>
            :
            <NavItem>
              <NavLink href="/#/login">Login</NavLink>
            </NavItem>
            }
          </Nav>
        </Navbar>
        <Routes>
          <Route exact path="/" element={<HomePage />}/>
          {isLoggedIn ? 
            <>
              <Route path="/newsfeed" element={<NewsFeedPage />}/>
              <Route path={`/movie/:movieID`} element={<MoviePage />} />
              <Route path="/profile" element={<ProfilePage />}/>
            </>
          :
            <>
              <Route path="/login" element={<LoginPage />}/>
              <Route path="/register" element={<RegisterPage />}/>
            </>
          }
        </Routes>
      </HashRouter>
    </div>
  );
}

export default App;
