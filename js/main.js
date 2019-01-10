/**
 *	mCard (HTML)
 *	Copyright © mCard by beshleyua. All Rights Reserved.
 **/

$(function() {
    'use strict';

    var width = $(window).width();
    var height = $(window).height();

    /* Preloader */
    $(window).on('load', function() {
        $(".preloader .spinner").fadeOut(function() {
            $('.preloader').fadeOut();
            $('body').addClass('ready');
        });
    });

    /* Fade animations on scroll */
    if (width > 720) {
        window.sr = ScrollReveal();
        sr.reveal('.animated');
    }

    /* Youtube video background */
    var myPlayer = $("#video-bg").YTPlayer();

    /* Smoothscroll */
    if ($('#home-section').length) {
        $(window).on('scroll', function() {
            var scrollPos = $(window).scrollTop();
            $('.top-menu ul li a').each(function() {
                var currLink = $(this);
                var refElement = $(currLink.attr("href"));
                if (refElement.offset().top - 30 <= scrollPos) {
                    $('.top-menu ul li').removeClass("active");
                    currLink.closest('li').addClass("active");
                }
            });
        });
    }

    /* Top Menu */
    if ($('#home-section').length) {
        $('.top-menu ul li a').on('click', function() {
            var id = $(this).attr('href');
            var h = parseFloat($(id).offset().top);

            $('body,html').animate({
                scrollTop: h
            }, 800);

            return false;
        });
        $('.section').on('click', '.contact-btn', function() {
            $('.top-menu li a[href="#contact-section"]').click();

            return false;
        });
    }

    /* Open Top Menu */
    $('.page').on('click', '.menu-btn', function() {
        if ($('.top-menu').hasClass('active')) {
            $('.top-menu').removeClass('active');
        } else {
            $('.top-menu').addClass('active');
        }

        return false;
    });

    $('.page').on('click', function(e) {
        if ($('.top-menu').hasClass('active') && !$('.top-menu').is(e.target)) {
            $('.top-menu').removeClass('active');
        }
        return false;
    });
    /* Fixed Top Menu on scroll */
    $(window).on('scroll', function() {
        if ($(this).scrollTop() > 100) {
            $('.top-menu').addClass('fixed');
        } else {
            $('.top-menu').removeClass('fixed');
        }
    });

    /* Clients carousel */
    $(".reviews-carousel .owl-carousel").owlCarousel({
        items: 1,
        margin: 0,
        nav: false,
        dots: true,
        loop: false,
        smartSpeed: 600,
        mouseDrag: true,
        touchDrag: true,
        autoplay: false
    });

    /* Button hover effect */
    $('.btn_animated').on('mouseenter', '.circle', function(e) {
        if ($(this).find(".ink").length === 0) {
            $(this).prepend("<span class='ink'></span>");
        }
        var ink = $(this).find(".ink");
        ink.removeClass("animate");
        if (!ink.height() && !ink.width()) {
            var d = Math.max($(this).outerWidth(), $(this).outerHeight());
            ink.css({
                height: d,
                width: d
            });
        }
        var x = e.pageX - $(this).offset().left - ink.width() / 2;
        var y = e.pageY - $(this).offset().top - ink.height() / 2;
        ink.css({
            top: y + 'px',
            left: x + 'px'
        }).addClass("animate");
    });

    /* Validate contact form */
    $("#gform").validate({
        rules: {
            name: {
                required: true
            },
            message: {
                required: true
            },
            subject: {
                required: true
            },
            email: {
                required: true,
                email: true
            }
        },
        success: "valid",
        submitHandler: function() {
            var request = new XMLHttpRequest();
            var url = 'https://docs.google.com/forms/d/e/1FAIpQLSfDH614IOwvVBpiP2817rvl7PYHq9xGL12d1bfgMrB-iY3APQ/formResponse?entry.1937321077=' + $("#gform").find('input[name="entry.1937321077"]').val() + '&entry.1780941844=' + $("#gform").find('input[name="entry.1780941844"]').val() + '&entry.476731930=' + $("#gform").find('input[name="entry.476731930"]').val() + '&entry.1704654541=' + $("#gform").find('textarea[name="entry.1704654541"]').val();
            request.open('POST', url, true);
            request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
            request.send();
            request.onreadystatechange = function() {
                if (request.readyState ==4 && request.status == 0) {
                    $('#prepend_msg').text('Thanks, your message is sent successfully. I will contact you shortly!').fadeIn('slow');
                } else {
                    $('#prepend_msg').text('There was an error. Please refresh the page and try again!').fadeIn('slow');
                    }
                }
            }
    });


    /* Validate contact form */
    $("#blog-form").validate({
        rules: {
            name: {
                required: true
            },
            message: {
                required: true
            },
            email: {
                required: true,
                email: true
            }
        },
        success: "valid",
        submitHandler: function() {
            $('#blog-form').fadeOut();
            $('.alert-success').delay(1000).fadeIn();
        }
    });

    /* Initialize masonry items */
    var $container = $('.box-items');

    $container.imagesLoaded(function() {
        $container.multipleFilterMasonry({
            itemSelector: '.box-item',
            filtersGroupSelector: '.filters',
            percentPosition: true,
            gutter: 0
        });
    });

    /* 12. Initialize masonry filter */
    $('.filters label').on('change', 'input[type="radio"]', function() {
        if ($(this).is(':checked')) {
            $('.f_btn').removeClass('active');
            $(this).closest('.f_btn').addClass('active');
        }
        /* Refresh Portfolio magnific popup */
        $('.has-popup').magnificPopup({
            type: 'inline',
            overflowY: 'auto',
            closeBtnInside: true,
            mainClass: 'mfp-fade'
        });
    });

    /* Portfolio magnific popup */
    $('.has-popup').magnificPopup({
        type: 'inline',
        overflowY: 'auto',
        closeBtnInside: true,
        mainClass: 'mfp-fade'
    });

    /* gallery */
    $('.post-lightbox').magnificPopup({
        delegate: 'a',
        type: 'image',
        tLoading: 'Loading image #%curr%...',
        mainClass: 'mfp-img-mobile',
        gallery: {
            enabled: true,
            navigateByImgClick: true,
            preload: [0, 1] // Will preload 0 - before current, and 1 after the current image
        },
        image: {
            tError: '<a href="%url%">The image #%curr%</a> could not be loaded.'
        }
    });

    // if($('#home-section').length) {
    // 	google.maps.event.addDomListener(window, 'load', initMap);
    // }

});

function pushpinClicked(e) {
    //Make sure the infobox has metadata to display.
    if (e.target.metadata) {
        //Set the infobox options with the metadata of the pushpin.
        infobox.setOptions({
            location: e.target.getLocation(),
            description: e.target.metadata.description,
            visible: true,
            maxHeight: 155,
            maxWidth: 280
        });
    }
}

function loadMapScenario() {
    map = new Microsoft.Maps.Map(document.getElementById('myMap'), {
        center: new Microsoft.Maps.Location(40.639969, 22.951074),
        zoom: 15,
        enableClickableLogo: false,
        showMapTypeSelector: false,
        showTermsLink: false,
        showScalebar: false,
        customMapStyle: {
            elements: {
                area: {
                    fillColor: '#ffb6e591'
                },
                water: {
                    fillColor: '#ff75cff0'
                },
                tollRoad: {
                    fillColor: '#a964f4',
                    strokeColor: '#a964f4'
                },
                arterialRoad: {
                    fillColor: '#ffffff',
                    strokeColor: '#d7dae7'
                },
                road: {
                    fillColor: '#ffa35a',
                    strokeColor: '#ff9c4f'
                },
                street: {
                    fillColor: '#ffffff',
                    strokeColor: '#ffffff'
                }
            },
            settings: {
                landColor: '#efe9e1'
            }
        }
    });
    var pin = new Microsoft.Maps.Pushpin(map.getCenter(), {
        color: 'green'
    });
    pin.metadata = {
        description: 'Country: Greece<br>City: Thessaloniki<br>Address: Olympiados 80 <br>Postcode: 54633'
    };
    Microsoft.Maps.Events.addHandler(pin, 'click', pushpinClicked);
    infobox = new Microsoft.Maps.Infobox(map.getCenter(), {
        visible: true,
        location: map.getCenter(),
        description: pin.metadata.description,
        visible: true,
        maxHeight: 155,
        maxWidth: 280
    });
    infobox.setMap(map);
    map.entities.push(pin);
    setTimeout(function() {
        map.setOptions({
            customMapStyle: {
                elements: {
                    area: {
                        fillColor: '#b5db81'
                    },
                    water: {
                        fillColor: '#a3ccff'
                    },
                    tollRoad: {
                        fillColor: '#50a964f4',
                        strokeColor: '#50a964f4'
                    },
                    arterialRoad: {
                        fillColor: '#ffffff',
                        strokeColor: '#ffffff'
                    },
                    road: {
                        fillColor: '#50fed89d',
                        strokeColor: '#50eab671'
                    },
                    street: {
                        fillColor: '#ffffff',
                        strokeColor: '#ffffff'
                    },
                },
                settings: {
                    landColor: '#dfdfdf'
                }
            }
        });
    }, 3000);

}
