//アコーディオンを押したら開く
$(document).ready(function() {
    $('.faq dt').on('click', function() {
        $(this).next('dd').slideToggle();
        $(this).toggleClass('active');
    });
});

// アコーディオンセクションをすべて開く
$(document).ready(function() {
    // すべてのアコーディオンセクションを開く関数
    function expandAllAccordions() {
        // dd要素をすべて表示する
        $('dd').show();
    }

    // すべて開くボタンにイベントリスナーを追加
    $('#expandAll').on('click', expandAllAccordions);
});
