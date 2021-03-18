document.addEventListener('DOMContentLoaded', ()=>{

new WOW().init();


    $('.logo').hover( function (){
       $(this).addClass('animated wobble');
    })

    $('.logo').mouseleave(function () { 
        $(this).removeClass('animated wobble');
    });

    $('.part-of-advantage').hover(function(){
        $(this).addClass('animated pulse');
    })

    $('.part-of-advantage').mouseleave(function () { 
        $(this).removeClass('animated pulse');
    });

})