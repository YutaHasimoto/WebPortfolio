window.addEventListener("DOMContentLoaded", init);

function init() {
    const width = innerWidth;
    const height = 500;

    // レンダラーを作成
    const canvasElement = document.querySelector('#mcd');
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
    camera.position.set(0, 25, 150);

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
    const objLoader = new THREE.OBJLoader();
    objLoader.load(
        '3d/cad/mcd.obj',
        function (obj) {
            obj.traverse(function (child) {
                if (child instanceof THREE.Mesh) {
                    child.material = new THREE.MeshStandardMaterial({ color: 0x333333 });
                }
            });
            scene.add(obj);
            obj.position.x = 0;
            obj.position.y = -50
            obj.rotation.x = -1.57;
            obj.rotation.y = 0;
            obj.rotation.z = 0.78;
        }
    );

    tick();

    function tick() {
        renderer.render(scene, camera); // レンダリング
        requestAnimationFrame(tick);
    }
}
