$(function(){function e(){var e=n*.22+"px",t=r*.8+"px",i=n*.035,s=n*.06,o=r*.4+"px";$(".teamCard").css({height:t,width:e,"margin-left":i*1.5,"margin-right":i});$(".cardPhoto").css({height:"25%",width:e});$(".demoCard").css({height:o,width:e,"margin-left":i,"margin-right":i});$(".contentContainer").css({"padding-left":s});$(".loader").fadeOut();$("#fullSite").show(1500);$("body").scrollLeft(0);l()}function a(){function e(e){if($(e).first().hasClass("subSelected")){$(".arrowLeft").hide();return!0}$(".arrowLeft").fadeIn();return!1}if(e(".homeSub ul li"))return;if(e(".aboutSub ul li"))return;if(e(".webviewSub ul li"))return;if(e(".actionsSub ul li"))return;if(e(".devdocsSub ul li"))return;if(e(".contactSub ul li"))return;if(e(".downloadSub ul li"))return}function f(){function e(e){if($(e).last().hasClass("subSelected")){$(".arrowRight").hide();return!0}$(".arrowRight").fadeIn();return!1}if(e(".homeSub ul li"))return;if(e(".aboutSub ul li"))return;if(e(".webviewSub ul li"))return;if(e(".actionsSub ul li"))return;if(e(".devdocsSub ul li"))return;if(e(".contactSub ul li"))return;if(e(".downloadSub ul li"))return}function l(){a();f()}$("#docsDrop").hover(function(){$("#docsDrop ul").css("max-height","250px")},function(){$("#docsDrop ul").css("max-height","0px")});var t=$(".arrowLeft").offset(),n=$(window).width()*.99,r=$(window).height(),i=$(".basicsRow").width(),s=$(".basicsRow").height(),o=t.left+n+"px",u=n*.19;$(".subHeader div").css({width:n});$(".subHeader div ul li").css({width:u});$(".navLink").click(function(){if($(this).hasClass("navSelected"))return;$(".navLink").removeClass("navSelected");$(this).addClass("navSelected");$(this).hasClass("navLinkSub")?$("#docsDrop a").css({color:"#e78928"}):$("#docsDrop a").css({color:"white"});if($(this).hasClass("titleLoad")){$("#fullSite").hide();$(".subHeader div").hide(2e3);$(".homeSub").show(2e3);$(".subOption").removeClass("subSelected");$(".homeSub ul li").first().addClass("subSelected");$(".loader").fadeIn();$("#fullSite").load("pageContent/home.php",function(){e()})}else if($(this).hasClass("aboutLoad")){$("#fullSite").hide();$(".subHeader div").hide(2e3);$(".aboutSub").show(2e3);$(".subOption").removeClass("subSelected");$(".aboutSub ul li").first().addClass("subSelected");$(".loader").fadeIn();$("#fullSite").load("pageContent/about.php",function(){e()})}else if($(this).hasClass("webviewLoad")){$("#fullSite").hide();$(".subHeader div").hide();$(".webviewSub").fadeIn(1e3);$(".subOption").removeClass("subSelected");$(".webviewSub ul li").first().addClass("subSelected");$(".loader").fadeIn();$("#fullSite").load("pageContent/webview.php",function(){e()})}else if($(this).hasClass("actionsLoad")){$("#fullSite").hide();$(".subHeader div").hide();$(".actionsSub").fadeIn(1e3);$(".subOption").removeClass("subSelected");$(".actionsSub ul li").first().addClass("subSelected");$(".loader").fadeIn();$("#fullSite").load("pageContent/actions.php",function(){e()})}else if($(this).hasClass("devdocsLoad")){$("#fullSite").hide();$(".subHeader div").hide();$(".devdocsSub").fadeIn(1e3);$(".subOption").removeClass("subSelected");$(".devdocsSub ul li").first().addClass("subSelected");$(".loader").fadeIn();$("#fullSite").load("pageContent/devdocs.php",function(){e()})}else if($(this).hasClass("contactLoad")){$("#fullSite").hide();$(".subHeader div").hide();$(".contactSub").fadeIn(1e3);$(".subOption").removeClass("subSelected");$(".contactSub ul li").first().addClass("subSelected");$(".loader").fadeIn();$("#fullSite").load("pageContent/contact.php",function(){e()})}else if($(this).hasClass("downloadLoad")){$("#fullSite").hide();$(".subHeader div").hide();$(".downloadSub").fadeIn(1e3);$(".subOption").removeClass("subSelected");$(".downloadSub ul li").first().addClass("subSelected");$(".loader").fadeIn();$("#fullSite").load("pageContent/download.php",function(){e()})}});$(".subOption").click(function(){if($(this).hasClass("subSelected"))l();else{$(".subOption").removeClass("subSelected");$(this).addClass("subSelected");l()}});var c=$("#fullSite").width()*.2;$(".arrowRight").click(function(){$.scrollTo("+="+c,1200,{axis:"x",easing:"easeOutCirc"});var e=$(".subSelected").next();$(".subOption").removeClass("subSelected");e.addClass("subSelected");l()});$(".arrowLeft").click(function(){$.scrollTo("-="+c,1200,{axis:"x",easing:"easeOutCirc"});var e=$(".subSelected").prev();$(".subOption").removeClass("subSelected");e.addClass("subSelected");l()});$(".arrowNav div").hover(function(){$(this).css("opacity","0.4")},function(){$(this).css("opacity","0.1")});$(".subTwo").click(function(){$.scrollTo(".aboutColumn",1200,{axis:"x",easing:"easeOutCirc"})});$(".subThree").click(function(){$.scrollTo(".teamColumn",1200,{axis:"x",easing:"easeOutCirc"})});$(".subFour").click(function(){$.scrollTo("",1200,{axis:"x",easing:"easeOutCirc"})});$(".subFive").click(function(){$.scrollTo("",1200,{axis:"x",easing:"easeOutCirc"})});$(".subSix").click(function(){$.scrollTo("",1200,{axis:"x",easing:"easeOutCirc"})});$(".subSeven").click(function(){$.scrollTo("",1200,{axis:"x",easing:"easeOutCirc"})});$(".subEight").click(function(){$.scrollTo("",1200,{axis:"x",easing:"easeOutCirc"})});$(".subNine").click(function(){$.scrollTo("",1200,{axis:"x",easing:"easeOutCirc"})});$(".subTen").click(function(){$.scrollTo("",1200,{axis:"x",easing:"easeOutCirc"})});$(".subEleven").click(function(){$.scrollTo("",1200,{axis:"x",easing:"easeOutCirc"})});$(".subTwelve").click(function(){$.scrollTo("",1200,{axis:"x",easing:"easeOutCirc"})});$(".subThirteen").click(function(){$.scrollTo("",1200,{axis:"x",easing:"easeOutCirc"})});$(".subFourteen").click(function(){$.scrollTo("",1200,{axis:"x",easing:"easeOutCirc"})});$(".subFifteen").click(function(){$.scrollTo("",1200,{axis:"x",easing:"easeOutCirc"})});$(".subSixteen").click(function(){$.scrollTo("",1200,{axis:"x",easing:"easeOutCirc"})});$(".subSeventeen").click(function(){$.scrollTo("",1200,{axis:"x",easing:"easeOutCirc"})});$(".subEighteen").click(function(){$.scrollTo("",1200,{axis:"x",easing:"easeOutCirc"})});$(".subNineteen").click(function(){$.scrollTo("",1200,{axis:"x",easing:"easeOutCirc"})});$(".subTwenty").click(function(){$.scrollTo("",1200,{axis:"x",easing:"easeOutCirc"})});$(".subTwentyOne").click(function(){$.scrollTo("",1200,{axis:"x",easing:"easeOutCirc"})});var h=n*.9,p=r*.9;$(".demoCard").click(function(){var e=$(this).clone(),t=$(this).offset(),n=$("#pinpointCard").offset();if($(this).hasClass("expanded")){$(".demoCard").removeClass("expanded").css({"z-index":"1000"});$(".demoCard").animate({height:demoCardHeightInit,top:t.top},500);$(".demoCard").animate({width:teamCardWidth,left:t.left},500,function(){$(".close").hide()})}else{e.css({position:"absolute","z-index":"5000","margin-left":"0",top:t.top,left:t.left}).appendTo(this);$(this).addClass("expanded");$(e).animate({height:p,top:n.top},500);$(e).animate({width:h,left:n.left},500,function(){$(this).append("<div class='button twitter close'>Close</div>")})}});$(".homeSub").fadeIn(1e3);$("#fullSite").load("pageContent/home.php",function(){e()})});