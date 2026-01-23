/*-----------------------------------------------------------------------------------
/*
/* Init JS
/*
-----------------------------------------------------------------------------------*/

 jQuery(document).ready(function($) {

 /*----------------------------------------------------*/
 /* FitText Settings
 ------------------------------------------------------ */

     setTimeout(function() {
 	   $('h1.responsive-headline').fitText(1, { minFontSize: '40px', maxFontSize: '90px' });
 	 }, 100);

 /*----------------------------------------------------*/
 /* Typing Effect
 ------------------------------------------------------ */

     setTimeout(function() {
         var typed = new Typed('#typed-headline', {
             strings: ["Computer Science student pursuing Master's at Arizona State University."],
             typeSpeed: 50,
             backSpeed: 30,
             loop: false,
             showCursor: true,
             cursorChar: '|'
         });
     }, 2000);


/*----------------------------------------------------*/
/* Smooth Scrolling
------------------------------------------------------ */

   $('.smoothscroll').on('click',function (e) {
	    e.preventDefault();

	    var target = this.hash,
	    $target = $(target);

	    $('html, body').stop().animate({
	        'scrollTop': $target.offset().top
	    }, 800, 'swing', function () {
	        window.location.hash = target;
	    });
	});


/*----------------------------------------------------*/
/* Highlight the current section in the navigation bar
------------------------------------------------------*/

	var sections = $("section");
	var navigation_links = $("#nav-wrap a");

	sections.waypoint({

      handler: function(event, direction) {

		   var active_section;

			active_section = $(this);
			if (direction === "up") active_section = active_section.prev();

			var active_link = $('#nav-wrap a[href="#' + active_section.attr("id") + '"]');

         navigation_links.parent().removeClass("current");
			active_link.parent().addClass("current");

		},
		offset: '35%'

	});


/*----------------------------------------------------*/
/*	Make sure that #header-background-image height is
/* equal to the browser height.
------------------------------------------------------ */

   $('header').css({ 'height': $(window).height() });
   $(window).on('resize', function() {

        $('header').css({ 'height': $(window).height() });
        $('body').css({ 'width': $(window).width() })
   });


/*----------------------------------------------------*/
/*	Fade In/Out Primary Navigation
------------------------------------------------------*/

   $(window).on('scroll', function() {

		var h = $('header').height();
		var y = $(window).scrollTop();
      var nav = $('#nav-wrap');

	   if ( (y > h*.20) && (y < h) && ($(window).outerWidth() > 768 ) ) {
	      nav.fadeOut('fast');
	   }
      else {
         if (y < h*.20) {
            nav.removeClass('opaque').fadeIn('fast');
         }
         else {
            nav.addClass('opaque').fadeIn('fast');
         }
      }

	});


/*----------------------------------------------------*/
/*	Modal Popup
------------------------------------------------------*/

    $('.item-wrap a').magnificPopup({

       type:'inline',
       fixedContentPos: false,
       removalDelay: 200,
       showCloseBtn: false,
       mainClass: 'mfp-fade'

    });

    $(document).on('click', '.popup-modal-dismiss', function (e) {
    		e.preventDefault();
    		$.magnificPopup.close();
    });


/*----------------------------------------------------*/
/*	Flexslider
/*----------------------------------------------------*/
   $('.flexslider').flexslider({
      namespace: "flex-",
      controlsContainer: ".flex-container",
      animation: 'slide',
      controlNav: true,
      directionNav: false,
      smoothHeight: true,
      slideshowSpeed: 7000,
      animationSpeed: 600,
      randomize: false,
   });

 /*----------------------------------------------------*/
 /*  Skill Bar
 ------------------------------------------------------*/

 jQuery('.skillbar').each(function(){
     jQuery(this).find('.skillbar-bar').animate({
       width:jQuery(this).attr('data-percent')
     },6000);
   });

 /*----------------------------------------------------*/
 /*  Skill Bar Hover Effects
 ------------------------------------------------------*/

 $('.skillbar').hover(
     function() {
         $(this).find('.skillbar-bar').stop().animate({width: '100%'}, 500);
         $(this).find('.skill-bar-percent').text('Mastered!');
     },
     function() {
         var originalPercent = $(this).attr('data-percent');
         $(this).find('.skillbar-bar').stop().animate({width: originalPercent}, 500);
         $(this).find('.skill-bar-percent').text(originalPercent);
     }
 );
 /*----------------------------------------------------*/
 /* Theme Toggle
 ------------------------------------------------------*/

     $('#theme-toggle').on('click', function() {
         var currentTheme = document.documentElement.getAttribute('data-theme');
         var newTheme = currentTheme === 'dark' ? 'light' : 'dark';
         document.documentElement.setAttribute('data-theme', newTheme);
         $(this).text(newTheme === 'dark' ? '☀️ Light Mode' : '🌙 Dark Mode');
         localStorage.setItem('theme', newTheme);
     });

     // Load saved theme
     var savedTheme = localStorage.getItem('theme') || 'light';
     document.documentElement.setAttribute('data-theme', savedTheme);
     $('#theme-toggle').text(savedTheme === 'dark' ? '☀️ Light Mode' : '🌙 Dark Mode');

 /*----------------------------------------------------*/
 /*	contact form
 ------------------------------------------------------*/

    $('form#contactForm').submit(function(e) {
        e.preventDefault();
        $('#image-loader').fadeIn();

        var formData = new FormData(this);

        $.ajax({
            type: "POST",
            url: $(this).attr('action'),
            data: formData,
            processData: false,
            contentType: false,
            success: function(msg) {
                $('#image-loader').fadeOut();
                if (msg.includes('Thank You')) {
                    $('#message-warning').hide();
                    $('#contactForm').fadeOut();
                    $('#message-success').fadeIn();
                } else {
                    $('#message-warning').html('Error sending message. Please try again.');
                    $('#message-warning').fadeIn();
                }
            },
            error: function() {
                $('#image-loader').fadeOut();
                $('#message-warning').html('Error sending message. Please try again.');
                $('#message-warning').fadeIn();
            }
        });
    });


});








