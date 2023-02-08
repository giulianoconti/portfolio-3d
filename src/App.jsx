import React, { Suspense, useEffect, useRef, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { PerspectiveCamera } from "@react-three/drei";
import useWindowDimensions from "./hooks/useWindowDimensions";
import { Model } from "./components/models/Model";
import { Contact } from "./components/pages/Contact";
import { Projects } from "./components/pages/Projects";
import { About } from "./components/pages/About";
import { Home } from "./components/pages/Home";
import { Navbar } from "./components/ui/Navbar";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader";
import { Loading } from "./components/pages/Loading";

export const App = () => {
  const { height, width } = useWindowDimensions();
  const [loadingModel, setLoadingModel] = useState(true);
  const cameraRef = useRef();
  const lightRef = useRef();
  let lastScrollTop = 0;

  // wait for model to load
  useEffect(() => {
    const dracoLoader = new DRACOLoader();
    dracoLoader.setDecoderPath("draco/");
    const gltfLoader = new GLTFLoader();
    gltfLoader.setDRACOLoader(dracoLoader);
    gltfLoader.load("Model.glb", () => {
      setLoadingModel(false);
    });
  }, []);

  // scroll event
  useEffect(() => {
    goTo("Home");
    if (width <= 1100 && cameraRef.current) {
      cameraRef.current.position.z = 0;
    } else if (width > 1100 && cameraRef.current) {
      cameraRef.current.position.z = -10;
    }
    const handleScroll = () => {
      if (cameraRef.current) {
        const scrollY = window.pageYOffset || document.documentElement.scrollTop;
        const scrollYAverage = scrollY / height;
        lightRef.current.position.z = 10 - scrollYAverage * 60;
        if (width <= 1100) {
          cameraRef.current.position.z = -scrollYAverage * 60;

          if (scrollYAverage < 1.52) {
            cameraRef.current.position.x = 20;
            cameraRef.current.position.y = 35;
          } else if (scrollYAverage < 2.52) {
            cameraRef.current.position.x = width - width / 1.03 < 15 ? width - width / 1.03 : 15;
            cameraRef.current.position.y = 15;
          } else if (scrollYAverage < 3.52) {
            cameraRef.current.position.x = 25;
            cameraRef.current.position.y = 25;
          }
          lastScrollTop = scrollY <= 0 ? 0 : scrollY;
        } else {
          cameraRef.current.position.z = -10 - scrollYAverage * 60;
        }
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [height, width]);

  // move to the previous or next section
  const prevOrNextSection = (e) => {
    const scrollY = window.pageYOffset;
    const scrollYAverage = scrollY / height;
    if (e.deltaY < 0) {
      // scroll up code
      if (scrollYAverage < 1.52) {
        goTo("Home");
      } else if (scrollYAverage >= 1.52 && scrollYAverage < 2.52) {
        goTo("About");
      } else if (scrollYAverage >= 2.52) {
        goTo("Projects");
      }
    } else {
      // scroll down code
      if (scrollYAverage < 0.52) {
        goTo("About");
      } else if (scrollYAverage >= 0.52 && scrollYAverage < 1.52) {
        goTo("Projects");
      } else if (scrollYAverage >= 1.52) {
        goTo("Contact");
      }
    }
  };

  // navigate to a certain section
  const goTo = (idSection) => {
    const navLink = document.getElementById(`goTo${idSection}`);
    navLink?.click();
  };

  if (loadingModel) {
    return <Loading />;
  }

  return (
    <div onWheel={prevOrNextSection}>
      <Navbar />
      <Home />
      <About />
      <Projects />
      <Contact />
      <section id="order_contact" />

      <Canvas
        style={{
          bottom: "0",
          position: "fixed",
          height: "100%",
          zIndex: "2",
        }}
        shadows
      >
        <PerspectiveCamera
          makeDefault
          position={width > 1100 ? [15, 25, -10] : [20, 35, 0]}
          rotation={width > 1100 ? [0.5, 2.4, -0.35] : [0, 1.5707, 0]}
          fov={85}
          near={0.01}
          ref={cameraRef}
        />
        <Suspense fallback={null}>
          <Model />
          {/*    <OrbitControls /> */}
        </Suspense>
        <ambientLight intensity={0.2} color="rgb(250, 230, 210)" />
        <pointLight
          intensity={0.8}
          position={[30, 60, 10]}
          shadow-mapSize-width={2024}
          shadow-mapSize-height={2024}
          castShadow
          color="rgb(200, 180, 160)"
          ref={lightRef}
        />
      </Canvas>
    </div>
  );
};
