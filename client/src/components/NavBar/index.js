import React from 'react';
import { Link } from 'react-router-dom'

function NavBar(props) {
  return (
    <div>
      <div className="navbar-fixed">
        <nav>
          <div className="nav-wrapper blue" style={{ paddingLeft: 10, opacity: 0.9 }}>
            <Link className="brand-logo" to='/'>
              Traveler
          </Link>
            <ul className="right hide-on-med-and-down">
              <li>
                <Link to="/profile">
                  Profile
              </Link>
              </li>
              <li>
                <Link to="/">
                  Feed
              </Link>
              </li>
              <li>
                <Link to='/discover'>
                  Discover
            </Link>
              </li>

              <li>
                <a onClick={props.logout}>Logout</a>
              </li>
            </ul>
          </div>
        </nav>
      </div>
    </div >
  )
}

export default NavBar