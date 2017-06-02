(function($) {
    'use strict';
    $(document).ready(function() {
        //$('#navBar li').removeClass('active');
        $('#navBar li a').on("click", function() {
            $(this).closest('li').addClass('active').siblings().removeClass('active');
        });

        //====== Backgroun Slider =======

        $('.single-slider').vegas({
            delay: 7000,
            overlay: true,
            animation: ['kenburns', 'kenburnsUp', 'kenburnsDown', 'kenburnsLeft', 'kenburnsRight', 'kenburnsUpLeft', 'kenburnsUpRight', 'kenburnsDownLeft', 'kenburnsDownRight'],
            slides: [{
                    src: 'images/01.jpg'
                },
                {
                    src: 'images/02.jpg'
                },
                {
                    src: 'images/03.jpg'
                },
                {
                    src: 'images/04.jpg'
                }
            ]
        });
        /*-------------------------------------
        Smooth scroll
            -------------------------------------*/
        $('a.smooth-scroll').on('click', function(e) {
            var anchor = $(this);
            $('html, body').stop().animate({
                scrollTop: $(anchor.attr('href')).offset().top
            }, 1000);
            e.preventDefault();
        });
        /*-------------------------------------
        	Scroll Up
        -------------------------------------*/
        $.scrollUp({
            scrollName: 'scrollUp', // Element ID
            topDistance: '300', // Distance from top before showing element (px)
            topSpeed: 300, // Speed back to top (ms)
            animation: 'fade', // Fade, slide, none
            animationInSpeed: 200, // Animation in speed (ms)
            animationOutSpeed: 200, // Animation out speed (ms)
            scrollText: '<a class="hvr-icon-bob click-top"></a>', // Text for element
            activeOverlay: false // Set CSS color to display scrollUp active point, e.g '#00FFFF'
        });
        
        /*-------------------------------------
            owlCarousel
        -------------------------------------*/
		$('.client-info').owlCarousel({
			loop: true,
			margin: 10,
			nav: false,
			animateIn: 'fadeIn',
			autoplay: true,
			responsive: {
				0: {
					items: 1
				},
				600: {
					items: 1
				},
				1000: {
					items: 1
				}
			}
		});

        /*-------------------------------------
            waypoints
        -------------------------------------*/
        var $progress = $('.counter, .barfiller');
        $progress.waypoint(function() {

            /*-------------------------------------
            Progress Bar
        -------------------------------------*/
            var progressbarOne = $('#bar1');
            var progressbarTwo = $('#bar2');
            var progressbarThree = $('#bar3');
            var progressbarFour = $('#bar4');
            var progressbarFive = $('#bar5');
            var progressbarSix = $('#bar6');

            progressbarOne.barfiller();
            progressbarTwo.barfiller();
            progressbarThree.barfiller();
            progressbarFour.barfiller();
            progressbarFive.barfiller();
            progressbarSix.barfiller();

            /*-------------------------------------
            counterUp
        -------------------------------------*/
            var CounterUp = $('.counter');

            CounterUp.each(function() {
                var $this = $(this),
                    countTo = $this.attr('data-count');
                $({
                    countNum: $this.text()
                }).animate({
                    countNum: countTo
                }, {
                    duration: 2500,
                    easing: 'linear',
                    step: function() {
                        $this.text(Math.floor(this.countNum));
                    },
                    complete: function() {
                        $this.text(this.countNum);
                        //alert('finished');
                    }
                });
            });
        }, {
            offset: '100%'
        });
        
        // Get the form.
        var form = $('#contactForm');

        // Get the messages div.
        var formMessages = $('#form-messages');

        // Set up an event listener for the contact form.
        $(form).submit(function(e) {
            // Stop the browser from submitting the form.
            e.preventDefault();

            // Serialize the form data.
            var formData = $(form).serialize();

            // Submit the form using AJAX.
            $.ajax({
                type: 'POST',
                url: $(form).attr('action'),
                data: formData
            })
            .done(function(response) {
                // Make sure that the formMessages div has the 'success' class.
                $(formMessages).removeClass('error');
                $(formMessages).addClass('success');

                // Set the message text.
                $(formMessages).text(response);

                // Clear the form.
                $('#name').val('');
                $('#email').val('');
                $('#message').val('');
            })
            .fail(function(data) {
                // Make sure that the formMessages div has the 'error' class.
                $(formMessages).removeClass('success');
                $(formMessages).addClass('error');

                // Set the message text.
                if (data.responseText !== '') {
                    if((data.responseText.indexOf("Cannot POST /contact.php")!=-1) ||(data.responseText.indexOf("405")!=-1) ||(data.responseText.indexOf("404")!=-1))
                        $(formMessages).text('Oops! An error occured and your message could not be sent.');
                    else
                        $(formMessages).text(data.responseText);
                } else {
                    $(formMessages).text('Oops! An error occured and your message could not be sent.');
                }
            });

        });

    });
}(jQuery));