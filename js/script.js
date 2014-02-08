;

(function($, sr){
  // startresize from paul irish
  // http://www.paulirish.com/2009/throttled-smartresize-jquery-event-handler/
  // debouncing function from John Hann
  // http://unscriptable.com/index.php/2009/03/20/debouncing-javascript-methods/
  var debounce = function (func, threshold, execAsap) {
    var timeout;

    return function debounced () {
      var obj = this, args = arguments;
      function delayed () {
        if (!execAsap)
          func.apply(obj, args);
        timeout = null;
      };

      if (timeout)
        clearTimeout(timeout);
      else if (execAsap)
        func.apply(obj, args);

      timeout = setTimeout(delayed, threshold || 100);
    };
  }
  $(window).on('resize', debounce(function() { $(window).trigger(sr); }));
  // smartresize 
})(jQuery, 'smartresize');



(function($) {

  var viewportHeight,
      viewportWidth,
      pagerWidth,
      gutter = 3;

  $(".main").onepage_scroll({
     sectionContainer: "section",
     easing: "ease",
     animationTime: 800,
     pagination: true,
     updateURL: false,
     beforeMove: null, //PrepareImage,
     afterMove: null,
     loop: false,
     keyboard: true,
     responsiveFallback: false
  });


  var setSectionSize = function(index, section) {
    var meta = $('.meta', section),
        im = $('.feature', section);
    var imCanvasWidth = viewportWidth - pagerWidth * 2 - gutter * 2,
        imCanvasHeight = viewportHeight - meta.height() - gutter * 3;
    var widthFactor = imCanvasWidth / im[0].naturalWidth,
        heightFactor = imCanvasHeight / im[0].naturalHeight;
    if (widthFactor < heightFactor) {
      im.width(im[0].naturalWidth * widthFactor).addClass('width-constrained');
    } else {
      im.width(im[0].naturalWidth * heightFactor).removeClass('width-constrained');
    }
  };

  $(window).on('load smartresize', function() {
    console.log('setting size...');
    viewportHeight = $(document).height();
    viewportWidth = $(document).width();
    pagerWidth = $('.onepage-pagination').width();
    $('section').each(setSectionSize);
  })

})(jQuery);
