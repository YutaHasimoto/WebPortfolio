window.addEventListener("DOMContentLoaded", init);

let obj; // 3Dモデルを格納するためのグローバル変数

function init() {
    const width = innerWidth;
    const height = 1000;

    // レンダラーを作成
    const canvasElement = document.querySelector('#myCanvas');
    const renderer = new THREE.WebGLRenderer({
        antialias: true,
        canvas: canvasElement,
    });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(width, height);
    renderer.setClearColor(0xffffff); // 背景色を白に設定

    // シーンを作成
    const scene = new THREE.Scene();

    // カメラを作成
    const camera = new THREE.PerspectiveCamera(45, width / height, 1, 10000);
    camera.position.set(0, 1, 6);

    // カメラコントローラーを作成
    const controls = new THREE.OrbitControls(camera, canvasElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.2;
    controls.enableZoom = false; // ズーム操作を無効化

    // 環境光源を作成
    const ambientLight = new THREE.AmbientLight(0xffffff);
    ambientLight.intensity = 0.5;
    scene.add(ambientLight);

    // 平行光源を作成
    const directionalLight = new THREE.DirectionalLight(0xffffff);
    directionalLight.intensity = 1;
    directionalLight.position.set(1, 3, 1);
    scene.add(directionalLight);

    // 3Dモデルの読み込み
    const mtlLoader = new THREE.MTLLoader();
    mtlLoader.load('3d/rooms/room.mtl', function (materials) {
        materials.preload();
        const objLoader = new THREE.OBJLoader();
        objLoader.setMaterials(materials);
        objLoader.load(
            '3d/rooms/room.obj',
            function (loadedObj) {
                obj = loadedObj; // 読み込んだ3Dモデルをobjに代入
                scene.add(obj);
                obj.position.x = 0;
                obj.position.y = 0;
                obj.rotation.y = 30;
            },
        );
    });

    tick();

    function tick() {
        if (obj) {
            obj.rotation.y += 0.01; // 3DモデルをY軸で回転させる
        }
        renderer.render(scene, camera); // レンダリング
        requestAnimationFrame(tick);
    }
}
