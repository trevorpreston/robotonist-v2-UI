import React from 'react';
import { NavLink } from 'react-router-dom';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

const Menu = props => {
  return (
    <section className={ props.menuOpen ? 'menu menu-open' : 'menu menu-close'}>
      <NavLink exact to="/" className="nav-item" activeClassName="active">configure</NavLink>
      <NavLink to="/dashboard" className="nav-item" activeClassName="active">bot dashboard</NavLink>
      <NavLink to="/plantmanager" className="nav-item" activeClassName="active">plant info</NavLink>
      <NavLink to="/profile" className="nav-item" activeClassName="active">profile</NavLink>
    </section>
  )
}

export default Menu;