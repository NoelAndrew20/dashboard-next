import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader';

const Modelo3D = () => {
  const canvasRef = useRef();

  useEffect(() => {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(20, window.innerWidth / window.innerHeight, 0.7, 100);
    const renderer = new THREE.WebGLRenderer({ canvas: canvasRef.current });
    const canvasWidth = 300; // Ancho en píxeles
    const canvasHeight = 200; // Alto en píxeles

    renderer.setSize(canvasWidth,canvasHeight);
    renderer.setClearColor(0x000000, 0); // Establece el color a negro y la opacidad a 0
    const loader = new GLTFLoader();

    // Carga tu modelo 3D
    loader.load('./3d/isometric_world.glb', (gltf) => {
      const model = gltf.scene;
      scene.add(model);

      // Configura la posición de la cámara
      camera.position.z = 5;

      // Animación
      const animate = () => {
        requestAnimationFrame(animate);
        model.rotation.y += 0.002;

        // Realiza las transformaciones y animaciones necesarias aquí

        renderer.render(scene, camera);
      };

      animate();
    });
  }, []);

  return <canvas ref={canvasRef}></canvas>;
};

export default Modelo3D;
