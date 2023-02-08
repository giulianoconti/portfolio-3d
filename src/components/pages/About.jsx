import React from "react";

export const About = () => {
  return (
    <section id="about">
      <div className="about_container">
        <svg viewBox="0 0 400 500" xmlns="http://www.w3.org/2000/svg">
          <polygon className="about_polygons" points="1 16 16 1 384 1 399 16 398 84 384 100 16 100 1 84" />
          <polygon className="about_polygons" points="1 165 16 150 384 150 399 165 400 284 385 299 16 299 1 284 1 165" />
          <polygon className="about_polygons" points="1 365 16 350 384 350 399 365 399 484 384 499 16 499 1 484" />
          <polygon className="about_polygons" points="100 95 105 90 115 90 120 95 120 155 115 160 105 160 100 155" />
          <polygon className="about_polygons" points="300 95 295 90 285 90 280 95 280 155 285 160 295 160 300 155" />
          <polygon className="about_polygons" points="100 294 105 289 115 289 120 294 120 355 115 360 105 360 100 355" />
          <polygon className="about_polygons" points="280 294 285 289 295 289 300 294 300 355 295 360 285 360 280 355" />
          <image className="about_img" x="16" y="10" href="giuliano_conti.webp"></image>
          <text className="about_text_s" x="130" y="40">
            Nombre:
          </text>
          <text className="about_text_l" x="130" y="55">
            Giuliano
            <tspan x="130" dy="1em">
              Conti
            </tspan>
          </text>
          <text className="about_text_s" x="220" y="40">
            Edad:
          </text>
          <text className="about_text_l" x="220" y="55">
            21
          </text>
          <text className="about_text_s" x="290" y="40">
            Localidad:
          </text>
          <text className="about_text_l" x="290" y="55">
            Argentina,
            <tspan x="290" dy="1em">
              Resistencia
            </tspan>
          </text>
          <text className="about_text_l" x="16" y="185">
            Conocimientos:
          </text>
          <text className="about_text_s" x="16" y="204">
            React
          </text>
          <rect className="about_rect_per" x="80" y="195" width="240" height="10"></rect>
          <rect className="about_rect_mis" x="320" y="195" width="60" height="10"></rect>
          <text className="about_text_s" x="16" y="224">
            HTML
          </text>
          <rect className="about_rect_per" x="80" y="215" width="270" height="10"></rect>
          <rect className="about_rect_mis" x="350" y="215" width="30" height="10"></rect>
          <text className="about_text_s" x="16" y="244">
            CSS
          </text>
          <rect className="about_rect_per" x="80" y="235" width="255" height="10"></rect>
          <rect className="about_rect_mis" x="335" y="235" width="45" height="10"></rect>
          <text className="about_text_s" x="16" y="264">
            JavaScript
          </text>
          <rect className="about_rect_per" x="80" y="255" width="195" height="10"></rect>
          <rect className="about_rect_mis" x="275" y="255" width="105" height="10"></rect>
          <text className="about_text_l" x="16" y="385">
            Sobre mí:
          </text>
          <text className="about_text_s" x="16" y="405">
            Empecé a estudiar programación en 2021, iniciando por HTML, CSS y
            <tspan x="16" dy="1.2em">
              JavaScript.
            </tspan>
            <tspan x="16" dy="1.2em">
              Creé proyectos pequeños con arduino usando C++.
            </tspan>
            <tspan x="16" dy="1.2em">
              En el año 2022 me enfoqué en el desarrollo Front-End utilizando React.
            </tspan>
            <tspan x="16" dy="1.2em">
              Me gusta programar, diseñar en Blender, crear planos 3D en SketchUp,
            </tspan>
            <tspan x="16" dy="1.2em">
              juntarme con amigos, jugar padel, los videojuegos y andar en bici.
            </tspan>
          </text>
        </svg>
      </div>
    </section>
  );
};
