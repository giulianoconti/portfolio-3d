import React, { useEffect, useRef } from "react";
import { useGLTF, useAnimations, Html } from "@react-three/drei";
import useWindowDimensions from "../../hooks/useWindowDimensions";
import { ProjectsTv } from "./htmlInModels/ProjectsTv";

export function Model(props) {
  const { width } = useWindowDimensions();
  const group = useRef();
  const screenRef = useRef();
  const socialRef = {
    githubRef: useRef(),
    linkedinRef: useRef(),
    instagramRef: useRef(),
  };
  const { nodes, materials, animations } = useGLTF("/Model.glb");
  const { actions } = useAnimations(animations, group);

  const tvScreenAction = () => {
    const screen = screenRef.current;
    screen.material.map.offset.y = 0;
    for (let i = 0; i < 400; i++) {
      setTimeout(() => {
        if (i >= 0 * 2 && i <= 9 * 2) {
          screen.material.map.offset.y += 0.01 / 2;
        } else if (i >= 31 * 2 && i <= 40 * 2) {
          screen.material.map.offset.y += 0.0185 / 2;
        } else if (i >= 75 * 2 && i <= 110 * 2) {
          screen.material.map.offset.y += 0.00930555555 / 2;
        } else if (i >= 140 * 2 && i <= 169 * 2) {
          screen.material.map.offset.y -= 0.02 / 2;
        } else if (i === 170 * 2) {
          screen.material.map.offset.y = 0;
        }
        if (i === 399 && width > 1100) {
          tvScreenAction();
        }
      }, i * 20);
    }
  };

  useEffect(() => {
    actions.idle.play();
    if (width > 1100) {
      tvScreenAction();
    }
    const handleHashChange = () => {
      const navLinks = document.querySelectorAll(".nav_link");
      navLinks.forEach((navLink) => {
        if (navLink.hash === window.location.hash) {
          navLink.classList.add("active");
          if (width > 1100 && navLink.hash === "#about") {
            setTimeout(() => {
              handleAnimations(["paddle_ball_ac", "paddle_ac", "paddle_grip_ac", "paddle_arm_ac"]);
            }, 500);
          }
        } else {
          navLink.classList.remove("active");
        }
      });
    };
    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

  const handleCursorEnter = () => {
    document.body.style.cursor = "pointer";
  };

  const handleCursorLeave = () => {
    document.body.style.cursor = "default";
  };

  const handleAnimations = (elementsToAnimate = []) => {
    for (let i = 0; i < elementsToAnimate.length; i++) {
      if (!actions[elementsToAnimate[i]].isRunning()) {
        actions[elementsToAnimate[i]].play();
        setTimeout(() => {
          actions[elementsToAnimate[i]].stop();
        }, actions[elementsToAnimate[i]]._clip.duration * 1000 || 800);
      }
    }
  };

  const handleColorEnter = (socialHover) => {
    handleCursorEnter();
    if (socialHover === "instagram") {
      handleAnimations(["instagram1_ac"]);
      socialRef.instagramRef.current.material = materials.instagram_hover;
    } else if (socialHover === "github") {
      handleAnimations(["github1_ac"]);
      socialRef.githubRef.current.material = materials.github_hover;
    } else if (socialHover === "linkedin") {
      handleAnimations(["linkedin1_ac"]);
      socialRef.linkedinRef.current.material = materials.linkedin_hover;
    }
  };

  const handleColorLeave = () => {
    handleCursorLeave();
    socialRef.instagramRef.current.material = materials.instagram;
    socialRef.githubRef.current.material = materials.github;
    socialRef.linkedinRef.current.material = materials.linkedin;
  };

  return (
    <group ref={group} {...props} dispose={null}>
      <group name="Scene">
        <group name="armature" position={[-2, -12, -1.5]} rotation={[1.5708, 0, -1.5708]}>
          <primitive object={nodes.hipsBone} />
          <skinnedMesh name="arm_l" geometry={nodes.arm_l.geometry} material={materials.skin} skeleton={nodes.arm_l.skeleton} />
          <skinnedMesh name="arm_r" geometry={nodes.arm_r.geometry} material={materials.skin} skeleton={nodes.arm_r.skeleton} />
          <skinnedMesh name="chest" geometry={nodes.chest.geometry} material={materials.t_shirt} skeleton={nodes.chest.skeleton} />
          <skinnedMesh name="pants_b_r" geometry={nodes.pants_b_r.geometry} material={materials.pants} skeleton={nodes.pants_b_r.skeleton} />
          <group name="head">
            <skinnedMesh name="head_1" geometry={nodes.head_1.geometry} material={materials.hair} skeleton={nodes.head_1.skeleton} />
            <skinnedMesh name="head_2" geometry={nodes.head_2.geometry} material={materials.skin} skeleton={nodes.head_2.skeleton} />
          </group>
          <skinnedMesh name="leg_l" geometry={nodes.leg_l.geometry} material={materials.skin} skeleton={nodes.leg_l.skeleton} />
          <skinnedMesh name="leg_r" geometry={nodes.leg_r.geometry} material={materials.skin} skeleton={nodes.leg_r.skeleton} />
          <skinnedMesh name="pants_b_l" geometry={nodes.pants_b_l.geometry} material={materials.pants} skeleton={nodes.pants_b_l.skeleton} />
          <skinnedMesh name="pants_l" geometry={nodes.pants_l.geometry} material={materials.pants} skeleton={nodes.pants_l.skeleton} />
          <skinnedMesh name="shoe_b_l" geometry={nodes.shoe_b_l.geometry} material={materials.sneakers2} skeleton={nodes.shoe_b_l.skeleton} />
          <skinnedMesh name="pants_r" geometry={nodes.pants_r.geometry} material={materials.pants} skeleton={nodes.pants_r.skeleton} />
          <skinnedMesh name="shoe_l" geometry={nodes.shoe_l.geometry} material={materials.sneakers1} skeleton={nodes.shoe_l.skeleton} />
          <skinnedMesh name="shoulder_l" geometry={nodes.shoulder_l.geometry} material={materials.t_shirt} skeleton={nodes.shoulder_l.skeleton} />
          <skinnedMesh name="shoe_b_r" geometry={nodes.shoe_b_r.geometry} material={materials.sneakers2} skeleton={nodes.shoe_b_r.skeleton} />
          <skinnedMesh name="sock_l" geometry={nodes.sock_l.geometry} material={materials.socks} skeleton={nodes.sock_l.skeleton} />
          <skinnedMesh name="sock_r" geometry={nodes.sock_r.geometry} material={materials.socks} skeleton={nodes.sock_r.skeleton} />
          <skinnedMesh name="shoe_r" geometry={nodes.shoe_r.geometry} material={materials.sneakers1} skeleton={nodes.shoe_r.skeleton} />
          <skinnedMesh name="shoulder_r" geometry={nodes.shoulder_r.geometry} material={materials.t_shirt} skeleton={nodes.shoulder_r.skeleton} />
          <skinnedMesh name="throat" geometry={nodes.throat.geometry} material={materials.skin} skeleton={nodes.throat.skeleton} />
        </group>
        <mesh name="desk_leg4" castShadow geometry={nodes.desk_leg4.geometry} material={materials.cream} position={[-12.59, 3.39, 12.54]} />
        <mesh name="desk_leg2" castShadow geometry={nodes.desk_leg2.geometry} material={materials.cream} position={[-5.1, 3.39, 12.54]} />
        <mesh name="desk_table" castShadow geometry={nodes.desk_table.geometry} material={materials.white} position={[-8.95, 7.08, 0.01]} />
        <mesh name="chair_leg3" castShadow geometry={nodes.chair_leg3.geometry} material={materials.cream} position={[-1.8, 2.32, -1.64]} />
        <mesh name="chair_leg2" castShadow geometry={nodes.chair_leg2.geometry} material={materials.cream} position={[1.26, 2.32, 1.64]} />
        <mesh name="keyboard" castShadow geometry={nodes.keyboard.geometry} material={materials.black} position={[-6.67, 7.64, 2.17]} rotation={[0, 0.16, 0]} />
        <mesh name="desk_leg3" castShadow geometry={nodes.desk_leg3.geometry} material={materials.cream} position={[-12.59, 3.39, -12.45]} />
        <mesh name="chair_leg4" castShadow geometry={nodes.chair_leg4.geometry} material={materials.cream} position={[-1.8, 2.32, 1.64]} />
        <mesh name="chair_leg1" castShadow geometry={nodes.chair_leg1.geometry} material={materials.cream} position={[1.26, 2.32, -1.64]} />
        <mesh name="desk_leg1" castShadow geometry={nodes.desk_leg1.geometry} material={materials.cream} position={[-5.1, 3.39, -12.45]} />
        <group name="glass" position={[-7.49, 8.41, -7.66]}>
          <mesh name="glass_1" castShadow geometry={nodes.glass_1.geometry} material={materials.gray} />
          <mesh name="glass_2" castShadow geometry={nodes.glass_2.geometry} material={materials.light_blue} />
        </group>
        <group name="phone" position={[-6.2, 7.61, -9.23]} rotation={[0, -0.82, 0]}>
          <mesh name="phone_1" castShadow geometry={nodes.phone_1.geometry} material={materials.black} />
          <mesh name="phone_2" castShadow geometry={nodes.phone_2.geometry} material={materials.black_light} />
        </group>
        <mesh name="monitor_stand" castShadow geometry={nodes.monitor_stand.geometry} material={materials.black} position={[-12.37, 11.31, 6.99]} />
        <mesh name="chair" castShadow geometry={nodes.chair.geometry} material={materials.white} position={[0.61, 6.89, -0.05]} />
        <mesh name="shelf2" castShadow geometry={nodes.shelf2.geometry} material={materials.white} position={[-13.06, 15.82, -68.02]} />
        <mesh name="carpet" receiveShadow geometry={nodes.carpet.geometry} material={materials.black_light} position={[0.36, 0.15, 0]} />
        <group name="speaker" position={[-11.33, 7.99, -9.61]} rotation={[0, 0, 0.1]}>
          <mesh name="speaker_1" castShadow geometry={nodes.speaker_1.geometry} material={materials.black_light} />
          <mesh name="speaker_2" castShadow geometry={nodes.speaker_2.geometry} material={materials.black} />
          <mesh name="speaker_3" castShadow geometry={nodes.speaker_3.geometry} material={materials.gray} />
        </group>
        <mesh name="shelf5" castShadow geometry={nodes.shelf5.geometry} material={materials.white} position={[-13.06, 25.67, -60.58]} />
        <mesh name="shelf3" castShadow geometry={nodes.shelf3.geometry} material={materials.white} position={[-13.06, 22.32, -68.43]} />
        <group name="background" position={[11.34, 25.76, -101.76]}>
          <mesh name="background_1" receiveShadow geometry={nodes.background_1.geometry} material={materials.bg} />
          <mesh name="background_2" receiveShadow geometry={nodes.background_2.geometry} material={materials.floor} />
        </group>
        <group name="bahiut" position={[-9.25, 5.02, -60]}>
          <mesh name="bahiut_1" castShadow geometry={nodes.bahiut_1.geometry} material={materials.brown} />
          <mesh name="bahiut_2" castShadow geometry={nodes.bahiut_2.geometry} material={materials.brown_dark} />
          <mesh name="bahiut_3" castShadow geometry={nodes.bahiut_3.geometry} material={materials.red} />
        </group>
        <mesh name="shelf1" castShadow geometry={nodes.shelf1.geometry} material={materials.white} position={[-13.06, 13.22, -53.2]} />
        <mesh name="shelf4" castShadow geometry={nodes.shelf4.geometry} material={materials.white} position={[-13.06, 22.32, -52.73]} />
        <group name="speaker_subwoofer" position={[-9.4, 9.58, -11.72]}>
          <mesh name="speaker_subwoofer_1" castShadow geometry={nodes.speaker_subwoofer_1.geometry} material={materials.black_light} />
          <mesh name="speaker_subwoofer_2" castShadow geometry={nodes.speaker_subwoofer_2.geometry} material={materials.black} />
        </group>
        <mesh name="html1" castShadow geometry={nodes.html1.geometry} material={materials.white} position={[-13.59, 23.5, -52.76]} rotation={[-1.5708, 1.4, 1.5708]} />
        <mesh
          name="html2"
          castShadow
          geometry={nodes.html2.geometry}
          material={materials.orange}
          position={[-13.86, 23.54, -52.79]}
          rotation={[-1.5708, 1.4, 1.5708]}
          onClick={() => handleAnimations(["html1_ac", "html2_ac"])}
          onPointerEnter={handleCursorEnter}
          onPointerLeave={handleCursorLeave}
        />
        <mesh
          name="react1"
          castShadow
          geometry={nodes.react1.geometry}
          material={materials.react}
          position={[-12.35, 28.76, -58.94]}
          rotation={[-1.47, -0.12, 1.44]}
          onClick={() => handleAnimations(["react2_ac"])}
          onPointerEnter={handleCursorEnter}
          onPointerLeave={handleCursorLeave}
        />
        <mesh name="react2" castShadow geometry={nodes.react2.geometry} material={materials.react} position={[-12.35, 28.76, -58.93]} rotation={[-0.56, 0.3, 2.92]} />
        <mesh name="js1" castShadow geometry={nodes.js1.geometry} material={materials.jsblack} position={[-13.23, 27.49, -64.28]} rotation={[1.57, 0.11, -1.5708]} />
        <mesh
          name="js2"
          castShadow
          geometry={nodes.js2.geometry}
          material={materials.jsyellow}
          position={[-13.82, 28.06, -63.69]}
          rotation={[0, 0, 0.11]}
          onClick={() => handleAnimations(["js1_ac", "js2_ac"])}
          onPointerEnter={handleCursorEnter}
          onPointerLeave={handleCursorLeave}
        />
        <mesh name="tailwind1" castShadow geometry={nodes.tailwind1.geometry} material={materials.tailwind} position={[-13.45, 22.7, -66.26]} rotation={[-0.03, 0.89, -1.38]} />
        <mesh
          name="tailwind2"
          castShadow
          geometry={nodes.tailwind2.geometry}
          material={materials.white}
          position={[-13.49, 22.66, -66.22]}
          rotation={[-0.03, 0.89, 0.19]}
          onClick={() => handleAnimations(["tailwind1_ac", "tailwind2_ac"])}
          onPointerEnter={handleCursorEnter}
          onPointerLeave={handleCursorLeave}
        />
        <mesh name="css1" castShadow geometry={nodes.css1.geometry} material={materials.white} position={[-13.33, 23.59, -68.48]} rotation={[-1.5708, 1.25, 1.5708]} />
        <mesh
          name="css2"
          castShadow
          geometry={nodes.css2.geometry}
          material={materials.blue}
          position={[-13.62, 23.54, -68.31]}
          rotation={[-1.5708, 1.25, 1.5708]}
          onClick={() => handleAnimations(["css1_ac", "css2_ac"])}
          onPointerEnter={handleCursorEnter}
          onPointerLeave={handleCursorLeave}
        />
        <mesh name="bootstrap1" castShadow geometry={nodes.bootstrap1.geometry} material={materials.white} position={[-13.4, 22.46, -70.53]} rotation={[1.44, 0.12, -0.72]} />
        <mesh
          name="bootstrap2"
          castShadow
          geometry={nodes.bootstrap2.geometry}
          material={materials.bootstrap}
          position={[-13.64, 22.42, -70.61]}
          rotation={[1.44, 0.12, -0.72]}
          onClick={() => handleAnimations(["bootstrap1_ac", "bootstrap2_ac"])}
          onPointerEnter={handleCursorEnter}
          onPointerLeave={handleCursorLeave}
        />
        <mesh
          name="cube"
          castShadow
          geometry={nodes.cube.geometry}
          material={materials.cubecolor}
          position={[-12.6, 16.88, -69.88]}
          rotation={[0.8, -0.59, 0.32]}
          onClick={() => handleAnimations(["cube_ac"])}
          onPointerEnter={handleCursorEnter}
          onPointerLeave={handleCursorLeave}
        />
        <group name="frame_me" position={[-14.07, 20.37, -60.65]}>
          <mesh name="frame_me_1" castShadow geometry={nodes.frame_me_1.geometry} material={materials.brown_dark} />
          <mesh
            name="frame_me_2"
            castShadow
            geometry={nodes.frame_me_2.geometry}
            material={materials.mecut}
            onClick={() => handleAnimations(["frame_me_ac"])}
            onPointerEnter={handleCursorEnter}
            onPointerLeave={handleCursorLeave}
          />
        </group>
        <mesh name="paddle_ball" castShadow geometry={nodes.paddle_ball.geometry} material={materials.green} position={[-13.31, 17.03, -54.21]} rotation={[0.22, -0.05, 0.03]} />
        <mesh
          name="paddle"
          castShadow
          geometry={nodes.paddle.geometry}
          material={materials.black}
          position={[-13.34, 17.27, -54.52]}
          rotation={[-0.23, -0.03, 0.5]}
          onClick={() => handleAnimations(["paddle_ball_ac", "paddle_ac", "paddle_grip_ac", "paddle_arm_ac"])}
          onPointerEnter={handleCursorEnter}
          onPointerLeave={handleCursorLeave}
        />
        <mesh name="paddle_grip" castShadow geometry={nodes.paddle_grip.geometry} material={materials.black} position={[-13.93, 16.62, -54.81]} rotation={[0.15, -0.33, -0.76]} />
        <mesh name="head2f" castShadow geometry={nodes.head2f.geometry} material={materials.skin} position={[-13.06, 15.97, -55.15]} rotation={[1.92, 0, 1.5708]} />
        <mesh
          name="head2"
          castShadow
          geometry={nodes.head2.geometry}
          material={materials.hair}
          position={[-13.11, 16.32, -55.34]}
          rotation={[1.92, 0, 1.5708]}
          onClick={() => handleAnimations(["paddle_ball_ac", "paddle_ac", "paddle_grip_ac", "paddle_arm_ac"])}
          onPointerEnter={handleCursorEnter}
          onPointerLeave={handleCursorLeave}
        />
        <mesh name="throat2" castShadow geometry={nodes.throat2.geometry} material={materials.skin} position={[-13.06, 15.62, -55.27]} rotation={[1.92, 0, 1.5708]} />
        <mesh
          name="chest2"
          castShadow
          geometry={nodes.chest2.geometry}
          material={materials.t_shirt}
          position={[-13.05, 14.93, -55.25]}
          rotation={[1.92, 0, 1.5708]}
          onClick={() => handleAnimations(["paddle_ball_ac", "paddle_ac", "paddle_grip_ac", "paddle_arm_ac"])}
          onPointerEnter={handleCursorEnter}
          onPointerLeave={handleCursorLeave}
        />
        <mesh name="shoulder_r2" castShadow geometry={nodes.shoulder_r2.geometry} material={materials.t_shirt} position={[-13.64, 15.52, -55.27]} rotation={[0.67, -0.8, 0.6]} />
        <mesh name="shoulder_l2" castShadow geometry={nodes.shoulder_l2.geometry} material={materials.t_shirt} position={[-12.43, 15.22, -55.33]} rotation={[2.15, -0.93, 2.13]} />
        <mesh name="paddle_arm_r" castShadow geometry={nodes.paddle_arm_r.geometry} material={materials.skin} position={[-13.9, 16.29, -55]} rotation={[0.67, -0.8, 0.6]} />
        <mesh name="arm_l2" castShadow geometry={nodes.arm_l2.geometry} material={materials.skin} position={[-11.99, 14.48, -55.37]} rotation={[2.15, -0.93, 2.13]} />
        <mesh name="pants_r2" castShadow geometry={nodes.pants_r2.geometry} material={materials.pants} position={[-13.27, 13.99, -55.19]} rotation={[1.92, 0, 1.5708]} />
        <mesh name="pants_l2" castShadow geometry={nodes.pants_l2.geometry} material={materials.pants} position={[-12.77, 14.01, -55.25]} rotation={[1.92, 0, 1.5708]} />
        <mesh name="pants_b_l2" castShadow geometry={nodes.pants_b_l2.geometry} material={materials.pants} position={[-12.72, 13.35, -55.23]} rotation={[1.92, 0, 1.5708]} />
        <mesh name="pants_b_r2" castShadow geometry={nodes.pants_b_r2.geometry} material={materials.pants} position={[-13.28, 13.34, -55.15]} rotation={[1.92, 0, 1.5708]} />
        <mesh name="leg_r2" castShadow geometry={nodes.leg_r2.geometry} material={materials.skin} position={[-13.29, 13.21, -55.15]} rotation={[1.92, 0, 1.5708]} />
        <mesh name="leg_l2" castShadow geometry={nodes.leg_l2.geometry} material={materials.skin} position={[-12.71, 13.23, -55.22]} rotation={[1.92, 0, 1.5708]} />
        <mesh name="sock_r2" castShadow geometry={nodes.sock_r2.geometry} material={materials.socks} position={[-13.31, 12.98, -55.14]} rotation={[1.92, 0, 1.5708]} />
        <mesh name="sock_l2" castShadow geometry={nodes.sock_l2.geometry} material={materials.socks} position={[-12.68, 13, -55.22]} rotation={[1.92, 0, 1.5708]} />
        <mesh name="shoe_r2" castShadow geometry={nodes.shoe_r2.geometry} material={materials.sneakers1} position={[-13.32, 12.82, -55.07]} rotation={[1.92, 0, 1.5708]} />
        <mesh name="shoe_l22" castShadow geometry={nodes.shoe_l22.geometry} material={materials.sneakers2} position={[-12.55, 12.77, -54.99]} rotation={[1.92, 0, 1.5708]} />
        <mesh name="shoe_l2" castShadow geometry={nodes.shoe_l2.geometry} material={materials.sneakers1} position={[-12.64, 12.83, -55.16]} rotation={[1.92, 0, 1.5708]} />
        <mesh name="shoe_r22" castShadow geometry={nodes.shoe_r22.geometry} material={materials.sneakers2} position={[-13.37, 12.75, -54.89]} rotation={[1.92, 0, 1.5708]} />
        <mesh name="leaf" castShadow geometry={nodes.leaf.geometry} material={materials["leaf material"]} position={[-9.2, 8.08, -77.6]} rotation={[1.35, -0.18, 0.68]} />
        <mesh name="leaf1" castShadow geometry={nodes.leaf1.geometry} material={materials["leaf material"]} position={[-11.35, 7.79, -73.49]} rotation={[1.85, 0.08, -2.87]} />
        <mesh name="leaf4" castShadow geometry={nodes.leaf4.geometry} material={materials["leaf material"]} position={[-9.24, 7.63, -74.9]} rotation={[1.7, -0.26, 2.06]} />
        <mesh name="leaf2" castShadow geometry={nodes.leaf2.geometry} material={materials["leaf material"]} position={[-11.86, 8.39, -77.76]} rotation={[1.31, 0.12, -0.43]} />
        <mesh name="dirt" castShadow geometry={nodes.dirt.geometry} material={materials.coconut} position={[-10.94, 5.9, -75.8]} rotation={[0, 1.1, 0]} />
        <mesh name="kalash" castShadow geometry={nodes.kalash.geometry} material={materials.kalash} position={[-10.96, 3.81, -75.74]} rotation={[0, 1.1, 0]} />
        <mesh name="leaf3" castShadow geometry={nodes.leaf3.geometry} material={materials["leaf material"]} position={[-12.85, 8.2, -75.36]} rotation={[1.63, 0.28, -1.78]} />
        <mesh name="sofa3" castShadow geometry={nodes.sofa3.geometry} material={materials.black} position={[16.67, 6.17, -126.52]} rotation={[0, -1.5708, 0]} />
        <mesh name="coconut" castShadow geometry={nodes.coconut.geometry} material={materials.coconut} position={[-10.95, 7.44, -75.78]} rotation={[0, 1.1, 0]} />
        <mesh name="sofa6" castShadow geometry={nodes.sofa6.geometry} material={materials.black} position={[19.54, 9.68, -119.64]} rotation={[1.5708, 0, 1.5708]} />
        <mesh name="sofa" castShadow geometry={nodes.sofa.geometry} material={materials.black_light} position={[19.19, 5.05, -119.63]} rotation={[0, -1.5708, 0]} />
        <mesh name="sofa7" castShadow geometry={nodes.sofa7.geometry} material={materials.black} position={[19.54, 9.68, -109.97]} rotation={[1.5708, 0, 1.5708]} />
        <mesh name="tv" castShadow geometry={nodes.tv.geometry} material={materials.black} position={[-13.24, 16.21, -119.75]} rotation={[1.5708, 0, -1.5708]} />
        <mesh name="sofa1" castShadow geometry={nodes.sofa1.geometry} material={materials.black} position={[15.73, 8.07, -133.77]} rotation={[0.05, 0, 0.07]} />
        <mesh name="speaker2" castShadow geometry={nodes.speaker2.geometry} material={materials.gray} position={[-13.8, 6.6, -120.4]} rotation={[1.5708, 0, 0]} />
        <mesh name="sofa5" castShadow geometry={nodes.sofa5.geometry} material={materials.black} position={[19.54, 9.68, -129.3]} rotation={[1.5708, 0, 1.5708]} />
        <mesh name="tv_screen" castShadow geometry={nodes.tv_screen.geometry} material={materials.white} position={[-13.02, 16.34, -120.02]} rotation={[1.5708, 0, -1.5708]}>
          <Html
            transform
            center
            occlude
            position={[0, 0.01, 0]}
            style={{
              backgroundColor: "white",
              width: "960px",
              height: "530px",
              overflow: "auto",
            }}
            rotation={[-1.5708, 0, 0]}
          >
            <ProjectsTv />
          </Html>
        </mesh>
        <mesh name="table_tv_legs" castShadow geometry={nodes.table_tv_legs.geometry} material={materials.white} position={[-11.35, 0.32, -119.92]} rotation={[0, 1.57, 0]} />
        <mesh name="cup_water" castShadow geometry={nodes.cup_water.geometry} material={materials.cafe} position={[3.49, 6.08, -116.3]} rotation={[0, 1.57, 0]} />
        <mesh name="speaker1" castShadow geometry={nodes.speaker1.geometry} material={materials.black} position={[-13.37, 6.6, -119.96]} rotation={[1.5708, 0, 0]} />
        <mesh name="sofa4" castShadow geometry={nodes.sofa4.geometry} material={materials.black} position={[16.67, 6.17, -112.64]} rotation={[0, -1.5708, 0]} />
        <mesh name="table_mini" castShadow geometry={nodes.table_mini.geometry} material={materials.gray} position={[4.1, 2.67, -122.73]} rotation={[1.5708, 0, -0.96]} />
        <mesh
          name="table_mini_drawer"
          castShadow
          geometry={nodes.table_mini_drawer.geometry}
          material={materials.jsblack}
          position={[4.04, 2.68, -123.62]}
          rotation={[1.5708, 0, -0.96]}
        />
        <mesh name="sofa2" castShadow geometry={nodes.sofa2.geometry} material={materials.black} position={[15.83, 8.07, -105.45]} rotation={[-0.05, 0, -0.07]} />
        <mesh
          name="table_mini_circle"
          castShadow
          geometry={nodes.table_mini_circle.geometry}
          material={materials.brown_dark}
          position={[4.1, 2.67, -122.73]}
          rotation={[1.5708, 0, -0.96]}
        />
        <mesh name="control_tv" castShadow geometry={nodes.control_tv.geometry} material={materials.black} position={[2.66, 5.2, -123.91]} rotation={[-Math.PI, 1.22, -Math.PI]} />
        <mesh name="cup2" castShadow geometry={nodes.cup2.geometry} material={materials.black} position={[3.67, 5.68, -116.09]} rotation={[1.5708, 0, 0.87]} />
        <mesh name="table_tv" castShadow geometry={nodes.table_tv.geometry} material={materials.black_light} position={[-9.31, 2.4, -120.06]} />
        <mesh name="instagram1" castShadow geometry={nodes.instagram1.geometry} material={materials.white} position={[-3.06, 3.54, -184.75]} rotation={[0, 0.76, 0]} />
        <mesh
          name="instagram2"
          castShadow
          geometry={nodes.instagram2.geometry}
          material={materials.instagram}
          position={[-3.07, 1.72, -184.52]}
          rotation={[3.14, 0.8, 1.57]}
          ref={socialRef.instagramRef}
          onClick={() => window.open("https://www.instagram.com/giulianocontii/", "_blank")}
          onPointerEnter={() => handleColorEnter("instagram")}
          onPointerLeave={handleColorLeave}
        />
        <mesh name="github1" castShadow geometry={nodes.github1.geometry} material={materials.white} position={[-9.58, 14.6, -179.74]} rotation={[1.5708, 0, -1.5708]} />
        <mesh
          name="github2"
          castShadow
          geometry={nodes.github2.geometry}
          material={materials.github}
          position={[-12.1, 14.79, -180.05]}
          rotation={[-Math.PI, 0, -Math.PI]}
          ref={socialRef.githubRef}
          onClick={() => window.open("https://github.com/giulianoconti", "_blank")}
          onPointerEnter={() => handleColorEnter("github")}
          onPointerLeave={handleColorLeave}
        />
        <mesh name="linkedin1" castShadow geometry={nodes.linkedin1.geometry} material={materials.white} position={[-9.72, 11.82, -193.16]} rotation={[1.5708, 0.27, -1.5708]} />
        <mesh
          name="linkedin2"
          castShadow
          geometry={nodes.linkedin2.geometry}
          material={materials.linkedin}
          position={[-11.81, 11.23, -193.18]}
          rotation={[-Math.PI, 0, 2.87]}
          ref={socialRef.linkedinRef}
          onClick={() => window.open("https://www.linkedin.com/in/giulianoconti/", "_blank")}
          onPointerEnter={() => handleColorEnter("linkedin")}
          onPointerLeave={handleColorLeave}
        />
        <group name="box1" position={[0.17, 4.51, -166.83]}>
          <mesh name="box1_1" castShadow geometry={nodes.box1_1.geometry} material={materials.box1} />
          <mesh name="box1_2" castShadow geometry={nodes.box1_2.geometry} material={materials.box2} />
        </group>
        <group name="box2" position={[-7.74, 6.39, -166.83]}>
          <mesh name="box2_1" castShadow geometry={nodes.box2_1.geometry} material={materials.box1} />
          <mesh name="box2_2" castShadow geometry={nodes.box2_2.geometry} material={materials.box2} />
        </group>
        <group name="box3" position={[-9.34, 12.33, -165.85]} rotation={[0, -0.45, 0]}>
          <mesh name="box3_1" castShadow geometry={nodes.box3_1.geometry} material={materials.box1} />
          <mesh name="box3_2" castShadow geometry={nodes.box3_2.geometry} material={materials.box2} />
        </group>
        <group name="box5" position={[-6.51, 6.39, -192.93]}>
          <mesh name="box5_1" castShadow geometry={nodes.box5_1.geometry} material={materials.box1} />
          <mesh name="box5_2" castShadow geometry={nodes.box5_2.geometry} material={materials.box2} />
        </group>
        <group name="box6" position={[-7.74, 8.63, -203.86]}>
          <mesh name="box6_1" castShadow geometry={nodes.box6_1.geometry} material={materials.box1} />
          <mesh name="box6_2" castShadow geometry={nodes.box6_2.geometry} material={materials.box2} />
          <mesh name="box6_3" castShadow geometry={nodes.box6_3.geometry} material={materials.github_hover} />
          <mesh name="box6_4" castShadow geometry={nodes.box6_4.geometry} material={materials.linkedin_hover} />
          <mesh name="box6_5" castShadow geometry={nodes.box6_5.geometry} material={materials.instagram_hover} />
        </group>
        <group name="box7" position={[-7.74, 16.73, -203.72]}>
          <mesh name="box7_1" castShadow geometry={nodes.box7_1.geometry} material={materials.box1} />
          <mesh name="box7_2" castShadow geometry={nodes.box7_2.geometry} material={materials.box2} />
        </group>

        <group name="box4" position={[-11.85, 8.63, -179.71]}>
          <mesh name="box4_1" castShadow geometry={nodes.box4_1.geometry} material={materials.box1} />
          <mesh name="box4_2" castShadow geometry={nodes.box4_2.geometry} material={materials.box2} />
        </group>
        <mesh name="cup" castShadow geometry={nodes.cup.geometry} material={materials.black} position={[3.67, 5.68, -116.09]} rotation={[1.5708, 0, 0.87]} />
        <group name="monitor2" position={[-7.75, 12.93, 10.87]} rotation={[0, 0.68, 0.14]}>
          <mesh name="monitor2_1" castShadow geometry={nodes.monitor2_1.geometry} material={materials.black} />
          <mesh name="monitor2_2" castShadow geometry={nodes.monitor2_2.geometry} material={materials.dsBG} />
        </group>
        <group name="monitor1" position={[-11.78, 12.93, 0.03]} rotation={[0, 0, 0.14]}>
          <mesh name="monitor1_1" castShadow geometry={nodes.monitor1_1.geometry} material={materials.black} />
          <mesh name="monitor1_2" castShadow geometry={nodes.monitor1_2.geometry} material={materials.codeBGLeft} />
          <mesh name="monitor1_3" castShadow geometry={nodes.monitor1_3.geometry} material={materials.codeBGRight} ref={screenRef} />
        </group>
        <group name="frame5" position={[1.63, 15.33, -102.2]} rotation={[1.5708, 0, 3.14]}>
          <mesh name="frame5_1" castShadow geometry={nodes.frame5_1.geometry} material={materials.city} />
          <mesh name="frame5_2" castShadow geometry={nodes.frame5_2.geometry} material={materials.black} />
        </group>

        <group name="frame2" position={[-14.09, 25.12, 0.01]}>
          <mesh name="frame2_1" castShadow geometry={nodes.frame2_1.geometry} material={materials.black} />
          <mesh name="frame2_2" castShadow geometry={nodes.frame2_2.geometry} material={materials.mountains} />
        </group>
        <group name="frame1" position={[-14.09, 25.12, 6.4]}>
          <mesh name="frame1_1" castShadow geometry={nodes.frame1_1.geometry} material={materials.black} />
          <mesh name="frame1_2" castShadow geometry={nodes.frame1_2.geometry} material={materials.mountains} />
        </group>
        <group name="frame3" position={[-14.09, 25.12, -6.3]}>
          <mesh name="frame3_1" castShadow geometry={nodes.frame3_1.geometry} material={materials.black} />
          <mesh name="frame3_2" castShadow geometry={nodes.frame3_2.geometry} material={materials.mountains} />
        </group>
      </group>
    </group>
  );
}

useGLTF.preload("/Model.glb");
