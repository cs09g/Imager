(function() {
    window.Imager = window.Imager || {};

    Imager = function() {
        this._postData = null;
        this._nextData = null;
        var markers = [];
		var bounds = null;
        var map;

        this.setMap = function(m) {
            map = m;
        };

        this._getMap = function() {
            return map;
        };

		this._getMarkers = function() {
			return markers;
		};

		this._addMarker = function(marker) {
			markers.push(marker);
		};

        this.initBounds = function(boundObj) {
            bounds = boundObj;//new google.maps.LatLngBounds();
        };

		this._getBounds = function() {
			return bounds;
		};
    };

    Imager.prototype = {
        makePinterestGrid: function(target, options) {
            var options = options || {};
            $('#' + target).pinterest_grid({
                no_columns: options.no_columns || 4,
                padding_x: options.padding_x || 10,
                padding_y: options.padding_y || 10,
                margin_bottom: options.margin_bottom || 50,
                single_column_breakpoint: options.single_column_breakpoint || 700
            });
        },

        _loadImgHasPlace: function(data, access_token) {
            var self = this;
            var map = self._getMap();
            FB.api(
                '/' + data.id,
                {
                    fields: 'place'
                },
                function (response) {
                    if (response && !response.error) {
                        var bounds = self._getBounds();

                        /* handle the result */
                        if (response.place) {
                            self._placeMarker(map, bounds, response.place.location, response.place.name);
                            self._getImgUrl(response, access_token);
                        }
                    }
                }
            );
        },

        _loading: function(data, access_token) {
            var self = this;
            $.ajax({
                dataType: 'json',
                url: data,
                success: function(response) {
                    var data = response.data || [];
                    for (var i = 0, len = data.length; i < len; i++) {
                        self._loadImgHasPlace(data[i], access_token);

                        if (response.paging.next) {
                            self._nextData = response.paging.next;
                        }
                    }
                }
            });
        },

        getPhotos: function(access_token) {
            var self = this;
            FB.api(
                '/me/photos/uploaded',
                'GET',  
                {
                    access_token: access_token,
                },
                function(response) {
                    var data = response.data || [];
                    for (var i = 0, len = data.length; i < len; i++) {
                        self._loadImgHasPlace(data[i], access_token);

                    }

                    if (response.paging.next) {
                        self._nextData = response.paging.next;
                        self._setLazyLoad(access_token);
                        var pic_container = $('#pic_container');
                        var pic_div = $('#pic_div');
                        if (self._shouldLoad(pic_container.height(), pic_div.height(), pic_div.scrollTop())) {
                            self._loading(self._nextData, access_token);
                        }
                    }
                }
            );
        },

        _getImgUrl: function(data, access_token) {
            var self = this;
            var pane = self._createImgPane('https://graph.facebook.com/' + data.id + '/picture?access_token=' + access_token);

            if (data.name) {
                pane.dataToggle = 'tooltip';
                pane.dataPlacement = 'left';
                pane.title = data.name;
            }

            document.getElementById('pic_container').appendChild(pane);

        },

        
        _setLazyLoad: function(access_token) {
            var self = this;
            return $('#pic_div').scroll(function() {
                var pic_container = $('#pic_container');
                var pic_div = $('#pic_div');
                if (self._shouldLoad(pic_container.height(), pic_div.height(), pic_div.scrollTop()) && self._postData != self._nextData) {
                    self._postData = self._nextData; // avoid duplicated request call
                    self._loading(self._nextData, access_token);
                }
            });
        },

        _shouldLoad: function(pic_container_height, pic_div_height, pic_div_scrollTop) {
            if(pic_container_height - pic_div_height - pic_div_scrollTop < 300) {
                return true;
            } else {
                return false;
            }
        },

        _createImgPane: function(url) {
            var div = document.createElement('div');
            div.className = 'white-panel';

            //data-toggle="tooltip" data-placement="left" title="Tooltip on left"
            var img = document.createElement('img');
            img.src = url;

            div.appendChild(img);

            return div;
        },

		_placeMarker: function(map, bounds, location, name) {
		    var marker = new google.maps.Marker({
		        map: map,
		        position: {
		            lat: location.latitude,
		            lng: location.longitude
		        },
		        title: name
		    });

		    this._addMarker(marker);

		    // fit map bounds up to markers on the map
		    bounds.extend(marker.getPosition());
		    map.fitBounds(bounds);
		}
    }
})();
