module.exports = function(grunt) {

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        uglify: {
            options: {
                banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
            },
            main: {
                files:{
                    'js/common.min.js':[
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
                    ],
                    'js/main.min.js': 'js/main.js'
                }
            }
        },
        cssmin:{
            main:{
                files:{
                    'css/common.min.css':['css/common.css'],
                    'css/style.min.css':['css/style.css']
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-cssmin');

    // Default task(s).
    grunt.registerTask('default', ['uglify', 'cssmin']);

};