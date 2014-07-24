$( function() {
				function contentScript(){
					var teamCardWidth = viewportWidth * 0.22 + "px";
					var teamCardHeight = viewportHeight * 0.8 + "px";
					var cardMargin = viewportWidth * 0.035;
					var containerLeft = viewportWidth * 0.06;
					var demoCardHeightInit = viewportHeight * 0.4 + "px";

					$('.teamCard').css({
						'height':teamCardHeight,
						'width':teamCardWidth,
						'margin-left':cardMargin * 1.5,
						'margin-right':cardMargin
					});

					$('.cardPhoto').css({
						'height':'25%',
						'width':teamCardWidth
					});

					$('.demoCard').css({
						'height':demoCardHeightInit,
						'width':teamCardWidth,
						'margin-left':cardMargin,
						'margin-right':cardMargin
					});

					$('.contentContainer').css({'padding-left':containerLeft});

					$('.loader').fadeOut();
					$('#fullSite').show(1500);
					$('body').scrollLeft(0); 
					arrowVisibility();
				}

				//dropdown
				$('#docsDrop').hover(function(){
					$('#docsDrop ul').css("max-height","250px");
				}, function(){
					$('#docsDrop ul').css("max-height","0px");
				})

				//navigation
				var viewPosition = $('.arrowLeft').offset();
				var viewportWidth = $(window).width() * 0.99;
				var viewportHeight = $(window).height();
				var pageWidth = $('.basicsRow').width();
				var pageHeight = $('.basicsRow').height();

				var scrollRight = (viewPosition.left + viewportWidth) + "px";

				//navigation + sub
				var subHeaderLinkWidth = viewportWidth * .19;
				$('.subHeader div').css({'width':viewportWidth});
				$('.subHeader div ul li').css({'width':subHeaderLinkWidth});
				$('.navLink').click(function(){
					if ($(this).hasClass('navSelected')) {
						return;
					} else {
						$('.navLink').removeClass('navSelected');
						$(this).addClass('navSelected');
						
						if ($(this).hasClass('navLinkSub')) {
							$('#docsDrop a').css({'color':'#e78928'});
						} else {
							$('#docsDrop a').css({'color':'white'});
						};
						if ($(this).hasClass('titleLoad')) {
							//hide content
							$('#fullSite').hide();
							//show and hide subnavs
							$('.subHeader div').hide(2000);
							$('.homeSub').show(2000);
							$('.subOption').removeClass('subSelected');
							$('.homeSub ul li').first().addClass('subSelected');

							//show loader gif
							$('.loader').fadeIn();
							//ajax in new content
							$('#fullSite').load('pageContent/home.php', function() {
							  	contentScript();
							  });
						} else if ($(this).hasClass('aboutLoad')) {
							$('#fullSite').hide();
							$('.subHeader div').hide(2000);
							$('.aboutSub').show(2000);
							$('.subOption').removeClass('subSelected');
							$('.aboutSub ul li').first().addClass('subSelected');
							$('.loader').fadeIn();
							$('#fullSite').load('pageContent/about.php', function() {
							  	contentScript();
							  });
						} else if ($(this).hasClass('webviewLoad')) {
							$('#fullSite').hide();
							$('.subHeader div').hide();
							$('.webviewSub').fadeIn(1000);
							$('.subOption').removeClass('subSelected');
							$('.webviewSub ul li').first().addClass('subSelected');
							$('.loader').fadeIn();
							$('#fullSite').load('pageContent/webview.php', function() {
							  	contentScript();
							  });
						} else if ($(this).hasClass('actionsLoad')) {
							$('#fullSite').hide();
							$('.subHeader div').hide();
							$('.actionsSub').fadeIn(1000);
							$('.subOption').removeClass('subSelected');
							$('.actionsSub ul li').first().addClass('subSelected');
							$('.loader').fadeIn();
							$('#fullSite').load('pageContent/actions.php', function() {
							  	contentScript();
							  });
						} else if ($(this).hasClass('devdocsLoad')) {
							$('#fullSite').hide();
							$('.subHeader div').hide();
							$('.devdocsSub').fadeIn(1000);
							$('.subOption').removeClass('subSelected');
							$('.devdocsSub ul li').first().addClass('subSelected');
							$('.loader').fadeIn();
							$('#fullSite').load('pageContent/devdocs.php', function() {
							  	contentScript();
							  });
						} else if ($(this).hasClass('contactLoad')) {
							$('#fullSite').hide();
							$('.subHeader div').hide();
							$('.contactSub').fadeIn(1000);
							$('.subOption').removeClass('subSelected');
							$('.contactSub ul li').first().addClass('subSelected');
							$('.loader').fadeIn();
							$('#fullSite').load('pageContent/contact.php', function() {
							  	contentScript();
							  });
						} else if ($(this).hasClass('downloadLoad')) {
							$('#fullSite').hide();
							$('.subHeader div').hide();
							$('.downloadSub').fadeIn(1000);
							$('.subOption').removeClass('subSelected');
							$('.downloadSub ul li').first().addClass('subSelected');
							$('.loader').fadeIn();
							$('#fullSite').load('pageContent/download.php', function() {
							  	contentScript();
							  });
						}
					}
				});

				//sub nav scrolling n' stoof
				$('.subOption').click(function(){
					if ($(this).hasClass('subSelected')) {
						arrowVisibility();
					} else {
						$('.subOption').removeClass('subSelected');
						$(this).addClass('subSelected');
						arrowVisibility();
					}
				});

				function firstArrowVisibility(){
					function isFirst(firstElement){
						if ($(firstElement).first().hasClass('subSelected')) {
							$('.arrowLeft').hide();
							return true;
						} else {
							$('.arrowLeft').fadeIn();
							return false;
						};
					}

					if (isFirst(".homeSub ul li")){
						return;
					} else if(isFirst(".aboutSub ul li")){
						return;
					} else if(isFirst(".webviewSub ul li")){
						return;
					} else if(isFirst(".actionsSub ul li")){
						return;
					} else if(isFirst(".devdocsSub ul li")){
						return;
					} else if(isFirst(".contactSub ul li")){
						return;
					} else if(isFirst(".downloadSub ul li")){
						return;
					}
				}
				function lastArrowVisibility(){
					function isLast(lastElement){
						if ($(lastElement).last().hasClass('subSelected')) {
							$('.arrowRight').hide();
							return true;
						} else {
							$('.arrowRight').fadeIn();
							return false;
						};
					}

					if (isLast(".homeSub ul li")){
						return;
					} else if(isLast(".aboutSub ul li")){
						return;
					} else if(isLast(".webviewSub ul li")){
						return;
					} else if(isLast(".actionsSub ul li")){
						return;
					} else if(isLast(".devdocsSub ul li")){
						return;
					} else if(isLast(".contactSub ul li")){
						return;
					} else if(isLast(".downloadSub ul li")){
						return;
					}
					
				}

				function arrowVisibility(){
					firstArrowVisibility();
					lastArrowVisibility();
				}

				var columnWidth = $('#fullSite').width() * 0.2;

				//arrows
				$('.arrowRight').click(function(){
					$.scrollTo('+=' + columnWidth, 1200, {axis:'x',easing: 'easeOutCirc'});
					var nextSub = $('.subSelected').next();
					$('.subOption').removeClass('subSelected');
					nextSub.addClass('subSelected');
					arrowVisibility();
				})
				$('.arrowLeft').click(function(){
					$.scrollTo('-=' + columnWidth, 1200, {axis:'x',easing: 'easeOutCirc'});
					var nextSub = $('.subSelected').prev();
					$('.subOption').removeClass('subSelected');
					nextSub.addClass('subSelected');
					arrowVisibility();
				})

				$('.arrowNav div').hover(function(){
					$(this).css("opacity","0.4");
				}, function(){
					$(this).css("opacity","0.1");
				})

				//menu (i need to make this shorter.. objects?)
				$('.subTwo').click(function(){
					$.scrollTo('.aboutColumn', 1200, {axis:'x',easing: 'easeOutCirc'});
				})
				$('.subThree').click(function(){
					$.scrollTo('.teamColumn', 1200, {axis:'x',easing: 'easeOutCirc'});
				})
				$('.subFour').click(function(){
					$.scrollTo('', 1200, {axis:'x',easing: 'easeOutCirc'});
				})
				$('.subFive').click(function(){
					$.scrollTo('', 1200, {axis:'x',easing: 'easeOutCirc'});
				})
				$('.subSix').click(function(){
					$.scrollTo('', 1200, {axis:'x',easing: 'easeOutCirc'});
				})
				$('.subSeven').click(function(){
					$.scrollTo('', 1200, {axis:'x',easing: 'easeOutCirc'});
				})
				$('.subEight').click(function(){
					$.scrollTo('', 1200, {axis:'x',easing: 'easeOutCirc'});
				})
				$('.subNine').click(function(){
					$.scrollTo('', 1200, {axis:'x',easing: 'easeOutCirc'});
				})
				$('.subTen').click(function(){
					$.scrollTo('', 1200, {axis:'x',easing: 'easeOutCirc'});
				})
				$('.subEleven').click(function(){
					$.scrollTo('', 1200, {axis:'x',easing: 'easeOutCirc'});
				})
				$('.subTwelve').click(function(){
					$.scrollTo('', 1200, {axis:'x',easing: 'easeOutCirc'});
				})
				$('.subThirteen').click(function(){
					$.scrollTo('', 1200, {axis:'x',easing: 'easeOutCirc'});
				})
				$('.subFourteen').click(function(){
					$.scrollTo('', 1200, {axis:'x',easing: 'easeOutCirc'});
				})
				$('.subFifteen').click(function(){
					$.scrollTo('', 1200, {axis:'x',easing: 'easeOutCirc'});
				})
				$('.subSixteen').click(function(){
					$.scrollTo('', 1200, {axis:'x',easing: 'easeOutCirc'});
				})
				$('.subSeventeen').click(function(){
					$.scrollTo('', 1200, {axis:'x',easing: 'easeOutCirc'});
				})
				$('.subEighteen').click(function(){
					$.scrollTo('', 1200, {axis:'x',easing: 'easeOutCirc'});
				})
				$('.subNineteen').click(function(){
					$.scrollTo('', 1200, {axis:'x',easing: 'easeOutCirc'});
				})
				$('.subTwenty').click(function(){
					$.scrollTo('', 1200, {axis:'x',easing: 'easeOutCirc'});
				})
				$('.subTwentyOne').click(function(){
					$.scrollTo('', 1200, {axis:'x',easing: 'easeOutCirc'});
				})

				//demo cards
				var demoCardWidth = viewportWidth * .9;
				var demoCardHeight = viewportHeight * .9;

				$('.demoCard').click(function() {
					var cloneCard = $(this).clone();
					var demoCardOffset = $(this).offset();
					var firstCardOffset = $('#pinpointCard').offset();

					if ($(this).hasClass('expanded')) {
						
							$('.demoCard').removeClass('expanded').css({'z-index':'1000'});
							$('.demoCard').animate({
								'height': demoCardHeightInit,
						    	'top':demoCardOffset.top
							},500);
							$('.demoCard').animate({
							    'width': teamCardWidth,
								'left':demoCardOffset.left				    
							  }, 500, function() {
							    // close Animation complete, all demo cards in view		    
								$('.close').hide();

							});

					} else {
						
					//create clone of div, which then animates responsively
					cloneCard.css({
						'position':'absolute', 
						'z-index':'5000',
						'margin-left':'0',
						'top':demoCardOffset.top,
						'left':demoCardOffset.left
					}).appendTo(this);

					$(this).addClass('expanded');

					//animate down, then to sides by moving left as expanding right
					$(cloneCard).animate({
						'height': demoCardHeight,
				    	'top':firstCardOffset.top
					},500);

					$(cloneCard).animate({
					    'width': demoCardWidth,
						'left':firstCardOffset.left				    
					  }, 500, function() {
					    // open Animation complete, display demo
					    $(this).append("<div class='button twitter close'>Close</div>");
					  });
								
					};

				});

				//initial page content load
				$('.homeSub').fadeIn(1000);
				$('#fullSite').load('pageContent/home.php', function() {
							  	contentScript();
							  });

});