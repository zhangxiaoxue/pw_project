/**
 * Created by zhangxiaoxue on 14/11/16.
 */

$(function() {

    var hash = window.location.hash;

    //init chart to enhance vivid effect
    var initChart = function(){
        //图表
        $('.chart').easyPieChart({
            barColor: '#ee716f',
            easing: 'easeOutBounce',
            size: 150,
            onStep: function(from, to, percent) {
                $(this.el).find('.percent').text(Math.round(percent));
            }
        });
    };

    //make the navigation compatible in mobile pages
    $('.nav li').click(function(event) {
        event.preventDefault();
        $(".nav li").each(function(index) {
            $(this).attr('class', '')
        });
        $(this).attr('class', 'current');
        $('.collapse').removeClass('in');
    });

    var effects = {
        '.work-cnt': 'fadeInRight',
        '.contact-item': 'fadeInUp',
        '.mail-link': 'rubberBand'
    };

    var addAnimation = function(selector){
        var $container = $(selector);
        for(var selector in effects){
            if($(selector, $container).hasClass('animated')) return;

            var duration = 1;
            var delay = 0;
            if($(selector, $container).length){

                $(selector, $container).each(function(){
                    $(this).css('-webkit-animation-duration', duration + 's');
                    $(this).css('-webkit-animation-delay', delay + 's');
                    $(this).addClass('animated ' + effects[selector] + ' visible');

                    delay = delay + 0.2;
                });
            }else{
                $(selector, $container).css('-webkit-animation-duration', duration + 's');
                $(this).addClass('animated ' + effects[selector] + ' visible');
            }
        }
    };
    
    var goSection = function(id, type){
        var offset = id ? $(id).offset().top : 0;
        var type = type || 0;

        $('html, body').animate({
            scrollTop: offset
        }, 500, 'swing', function(){
            var $nav = $('#nav');
            $('a', $nav).removeClass('current');
            $('a[href="' + id + '"]', $nav).addClass('current');
            if(type == 0)
                window.location.hash = id;
        });
    };

    //go to the first section
    $('#gotosection').on('click', function(e){
        e.preventDefault();
        var targetId = $(this).attr('href');
        goSection(targetId);
    });

    $('#nav').onePageNav({
        currentClass: 'current',
        changeHash: true,
        scrollSpeed: 500,
        scrollThreshold: 0.5,
        filter: '',
        easing: 'swing',
        begin: function() {
        },
        end: function() {
            var hash = window.location.hash;
            if(hash === '#skills'){
                initChart();
            }
            addAnimation(hash);
        },
        scrollChange: function($currentListItem) {
            var currentListItem = $currentListItem.text().toLowerCase();
            if(currentListItem === 'skills'){
                initChart();
            }

            addAnimation('#' + currentListItem);
            console.log('trigger')
        }
    });
    $('.navbar-collapse').on('click', 'a', function(e){
        e.preventDefault();
        $('.navbar-collapse').removeClass('in').addClass('collapse').height(0);
    });

    //stick the navigation of the website.
    $('.main-nav').sticky({
        topSpacing: 0
    });

    //filter the categories of my works.
    var $container = $('.portfolio-container').imagesLoaded(function() {
        $container.isotope({
            itemSelector: '.mt',
            layoutMode: 'masonry'
        });
    });
    var $optionSets = $('#options .option-set'),
        $optionLinks = $optionSets.find('a');
    $optionLinks.click(function() {
        var $this = $(this);
        if ($this.hasClass('selected')) {
            return false
        }
        var $optionSet = $this.parents('.option-set');
        $optionSet.find('.selected').removeClass('selected');
        $this.addClass('selected');
        var options = {}, key = $optionSet.attr('data-option-key'), value = $this.attr('data-option-value');
        value = value === 'false' ? false : value;
        options[key] = value;
        if (key === 'layoutMode' && typeof changeLayoutMode === 'function') {
            changeLayoutMode($this, options)
        } else {
            $container.isotope(options)
        }
        return false
    });

    //Portfolio Detail
    var showProjectDetail = function(url, currentIndex){
        $projectWrapper.html('<div class="loading-wrapper">' +
                '<div class="tp-loader circle-loader"></div>' +
            '</div>').fadeIn();
        $.get(url, function(content){
            var $inner = $('<div></div>').append(content);

            imagesLoaded($inner.find('.project-samples .item').eq(0), function(){
                $projectWrapper.html($inner);
                $("#project-samples").owlCarousel({
                    navigation : true, // Show next and prev buttons
                    slideSpeed : 300,
                    paginationSpeed : 400,
                    singleItem:true,
                    autoHeight : true
                });
            });
        }, 'html');
        $('html').css('overflow', 'hidden');
        window.location.hash = '#portfolio&work' + currentIndex;
    };


    var $projectWrapper = $('#project-wrapper');
    //Exit
    $projectWrapper.on('click', '.controls .close', function(e){
        e.preventDefault();
        $projectWrapper.hide();
        $('html').css('overflow', 'auto');
        //window.location.hash = '#portfolio';
    });

    //Previous Page
    $projectWrapper.on('click', '.controls .prev', function(e){
        e.preventDefault();
        var index = $(this).data('index');
        var url = './portfolio/' + (index-1) + '.html';
        showProjectDetail(url, index-1);
    });

    //Next Page
    $projectWrapper.on('click', '.controls .next', function(e){
        e.preventDefault();
        var index = $(this).data('index');
        var url = './portfolio/' + (index+1) + '.html';
        showProjectDetail(url, index+1);
    });

    //link to project details
    $('.project-link').on('click', function(e){
        e.preventDefault();
        var index = $(this).data('index');
        var url = $(this).attr('href');
        showProjectDetail(url, index);
    });

    //add hashchange event to navigate the history of the browser.
    $(window).on('hashchange', function(e){
        e.preventDefault();
        var hash = window.location.hash;
        if(hash.search('&') !== -1){
            var hashs = hash.split('&');
            var workIndex = hashs[1].match(/\d+/g)[0];
            var url = './portfolio/' + workIndex + '.html';
            showProjectDetail(url, workIndex);
        }
    });

    var init = function(){
        var start = function(){
            $('#home').parallax({
                imageSrc: 'img/slide/home_4.jpg',
                naturalWidth: 1800,
                naturalHeight: 1350
            });
            $("#page-loader").delay(200).fadeOut("slow");
            $('#text-slide').delay(200).addClass('text-slide');
        };

        if(hash){
            var section = hash.split('&')[0];

            if(section === '#portfolio'){

                goSection('#portfolio', 1);

                //router for work
                if(hash.split('&')[1]){
                    start();
                    var workIndex = hash.split('&')[1].match(/\d+/g)[0];
                    var url = './portfolio/' + workIndex + '.html';
                    showProjectDetail(url, workIndex);
                }else{
                    imagesLoaded('.portfolio-container', function(){
                        start();
                    });
                }
                return;
            }else{
                goSection('#home');
            }
        }

        imagesLoaded('#preload', function(){
            start();
        });
    };
    init();

});
