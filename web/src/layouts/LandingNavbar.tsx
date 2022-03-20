import React from 'react'
import { NavLink } from 'react-router-dom'

interface Props {

}

const LandingNavbar = (props: Props) => {
  return (
    <div className="landing-header main-pd2">
      <div className="logo">
        Fixit
      </div>

      <div className="dropdown-button">
        <i className="fal fa-bars"></i>
      </div>

      <ul className="nav-links">
        <li>
          <NavLink to="/" >Home</NavLink>
        </li>
        <li>
          <NavLink to="/about">About us</NavLink>
        </li>
        <li>
          <NavLink to="/faq">FAQs</NavLink>
        </li>
        <li>
          <NavLink to="/services">Services</NavLink>
        </li>
      </ul>

      <a href='/dashboard' className="cta">Get Started</a>
    </div>
  )
}

export default LandingNavbar
