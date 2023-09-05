import React from 'react';
import { RiProductHuntLine } from "react-icons/ri";
import { Link } from "react-router-dom";
import './home.scss'
import heroImg from "../../asset/header2.jpg";
import { ShowOnLogin, ShowOnLogout } from '../../component/protect/Hiddenlinks';
import Card from '../../component/card/Card';

const Home = () => {
  return (
      <div className="home">
        <nav className="container --flex-between ">
          <div className="logo">
            <RiProductHuntLine size={50} />
          </div>
  
          <ul className="home-links">
            <ShowOnLogout>
              <li>
                <Link to="/register">Register</Link>
              </li>
              </ShowOnLogout>
              <ShowOnLogout>
              <li>
                <button className="--btn --btn-primary">
                  <Link to="/login">Login</Link>
                </button>
              </li>
              </ShowOnLogout>
           
           <ShowOnLogin>
              <li>
                <button className="--btn --btn-primary">
                  <Link to="/dashboard">Dashboard</Link>
                </button>
              </li>
              </ShowOnLogin>
          </ul>
        </nav>
        {/* HERO SECTION */}
        <section className="container hero">
          <div className="hero-text">
            <h2>Teachers  Dashboard</h2>
            <p>
              Student Inventory system to control and manage Day to day schedule and office duties.
            </p>
            <div className="hero-buttons">
              <button className="--btn --btn-secondary">
                <Link to="/dashboard">Free Trial 3 Month</Link>
              </button>
            </div>
          
          </div>
        <Card>
          <div className="hero-image">
            <img src={heroImg} alt="Inventory" />
          </div>
          </Card>
        </section>
      </div>
    );
  
}

export default Home