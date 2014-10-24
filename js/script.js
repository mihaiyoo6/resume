var data=null;
var imgUrl="images/";
var menuCount = 0;
var w = window.innerWidth;
var h = window.innerHeight;
$(document).on("ready", function() {

	var jqxhr = $.getJSON( "json/mijeamihai.json", function( response ) {
  		data = response;
	})
  	.done(function(response) {
      $('.jumbotron').css({ height: ($(window).height()) +'px' });
      importPolymerElements();
      makeMenu();
      fixMenu();
      makePages();
      applyClickEvent();

     
  	})
  	.fail(function(response) {
    	//error case
  	})
  	.always(function(response) {
      //always
  	});
	jqxhr.complete(function(response) {
    //complete
	});

});

function importPolymerElements(){
  var elements = mySort(data.pages);
  for(var i in elements){
    if(elements[i].active){
      $('head').append('<link rel="import" href="fragments/'+elements[i].polymer_element+'.html">');
    }
  }
}

function makeMenu(){

	var menu = mySort(data.pages);
	
  lazyLoad($('.jumbotron'));

	for(var i in menu){
    if(menu[i].active){
      menuCount++
        		$("#mainMenu").append('<li class="menu_item"><a href="#'+menu[i].data_trigger+'"><i class="'+menu[i].icon+'"></i><span class="hidden item">'+menu[i].page_name+'</span><paper-ripple fit></paper-ripple></a></li>');
         // $("#mainMenu").append('<paper-item label="'+menu[i].page_name+'" class="menu_item" ><a href="#'+menu[i].data_trigger+'"><i class="'+menu[i].icon+'"></i></a></paper-input>');
     // $("#icon_menu").append('<a href="#'+menu[i].data_trigger+'"><i class="'+menu[i].icon+' menu_icons"></i></a>');      
    }        
    $('#'+menu[i].data_trigger).css({ height: ($(window).height()) +'px' });
	}
   $(window).on('resize', function(){  
    $('.jumbotron').css({ height: ($(window).height()) +'px' });  
      w = window.innerWidth;
      h = window.innerHeight;  
  }); 
  
}

function fixMenu(){
  var scrollTtriger = $('.nav').offset().top;
  var marginMenuItem = parseInt((w/menuCount)/4.8);
  
    $(window).on('scroll', function(){     
   
      if($(window).scrollTop() > scrollTtriger/3){   
       // $('#icon_menu').switchClass("menu_down","menu_upp", 1000, "easeInOutQuad" );
      // $('.navbar').addClass('menu_upp').removeClass('menu_down');
       $('.navbar ul li a span').removeClass('hidden');
       $('.menu_item').css('margin-right', ''+marginMenuItem/2+'px');
       $('.menu_item').css('margin-left', ''+marginMenuItem/2+'px');
        $('.menu_down').css('background-color', '#333');
       
       // $('#icon_menu').css({top: 0, right: 0, position:'fixed'}); 
      }else{ 
     // $('.navbar').addClass('menu_down').removeClass('menu_upp');
      $('.navbar ul li a span').addClass('hidden');
      $('.menu_item').css('margin-right', '0px');
      $('.menu_item').css('margin-left', '0px');
      //$('#icon_menu').switchClass("menu_upp","menu_down", 1000, "easeInOutQuad" );

      //  $('#icon_menu').css({bottom: 0, right: 0, position:'absolute'}); 
      }  
      if($(window).scrollTop() > scrollTtriger-25){
        $('.menu_down').css('position', 'fixed');

        $('.menu_down').css('bottom', '');

        $('.menu_down').css('top', '0');
        //$('.menu_down').css('width', '100%');
        $('.menu_down').css('background-color', '#333');
        $('.menu_down').append('<paper-shadow  z="1"></paper-shadow>');
        

      }else{
        $('.menu_down').css('background-color', 'transparent');
        $('.menu_down').css('position', 'absolute');
        $('#menu-shadow').remove();
        $('.menu_down').css('top', '');
       // $('.menu_down').css('width','');

        $('.menu_down').css('bottom', '0');
        $('.menu_down').css('right', '0');

      }
    }); 
}
function makePages(){
  var pages = mySort(data.pages);
  for( var i in pages){
    if(pages[i].active){
      $("body").append('<div id="'+pages[i].data_trigger+'" class="page"></div><'+pages[i].polymer_element+'></'+pages[i].polymer_element+'>');
      $('#'+pages[i].data_trigger).css('background-image', 'url('+imgUrl+pages[i].background_image+')');
      $('#'+pages[i].data_trigger).css('height', pages[i].page_height+'px');
    }
  }

}

function mySort (list) {
 
    var comparisons = 0,
        swaps = 0,
        endIndex = 0,
        len = list.length - 1,
        hasSwap = true; 
    for (var i = 0; i < len; i++) { 
        hasSwap = false; 
        for (var j = 0, swapping, endIndex = len - i; j < endIndex; j++) {
            comparisons++; 
            if (list[j].index > list[j + 1].index) {         
                swapping = list[j]; 
                list[j] = list[j + 1];
                list[j + 1] = swapping; 
                swaps++;
                hasSwap = true;
            };
        }; 
        if (!hasSwap) {
            break;
        }
    }
    return list;
};

function lazyLoad(poContainer)
{
  var lstrSource   = poContainer.attr('data-src');
  var lstrPosition = poContainer.attr('data-position');

  $('<img>').attr('src', lstrSource).load(function()
  {
    poContainer.css('background-image', 'url("'+ lstrSource +'")');
    poContainer.css('background-position', lstrPosition);
    poContainer.css('-ms-filter', '"progid:DXImageTransform.Microsoft.AlphaImageLoader(src=\'' + lstrSource + '\', sizingMethod=\'scale\')"');
    poContainer.css('filter', 'progid:DXImageTransform.Microsoft.AlphaImageLoader(src=\'' + lstrSource + '\', sizingMethod=\'scale\'');
  });
}

function applyClickEvent()
{
  $('a[href*=#]').on('click', function(e)
  {
    e.preventDefault();
    
    if( $( $.attr(this, 'href') ).length > 0 )
    {
      $('html, body').animate(
      {
        scrollTop: $( $.attr(this, 'href') ).offset().top
      }, 400);
    }
    return false;
  });
}

