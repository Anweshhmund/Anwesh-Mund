// Initialize Three.js scene
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });

// Set up renderer
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);
document.body.insertBefore(renderer.domElement, document.body.firstChild);
renderer.domElement.style.position = 'fixed';
renderer.domElement.style.top = '0';
renderer.domElement.style.left = '0';
renderer.domElement.style.zIndex = '-1';

// Create animated background
const geometry = new THREE.IcosahedronGeometry(20, 1);
const material = new THREE.MeshPhongMaterial({
    color: 0x00ff88,
    wireframe: true,
    transparent: true,
    opacity: 0.3
});
const sphere = new THREE.Mesh(geometry, material);
scene.add(sphere);

// Add lights
const light = new THREE.DirectionalLight(0xffffff, 1);
light.position.set(0, 0, 1);
scene.add(light);

const ambientLight = new THREE.AmbientLight(0x404040);
scene.add(ambientLight);

// Position camera
camera.position.z = 30;

// Animation loop
function animate() {
    requestAnimationFrame(animate);
    
    sphere.rotation.x += 0.001;
    sphere.rotation.y += 0.002;
    
    // Add wave effect
    const time = Date.now() * 0.001;
    sphere.geometry.vertices.forEach(vertex => {
        const wave = 0.3 * Math.sin(vertex.x * 2 + time);
        vertex.z = wave;
    });
    sphere.geometry.verticesNeedUpdate = true;
    
    renderer.render(scene, camera);
}

// Handle window resize
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

// Initialize VANTA.NET effect
VANTA.NET({
    el: "body",
    mouseControls: true,
    touchControls: true,
    gyroControls: false,
    minHeight: 200.00,
    minWidth: 200.00,
    scale: 1.00,
    scaleMobile: 1.00,
    color: 0x00ff88,
    backgroundColor: 0x020338,
    points: 15.00,
    maxDistance: 20.00,
    spacing: 15.00
});

// Start animation
animate(); 