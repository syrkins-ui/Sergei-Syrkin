import React, { useEffect, useRef, useState, useMemo, useCallback } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { SAN_TELMO_LANDMARKS, Landmark3D } from '../data/landmarks3D';
import { ContentTranslation, Language } from '../data/translations';
import { 
  RotateCcw, 
  ZoomIn, 
  ZoomOut, 
  Navigation, 
  MapPin, 
  Clock, 
  Footprints, 
  Sun, 
  Moon, 
  Sparkles, 
  Utensils, 
  Landmark, 
  Building2, 
  Layers,
  X,
  ExternalLink
} from 'lucide-react';

interface SanTelmo3DMapProps {
  t: ContentTranslation;
  lang: Language;
}

type FilterCategory = 'all' | 'heritage' | 'gastronomy' | 'culture';

export const SanTelmo3DMap: React.FC<SanTelmo3DMapProps> = ({ t, lang }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [selectedLandmark, setSelectedLandmark] = useState<Landmark3D | null>(null);
  const [activeFilter, setActiveFilter] = useState<FilterCategory>('all');
  const [isNightMode, setIsNightMode] = useState<boolean>(true);
  const [isInteracting, setIsInteracting] = useState<boolean>(false);
  const [hoveredLandmark, setHoveredLandmark] = useState<Landmark3D | null>(null);

  // References to communicate with Three.js render loop without re-renders
  const sceneState = useRef<{
    scene: THREE.Scene | null;
    camera: THREE.PerspectiveCamera | null;
    renderer: THREE.WebGLRenderer | null;
    controls: OrbitControls | null;
    landmarkMarkers: Map<string, THREE.Group>;
    routeLine: THREE.Line | null;
    bubbles: THREE.Points | null;
    bubblePositions: Float32Array | null;
    pulsingRings: THREE.Mesh[];
    targetCamPos: THREE.Vector3 | null;
    targetLookAt: THREE.Vector3 | null;
    isLerpingCamera: boolean;
    hemiLight: THREE.HemisphereLight | null;
    dirLight: THREE.DirectionalLight | null;
    pointLights: THREE.PointLight[];
  }>({
    scene: null,
    camera: null,
    renderer: null,
    controls: null,
    landmarkMarkers: new Map(),
    routeLine: null,
    bubbles: null,
    bubblePositions: null,
    pulsingRings: [],
    targetCamPos: null,
    targetLookAt: null,
    isLerpingCamera: false,
    hemiLight: null,
    dirLight: null,
    pointLights: []
  });

  // Filtered landmarks
  const visibleLandmarks = useMemo(() => {
    if (activeFilter === 'all') return SAN_TELMO_LANDMARKS;
    if (activeFilter === 'heritage') {
      return SAN_TELMO_LANDMARKS.filter(l => l.category === 'heritage' || l.isOrigin);
    }
    if (activeFilter === 'gastronomy') {
      return SAN_TELMO_LANDMARKS.filter(l => l.category === 'gastronomy' || l.isOrigin);
    }
    if (activeFilter === 'culture') {
      return SAN_TELMO_LANDMARKS.filter(l => l.category === 'culture' || l.category === 'walk' || l.isOrigin);
    }
    return SAN_TELMO_LANDMARKS;
  }, [activeFilter]);

  // Set default selected landmark to BRUT bar on mount
  useEffect(() => {
    setSelectedLandmark(SAN_TELMO_LANDMARKS[0]);
  }, []);

  // Update visibility of markers when filter changes
  useEffect(() => {
    const { landmarkMarkers } = sceneState.current;
    landmarkMarkers.forEach((group, id) => {
      const isVisible = visibleLandmarks.some(l => l.id === id);
      group.visible = isVisible;
    });
  }, [visibleLandmarks]);

  // Animate camera to a landmark
  const focusOnLandmark = useCallback((landmark: Landmark3D) => {
    setSelectedLandmark(landmark);
    const { camera, controls } = sceneState.current;
    if (!camera || !controls) return;

    const [tx, ty, tz] = landmark.coords;
    const offset = landmark.isOrigin 
      ? new THREE.Vector3(12, 14, 13) 
      : new THREE.Vector3(7, 9, 8);

    sceneState.current.targetLookAt = new THREE.Vector3(tx, ty + 0.5, tz);
    sceneState.current.targetCamPos = new THREE.Vector3(tx + offset.x, ty + offset.y, tz + offset.z);
    sceneState.current.isLerpingCamera = true;
  }, []);

  // Reset to default isometric view of BRUT bar
  const handleResetView = useCallback(() => {
    const brut = SAN_TELMO_LANDMARKS[0];
    focusOnLandmark(brut);
  }, [focusOnLandmark]);

  // Zoom helpers
  const handleZoomIn = () => {
    const { camera, controls } = sceneState.current;
    if (!camera || !controls) return;
    const dir = new THREE.Vector3().subVectors(controls.target, camera.position).normalize();
    camera.position.addScaledVector(dir, 3);
    controls.update();
  };

  const handleZoomOut = () => {
    const { camera, controls } = sceneState.current;
    if (!camera || !controls) return;
    const dir = new THREE.Vector3().subVectors(controls.target, camera.position).normalize();
    camera.position.addScaledVector(dir, -3);
    controls.update();
  };

  // Toggle Day/Night lighting
  useEffect(() => {
    const { hemiLight, dirLight, scene } = sceneState.current;
    if (!hemiLight || !dirLight || !scene) return;

    if (isNightMode) {
      // Intimate candlelit midnight atmosphere
      scene.background = new THREE.Color(0x38050e);
      scene.fog = new THREE.FogExp2(0x38050e, 0.032);
      hemiLight.color.setHex(0x5a1b24);
      hemiLight.groundColor.setHex(0x190408);
      hemiLight.intensity = 1.0;
      dirLight.color.setHex(0xffcb77);
      dirLight.intensity = 1.6;
    } else {
      // Golden Hour San Telmo afternoon
      scene.background = new THREE.Color(0x4c0a15);
      scene.fog = new THREE.FogExp2(0x4c0a15, 0.028);
      hemiLight.color.setHex(0xffd6a5);
      hemiLight.groundColor.setHex(0x420912);
      hemiLight.intensity = 1.4;
      dirLight.color.setHex(0xffea9f);
      dirLight.intensity = 2.4;
    }
  }, [isNightMode]);

  // Main Three.js Scene Setup & Loop
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const width = container.clientWidth || 800;
    const height = container.clientHeight || 550;

    // 1. Scene & Fog
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x38050e);
    scene.fog = new THREE.FogExp2(0x38050e, 0.032);
    sceneState.current.scene = scene;

    // 2. Camera
    const camera = new THREE.PerspectiveCamera(42, width / height, 0.5, 120);
    camera.position.set(13, 15, 14);
    sceneState.current.camera = camera;

    // 3. Renderer
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: false,
      powerPreference: 'high-performance'
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.25;
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    container.innerHTML = '';
    container.appendChild(renderer.domElement);
    sceneState.current.renderer = renderer;

    // 4. Controls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.06;
    controls.maxPolarAngle = Math.PI / 2.15; // Prevent camera under ground
    controls.minPolarAngle = Math.PI / 9;
    controls.minDistance = 6;
    controls.maxDistance = 34;
    controls.target.set(0, 0.5, 0);
    controls.update();
    sceneState.current.controls = controls;

    // 5. Lighting
    const hemiLight = new THREE.HemisphereLight(0x5a1b24, 0x190408, 1.0);
    scene.add(hemiLight);
    sceneState.current.hemiLight = hemiLight;

    const dirLight = new THREE.DirectionalLight(0xffcb77, 1.6);
    dirLight.position.set(16, 25, 14);
    dirLight.castShadow = true;
    dirLight.shadow.mapSize.width = 1024;
    dirLight.shadow.mapSize.height = 1024;
    dirLight.shadow.camera.near = 1;
    dirLight.shadow.camera.far = 60;
    dirLight.shadow.camera.left = -20;
    dirLight.shadow.camera.right = 20;
    dirLight.shadow.camera.top = 20;
    dirLight.shadow.camera.bottom = -20;
    scene.add(dirLight);
    sceneState.current.dirLight = dirLight;

    // Subtle warm ambient light
    const ambientLight = new THREE.AmbientLight(0xffeedd, 0.45);
    scene.add(ambientLight);

    // 6. Ground & Cobblestone Streets Grid
    const groundGeo = new THREE.PlaneGeometry(60, 60);
    const groundMat = new THREE.MeshStandardMaterial({
      color: 0x22050b,
      roughness: 0.88,
      metalness: 0.12
    });
    const ground = new THREE.Mesh(groundGeo, groundMat);
    ground.rotation.x = -Math.PI / 2;
    ground.receiveShadow = true;
    scene.add(ground);

    // Grid lines for Spanish colonial blocks (100m grid)
    const gridHelper = new THREE.GridHelper(50, 25, 0xe5c07b, 0x480914);
    gridHelper.position.y = 0.01;
    (gridHelper.material as THREE.Material).opacity = 0.22;
    (gridHelper.material as THREE.Material).transparent = true;
    scene.add(gridHelper);

    // 7. Puerto Madero Water Basin (Dique)
    const waterGeo = new THREE.PlaneGeometry(12, 45);
    const waterMat = new THREE.MeshStandardMaterial({
      color: 0x0f2b38,
      roughness: 0.2,
      metalness: 0.85
    });
    const water = new THREE.Mesh(waterGeo, waterMat);
    water.rotation.x = -Math.PI / 2;
    water.position.set(13.5, 0.02, 0);
    scene.add(water);

    // Dockside wooden/stone promenade
    const dockGeo = new THREE.BoxGeometry(1.4, 0.15, 45);
    const dockMat = new THREE.MeshStandardMaterial({ color: 0x3d2319, roughness: 0.7 });
    const dockLeft = new THREE.Mesh(dockGeo, dockMat);
    dockLeft.position.set(7.1, 0.07, 0);
    dockLeft.receiveShadow = true;
    scene.add(dockLeft);

    // 8. Procedural San Telmo Buildings & City Blocks
    const buildingGroup = new THREE.Group();
    scene.add(buildingGroup);

    // Materials
    const bldgMatHistoric = new THREE.MeshStandardMaterial({
      color: 0x380b15,
      roughness: 0.82,
      metalness: 0.18
    });
    const bldgMatModern = new THREE.MeshStandardMaterial({
      color: 0x1f0d14,
      roughness: 0.5,
      metalness: 0.5
    });
    const bldgMatBrick = new THREE.MeshStandardMaterial({
      color: 0x4e191b,
      roughness: 0.75,
      metalness: 0.2
    });
    const windowGlowMat = new THREE.MeshBasicMaterial({
      color: 0xffe29a,
      transparent: true,
      opacity: 0.85
    });
    const roofGoldMat = new THREE.MeshStandardMaterial({
      color: 0xc49b4b,
      roughness: 0.4,
      metalness: 0.6
    });

    // Helper to generate a stylized colonial or modern block
    const createBuilding = (x: number, z: number, w: number, d: number, h: number, isSpecial = false) => {
      const bMesh = new THREE.Mesh(
        new THREE.BoxGeometry(w, h, d),
        isSpecial ? bldgMatBrick : (x > 6 ? bldgMatModern : bldgMatHistoric)
      );
      bMesh.position.set(x, h / 2, z);
      bMesh.castShadow = true;
      bMesh.receiveShadow = true;
      buildingGroup.add(bMesh);

      // Add architectural cornice / roof rim
      const roofRim = new THREE.Mesh(
        new THREE.BoxGeometry(w + 0.12, 0.1, d + 0.12),
        roofGoldMat
      );
      roofRim.position.set(x, h + 0.05, z);
      buildingGroup.add(roofRim);

      // Windows glow accents
      if (h > 1.2) {
        const win = new THREE.Mesh(
          new THREE.BoxGeometry(w * 0.7, 0.2, d + 0.04),
          windowGlowMat
        );
        win.position.set(x, h * 0.65, z);
        buildingGroup.add(win);
      }
    };

    // Populate realistic layout of surrounding blocks (avoiding landmark coordinates)
    const blockPositions = [
      // Balcarce & Independencia surroundings
      { x: -1.8, z: -1.8, w: 2.2, d: 2.2, h: 2.4 },
      { x: -1.8, z: 0.8, w: 2.2, d: 1.8, h: 1.8 },
      { x: 1.6, z: 1.4, w: 2.0, d: 2.0, h: 2.1 },
      { x: -4.0, z: -1.5, w: 2.4, d: 2.2, h: 1.9 },
      { x: 4.2, z: 2.0, w: 2.4, d: 2.2, h: 2.5 },
      // Paseo Colón Avenue corridor
      { x: 3.5, z: 5.5, w: 3.0, d: 2.0, h: 2.8 },
      { x: 0.5, z: 4.8, w: 2.5, d: 2.0, h: 2.2 },
      { x: -2.8, z: 6.2, w: 2.4, d: 2.2, h: 2.0 },
      // Toward Puerto Madero (Modern Docks & Towers)
      { x: 8.8, z: 2.5, w: 2.2, d: 3.0, h: 5.2 },
      { x: 8.8, z: -1.0, w: 2.2, d: 3.5, h: 6.8 },
      { x: 8.8, z: -7.0, w: 2.2, d: 3.0, h: 4.6 },
      // Toward San Juan & Defensa
      { x: -7.5, z: 1.5, w: 2.5, d: 2.5, h: 1.8 },
      { x: -7.0, z: -2.5, w: 2.5, d: 2.5, h: 2.0 },
      { x: -4.5, z: 10.5, w: 3.0, d: 2.5, h: 2.2 },
      { x: -1.5, z: 9.8, w: 2.4, d: 2.4, h: 2.0 }
    ];

    blockPositions.forEach(b => createBuilding(b.x, b.z, b.w, b.d, b.h));

    // 9. Special Architectural Landmarks in 3D:
    // A) BRUT BAR EPICENTER (at [0, 0, 0])
    const brutGroup = new THREE.Group();
    scene.add(brutGroup);

    // Glowing warm glass cube pavilion
    const brutGlassGeo = new THREE.BoxGeometry(1.6, 1.2, 1.6);
    const brutGlassMat = new THREE.MeshPhysicalMaterial({
      color: 0x2d050c,
      emissive: 0x821124,
      emissiveIntensity: 0.6,
      roughness: 0.1,
      metalness: 0.2,
      transmission: 0.85,
      thickness: 0.8,
      transparent: true,
      opacity: 0.95
    });
    const brutBuilding = new THREE.Mesh(brutGlassGeo, brutGlassMat);
    brutBuilding.position.set(0, 0.6, 0);
    brutBuilding.castShadow = true;
    brutGroup.add(brutBuilding);

    // Warm golden chandelier light inside BRUT bar
    const brutPointLight = new THREE.PointLight(0xffe29a, 2.8, 8);
    brutPointLight.position.set(0, 1.0, 0);
    scene.add(brutPointLight);
    sceneState.current.pointLights.push(brutPointLight);

    // Golden frame structure
    const brutFrameGeo = new THREE.BoxGeometry(1.68, 1.26, 1.68);
    const brutFrameMat = new THREE.MeshStandardMaterial({
      color: 0xe5c07b,
      roughness: 0.3,
      metalness: 0.8
    });
    const brutEdges = new THREE.LineSegments(
      new THREE.EdgesGeometry(brutFrameGeo),
      new THREE.LineBasicMaterial({ color: 0xffd97d, linewidth: 2 })
    );
    brutEdges.position.set(0, 0.6, 0);
    brutGroup.add(brutEdges);

    // Animated Champagne Bubbles rising from BRUT Bar
    const bubbleCount = 45;
    const bubblePositions = new Float32Array(bubbleCount * 3);
    for (let i = 0; i < bubbleCount; i++) {
      bubblePositions[i * 3] = (Math.random() - 0.5) * 1.4;
      bubblePositions[i * 3 + 1] = 0.2 + Math.random() * 3.5;
      bubblePositions[i * 3 + 2] = (Math.random() - 0.5) * 1.4;
    }
    const bubbleGeo = new THREE.BufferGeometry();
    bubbleGeo.setAttribute('position', new THREE.BufferAttribute(bubblePositions, 3));
    const bubbleMat = new THREE.PointsMaterial({
      color: 0xffe29a,
      size: 0.12,
      transparent: true,
      opacity: 0.85,
      blending: THREE.AdditiveBlending
    });
    const bubbles = new THREE.Points(bubbleGeo, bubbleMat);
    scene.add(bubbles);
    sceneState.current.bubbles = bubbles;
    sceneState.current.bubblePositions = bubblePositions;

    // Glowing golden beacon ray extending up to sky
    const beaconGeo = new THREE.CylinderGeometry(0.04, 0.16, 14, 16);
    const beaconMat = new THREE.MeshBasicMaterial({
      color: 0xffd97d,
      transparent: true,
      opacity: 0.35,
      blending: THREE.AdditiveBlending
    });
    const beacon = new THREE.Mesh(beaconGeo, beaconMat);
    beacon.position.set(0, 7, 0);
    brutGroup.add(beacon);

    // Pulsing golden concentric rings on the ground around BRUT bar
    const ringGeo = new THREE.RingGeometry(1.2, 1.35, 32);
    const ringMat = new THREE.MeshBasicMaterial({
      color: 0xe5c07b,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.8
    });
    const ringMesh = new THREE.Mesh(ringGeo, ringMat);
    ringMesh.rotation.x = -Math.PI / 2;
    ringMesh.position.set(0, 0.03, 0);
    scene.add(ringMesh);
    sceneState.current.pulsingRings.push(ringMesh);

    // B) Facultad de Ingeniería (Neo-Gothic spires) at [2.8, 0, -2.4]
    const ingGeo = new THREE.BoxGeometry(2.4, 3.2, 1.8);
    const ingMesh = new THREE.Mesh(ingGeo, bldgMatHistoric);
    ingMesh.position.set(2.8, 1.6, -2.4);
    ingMesh.castShadow = true;
    scene.add(ingMesh);
    // Spire
    const spireGeo = new THREE.ConeGeometry(0.4, 1.8, 6);
    const spireMesh = new THREE.Mesh(spireGeo, roofGoldMat);
    spireMesh.position.set(2.8, 4.1, -2.4);
    scene.add(spireMesh);

    // C) Mercado de San Telmo (Iron domed hall) at [-4.6, 0, 3.8]
    const mercGeo = new THREE.BoxGeometry(3.0, 1.5, 2.5);
    const mercMesh = new THREE.Mesh(mercGeo, bldgMatBrick);
    mercMesh.position.set(-4.6, 0.75, 3.8);
    mercMesh.castShadow = true;
    scene.add(mercMesh);
    // Curved iron dome
    const domeGeo = new THREE.CylinderGeometry(1.4, 1.4, 2.8, 16, 1, false, 0, Math.PI);
    const domeMat = new THREE.MeshStandardMaterial({ color: 0x3b4247, roughness: 0.4, metalness: 0.7 });
    const domeMesh = new THREE.Mesh(domeGeo, domeMat);
    domeMesh.rotation.z = Math.PI / 2;
    domeMesh.rotation.y = Math.PI / 2;
    domeMesh.position.set(-4.6, 1.5, 3.8);
    scene.add(domeMesh);

    // D) Puente de la Mujer rotating harp bridge at [6.8, 0, -3.8]
    const mastGeo = new THREE.CylinderGeometry(0.08, 0.18, 3.8, 8);
    const mastMat = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.2, metalness: 0.4 });
    const mastMesh = new THREE.Mesh(mastGeo, mastMat);
    mastMesh.rotation.z = -Math.PI / 4.5;
    mastMesh.position.set(6.8, 1.6, -3.8);
    scene.add(mastMesh);
    // Bridge deck across water
    const deckGeo = new THREE.BoxGeometry(8.0, 0.1, 0.5);
    const deckMesh = new THREE.Mesh(deckGeo, mastMat);
    deckMesh.position.set(9.8, 0.3, -3.8);
    scene.add(deckMesh);

    // 10. Street Names Billboard Textures on the ground
    const createStreetLabel = (text: string, x: number, z: number, rotationY = 0) => {
      const canvas = document.createElement('canvas');
      canvas.width = 512;
      canvas.height = 128;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.fillStyle = 'rgba(27, 5, 9, 0.75)';
        ctx.roundRect(10, 20, 492, 88, 16);
        ctx.fill();
        ctx.strokeStyle = 'rgba(229, 192, 123, 0.6)';
        ctx.lineWidth = 4;
        ctx.stroke();

        ctx.font = '600 36px "Plus Jakarta Sans", sans-serif';
        ctx.fillStyle = '#FFE29A';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(text.toUpperCase(), 256, 64);
      }
      const tex = new THREE.CanvasTexture(canvas);
      const labelGeo = new THREE.PlaneGeometry(3.6, 0.9);
      const labelMat = new THREE.MeshBasicMaterial({
        map: tex,
        transparent: true,
        depthWrite: false
      });
      const labelMesh = new THREE.Mesh(labelGeo, labelMat);
      labelMesh.rotation.x = -Math.PI / 2;
      labelMesh.rotation.z = rotationY;
      labelMesh.position.set(x, 0.05, z);
      scene.add(labelMesh);
    };

    createStreetLabel('Av. Independencia', 0, 3.2, 0);
    createStreetLabel('Calle Defensa', -4.0, 0.5, Math.PI / 2);
    createStreetLabel('Av. Paseo Colón', 3.2, -4.5, 0);
    createStreetLabel('Puerto Madero', 9.5, -6.5, Math.PI / 2);

    // 11. Interactive 3D Landmark Markers / Pins
    const landmarkMarkers = new Map<string, THREE.Group>();
    sceneState.current.landmarkMarkers = landmarkMarkers;

    // Helper: Create circular icon badge texture for each landmark
    const createLandmarkPinTexture = (landmark: Landmark3D) => {
      const canvas = document.createElement('canvas');
      canvas.width = 256;
      canvas.height = 256;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        // Glowing round badge
        const grad = ctx.createRadialGradient(128, 128, 40, 128, 128, 120);
        grad.addColorStop(0, landmark.isOrigin ? '#FFE29A' : landmark.color);
        grad.addColorStop(0.85, '#580714');
        grad.addColorStop(1, 'rgba(0,0,0,0)');

        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(128, 128, 118, 0, Math.PI * 2);
        ctx.fill();

        // Border
        ctx.strokeStyle = landmark.isOrigin ? '#FFE29A' : '#FFF8F2';
        ctx.lineWidth = 10;
        ctx.stroke();

        // Inner circle
        ctx.fillStyle = '#580714';
        ctx.beginPath();
        ctx.arc(128, 128, 88, 0, Math.PI * 2);
        ctx.fill();

        // Simple text / symbol
        ctx.fillStyle = '#FFF8F2';
        ctx.font = 'bold 64px sans-serif';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        const glyph = landmark.isOrigin ? '🍾' : (landmark.category === 'gastronomy' ? '🍴' : (landmark.category === 'culture' ? '🎭' : '🏛️'));
        ctx.fillText(glyph, 128, 134);
      }
      return new THREE.CanvasTexture(canvas);
    };

    SAN_TELMO_LANDMARKS.forEach((lm) => {
      const pinGroup = new THREE.Group();
      pinGroup.position.set(lm.coords[0], lm.coords[1], lm.coords[2]);

      // Base pin pole
      const poleGeo = new THREE.CylinderGeometry(0.04, 0.04, 2.2, 8);
      const poleMat = new THREE.MeshStandardMaterial({
        color: lm.isOrigin ? 0xffe29a : 0xe5c07b,
        metalness: 0.8,
        roughness: 0.2
      });
      const pole = new THREE.Mesh(poleGeo, poleMat);
      pole.position.y = 1.1;
      pole.castShadow = true;
      pinGroup.add(pole);

      // Pin head sphere
      const sphereGeo = new THREE.SphereGeometry(0.32, 16, 16);
      const sphereMat = new THREE.MeshStandardMaterial({
        color: lm.isOrigin ? 0xffe29a : new THREE.Color(lm.color),
        emissive: lm.isOrigin ? 0x821124 : 0x330000,
        emissiveIntensity: 0.4,
        metalness: 0.6,
        roughness: 0.3
      });
      const sphere = new THREE.Mesh(sphereGeo, sphereMat);
      sphere.position.y = 2.2;
      sphere.castShadow = true;
      pinGroup.add(sphere);

      // Floating sprite badge with icon
      const badgeTex = createLandmarkPinTexture(lm);
      const spriteMat = new THREE.SpriteMaterial({
        map: badgeTex,
        transparent: true,
        depthTest: false
      });
      const sprite = new THREE.Sprite(spriteMat);
      sprite.position.y = 2.9;
      sprite.scale.set(lm.isOrigin ? 1.6 : 1.3, lm.isOrigin ? 1.6 : 1.3, 1);
      pinGroup.add(sprite);

      // Hitbox for easy clicking
      const hitGeo = new THREE.BoxGeometry(1.8, 3.5, 1.8);
      const hitMat = new THREE.MeshBasicMaterial({ visible: false });
      const hitBox = new THREE.Mesh(hitGeo, hitMat);
      hitBox.position.y = 1.8;
      hitBox.userData = { landmarkId: lm.id };
      pinGroup.add(hitBox);

      scene.add(pinGroup);
      landmarkMarkers.set(lm.id, pinGroup);
    });

    // 12. Walking Route Line between BRUT bar and selected landmark
    const routeMat = new THREE.LineDashedMaterial({
      color: 0xffd97d,
      linewidth: 3,
      scale: 1,
      dashSize: 0.4,
      gapSize: 0.25
    });
    const defaultRoutePoints = [new THREE.Vector3(0, 0.15, 0), new THREE.Vector3(0, 0.15, 0.01)];
    const routeGeo = new THREE.BufferGeometry().setFromPoints(defaultRoutePoints);
    const routeLine = new THREE.Line(routeGeo, routeMat);
    routeLine.computeLineDistances();
    routeLine.visible = false;
    scene.add(routeLine);
    sceneState.current.routeLine = routeLine;

    // 13. Raycasting for Mouse / Touch interaction
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();

    const getIntersectedLandmarkId = (event: MouseEvent | TouchEvent): string | null => {
      const rect = renderer.domElement.getBoundingClientRect();
      const clientX = 'touches' in event ? event.touches[0].clientX : event.clientX;
      const clientY = 'touches' in event ? event.touches[0].clientY : event.clientY;
      mouse.x = ((clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -((clientY - rect.top) / rect.height) * 2 + 1;

      raycaster.setFromCamera(mouse, camera);

      const hitBoxes: THREE.Object3D[] = [];
      landmarkMarkers.forEach(group => {
        if (group.visible) {
          group.children.forEach(child => {
            if (child.userData?.landmarkId) {
              hitBoxes.push(child);
            }
          });
        }
      });

      const intersects = raycaster.intersectObjects(hitBoxes, false);
      if (intersects.length > 0) {
        return intersects[0].object.userData.landmarkId;
      }
      return null;
    };

    const handlePointerMove = (e: MouseEvent) => {
      const landmarkId = getIntersectedLandmarkId(e);
      if (landmarkId) {
        renderer.domElement.style.cursor = 'pointer';
        const lm = SAN_TELMO_LANDMARKS.find(l => l.id === landmarkId) || null;
        setHoveredLandmark(lm);
      } else {
        renderer.domElement.style.cursor = 'grab';
        setHoveredLandmark(null);
      }
    };

    const handleClick = (e: MouseEvent) => {
      const landmarkId = getIntersectedLandmarkId(e);
      if (landmarkId) {
        const found = SAN_TELMO_LANDMARKS.find(l => l.id === landmarkId);
        if (found) {
          focusOnLandmark(found);
        }
      }
    };

    const domEl = renderer.domElement;
    domEl.addEventListener('mousemove', handlePointerMove);
    domEl.addEventListener('click', handleClick);
    domEl.addEventListener('pointerdown', () => {
      domEl.style.cursor = 'grabbing';
      setIsInteracting(true);
    });
    domEl.addEventListener('pointerup', () => {
      domEl.style.cursor = 'grab';
      setIsInteracting(false);
    });

    // 14. Responsive Resize Observer
    const resizeObserver = new ResizeObserver(entries => {
      for (const entry of entries) {
        const newWidth = entry.contentRect.width;
        const newHeight = entry.contentRect.height;
        if (newWidth > 0 && newHeight > 0) {
          camera.aspect = newWidth / newHeight;
          camera.updateProjectionMatrix();
          renderer.setSize(newWidth, newHeight);
        }
      }
    });
    resizeObserver.observe(container);

    // 15. Animation Loop
    let animationFrameId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const delta = clock.getDelta();
      const elapsedTime = clock.getElapsedTime();

      // Update Controls
      controls.update();

      // Camera Smooth Lerp Transition to Selected Landmark
      if (sceneState.current.isLerpingCamera && sceneState.current.targetCamPos && sceneState.current.targetLookAt) {
        camera.position.lerp(sceneState.current.targetCamPos, 0.08);
        controls.target.lerp(sceneState.current.targetLookAt, 0.08);

        if (camera.position.distanceTo(sceneState.current.targetCamPos) < 0.1 &&
            controls.target.distanceTo(sceneState.current.targetLookAt) < 0.1) {
          sceneState.current.isLerpingCamera = false;
        }
      }

      // Animate Champagne Bubbles rising from BRUT Bar
      if (sceneState.current.bubbles && sceneState.current.bubblePositions) {
        const pos = sceneState.current.bubblePositions;
        for (let i = 0; i < bubbleCount; i++) {
          pos[i * 3 + 1] += delta * (0.8 + (i % 5) * 0.2);
          if (pos[i * 3 + 1] > 4.5) {
            pos[i * 3 + 1] = 0.4;
          }
        }
        sceneState.current.bubbles.geometry.attributes.position.needsUpdate = true;
      }

      // Pulsing Rings on ground
      sceneState.current.pulsingRings.forEach(ring => {
        const scale = 1 + Math.sin(elapsedTime * 2.5) * 0.12;
        ring.scale.set(scale, scale, 1);
        (ring.material as THREE.MeshBasicMaterial).opacity = 0.5 + Math.sin(elapsedTime * 2.5) * 0.3;
      });

      // Subtle float / hover on Landmark Pins
      landmarkMarkers.forEach((group, id) => {
        const offset = id.charCodeAt(0) % 5;
        const bob = Math.sin(elapsedTime * 3 + offset) * 0.08;
        const sprite = group.children.find(c => c instanceof THREE.Sprite);
        if (sprite) {
          sprite.position.y = 2.9 + bob;
        }
      });

      // Render
      renderer.render(scene, camera);
    };

    animate();

    // Cleanup function
    return () => {
      cancelAnimationFrame(animationFrameId);
      resizeObserver.disconnect();
      domEl.removeEventListener('mousemove', handlePointerMove);
      domEl.removeEventListener('click', handleClick);
      controls.dispose();
      renderer.dispose();
      container.innerHTML = '';
    };
  }, [focusOnLandmark]);

  // Update Route Line geometry when selectedLandmark changes
  useEffect(() => {
    const { routeLine } = sceneState.current;
    if (!routeLine) return;

    if (!selectedLandmark || selectedLandmark.isOrigin) {
      routeLine.visible = false;
      return;
    }

    // Build curved pathway points from BRUT [0, 0, 0] to Landmark coords along street grid
    const [tx, , tz] = selectedLandmark.coords;
    const curvePoints: THREE.Vector3[] = [];
    const numSteps = 30;

    // L-shaped or direct street turn
    for (let i = 0; i <= numSteps; i++) {
      const alpha = i / numSteps;
      // Along street grid (first along Z then along X)
      const currentX = alpha < 0.5 ? 0 : tx * ((alpha - 0.5) * 2);
      const currentZ = alpha < 0.5 ? tz * (alpha * 2) : tz;
      // Slight arch for visibility
      const arch = Math.sin(alpha * Math.PI) * 0.4;
      curvePoints.push(new THREE.Vector3(currentX, 0.15 + arch, currentZ));
    }

    routeLine.geometry.setFromPoints(curvePoints);
    routeLine.computeLineDistances();
    routeLine.visible = true;
  }, [selectedLandmark]);

  // Get category badge icon
  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'gastronomy':
        return <Utensils className="w-3.5 h-3.5" />;
      case 'heritage':
        return <Landmark className="w-3.5 h-3.5" />;
      case 'culture':
        return <Sparkles className="w-3.5 h-3.5" />;
      case 'walk':
        return <Footprints className="w-3.5 h-3.5" />;
      default:
        return <Building2 className="w-3.5 h-3.5" />;
    }
  };

  return (
    <div className="relative w-full rounded-[32px] overflow-hidden border border-[#FFF8F2]/20 shadow-2xl bg-[#38050e] flex flex-col min-h-[580px] lg:min-h-[640px]">
      
      {/* Top HUD: Filter tabs, instructions & Lighting switch */}
      <div className="absolute top-4 left-4 right-4 z-20 flex flex-wrap items-center justify-between gap-3 pointer-events-none">
        
        {/* Left: Filter Pills */}
        <div className="flex flex-wrap items-center gap-1.5 p-1.5 rounded-full bg-[#580714]/90 backdrop-blur-md border border-[#FFF8F2]/15 shadow-xl pointer-events-auto">
          <button
            onClick={() => setActiveFilter('all')}
            className={`px-3 py-1.5 rounded-full text-xs font-semibold tracking-wider transition-all cursor-pointer flex items-center space-x-1.5 ${
              activeFilter === 'all'
                ? 'bg-[#E5C07B] text-[#580714] font-bold shadow-md'
                : 'text-[#FFF8F2]/80 hover:text-[#FFF8F2] hover:bg-[#7A0C1E]/60'
            }`}
          >
            <Layers className="w-3 h-3" />
            <span>{t.map3dFilterAll}</span>
          </button>

          <button
            onClick={() => setActiveFilter('heritage')}
            className={`px-3 py-1.5 rounded-full text-xs font-semibold tracking-wider transition-all cursor-pointer flex items-center space-x-1.5 ${
              activeFilter === 'heritage'
                ? 'bg-[#E5C07B] text-[#580714] font-bold shadow-md'
                : 'text-[#FFF8F2]/80 hover:text-[#FFF8F2] hover:bg-[#7A0C1E]/60'
            }`}
          >
            <Landmark className="w-3 h-3" />
            <span>{t.map3dFilterHeritage}</span>
          </button>

          <button
            onClick={() => setActiveFilter('gastronomy')}
            className={`px-3 py-1.5 rounded-full text-xs font-semibold tracking-wider transition-all cursor-pointer flex items-center space-x-1.5 ${
              activeFilter === 'gastronomy'
                ? 'bg-[#E5C07B] text-[#580714] font-bold shadow-md'
                : 'text-[#FFF8F2]/80 hover:text-[#FFF8F2] hover:bg-[#7A0C1E]/60'
            }`}
          >
            <Utensils className="w-3 h-3" />
            <span>{t.map3dFilterGastronomy}</span>
          </button>

          <button
            onClick={() => setActiveFilter('culture')}
            className={`px-3 py-1.5 rounded-full text-xs font-semibold tracking-wider transition-all cursor-pointer flex items-center space-x-1.5 ${
              activeFilter === 'culture'
                ? 'bg-[#E5C07B] text-[#580714] font-bold shadow-md'
                : 'text-[#FFF8F2]/80 hover:text-[#FFF8F2] hover:bg-[#7A0C1E]/60'
            }`}
          >
            <Footprints className="w-3 h-3" />
            <span>{t.map3dFilterCulture}</span>
          </button>
        </div>

        {/* Right: Lighting Mode Toggle + Reset View */}
        <div className="flex items-center space-x-2 pointer-events-auto">
          {/* Day / Night Toggle */}
          <button
            onClick={() => setIsNightMode(!isNightMode)}
            className="p-2.5 rounded-full bg-[#580714]/90 backdrop-blur-md border border-[#FFF8F2]/15 text-[#E5C07B] hover:text-[#FFF8F2] transition-colors shadow-xl cursor-pointer"
            title={isNightMode ? 'Atardecer Dorado' : 'Noche Íntima'}
            aria-label="Toggle Lighting"
          >
            {isNightMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>

          {/* Reset Camera to BRUT */}
          <button
            onClick={handleResetView}
            className="flex items-center space-x-1.5 px-3.5 py-2 rounded-full bg-[#580714]/90 backdrop-blur-md border border-[#FFF8F2]/15 text-[#E5C07B] hover:text-[#FFF8F2] text-xs font-semibold tracking-wider transition-all shadow-xl cursor-pointer hover:border-[#E5C07B]"
            title={t.map3dResetView}
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">{t.map3dResetView}</span>
          </button>
        </div>

      </div>

      {/* 3D Canvas Mount Element */}
      <div 
        ref={containerRef} 
        className="w-full h-full flex-1 cursor-grab active:cursor-grabbing min-h-[500px]"
      />

      {/* Camera Zoom Buttons on Right Side */}
      <div className="absolute right-4 top-1/2 -translate-y-1/2 z-20 flex flex-col space-y-2 pointer-events-auto">
        <button
          onClick={handleZoomIn}
          className="w-9 h-9 rounded-full bg-[#580714]/90 backdrop-blur-md border border-[#FFF8F2]/20 text-[#FFF8F2] hover:text-[#E5C07B] hover:border-[#E5C07B] flex items-center justify-center shadow-xl transition-all cursor-pointer"
          title="Zoom In"
        >
          <ZoomIn className="w-4 h-4" />
        </button>
        <button
          onClick={handleZoomOut}
          className="w-9 h-9 rounded-full bg-[#580714]/90 backdrop-blur-md border border-[#FFF8F2]/20 text-[#FFF8F2] hover:text-[#E5C07B] hover:border-[#E5C07B] flex items-center justify-center shadow-xl transition-all cursor-pointer"
          title="Zoom Out"
        >
          <ZoomOut className="w-4 h-4" />
        </button>
      </div>

      {/* Subtle Bottom Instruction Bar */}
      <div className="absolute bottom-3 left-4 right-4 z-10 pointer-events-none hidden md:flex items-center justify-between text-[11px] text-[#FFF8F2]/60 font-mono tracking-wider">
        <span className="bg-[#580714]/80 px-3 py-1 rounded-full backdrop-blur-sm border border-[#FFF8F2]/10">
          {t.map3dInstruction}
        </span>
        <span className="bg-[#580714]/80 px-3 py-1 rounded-full backdrop-blur-sm border border-[#FFF8F2]/10 text-[#E5C07B]">
          Av. Independencia 320 • San Telmo
        </span>
      </div>

      {/* Hover Tooltip (if cursor over marker) */}
      {hoveredLandmark && !isInteracting && (
        <div className="absolute top-20 left-1/2 -translate-x-1/2 z-30 pointer-events-none bg-[#580714]/95 text-[#FFF8F2] px-4 py-2 rounded-2xl border border-[#E5C07B]/40 shadow-2xl backdrop-blur-md flex items-center space-x-2 animate-fade-in">
          <span className="w-2 h-2 rounded-full bg-[#E5C07B] animate-ping" />
          <span className="font-editorial text-sm text-[#E5C07B]">{hoveredLandmark.name[lang]}</span>
          {!hoveredLandmark.isOrigin && (
            <span className="text-[11px] font-mono text-[#FFF8F2]/75">
              • 🚶 {hoveredLandmark.walkingTimeMin} min
            </span>
          )}
        </div>
      )}

      {/* Selected Landmark Info Drawer / Bottom Sheet */}
      {selectedLandmark && (
        <div className="absolute bottom-4 left-4 right-4 sm:left-6 sm:right-auto sm:max-w-md z-30 pointer-events-auto">
          <div className="glass-bubble-solid rounded-3xl p-5 sm:p-6 border border-[#E5C07B]/40 shadow-2xl backdrop-blur-2xl relative animate-fade-in">
            
            {/* Close Button */}
            <button
              onClick={() => setSelectedLandmark(null)}
              className="absolute top-4 right-4 text-[#FFF8F2]/60 hover:text-[#FFF8F2] p-1.5 rounded-full hover:bg-[#FFF8F2]/10 transition-colors"
              aria-label={t.map3dCloseCard}
            >
              <X className="w-4 h-4" />
            </button>

            {/* Header: Category Badge + Distance from BRUT bar */}
            <div className="flex items-center space-x-2 mb-2">
              <span className="inline-flex items-center space-x-1 px-2.5 py-1 rounded-full text-[10px] font-semibold uppercase tracking-wider bg-[#E5C07B] text-[#580714]">
                {getCategoryIcon(selectedLandmark.category)}
                <span>{selectedLandmark.categoryLabel[lang]}</span>
              </span>

              {!selectedLandmark.isOrigin && (
                <span className="inline-flex items-center space-x-1 px-2.5 py-1 rounded-full text-[10px] font-mono font-medium tracking-wide bg-[#7A0C1E]/80 border border-[#FFF8F2]/15 text-[#E5C07B]">
                  <Footprints className="w-3 h-3" />
                  <span>{selectedLandmark.walkingTimeMin} min ({selectedLandmark.distanceMeters}m)</span>
                </span>
              )}
            </div>

            {/* Landmark Title */}
            <h3 className="font-editorial text-2xl sm:text-3xl text-[#FFF8F2] leading-tight">
              {selectedLandmark.name[lang]}
            </h3>

            {/* Address */}
            <div className="flex items-center space-x-1.5 text-xs text-[#E5C07B] mt-1 font-sans-clean">
              <MapPin className="w-3.5 h-3.5 shrink-0" />
              <span>{selectedLandmark.address}</span>
            </div>

            {/* Tagline */}
            <p className="text-xs font-medium text-[#FFF8F2]/90 mt-2 font-sans-clean italic">
              «{selectedLandmark.tagline[lang]}»
            </p>

            {/* Detailed Description */}
            <p className="text-xs text-[#FFF8F2]/75 mt-2 font-sans-clean font-light leading-relaxed">
              {selectedLandmark.description[lang]}
            </p>

            {/* Action Bar */}
            <div className="mt-4 pt-3 border-t border-[#FFF8F2]/10 flex items-center justify-between gap-3">
              <span className="text-[11px] text-[#FFF8F2]/60 font-mono">
                {selectedLandmark.isOrigin 
                  ? 'Epicentro BRUT' 
                  : `${selectedLandmark.walkingTimeMin} min ${t.map3dWalkingFromBrut}`}
              </span>

              <a
                href={selectedLandmark.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 rounded-full bg-[#E5C07B] hover:bg-[#FFF8F2] text-[#580714] font-semibold text-xs transition-all flex items-center space-x-1.5 shadow-md group shrink-0"
              >
                <span>{t.map3dOpenRoute}</span>
                <ExternalLink className="w-3.5 h-3.5 group-hover:scale-110 transition-transform" />
              </a>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};
