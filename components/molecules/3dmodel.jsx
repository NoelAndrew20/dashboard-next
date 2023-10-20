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
    const directionalLight = new THREE.DirectionalLight(0xffffff, 7);
    const rosaClaro = new THREE.Color(0xFFB6C1);
    const rosaMedio = new THREE.Color(0xFF69B4);
    const rosaOscuro = new THREE.Color(0xFF1493); 
    const materialDegradado = new THREE.MeshStandardMaterial({
      color: rosaClaro,
      emissive: rosaOscuro,
      metalness: 0.5,
      roughness: 0.7,
    });

    directionalLight.position.set(1, 1, 1);
    scene.add(directionalLight);

    renderer.setSize(canvasWidth,canvasHeight);
    renderer.setClearColor(0x000000, 0); // Establece el color a negro y la opacidad a 0
    const loader = new GLTFLoader();

    // Carga tu modelo 3D
    let mixer;
    loader.load('./3d/pig_money_box.glb', (gltf) => {
      const model = gltf.scene;
      model.scale.set(2,2,2);
      const material = new THREE.MeshBasicMaterial({ color: 0xff0000 }); // Ejemplo de material rojo
      model.traverse((node) => {
        if (node.isMesh) {
          node.material = materialDegradado;
        }
      });
      
      scene.add(model);
      mixer = new THREE.AnimationMixer(model);
      const clips = gltf.animations;
      const clip = THREE.AnimationClip.findByName(clips, 'ArmatureAction.002');
      const action = mixer.clipAction(clip);



      // Configura la posición de la cámara
      camera.position.z = 2.5;
      camera.position.y = 0.4;

      // Animación
      const clock = new THREE.Clock();
      const animate = () => {
        requestAnimationFrame(animate);
        model.rotation.y += 0.02;

        // Realiza las transformaciones y animaciones necesarias aquí
        mixer.update(clock.getDelta());
        renderer.render(scene, camera);
      };

      animate();
    });
  }, []);

  return <canvas ref={canvasRef}></canvas>;
};

export default Modelo3D;
