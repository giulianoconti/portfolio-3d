import React from "react";

export const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="nav_container">
        <a className="nav_link" href="#home">
          <img className="nav_logo" src="/favicon.svg" alt="logo" />
        </a>
        <ul className="nav_list">
          <li className="nav_item">
            <a className="nav_link" id="goToHome" href="#home">
              INICIO
            </a>
          </li>
          <li className="nav_item">
            <a className="nav_link" id="goToAbout" href="#about">
              SOBRE MI
            </a>
          </li>
          <li className="nav_item">
            <a className="nav_link" id="goToProjects" href="#projects">
              PROYECTOS
            </a>
          </li>
          <li className="nav_item">
            <a className="nav_link" id="goToContact" href="#contact">
              CONTACTO
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
};
