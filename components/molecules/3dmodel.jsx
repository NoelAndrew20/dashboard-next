import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
const Modelo3D = () => {
  const containerRef = useRef();

  useEffect(() => {
    const container = containerRef.current;

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xffffff);
    const camera = new THREE.PerspectiveCamera(105, window.innerWidth / window.innerHeight, 0.1, 1000);
    const light = new THREE.DirectionalLight(0xffffff, 1);
    light.position.set(0, 100, 100);
    //scene.add(light);
    const renderer = new THREE.WebGLRenderer();

    renderer.setSize(window.innerWidth, window.innerHeight);
    container.appendChild(renderer.domElement);

    const geometry = new THREE.BoxGeometry();
    const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
    const cube = new THREE.Mesh(geometry, material);

    const loader = new GLTFLoader();
    loader.load('3d/a_farm_during_summer.glb', (gltf) => {
      const model = gltf.scene;
      scene.add(model);
      
      camera.position.z = 300;
      camera.position.x = 100;
      camera.position.y = 300;
      camera.lookAt(model.position);

      const animate = () => {
        requestAnimationFrame(animate);
  
        //model.rotation.x += 0.01;
        model.rotation.y += 0.001;
        
  
        renderer.render(scene, camera);
      };
      animate();
      
    });
    
    /*scene.add(cube);

    camera.position.z = 5;

    const animate = () => {
      requestAnimationFrame(animate);

      cube.rotation.x += 0.01;
      cube.rotation.y += 0.01;

      renderer.render(scene, camera);
    };

    animate();*/

    return () => {
      container.removeChild(renderer.domElement);
    };
  }, []);

  return <div className="fixed inset-0 bg-black bg-opacity-50 z-[-1]" ref={containerRef} />;
};

export default Modelo3D;
