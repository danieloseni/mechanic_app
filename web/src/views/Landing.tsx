import React from 'react'
import { Link } from 'react-router-dom'
import CarMaintenance from 'images/car-maintenance.png';
import Tools from 'svg/tools.svg';
import Handshake from 'svg/handshake.svg';
import TowTruck from 'svg/towtruck.svg';
import CarFix from 'images/carfix.png';
import Think from 'images/think.png';
import ContactBg from 'images/contact-bg.png';
import LandingNavbar from 'layouts/LandingNavbar';
interface Props { }

const Landing = (props: Props) => {
  return (
    <div className="main montserrat">

      <LandingNavbar />

      <div className="hero main-pd2 main-mg">
        <div className="hero-section">
          <div className="title">
            Automobile Repair Services
          </div>

          <div className="description">
            Avoid costly repairs with preventive maintenance. Eliminate all inconvienience and frustration in a bid to locate a mechanic. Our certified technicians will handle your automoblie.
          </div>

          <a href='/dashboard' className="cta">Get Started</a>
        </div>

        <div className="hero-section">

          <div className="artwork">
            <img src={CarMaintenance} alt="" />
          </div>
        </div>
      </div>

      <div className="service-cards main-pd2">
        <div className="service-card pointer" onClick = {e => {
         window.location.href="/book-appointment"
          }}>
          <div className="icon"><object data={Tools} aria-label="tools" /></div>

          <div className="title">
            Preventive Maintenance
          </div>

          <div className="description">
            We provide scheduled maintenance for your vehcle to keep it in top condition.
          </div>
        </div>

        <div className="service-card">
          <div className="icon"><object data={Handshake} aria-label="tools" /></div>

          <div className="title">
            Find a Mechanic
          </div>

          <div className="description">
            Fixit will help you find expert mechanics in close proximity to you when your car breaks down.
          </div>
        </div>

        <div className="service-card">
          <div className="icon"><object data={TowTruck} aria-label="tools" /></div>

          <div className="title">
            Towing service available
          </div>

          <div className="description">
            We offer timely towing service when your run into car trouble so you can get on with your day.
          </div>
        </div>
      </div>

      <div className="info-box main-pd2">
        <div className="title">About Us</div>

        <div className="sections">
          <div className="info-section">
            <div className="artwork">
              <img src={CarFix} alt="" />
            </div>
          </div>

          <div className="info-section">
            <p>Our organization is committed in earning your trust by providing the right expertises you and your automobile require. </p>

            <p>Our top goal is aiding our customers with a convinient way of getting help during a breakdown, we provide locations of mechanics in close proximity to you and this is done very speedily.</p>

          </div>
        </div>
      </div>

      <div className="info-box main-pd2" >
        <div className="title">Frequently Asked Questions</div>

        <div className="sections">
          <div className="info-section">
            <p>Not every car owner is fully versed with the inter workings of their vehicle, that is why we have provided a very easy solution. </p>

            <p>Our Frequently Asked Question (FAQs) module has both questions and answers to some of the elementary problems a vehicle can run into. This will help you a customer to troubleshoot your car yourself and completely avoid that trip to the mechanic you really didn’t want to make. </p>

            <p>
              <Link to="/faq" className="cta">Go to FAQs <i className="fal fa-arrow-right"></i></Link>
            </p>


          </div>

          <div className="info-section">
            <div className="artwork">
              <img src={Think} alt="" />
            </div>
          </div>

        </div>
      </div>

      <div className="contact-section main-pd2" style={{
        background: `url(${ContactBg})`
      }}>
        <div className="contact-box">
          <div className="heading">
            Book a Service Time
          </div>
          <div className="contact-details">
            Call +(234) 818 3458 213 for a free estimate and join our clientel
          </div>

          <div className="contact-form">
            <input type="text" placeholder='Email Address' />
            <button>
              Sign Up
            </button>
          </div>

        </div>
      </div>

      <footer className='main-pd2'>
        <div className="section">
          <div className="logo">FIxit</div>

          <div className='flex align-items-center'>
            <ul className="nav-links">
              <li><Link to="/privacy-policy">Privacy Policy</Link></li>
              <li><Link to="/terms">Terms</Link></li>
            </ul>

            <div className="socials">
              <div className="social">
                <i className="fab fa-instagram"></i>
              </div>

              <div className="social">
                <i className="fab fa-twitter"></i>
              </div>
            </div>
          </div>
        </div>
        <div className="section">


          <ul className="nav-links">
            <li className='pointer' onClick= {e => {
              //@ts-ignore
              window.showTowServiceModal?.()
            }}>Tow Service</li>
            <li><Link to="/vehicles">Get a Mechanic</Link></li>
            <li className='pointer' onClick= {e => {
              //@ts-ignore
              window.showContactModal?.()
            }}>Contact us</li>
          </ul>

          <div className="copyright">
            © 2022 Fixit Repairsl. All rights reserved.
          </div>

        </div>

      </footer>


    </div>
  )
}

export default Landing