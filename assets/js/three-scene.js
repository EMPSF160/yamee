/* ==========================================================================
   LUME ADVISORY – THREE.JS 3D HERO VISUAL
   Creative Direction: Soft Luxury Abstract Sculpture (Pastel Peach, Warm Beige, Ivory)
   ========================================================================== */

(function () {
  'use strict';

  const container = document.getElementById('three-canvas-container');
  if (!container || typeof THREE === 'undefined') return;

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Scene setup
  const scene = new THREE.Scene();
  const width = container.clientWidth || 500;
  const height = container.clientHeight || 580;

  const camera = new THREE.PerspectiveCamera(42, width / height, 0.1, 1000);
  camera.position.set(0, 0, 18);

  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'high-performance' });
  renderer.setSize(width, height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.05;
  container.appendChild(renderer.domElement);

  // Soft Ambient & Directional Lighting matching LUME palette
  const ambientLight = new THREE.AmbientLight(0xF8F3ED, 1.4);
  scene.add(ambientLight);

  // Pastel Peach Key Light
  const peachLight = new THREE.PointLight(0xF8D9B5, 3.2, 45);
  peachLight.position.set(8, 12, 10);
  scene.add(peachLight);

  // Warm Beige / Soft Charcoal Subtle Fill Light
  const fillLight = new THREE.PointLight(0xE9DFD5, 2.0, 40);
  fillLight.position.set(-10, -8, 8);
  scene.add(fillLight);

  // Master Group
  const masterGroup = new THREE.Group();
  scene.add(masterGroup);

  // 1. Core Sculptural Ribbon (Torus Knot with warm soft luxury material)
  const knotGeometry = new THREE.TorusKnotGeometry(4.2, 1.15, 128, 32, 2, 3);
  const knotMaterial = new THREE.MeshPhysicalMaterial({
    color: 0xF5EDE3,
    roughness: 0.35,
    metalness: 0.08,
    clearcoat: 0.4,
    clearcoatRoughness: 0.2,
    reflectivity: 0.5,
    transmission: 0.15,
    opacity: 0.95,
    transparent: true
  });
  const knotMesh = new THREE.Mesh(knotGeometry, knotMaterial);
  masterGroup.add(knotMesh);

  // 2. Delicate Outer Orbit Ring (Warm Peach satin line)
  const ringGeo = new THREE.TorusGeometry(7.2, 0.04, 16, 120);
  const ringMat = new THREE.MeshBasicMaterial({
    color: 0xF8D9B5,
    transparent: true,
    opacity: 0.75
  });
  const ringMesh = new THREE.Mesh(ringGeo, ringMat);
  ringMesh.rotation.x = Math.PI / 2.8;
  ringMesh.rotation.y = Math.PI / 5;
  masterGroup.add(ringMesh);

  // 3. Floating Soft Dust Specks (Warm Sand & Peach)
  const speckCount = 140;
  const speckGeo = new THREE.BufferGeometry();
  const speckPositions = new Float32Array(speckCount * 3);
  const speckColors = new Float32Array(speckCount * 3);

  const cPeach = new THREE.Color(0xF8D9B5);
  const cBeige = new THREE.Color(0xE9DFD5);
  const cIvory = new THREE.Color(0xFFFFFF);

  for (let i = 0; i < speckCount; i++) {
    const i3 = i * 3;
    speckPositions[i3] = (Math.random() - 0.5) * 22;
    speckPositions[i3 + 1] = (Math.random() - 0.5) * 22;
    speckPositions[i3 + 2] = (Math.random() - 0.5) * 16;

    const rand = Math.random();
    const c = rand < 0.45 ? cPeach : (rand < 0.8 ? cBeige : cIvory);
    speckColors[i3] = c.r;
    speckColors[i3 + 1] = c.g;
    speckColors[i3 + 2] = c.b;
  }

  speckGeo.setAttribute('position', new THREE.BufferAttribute(speckPositions, 3));
  speckGeo.setAttribute('color', new THREE.BufferAttribute(speckColors, 3));

  const speckMat = new THREE.PointsMaterial({
    size: 0.09,
    vertexColors: true,
    transparent: true,
    opacity: 0.65
  });

  const specks = new THREE.Points(speckGeo, speckMat);
  scene.add(specks);

  // Mouse Interaction (Subtle, luxurious inertia)
  let mouse = { x: 0, y: 0, targetX: 0, targetY: 0 };
  const windowHalfX = window.innerWidth / 2;
  const windowHalfY = window.innerHeight / 2;

  window.addEventListener('mousemove', (e) => {
    mouse.targetX = (e.clientX - windowHalfX) * 0.0006;
    mouse.targetY = (e.clientY - windowHalfY) * 0.0006;
  }, { passive: true });

  // Resize Handler
  function onResize() {
    if (!container) return;
    const w = container.clientWidth;
    const h = container.clientHeight;
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
    renderer.setSize(w, h);
  }

  window.addEventListener('resize', onResize, { passive: true });

  // Animation Loop
  let clock = new THREE.Clock();

  function animate() {
    requestAnimationFrame(animate);

    const delta = clock.getDelta();
    const time = clock.getElapsedTime();

    if (!prefersReducedMotion) {
      // Smooth mouse easing
      mouse.x += (mouse.targetX - mouse.x) * 0.04;
      mouse.y += (mouse.targetY - mouse.y) * 0.04;

      // Meditative, fluid organic rotation
      knotMesh.rotation.x = time * 0.12 + mouse.y * 1.5;
      knotMesh.rotation.y = time * 0.16 + mouse.x * 1.5;

      ringMesh.rotation.z = time * 0.08;
      ringMesh.rotation.x = Math.PI / 2.8 + Math.sin(time * 0.2) * 0.1;

      specks.rotation.y = time * 0.02;

      // Gentle master group float
      masterGroup.position.y = Math.sin(time * 0.8) * 0.25;
      masterGroup.rotation.z = mouse.x * 0.5;
    }

    renderer.render(scene, camera);
  }

  animate();
})();
