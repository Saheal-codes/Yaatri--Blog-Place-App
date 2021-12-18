import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';

import { AuthContext } from '../../context/auth-context';
import './NavLinks.css';

const NavLinks = props => {
  const auth = useContext(AuthContext);

  return (
    <ul className="nav-links">
      <li>
        <NavLink to="/" >
          ALL USERS
        </NavLink>
      </li>
      {props.loginisvalid && (
        <li>
          <NavLink to="/u1/places">MY PLACES</NavLink>
        </li>
      )}
      {props.loginisvalid && (
        <li>
          <NavLink to="/places/new">ADD PLACE</NavLink>
        </li>
      )}
      {!props.loginisvalid && (
        <li>
          <NavLink to="/auth">LOG IN / SIGN UP</NavLink>
        </li>
      )}
      {props.loginisvalid && (
        <li>
          <button onClick={props.logout}>LOGOUT</button>
        </li>
      )}
    </ul>
  );
};

export default NavLinks;
