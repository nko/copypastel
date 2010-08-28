$.include = function(url){
  $.ajax({
    'url': url,
    'dataType': 'script',
    'type': 'GET',
    'async': false
  })
}

$.include('/js/dynamicaudio-min.js');
$.include('/js/jquery.dimensions.min.js');
$.include('/js/jsnes.js');
$.include('/js/messages.js');