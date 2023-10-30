import React, { useEffect } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';


const ThreeModel = () => {


    const scene = new THREE.Scene();
    const loader = new GLTFLoader();
    const rotationSpeed = 0.002;
    const radius = 70; 
    let angle = 0; 
    const modelURL = '../../3d/Cuarentenanobase.glb';
    const light = new THREE.AmbientLight( 0x404040,80 );
    const modelURL1 = '../../3d/Engordanobase.glb';
    const modelURL2 = '../../3d/MaternidadyGestacionnobase.glb';
      
    let model,model1,model2;
    
    if (typeof window !== 'undefined') {
      const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
      camera.position.set(30,10,20);
      const target = new THREE.Vector3(20,0,0);
    
      const renderer = new THREE.WebGLRenderer();
      renderer.setSize(window.innerWidth, window.innerHeight);
      document.body.appendChild(renderer.domElement);
      
      const controls = new OrbitControls(camera, renderer.domElement);
      controls.enableDamping = true; 
    
      
    
      
    loader.load(modelURL, (gltf) => {
      model = gltf.scene;
      model.name = 'granja';
      model.scale.set(0.2, 0.2, 0.2);
      model.position.set(-40, 1, 40);
      //model.rotation.x = +0.4;
      scene.add(light);
      scene.add(model);
    }, undefined, (error) => {
      console.error('Error al cargar el modelo GLB', error);
    });
    loader.load(modelURL1, (gltf) => {
      model1 = gltf.scene;
      model1.name = 'granja';
      
      model1.scale.set(0.2, 0.2, 0.2);
      model1.position.set(-22,1.039,-5);
      //model.rotation.x = +0.4;
      scene.add(light);
      scene.add(model1);
    }, undefined, (error) => {
      console.error('Error al cargar el modelo GLB', error);
    });
    loader.load(modelURL2, (gltf) => {
      model2 = gltf.scene;
      model2.name = 'granja';
      model2.scale.set(0.2, 0.2, 0.2);
      model2.position.set(20,1.05,-10);
      model2.rotation.y = Math.PI;
      //model.rotation.x = +0.4;
      scene.add(light);
      scene.add(model2);
    }, undefined, (error) => {
      console.error('Error al cargar el modelo GLB', error);
    });
      
      const geometry = new THREE.BoxGeometry();
      const material = new THREE.MeshBasicMaterial({ color: 0xFFFFFF }); // Material básico de color verde
      const material1 = new THREE.MeshBasicMaterial({ color: 0x87FF00 }); // Material básico de color verde
      const material2 = new THREE.MeshBasicMaterial({ color: 0xFFF300 }); // Material básico de color verde
      
    
      const cube = new THREE.Mesh(geometry, material);
      cube.name = 'Cuarentena';
      const cube1 = new THREE.Mesh(geometry, material1);
      cube1.name = 'Zen';
      const cube2 = new THREE.Mesh(geometry, material2);
      cube2.name = 'Cua';
      const cube3 = new THREE.Mesh(geometry, material);
      cube3.name = 'Gestacion';
      const cube4 = new THREE.Mesh(geometry, material);
      cube4.name = 'Maternidad';
      const geometry1 = new THREE.PlaneGeometry(160, 170); // El tamaño del plano
      const material3 = new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load('./Texturas/Texturemapcolor.png') });
      const plane = new THREE.Mesh(geometry1, material3);
      plane.rotation.x = Math.PI / -2;
      plane.rotation.z = Math.PI / 2;
      plane.position.set(23,0.95,-10);
      cube.scale.set(4, 0.1, 6);
      cube.position.set(-40, 0.8, 40)
      cube1.scale.set(6, 0.1, 10);
      cube1.position.set(-20,0.8,-3);
      cube3.scale.set(35, 0.1, 15);
      cube3.position.set(40,0.8,-15);
      cube3.rotation.y =  Math.PI/-12;
      cube4.scale.set(55, 0.1, 15);
      cube4.rotation.y = Math.PI/-14;
      cube4.position.set(45,0.8,5);
      scene.add(cube,cube1,plane,cube3,cube4);
    
      // Detectar eventos de movimiento del cursor
      window.addEventListener('mousemove', (event) => {
        // Obtener la posición del cursor en coordenadas normalizadas (-1 a 1)
        const mouse = new THREE.Vector2(
          (event.clientX / window.innerWidth) * 2 - 1,
          -(event.clientY / window.innerHeight) * 2 + 1
        );
        const raycaster = new THREE.Raycaster();
      raycaster.setFromCamera(mouse, camera);
    
      // Declarar originmaterial fuera del bloque if/else
      const originmaterial = new Map();
    
      // Realizar intersecciones con los objetos 3D en la escena
      const intersects = raycaster.intersectObjects([cube, cube1, cube3, cube4], true);
    
      
    
    
      if (intersects.length > 0) {
          // El cursor apunta a un objeto 3D
          // Puedes mostrar información del JSON aquí basada en el objeto apuntado
          const objetoApuntado = intersects[0].object;
          const informacionDelYAML = obtenerInformacionDelYAML(objetoApuntado);
          if(objetoApuntado.name === "Cuarentena"){
            model.traverse((child) => {
                if (child.isMesh) {
                    // Guardar el material original antes de aplicar el resaltado
                    originmaterial.set(child, child.material.clone());
                    const highlightMaterial = new THREE.MeshBasicMaterial({ color: 0xff0000 });
                    child.material = highlightMaterial;
                }
            });
          }
          // if(objetoApuntado.name === "Zen"){
          //   model1.traverse((child) => {
          //       if (child.isMesh) {
          //           // Guardar el material original antes de aplicar el resaltado
          //           originmaterial.set(child, child.material.clone());
          //           const highlightMaterial = new THREE.MeshBasicMaterial({ color: 0xff0000 });
          //           child.material = highlightMaterial;
          //       }
          //   });
          // }
          if(objetoApuntado.name === "Maternidad"){
          model2.traverse((child) => {
              if (child.isMesh) {
                  // Guardar el material original antes de aplicar el resaltado
                  originmaterial.set(child, child.material.clone());
                  const highlightMaterial = new THREE.MeshBasicMaterial({ color: 0xff0000 });
                  child.material = highlightMaterial;
              }
          });
        }
          // Mostrar la información al usuario o realizar otras acciones según tus necesidades
          mostrarInformacionAlUsuario(informacionDelYAML);
          
      } else {
          ocultarInformacionAlUsuario();
          model.traverse((child) => {
            if (child.isMesh) {
                // Acceder al material original desde originmaterial
                const originalMaterial = originmaterial.get(child);
                const highlightMaterial = new THREE.MeshBasicMaterial({ color: originalMaterial });
                child.material = highlightMaterial;
            }
        });
        //   model1.traverse((child) => {
        //     if (child.isMesh) {
        //         // Acceder al material original desde originmaterial
        //         const originalMaterial = originmaterial.get(child);
        //         const highlightMaterial = new THREE.MeshBasicMaterial({ color: originalMaterial });
        //         child.material = highlightMaterial;
        //     }
        // });
          model2.traverse((child) => {
              if (child.isMesh) {
                  // Acceder al material original desde originmaterial
                  const originalMaterial = originmaterial.get(child);
                  const highlightMaterial = new THREE.MeshBasicMaterial({ color: originalMaterial });
                  child.material = highlightMaterial;
              }
          });
      }
      
        
      });
    
      function obtenerInformacionDelYAML(figuraApuntada) {
        // Reemplaza 'Etapas.yaml' con la ruta correcta a tu archivo YAML
        const urlYAML = '../Etapas.yaml';
      
        // Obtén el 'name' de la figura apuntada (debes adaptar esto según tu estructura de datos)
        const nombreFiguraApuntada = figuraApuntada.name;
        console.log(nombreFiguraApuntada);
      
        // Realiza una solicitud HTTP para cargar el archivo YAML
        return fetch(urlYAML)
          .then((response) => response.text())
          .then((yamlText) => {
            // Analiza el contenido YAML en un objeto JavaScript
            const data = yaml.load(yamlText);
      
            // Busca la información correspondiente en el YAML usando el nombre de la figura
            const informacionFigura = data[nombreFiguraApuntada];
            console.log(informacionFigura);
      
            if (informacionFigura) {
              // Retorna la información encontrada
              return informacionFigura;
            } else {
              // Retorna un mensaje de error o información predeterminada si la figura no se encuentra en el YAML
              return 'Información no encontrada';
            }
          })
          .catch((error) => {
            // Maneja errores de la solicitud YAML
            console.error('Error al cargar el YAML:', error);
            return 'Error al cargar la información';
          });
      }
      function mostrarInformacionAlUsuario(informacionPromesa) {
        const divInformacion = document.getElementById("informacionFigura");
      
        // Verifica si la información es de figura0, Transporte, Cuarentena, etc.
        informacionPromesa.then((informacion) => {
          // Construye el contenido que deseas mostrar en el div
          const contenidoHTML = `
            <p>Nombre: ${informacion.Nombre}</p>
            <p>Duración: ${informacion.Duracion} días</p>
            <p>Tipo de Alimento: ${informacion.TipoAlimento}</p>
            <p>Consumo Diario: ${informacion.ConsumoDiarioKg} kg</p>
            <p>Variación de Consumo: ${informacion.VariacionKg} kg</p>
            <p>Porcentaje de Mortandad: ${informacion.PorcentajeMortandad}%</p>
            <h3>Medicamentos:</h3>
            <ul>
              ${Object.entries(informacion.Medicamentos).map(([dia, medicamentos]) => `
                <li>
                  Día ${dia}:
                  <ul>
                    ${Object.entries(medicamentos).map(([medicamento, cantidad]) => `
                      <li>${medicamento}: ${cantidad}</li>
                    `).join('')}
                  </ul>
                </li>
              `).join('')}
            </ul>
          `;
      
          // Asigna el contenido al div
          divInformacion.innerHTML = contenidoHTML;
          
        }).catch((error) => {
          // Si la promesa se rechaza, muestra un mensaje de error
          divInformacion.innerHTML = 'Error al cargar la información: ' + error;
        });
      }
      
    
    // Función para ocultar la información al usuario
    function ocultarInformacionAlUsuario() {
      // Obtén el elemento div donde mostrar la información
      const divInformacion = document.getElementById("informacionFigura");
    
      // Borra el contenido del div para ocultar la información
      
    }
    
    
      // Función de animación
      const animate = () => {
        requestAnimationFrame(animate);
        angle += rotationSpeed;
        const x = Math.sin(angle) * radius;
        const z = Math.cos(angle) * radius;
        camera.position.set(x, 8, z);
        camera.lookAt(0, 10, 10);
        renderer.render(scene, camera);
        controls.update();
      };
    
      // Llamar a la función de animación
      animate();

    }
    return (
        <div>
          {/* Aquí puedes renderizar cualquier contenido HTML relacionado con tu modelo 3D */}
        </div>
      );
    };
    
export default ThreeModel;