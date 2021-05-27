//console.log('Hello wolrd')

Physijs.scripts.worker = 'js/physijs_worker.js';
//Physijs.scripts.ammo = "http://chandlerprall.github.io/Physijs/examples/js/ammo.js";

var scene = new Physijs.Scene();
scene.setGravity(new THREE.Vector3(0,-10,0));

var camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 0.1, 1000);

var renderer = renderer = new THREE.WebGLRenderer({antialias : true});



//color pallete
var black = "rgb(0,0,0)";

var fogEffect = 0;

renderer.setClearColor(black);
renderer.setSize(window.innerWidth, window.innerHeight);


var axes = new THREE.AxesHelper(30);
scene.add(axes);
/*
//Plane
var planeGeometry = new THREE.PlaneGeometry(70,30,1,1);
var planeMaterial = new THREE.MeshBasicMaterial({color:'green'});
//var plane = new THREE.Mesh(planeGeometry, planeMaterial);
var plane = new Physijs.BoxMesh(planeGeometry,planeMaterial);
plane.rotation.x = -0.5*Math.PI;
scene.add(plane);

//Cube
var cubeGeometry = new THREE.CubeGeometry(6,6,6);
var cubeMaterial = new THREE.MeshLambertMaterial({color:'red'});
//var cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
var cube = new Physijs.BoxMesh(cubeGeometry,cubeMaterial);
cube.position.x = -10;
cube.position.y = 30;
scene.add(cube);
*/
var variable = -1;
//Sphere
function add_sphere(){
var sphereGeometry = new THREE.SphereGeometry(1,20,20);
var sphereMaterial = new THREE.MeshLambertMaterial({wireframe: false,color:'red'});
//var sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
var sphere = new Physijs.SphereMesh(sphereGeometry, sphereMaterial);
sphere.position.x = 50;//rojo
sphere.position.y = 21.9;//verde
sphere.position.z = 2*variable+variable;//verde
variable = variable * (-1);
scene.add(sphere);
}



/*
//Donut
function add_donut(){
var donutGeometry = new THREE.TorusGeometry(3,2);
var donutMaterial = new THREE.MeshLambertMaterial({color:'blue'});
//var donut = new THREE.Mesh(donutGeometry, donutMaterial);
var donut = new Physijs.BoxMesh(donutGeometry, donutMaterial);
donut.position.x = -25;
donut.position.y = 120;
scene.add(donut);
}
*/
/*
if (fogEffect){
    scene.fog = new THREE.Fog(0xffffff, 5,120);
}
*/


function createTerrain(){
    var ground_material = Physijs.createMaterial(
        new THREE.MeshLambertMaterial({
            map: THREE.ImageUtils.loadTexture('grass.png')
        }),
        0.1,
        10
    );

    var ground_geometry = new THREE.PlaneGeometry(120,100,100,100);

    for(var  i=0; i<ground_geometry.vertices.length;i++){
        var vertex =ground_geometry.vertices[i];
        /*if((vertex.x%10==0) | (vertex.y%10==0)){
            value = 5;
        }else{
            value =0;
        }
        */
       
        value = noise.simplex2(vertex.x/100,vertex.y/100);
        vertex.z = Math.abs(value)*25;

        //vertex.z =value;
        
    }

    ground_geometry.computeFaceNormals();
    ground_geometry.computeVertexNormals();

    var ground = new Physijs.HeightfieldMesh(
        ground_geometry,
        ground_material,
        0,
        100,
        100
    );

    ground.rotation.x = Math.PI / -2 ;

    return ground;


};

scene.add(createTerrain());

//spotlight
var spotLight =new THREE.SpotLight(0xffffff);
spotLight.position.set(-40,60,40);
scene.add(spotLight);

camera.position.x =0;
camera.position.y =30;
camera.position.z =100;
//camera.lookAt(scene.position);

//FirstPersonControls
var cameraControllsFirstPerson = new THREE.FirstPersonControls(camera);
cameraControllsFirstPerson.lookSpeed = 0.05;
cameraControllsFirstPerson.movementSpeed = 10;

var step = 0;
var stepy = 0;

var clock = new THREE.Clock();


function renderScene(){
    //make update to position, rotation of objects in the scene
    step += 1;
    //stepy += 0.00005
    var delta = clock.getDelta();

    /*
    donut.rotation.y +=0.05;
    cube.rotation.y -= 0.1;
    sphere.rotation.y +=0.05;
    */
    //camera.position.x = 60*Math.cos(step);
    //camera.position.y += stepy;
    //camera.position.z = 60*Math.sin(step);
    //camera.lookAt(scene.position);
    console.log(step)
    //if(step % 20 == 0){
    if(step % 20 == 0){
        add_sphere();
        add_sphere();
        add_sphere();
        add_sphere();
    }
    cameraControllsFirstPerson.update(delta);
    renderer.clear();

    scene.simulate(); //to do physics

    requestAnimationFrame(renderScene);
    renderer.render(scene,camera);
}

$("#our_threejs_animation").append(renderer.domElement);
//renderer.render(scene,camera)
renderScene();




