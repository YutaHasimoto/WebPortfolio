window.addEventListener("DOMContentLoaded", init);

function init() {
    const width = innerWidth;
    const height = 500;

    // レンダラーを作成
    const canvasElement = document.querySelector('#amoungus');
    const renderer = new THREE.WebGLRenderer({
        antialias: true,
        canvas: canvasElement,
    });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(width, height);
    renderer.setClearColor(0xffffff); // 背景色を黒に設定

    // シーンを作成
    const scene = new THREE.Scene();

    // カメラを作成
    const camera = new THREE.PerspectiveCamera(45, width / height, 1, 10000);
    camera.position.set(0, 3, 8);

    // カメラコントローラーを作成
    const controls = new THREE.OrbitControls(camera, canvasElement);
    controls.enableDamping = true;
    controls.enableZoom = false;
    controls.dampingFactor = 0.2;

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
    mtlLoader.load('3d/amongus/amongus.mtl', function (materials) {
        materials.preload();
        const objLoader = new THREE.OBJLoader();
        objLoader.setMaterials(materials);
        objLoader.load(
            '3d/amongus/amongus.obj',
            function (obj) {
                scene.add(obj);
                obj.position.x = 0;
                obj.position.y = 1;
                obj.rotation.y = 0.5;
            },
        );
    });

    tick();

    function tick() {
        renderer.render(scene, camera); // レンダリング
        requestAnimationFrame(tick);
    }
}