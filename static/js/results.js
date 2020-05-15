define(['domReady', 'jquery', 'jqueryUI'], function(domReady, $, ui, ){
    domReady(function(){
        var responseValues = {};
        var genres = $('.form-buttons').find('.response-btn');

        for(var i=0; i < genres.length; i++){
            responseValues[$(genres[i]).text()] = -1
        }

        $('.submit-btn').prop("disabled",true);
        $(".animation").each(function (i) {
            // store the item around for use in the 'timeout' function
            var $item = $(this);
            // execute this function sometime later:
            setTimeout(function() {
              $item.css({'visibility': 'visible'}).effect('slide');
            }, 500*i);
        });

        var anyGenreSelected = 0

        $('.response-btn').click(function(){
            if ($(this).hasClass('btn-selected')){
                anyGenreSelected--
                $(this).removeClass('btn-selected')
                responseValues[$(this).text()] = -1
            }else{
                anyGenreSelected++
                $(this).addClass('btn-selected')
                responseValues[$(this).text()] = 1
            }
            if (anyGenreSelected > 0){
                $('.submit-btn').prop('disabled', false)
            }else{
                $('.submit-btn').prop("disabled",true);
            }
        })

        $('.submit-btn').click(function(){
            $('.feedback').fadeOut();
            setTimeout(function(){$('.thank-you').fadeIn()},
                200);
        });
    });
});