import React from 'react';
import { NavLink } from 'react-router-dom';

const Menu = props => {
  return (
    <section className="menu">
      <NavLink className="nav-item" to="/">configure</NavLink>
      <NavLink className="nav-item" to="/dashboard">bot dashboard</NavLink>
      <NavLink className="nav-item" to="/plantmanager">plant info</NavLink>
      <NavLink className="nav-item" to="/profile">profile</NavLink>
    </section>
  )
}

export default Menu;