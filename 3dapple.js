window.addEventListener("DOMContentLoaded", init);

function init() {
    const width = innerWidth;
    const height = 500;

    // レンダラーを作成
    const canvasElement = document.querySelector('#apple');
    const renderer = new THREE.WebGLRenderer({
        antialias: true,
        canvas: canvasElement,
    });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(width, height);
    renderer.setClearColor(0x999999); // 背景色を黒に設定

    // シーンを作成
    const scene = new THREE.Scene();

    // カメラを作成
    const camera = new THREE.PerspectiveCamera(45, width / height, 1, 10000);
    camera.position.set(0, 1, 10);

    // カメラコントローラーを作成
    const controls = new THREE.OrbitControls(camera, canvasElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.2;
    controls.enableZoom = false;

    // 環境光源を作成
    const ambientLight = new THREE.AmbientLight(0xffffff);
    ambientLight.intensity = 0.5;
    scene.add(ambientLight);

    // 平行光源を作成
    const directionalLight = new THREE.DirectionalLight(0x999999);
    directionalLight.intensity = 1;
    directionalLight.position.set(1, 3, 1);
    scene.add(directionalLight);

    // 3Dモデルの読み込み
    const mtlLoader = new THREE.MTLLoader();
    mtlLoader.load('3d/apple/apples.mtl', function (materials) {
        materials.preload();
        const objLoader = new THREE.OBJLoader();
        objLoader.setMaterials(materials);
        objLoader.load(
            '3d/apple/apples.obj',
            function (obj) {
                scene.add(obj);
                obj.position.x = 0;
                obj.position.y = 0;
                obj.rotation.y = 0;
            },
        );
    });

    tick();

    function tick() {
        renderer.render(scene, camera); // レンダリング
        requestAnimationFrame(tick);
    }
}