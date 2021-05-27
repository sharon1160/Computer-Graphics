
// utilizado cuando queremos poner la lampara dentro de la scene como un mesh
function makeXYZGUI(gui, vector3, name, onChangeFn) {
    const folder = gui.addFolder(name);
    folder.add(vector3, 'x', -20, 20).onChange(onChangeFn);
    folder.add(vector3, 'y', 0, 20).onChange(onChangeFn);
    folder.add(vector3, 'z', -20, 20).onChange(onChangeFn);
    folder.open();
}



// utilizado por GUI para modificar los parametros de light en la scena
class ColorGUIHelper {
    constructor(object, prop) {
        this.object = object;
        this.prop = prop;
    }
    get value() {
        return `#${this.object[this.prop].getHexString()}`;
    }
    set value(hexString) {
        this.object[this.prop].set(hexString);
    }
}

// para convertir de radiaanes a grados
class DegRadHelper {
    constructor(obj, prop) {
    this.obj = obj;
    this.prop = prop;
    }
    get value() {
        return THREE.MathUtils.radToDeg(this.obj[this.prop]);
    }
    set value(v) {
        this.obj[this.prop] = THREE.MathUtils.degToRad(v);
    }
}

// camera //////////////////////////////////////////////////
const fov = 45;
const aspect = window.innerWidth/window.innerHeight;  // the canvas default
const near = 0.1;
const far = 100;
const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
camera.position.set(0, 10, 35);

// scene //////////////////////////////////////////////////
var scene = new THREE.Scene();
scene.backgroundColor = new THREE.Color(0xffffff);

// mesh //////////////////////////////////////////////////
//cuboGrande
const cube_sizeG = 6;
var geometry_cubeG = new THREE.BoxGeometry(cube_sizeG, cube_sizeG, cube_sizeG);
const edgesG = new THREE.EdgesGeometry( geometry_cubeG );
const colorCuboGrande = new THREE.MeshLambertMaterial( {color:"#bca886" } );
var cubeG = new THREE.Mesh( geometry_cubeG, colorCuboGrande );
var edgecubeG = new THREE.LineSegments(edgesG,new THREE.LineBasicMaterial({color:'#d9c7aa'}))
cubeG.position.set(15, cube_sizeG/2, -5);
edgecubeG.position.set(15, cube_sizeG/2, -5);
cubeG.castShadow = true;
scene.add(cubeG);
scene.add(edgecubeG)

//cuboGrandeBajo
const cube_sizeGB = 6.5;
var geometry_cubeGB = new THREE.BoxGeometry(cube_sizeGB, cube_sizeGB/3, cube_sizeGB);
const edgesGB = new THREE.EdgesGeometry( geometry_cubeGB );
const texture_1 = new THREE.TextureLoader().load( 'textures/fondo_pared_ladrillo.jpg' );
var material_1 = new THREE.MeshLambertMaterial( {map: texture_1 } );
var cubeGB = new THREE.Mesh( geometry_cubeGB,material_1 );
var edgecubeGB = new THREE.LineSegments(edgesGB,new THREE.LineBasicMaterial({color:'#613422'}))
cubeGB.position.set(15, cube_sizeGB/6, -5);
edgecubeGB.position.set(15, cube_sizeGB/6, -5);
scene.add(cubeGB);
scene.add(edgecubeGB)

//planoVerdePasto
const geometry_plane = new THREE.PlaneGeometry( 40, 40, 32 );
const colorPiso = new THREE.MeshLambertMaterial( {color:"#59aa63" } );
const plane = new THREE.Mesh( geometry_plane, colorPiso );
plane.rotation.x = Math.PI * -.5;
plane.receiveShadow = true;
scene.add( plane );

//Cono techo
const geometry_techo = new THREE.ConeGeometry( 4.3,2.5, 4,1,0,0);
const colorTecho = new THREE.MeshLambertMaterial( {color: '#d9c7aa'} );
const coneTecho = new THREE.Mesh( geometry_techo,colorTecho );
coneTecho.position.set(15, cube_sizeGB+0.5, -5);
coneTecho.rotation.y=0.79;
scene.add(coneTecho );

//Fuente
const Aguasize =0.2;
const geometryAgua = new THREE.CylinderGeometry( 3, 3, Aguasize, 32 );
const colorAgua = new THREE.MeshLambertMaterial( {color: '#b4cbd6'} );
const cylinderAgua = new THREE.Mesh( geometryAgua, colorAgua );
cylinderAgua.position.set(0, Aguasize/2, 0);
cylinderAgua.opacity = 0.2;
scene.add( cylinderAgua );

const geometryG1 = new THREE.TorusGeometry( 10, 3, 16, 100 );
const materialG1 = new THREE.MeshLambertMaterial( { color: 0xffff00 } );
const torusG1= new THREE.Mesh( geometryG1, materialG1 );
torusG1.rotation.x = Math.PI * -.5;
//scene.add( torusG1 );

//A1
const geometryA1 = new THREE.SphereGeometry(3,9,4 );
const edgesA1 = new THREE.EdgesGeometry( geometryA1 );
const materialA1 = new THREE.MeshLambertMaterial( {color: '#44cc44'} );
const sphereA1 = new THREE.Mesh( geometryA1, materialA1 );
sphereA1.position.set(5, cube_sizeGB, -12);
scene.add( sphereA1 );
//T1
const geometryT1 = new THREE.CylinderGeometry( 0.1,1,5, 64 );
const materialT1 = new THREE.MeshLambertMaterial( {color: '#a95541'} );
const cylinderT1 = new THREE.Mesh( geometryT1, materialT1 );
cylinderT1.position.set(5, cube_sizeGB/3, -12);
scene.add( cylinderT1 );

//A2
const geometryA2 = new THREE.OctahedronGeometry(4,2);
const edgesA2 = new THREE.EdgesGeometry( geometryA2 );
const materialA2 = new THREE.MeshLambertMaterial( {color: '#44cc44'} );
const OctahedronA2 = new THREE.Mesh( geometryA2, materialA2 );
OctahedronA2.position.set(14, cube_sizeGB+1, -12);
scene.add(OctahedronA2)
//T2
const geometryT2 = new THREE.CylinderGeometry( 0.5,1,5, 64 );
const materialT2 = new THREE.MeshLambertMaterial( {color: '#a95541'} );
const cylinderT2 = new THREE.Mesh( geometryT2, materialT2 );
cylinderT2.position.set(14, cube_sizeGB/3, -12);
scene.add( cylinderT2 );





////////////////////////////////////////////////////////////
// HemisphereLight light ///////////////////////////////////
const skyColor = 0xB1E1FF;  // light blue
const groundColor = 0x59340B;  // black
const hemisphere_light = new THREE.HemisphereLight(skyColor, groundColor, 0.5);
scene.add(hemisphere_light);

////////////////////////////////////////////////////////////
// DirectionalLight  ///////////////////////////////////////
const color = 0xFFFFFF;
const intensity = 1;
const light = new THREE.DirectionalLight(color, intensity);
light.castShadow = true;
light.position.set(0, 10, 0);
light.target.position.set(-4, 0, -4);

light.shadow.mapSize.width = 1024; // default
light.shadow.mapSize.height = 1024; // default
light.shadow.camera.near = 0.5; // default
light.shadow.camera.far = 1000; // default

scene.add(light);
scene.add(light.target);

const helper = new THREE.DirectionalLightHelper(light);
scene.add(helper);

const onChange = () => {
    light.target.updateMatrixWorld();
    helper.update();
};
onChange();

const gui = new GUI();
gui.addColor(new ColorGUIHelper(light, 'color'), 'value').name('color');
gui.add(light, 'intensity', 0, 2, 0.01);

makeXYZGUI(gui, light.position, 'position', onChange);
makeXYZGUI(gui, light.target.position, 'target', onChange);


// renderer //////////////////////////////////////////////////
var renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );
renderer.shadowMapEnabled = true;
renderer.shadowMap.type = THREE.PCFShadowMap;
renderer.render( scene, camera );

// OrbitControls /////////////////////////////////////////////
var controls = new OrbitControls( camera, renderer.domElement );



// animation //////////////////////////////////////////////////
var animate = function(){
    requestAnimationFrame(animate);
    renderer.render( scene, camera );
}
animate();

// redimensioar  /////////////////////////////////////////////
window.addEventListener('resize', redimensionar);
function redimensionar(){
    camera.aspect = window.innerWidth/window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize( window.innerWidth, window.innerHeight );
    renderer.render( scene, camera );
}