(function () {
    var version = '1.0';
    var scripts = [
        'js/lib/jquery.js',
        'js/lib/bootstrap/bootstrap.js',
        'js/lib/jquerySticky/jquerySticky.js',
        'js/lib/easing/easing.js',
        'js/lib/easyPieChart/easyPieChart.js',
        'js/lib/imageload/imageload.js',
        'js/lib/isotope/isotope.js',
        'js/lib/parallax/parallax.js',
        'js/lib/carousel/carousel.js',
        'js/lib/nav/nav.js'
    ];

    var temp = [];
    for (var i = 0; i < scripts.length; i ++) {
        temp.push('<script src="' + scripts[i] + '?' + version +'"><\/script>');
    }
    document.write(temp.join(''));
})();