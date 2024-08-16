document.addEventListener('DOMContentLoaded', (event) => {
    const balloon = document.getElementById('balloon');
    let timer;

    // フェードイン関数
    function fadeIn() {
        balloon.style.display = 'block';
        setTimeout(() => { balloon.style.opacity = 1; }, 200);
    }

    // フェードアウト関数
    function fadeOut() {
        balloon.style.opacity = 0;
        setTimeout(() => { balloon.style.display = 'none'; }, 200);
    }

    // 再表示タイマーをリセット
    function resetTimer() {
        clearTimeout(timer);
        timer = setTimeout(fadeIn, 1000);
    }

    // ページ読み込み後にフェードイン
    fadeIn();

    // 操作（クリック、マウス移動、スクロール）でフェードアウト、1秒後に再表示
    function userActivity() {
        fadeOut();
        resetTimer();
    }
    
    document.addEventListener('click', userActivity);
    document.addEventListener('mousemove', userActivity);
    window.addEventListener('scroll', userActivity);

    // 10秒間操作がなければ再表示
    resetTimer();
});