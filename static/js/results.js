define(['domReady', 'jquery', 'jqueryUI'], function(domReady, $, ui, ){
    domReady(function(){
        var responseValues = {};
        var genres = $('.form-buttons').find('.response-btn');
        for(var i=0; i < genres.length; i++){
            responseValues[$(genres[i]).text()] = -1
        }
        $(".animation").each(function (i) {
        // store the item around for use in the 'timeout' function
        var $item = $(this);
        // execute this function sometime later:
        setTimeout(function() {
          $item.css({'visibility': 'visible'}).effect('slide');
        }, 500*i);
        // each element should animate half a second after the last one.
      });
        $('.response-btn').click(function(){
            if ($(this).hasClass('btn-selected')){
                $(this).removeClass('btn-selected')
                responseValues[$(this).text()] = -1
            }else{
                $(this).addClass('btn-selected')
                responseValues[$(this).text()] = 1
            }
            $('.input-text').val(JSON.stringify(responseValues))
        })
    });
});