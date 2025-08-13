'use client';

import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import type { GLTF } from 'three/addons/loaders/GLTFLoader.js';

// Singleton to manage Three.js instance
let scene: THREE.Scene | null = null;
let camera: THREE.PerspectiveCamera | null = null;
let renderer: THREE.WebGLRenderer | null = null;
let controls: OrbitControls | null = null;
let animationFrameId: number | null = null;

const initThree = (container: HTMLDivElement) => {
  if (scene) return; // Already initialized

  // Scene setup
  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera(45, 1);
  renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });

  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.setSize(650, 650);
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;

  container.appendChild(renderer.domElement);

  // Camera setup - focused on solo avatar
  camera.position.set(2, 1.5, 2);

  controls = new OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;
  controls.enablePan = false;
  controls.minDistance = 3;
  controls.maxDistance = 6;
  controls.maxPolarAngle = 1.5;
  controls.minPolarAngle = 0.5;
  controls.target = new THREE.Vector3(0, 0.8, 0);
  controls.enableZoom = true;
  controls.update();

  // Lighting
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
  scene.add(ambientLight);

  const spotLight = new THREE.SpotLight(0xffffff, 15, 8, 1);
  spotLight.penumbra = 0.5;
  spotLight.position.set(0, 4, 2);
  spotLight.castShadow = true;
  spotLight.shadow.mapSize.width = 1024;
  spotLight.shadow.mapSize.height = 1024;
  scene.add(spotLight);

  const keyLight = new THREE.DirectionalLight(0xffffff, 1.5);
  keyLight.position.set(2, 3, 1);
  keyLight.castShadow = true;
  keyLight.shadow.mapSize.width = 1024;
  keyLight.shadow.mapSize.height = 1024;
  keyLight.lookAt(new THREE.Vector3(0, 0.5, 0));
  scene.add(keyLight);

  // Create standing circle/stool
  const standingCircle = new THREE.Mesh(
    new THREE.CylinderGeometry(0.7, 0.8, 0.1, 64),
    new THREE.MeshStandardMaterial({ color: 0xFFFFFF })
  );
  standingCircle.castShadow = false;
  standingCircle.receiveShadow = true;
  standingCircle.position.y = -0.05;
  scene.add(standingCircle);







};

const cleanup = () => {
  if (animationFrameId) {
    cancelAnimationFrame(animationFrameId);
    animationFrameId = null;
  }
  if (renderer) {
    if (renderer.domElement && renderer.domElement.parentNode) {
      renderer.domElement.parentNode.removeChild(renderer.domElement);
    }
    renderer.dispose();
  }
  scene = null;
  camera = null;
  renderer = null;
  controls = null;
};

export default function Avatar() {
  const mountRef = useRef<HTMLDivElement>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [completion, setCompletion] = useState(0);

  useEffect(() => {
    if (!mountRef.current) return;

    initThree(mountRef.current);

    const loader = new GLTFLoader();
    loader.load(
      '/Avatar.glb',
      (gltf: GLTF) => {
        if (!scene) return;

        const existingAvatar = scene.getObjectByName('avatar');
        if (existingAvatar) {
          scene.remove(existingAvatar);
        }

        const avatar = gltf.scene;
        avatar.name = 'avatar';
        
        // Position and scale avatar
        avatar.scale.set(1.05, 1.05, 1.05); // 20% bigger
        avatar.position.set(0, 0, 0); // Center position
        avatar.rotation.y = Math.PI / 4; // Rotate 45 degrees to face camera
        
        avatar.traverse(child => {
          if (child instanceof THREE.Mesh) {
            child.castShadow = true;
            child.receiveShadow = true;
          }
        });

        scene.add(avatar);

        // Load Animations
        const mixer = new THREE.AnimationMixer(avatar);
        const clips = gltf.animations;
        
        const stoodUpClip = THREE.AnimationClip.findByName(clips, 'stood up');
        const sittingClip = THREE.AnimationClip.findByName(clips, 'sitting');
        const standingUpClip = THREE.AnimationClip.findByName(clips, 'stading up');
        
        const stoodUpAction = stoodUpClip ? mixer.clipAction(stoodUpClip) : null;
        const sittingAction = sittingClip ? mixer.clipAction(sittingClip) : null;
        const standingUpAction = standingUpClip ? mixer.clipAction(standingUpClip) : null;

        // Animation state management
        let currentState = 'stood-up'; // 'stood-up', 'sitting', 'standing-up'
        let animationTimeout: NodeJS.Timeout | null = null;

        // Animation cycle functions
        const goToSitting = () => {
          if (currentState !== 'stood-up' || !sittingAction || !stoodUpAction) return;
          currentState = 'sitting';
          sittingAction.reset().play();
          stoodUpAction.crossFadeTo(sittingAction, 0.5);
        };

        const goToStandingUp = () => {
          if (!standingUpAction) return;
          
          const previousState = currentState;
          currentState = 'standing-up';
          standingUpAction.reset().play();
          
          if (previousState === 'sitting' && sittingAction) {
            sittingAction.crossFadeTo(standingUpAction, 0.5);
          } else if (stoodUpAction) {
            stoodUpAction.crossFadeTo(standingUpAction, 0.5);
          }
          
          // After 2 seconds of standing up, go to stood up
          animationTimeout = setTimeout(() => {
            goToStoodUp();
          }, 2000);
        };

        const goToStoodUp = () => {
          if (!stoodUpAction || !standingUpAction) return;
          
          currentState = 'stood-up';
          stoodUpAction.reset().play();
          standingUpAction.crossFadeTo(stoodUpAction, 0.5);
          
          // After 6 seconds of stood up, go to sitting
          animationTimeout = setTimeout(() => {
            goToSitting();
          }, 6000);
        };

        // Click handler
        const raycaster = new THREE.Raycaster();
        const mouse = new THREE.Vector2();

        const onMouseClick = (event: MouseEvent) => {
          if (!renderer || !camera) return;

          // Calculate mouse position in normalized device coordinates
          const rect = renderer.domElement.getBoundingClientRect();
          mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
          mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

          // Update the picking ray with the camera and mouse position
          raycaster.setFromCamera(mouse, camera);

          // Calculate objects intersecting the picking ray
          const intersects = raycaster.intersectObject(avatar, true);

          if (intersects.length > 0 && currentState === 'sitting') {
            // Clear any existing timeout
            if (animationTimeout) {
              clearTimeout(animationTimeout);
            }
            
            // Go to standing up animation
            goToStandingUp();
          }
        };

        if (renderer) {
          renderer.domElement.addEventListener('click', onMouseClick);
        }

        const clock = new THREE.Clock();
        const animate = () => {
          if (!scene || !camera || !renderer || !controls) return;

          animationFrameId = requestAnimationFrame(animate);
          mixer.update(clock.getDelta());
          renderer.render(scene, camera);
        };

        setIsLoading(false);
        animate();
        
        // Start with stood up animation if available
        if (stoodUpAction) {
          stoodUpAction.play();
          
          // Start the automatic cycle after 6 seconds
          animationTimeout = setTimeout(() => {
            goToSitting();
          }, 6000);
        }

        // Cleanup click handler and timeout
        return () => {
          if (renderer) {
            renderer.domElement.removeEventListener('click', onMouseClick);
          }
          if (animationTimeout) {
            clearTimeout(animationTimeout);
          }
        };
      },
      xhr => {
        setCompletion(Math.round((xhr.loaded / xhr.total) * 100));
      },
      error => {
        console.error(error);
      }
    );

    return () => {
      cleanup();
    };
  }, []);

  return (
    <div className="relative h-full w-full">
      <div ref={mountRef} className="h-full w-full" />
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-background/80">
          <div className="text-center">
            <div className="mb-2 text-lg font-medium">Loading Model</div>
            <div className="h-2 w-48 overflow-hidden rounded-full bg-muted">
              <div
                className="h-full bg-primary transition-all duration-300"
                style={{ width: `${completion}%` }}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
