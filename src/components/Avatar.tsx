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

  // Camera setup
  camera.position.set(0.2, 0.5, 1);

  controls = new OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;
  controls.enablePan = false;
  controls.minDistance = 3;
  controls.maxPolarAngle = 1.45;
  controls.minPolarAngle = 1.45;
  controls.target = new THREE.Vector3(0, 0.75, 0);
  controls.enableZoom = false;
  controls.update();

  // Lighting
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
  scene.add(ambientLight);

  const spotLight = new THREE.SpotLight(0xffffff, 20, 8, 1);
  spotLight.penumbra = 0.5;
  spotLight.position.set(0, 4, 2);
  spotLight.castShadow = true;
  scene.add(spotLight);

  const keyLight = new THREE.DirectionalLight(0xffffff, 2);
  keyLight.position.set(1, 1, 2);
  keyLight.lookAt(new THREE.Vector3());
  scene.add(keyLight);

  //create pedestal
  const pedestal = new THREE.Mesh(
    new THREE.CylinderGeometry(0.8, 0.8, 0.1, 64),
    new THREE.MeshStandardMaterial()
  );
  pedestal.castShadow = false;
  pedestal.receiveShadow = true;
  pedestal.position.y = -0.05;
  scene.add(pedestal);
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
        avatar.traverse(child => {
          if (child instanceof THREE.Mesh) {
            child.castShadow = true;
            child.receiveShadow = true;
          }
        });

        scene.add(avatar);

        //Load Animations
        const mixer = new THREE.AnimationMixer(avatar);
        const clips = gltf.animations;
        const sittingClip = THREE.AnimationClip.findByName(clips, 'sitting');
        const standingUpClip = THREE.AnimationClip.findByName(clips, 'stand');
        const standingClip = THREE.AnimationClip.findByName(clips, 'standing');
        const boredClip = THREE.AnimationClip.findByName(clips, 'bored');
        const standingAction = standingClip ? mixer.clipAction(standingClip) : null;
        const sittingAction = sittingClip ? mixer.clipAction(sittingClip) : null;
        const standingUpAction = standingUpClip ? mixer.clipAction(standingUpClip) : null;
        const boredAction = boredClip ? mixer.clipAction(boredClip) : null;

        // Add click handler
        const raycaster = new THREE.Raycaster();
        const mouse = new THREE.Vector2();
        let isStanding = false;
        let isBored = false;
        let standingTimeout: NodeJS.Timeout | null = null;

        const onMouseClick = (event: MouseEvent) => {
          if (!renderer || !camera || isBored) return;

          // Calculate mouse position in normalized device coordinates
          const rect = renderer.domElement.getBoundingClientRect();
          mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
          mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

          // Update the picking ray with the camera and mouse position
          raycaster.setFromCamera(mouse, camera);

          // Calculate objects intersecting the picking ray
          const intersects = raycaster.intersectObject(avatar, true);

          if (intersects.length > 0) {
            if (isStanding) {
              isBored = true;
              // If already standing, play bored animation
              boredAction?.reset().play();
              // After bored animation, return to standing
              setTimeout(() => {
                boredAction?.crossFadeTo(standingAction!, 0.9);
                isBored = false;
              }, 9000);
            } else {
              // Stand up
              isStanding = true;
              standingUpAction?.reset().play();
              sittingAction?.crossFadeTo(standingUpAction!, 1);

              // Clear any existing timeout
              if (standingTimeout) {
                clearTimeout(standingTimeout);
              }

              // After standing up animation completes, switch to standing pose
              setTimeout(() => {
                standingAction?.reset().play();
                standingUpAction?.crossFadeTo(standingAction!, 0.5);
              }, 1000); // Adjust based on standing up animation length

              // Set timeout to sit back down after 1 minute
              standingTimeout = setTimeout(() => {
                sittingAction?.reset().play();
                standingAction?.crossFadeTo(sittingAction!, 1);
                isStanding = false;
              }, 60000); // 1 minute
            }
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
        sittingAction?.play();

        // Cleanup click handler and timeout
        return () => {
          if (renderer) {
            renderer.domElement.removeEventListener('click', onMouseClick);
          }
          if (standingTimeout) {
            clearTimeout(standingTimeout);
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
