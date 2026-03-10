$(document).ready(function(){


	$(".dont__know--birth").on("change" ,function(e){
		if ($(this).prop("checked") == true) {
			$('.birth__fields').addClass('disabled');
			$('.birth__fields>select:nth-child(1)').val("12");
			$('.birth__fields>select:nth-child(2)').val("00");
			$('.birth__fields>select:nth-child(3)').val("PM");
			$(this).closest('.container__check').find("p").text("Using standard 12:00 Astrological Time. If you know birth time, please use it instead.");
		} else {
			$('.birth__fields').removeClass('disabled');
			$(this).closest('.container__check').find("p").text("Check here if you do not know your birth time");
		}
	});


	$('.country__select select').on('change' ,function(){
		$(this).closest("form").find('.region__field').removeClass("disabled");
	});
	$('.region__field select').on('change' ,function(){
		$(this).closest("form").find('.city__field').removeClass("disabled");
	});


	$('.scrollable__link').on('click' ,function(e){
		e.preventDefault();
		let currentLink = $(this).attr("data-scroll");
		$('html').animate({ 
    	    scrollTop: $("." + currentLink).offset().top - $('header').outerHeight() - 20
        }, 900 
        );
	});


	$('select').on("change" ,function(){
		$(this).addClass("filled");
	});

	$('.load__more--testimonials').on('click' ,function(e){
		e.preventDefault();
		$.get("assets/moretestimon.html", function(html_string)
	   {
	      	$('.testimonials__main .list').append(html_string);
	   },'html');  
		$(this).closest('.btn').css('display' ,"none");
	});
	

	$('.faq__elem>.faq__head').on('click' ,function(e){
		e.preventDefault();
		if ($(this).closest('.faq__elem').hasClass('opened')) {
			$(this).closest('.faq__elem').removeClass('opened');
			$(this).closest('.faq__elem').find(".faq__content").css("display" ,'none');
		} else {
			$(this).closest('.faq__elem').addClass('opened');
			$(this).closest('.faq__elem').find(".faq__content").fadeIn(200)
		}
	});

	if ($(window).width() < 991) {
		// Speed for menu appear 0.3 seconds now
		$('.menu__wrapper').css("transition" , ".3s ease  all");
	}  else {
		$('.menu__wrapper').css("transition" , "none");
	}
	$(window).on('resize' ,function(){
		if ($(window).width() < 991) {
			// Speed for menu appear 0.3 seconds now
			$('.menu__wrapper').css("transition" , ".3s ease  all");
		}  else {
			$('.menu__wrapper').css("transition" , "none");
		}
	});

	$('.load__more--articles').on('click' ,function(e){
		e.preventDefault();
		$.get("assets/morearticle.html", function(html_string)
	   {
	      	$('.outer__all .grid').append(html_string);
	   },'html');  
		$(this).closest('.btn').css('display' ,"none");
	});


	$('.horoscope .switcher ul li a').on("click" ,function(e){
		e.preventDefault();
		let $this = $(this);
		if (!$this.hasClass("current")) {
			$this.closest('ul').find('.current').removeClass("current");
			$this.addClass('current');
			let day = $this.data('day');
			let date = $this.data('date');
			// Show tab content
			$('.horoscope__desc').hide();
			$('#'+day+'_horoscope').show();
			// Change the date
			$('#horoscope_date').html(date);
		}
	});

	$('.menu__wrapper .top__part>ul>li').on("mouseenter" ,function(){
		if ($(window).width() > 991) {
			if ($(this).find('.dropdown__box')) {
				// Speed for rollover menu rollover 0.4second right now
				$(this).find('.dropdown__box').css("transition" , ".4s ease all");
				$(this).find('.dropdown__box').css("opacity" , "1");
				$(this).find('.dropdown__box').css("pointer-events" , "initial");
			}
		}
	});

	$('.menu__wrapper .top__part>ul>li').on("mouseleave" ,function(){
		if ($(window).width() > 991) {
			if ($(this).find('.dropdown__box')) {
				$(this).find('.dropdown__box').css("transition" , "0s ease all");
				$(this).find('.dropdown__box').css("opacity" , "0");
				$(this).find('.dropdown__box').css("pointer-events" , "none");
			}
		}
	});

	if ($(".testimonials__slider").length) {
		$('.testimonials__slider').slick({
			slidesToShow:1,
			centerMode:true,
			arrows:false,
			centerPadding:"20.7%",
			autoplay:true,
			autoplaySpeed: 6000,
			swipe:true,
			swipeToSlide:true,
			adaptiveHeight:true,
			responsive: [
		    {
		      breakpoint: 1200,
		      settings: {
		        centerPadding:"17%",
		      }
		    },
		    {
		      breakpoint: 991,
		      settings: {
		        centerPadding:"3%",
		      }
		    },
		    {
		      breakpoint: 767,
		      settings: {
		        centerPadding:"4%",
		      }
		    },
		    {
		      breakpoint: 480,
		      settings: {
		        centerPadding:"5%",
		      }
		    }
		  ]
		})
	}


	if ($(".shop__cards").length) {
		$('.shop__cards').slick({
			slidesToShow:3,
			centerMode:true,
			initialSlide:3,
			arrows:true,
			centerPadding:"20.7%",
			infinite:true,
			swipe:true,
			swipeToSlide:true,
			variableWidth:true,
			adaptiveHeight:true,
			responsive: [
		    {
		      breakpoint: 1200,
		      settings: {
		        centerPadding:"17%",
		      }
		    },
		    {
		      breakpoint: 991,
		      settings: {
		      	arrows:false,
		        centerPadding:"3%",
		      }
		    },
		    {
		      breakpoint: 767,
		      settings: {
		      	arrows:false,
		        centerPadding:"4%",
		      }
		    },
		    {
		      breakpoint: 540,
		      settings: {
		      	arrows:false,
		      	centerPadding:"0%",
		      	slidesToShow:2,
		      	centerMode:true,
		      	initialSlide:0
		      }
		    }
		  ]
		})
	}


	$('.menu__element>h6').on('click' ,function(e){
		if ($(window).width() < 991) {
			if ($(this).hasClass("opened")) {
				$(this).removeClass("opened");
				$(this).closest('.menu__element').find("ul").slideUp(300);
			}  else {
				$(this).addClass("opened");
				$(this).closest('.menu__element').find("ul").slideDown(300);
			}
		}
	});
	$('.menu__wrapper .top__part>ul>li>a').on("click", function(e){
    var hasDropdown = $(this).closest("li").find('.dropdown__box').length > 0;
    if (hasDropdown) {
        e.preventDefault();
    }
    if ($(window).width() < 991 && hasDropdown) {
        if ($(this).hasClass("opened")) {
            $(this).removeClass("opened");
            $(this).closest("li").find('.dropdown__box').slideUp(300);
        } else {
            $(this).closest("li").find('.dropdown__box').slideDown(300);
            $(this).addClass("opened");
        }
    }
	});

	let  scrollTop;
	$('.menu__button>a').on('click' ,function(e){
		e.preventDefault();
		scrollTop = $(window).scrollTop();
		$('body,html').css("overflow-y" ,"hidden");
		$('body').addClass("fixed");
		$("body").css("top" , "-"+ scrollTop +"px")
		$('header .outer__header .menu__wrapper').css('left' ,"0px");
		// Speed for background overlay appear on menu opening 150ms
		$('.overlay').fadeIn(150);
	});
	
	$('.overlay').on('click' ,function(e){
		e.preventDefault();
		
		$('body').removeClass("fixed");
		$('body,html').css("overflow-y" ,"initial");
		$('header .outer__header .menu__wrapper').css('left' ,"-280px");
		$(window).scrollTop(scrollTop);
		// Speed for background overlay appear on menu opening 150ms
		$('.overlay').fadeOut(150);
	});

	function setCookie(name, value, daysToExpire) {
		let cookie = name + "=" + encodeURIComponent(value);
		if (daysToExpire) {
			let expirationDate = new Date();
			expirationDate.setDate(expirationDate.getDate() + daysToExpire);
			cookie += "; expires=" + expirationDate.toUTCString();
		}
		document.cookie = cookie;
	}
	function isCookieSet(cookieName) {
		let cookies = document.cookie.split(';');
		for (let i = 0; i < cookies.length; i++) {
			let cookie = cookies[i].trim();
			// Check if the cookie starts with the specified name
			if (cookie.indexOf(cookieName + '=') === 0) {
				return true;
			}
		}

		return false;
	}
	function getCookieValue(cookieName) {
		let name = cookieName + "=";
		let decodedCookie = decodeURIComponent(document.cookie);
		let cookieArray = decodedCookie.split(';');

		for (let i = 0; i < cookieArray.length; i++) {
			let cookie = cookieArray[i].trim();
			if (cookie.indexOf(name) == 0) {
				return cookie.substring(name.length, cookie.length);
			}
		}

		return null; // Return null if the cookie is not found
	}

	let currentTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;

	if(isCookieSet('timezone')) {
		let cookieTimezone = getCookieValue('timezone');
		if(cookieTimezone !== currentTimezone) {
			setCookie('timezone', currentTimezone);
		}
	} else {
		setCookie('timezone', currentTimezone);
	}
});