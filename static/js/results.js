define(['domReady', 'jquery', 'jqueryUI'], function(domReady, $, ui, ){
    domReady(function(){
        $(".animation").each(function (i) {
        // store the item around for use in the 'timeout' function
        var $item = $(this);
        // execute this function sometime later:
        setTimeout(function() {
          $item.css({'visibility': 'visible'}).effect('slide');
        }, 500*i);
        // each element should animate half a second after the last one.
      });
    });
});