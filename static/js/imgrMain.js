
var makePinterestGrid = function(target, options) {
  var options = options || {};
  $('#' + target).pinterest_grid({
    no_columns: options.no_columns || 4,
    padding_x: options.padding_x || 10,
    padding_y: options.padding_y || 10,
    margin_bottom: options.margin_bottom || 50,
    single_column_breakpoint: options.single_column_breakpoint || 700
  });
}

var login = function(response) {
  var access_token = '';
  FB.login(function(response) {
    if (response.status === 'connected') {
      access_token = FB.getAuthResponse()['accessToken'];
      getPhotos(access_token);

    } else if (reponse.status === "not_authorized") {

    } else {

    }

  }, { 
    scope: 'email, user_birthday, user_location, user_photos' 
  });
}

var loading = function(data, access_token) {
  $.ajax({
    dataType: 'json',
    url: data,
    success: function(response) {
      for (var i = 0, len = response.data.length; i < len; i++) {
        getImgUrl(response.data[i], access_token);
      }
      if (response.paging.next) {
        nextData = response.paging.next;
        }
      }
    })
}

var getPhotos = function(access_token) {
  FB.api(
    '/me/photos/uploaded',
    'GET',  
    {
      access_token: access_token
    },
    function(response) {
      var data = response.data || [];
      for (var i = 0, len = data.length; i < len; i++) {
        getImgUrl(data[i], access_token);
      }

      if (response.paging.next) {
        nextData = response.paging.next;
        setLazyLoad(access_token);
      }
    }
  );
}

var getImgUrl = function(data, access_token) {
  var pane = createImgPane('https://graph.facebook.com/' + data.id + '/picture?access_token=' + access_token);

  if (data.name) {
    pane.dataToggle = 'tooltip';
    pane.dataPlacement = 'left';
    pane.title = data.name;
  }

  document.getElementById('pic_container').appendChild(pane);
}

var postData, nextData;
var setLazyLoad = function(access_token) {
  return $(window).scroll(function() {
    if (shouldLoad() && postData != nextData) {
      postData = nextData; // avoid duplicated request call
      loading(nextData, access_token);
    }
  });
}

var shouldLoad = function() {
  if($(document).height() - $(window).height() - $(window).scrollTop() < 300) {
    return true;
  } else {
    return false;
  }
}

var createImgPane = function(url) {
  var div = document.createElement('div');
  div.className = 'white-panel';

  //data-toggle="tooltip" data-placement="left" title="Tooltip on left"
  var img = document.createElement('img');
  img.src = url;

  div.appendChild(img);

  return div;
}

window.fbAsyncInit = function() {
  FB.init({
    appId      : '582226488627141',
    xfbml      : true,
    version    : 'v2.7'
  });

  login();
};