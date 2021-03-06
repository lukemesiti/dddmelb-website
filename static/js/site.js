$(document).ready(function() {

	updateScreenSize = function() {
		getWinWidth = function() {
			windowWidth = $(window).width();
		};
		getWinWidth();

		$(window).resize(function() {
				getWinWidth();
		});
    }();


	mobileNav = function() {
		var $navPull = $('nav.main .pull');
		var $mainNav = $('nav.main ul');

		$navPull.unbind().bind('click', function(){
			$mainNav.toggleClass('active');
			$(this).toggleClass('active');
		});

	}();


	targetBlank = function() {
			$('a.targetBlank').click(function() {
				window.open(this.href);
				return false;
			});
			$('.targetBlank a').click(function() {
				window.open(this.href);
				return false;
			});
    }();


	accordion = function() {
		$('.toggleAccordion').click(function(e) {
			e.preventDefault();
			var $this = $(this);

			if ($this.next().hasClass('show')) {
				$this.next().removeClass('show');
				$this.removeClass('active');
			}
			else {
				$this.parent().parent().find('.inner').removeClass('show');
				$('.toggleAccordion').removeClass('active');
				$this.next().addClass('show');
				$this.addClass('active');
			}
		});

		// Open first accordion on load
		$('.toggleAccordion').eq(0).addClass('active');
		$('.toggleAccordion').eq(0).next().addClass('show');


	}();


	smoothScroll = function(){
		$('a[href*="#"]')
		  // Remove links that don't actually link to anything
		  .not('[href="#"]')
		  .not('[href="#0"]')
		  .click(function(event) {
			// On-page links
			if (
			  location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '')
			  &&
			  location.hostname == this.hostname
			) {
			  // Figure out element to scroll to
			  var target = $(this.hash);
			  target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
			  // Does a scroll target exist?
			  if (target.length) {
				// Only prevent default if animation is actually gonna happen
				event.preventDefault();
				$('html, body').animate({
				  scrollTop: target.offset().top
				}, 800, function() {
				  // Callback after animation
				  // Must change focus!
				  var $target = $(target);
				  $target.focus();
				  if ($target.is(":focus")) { // Checking if the target was focused
					return false;
				  } else {
					$target.attr('tabindex','-1'); // Adding tabindex for elements not focusable
					$target.focus(); // Set focus again
				  };
				});
			  }
			}
		});
	}();


	equalHeights = function(){
		adjustHeight = function() {
			// Please add the class .equal-heights to the columns container and .col to each column:
			if(windowWidth > 768) {
				$('.equal-heights').each(function(){

					$('.col').height('');

					var highestBox = 0;
					$('.col', this).each(function(){
						if($(this).height() > highestBox) {
						  highestBox = $(this).height();
						}
					});

					$('.col',this).height(highestBox);
			   });
			}
			else {
				$('.equal-heights').each(function(){
					$('.col').height('');
				});
			}
		}
		adjustHeight();

		$(window).resize(function() {
            setTimeout(adjustHeight(), 100);
        });

	}();

	$('.captcha-form input[type="submit"]').attr("disabled", "disabled");
});

var recaptchaComplete = function() {
	$('.captcha-form input[type="submit"]').removeAttr("disabled");
};
