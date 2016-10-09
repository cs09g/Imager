(function() {
	window.Imager = window.Imager || {};

	Imager = function() {
		var postData, nextData;
	}

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

		loadImgHasPlace: function(data, access_token) {
			FB.api(
				'/' + data.id,
				{
					fields: 'place'
				},
				function (response) {
					if (response && !response.error) {
						/* handle the result */
						if (response.place) {
							//console.log(response.place);
							getImgUrl(response, access_token);
						}
					}
				}
			);
		},

		loading: function(data, access_token) {
			$.ajax({
				dataType: 'json',
				url: data,
				success: function(response) {
					var data = response.data || [];
					for (var i = 0, len = data.length; i < len; i++) {
						loadImgHasPlace(data[i], access_token);

						if (response.paging.next) {
							nextData = response.paging.next;
						}
					}
				}
			});
		},

		getPhotos: function(access_token) {
			FB.api(
				'/me/photos/uploaded',
				'GET',  
				{
					access_token: access_token,
				},
				function(response) {
					var data = response.data || [];
					for (var i = 0, len = data.length; i < len; i++) {
						loadImgHasPlace(data[i], access_token);

					}

					if (response.paging.next) {
						nextData = response.paging.next;
						setLazyLoad(access_token);
						if (shouldLoad()) {
							loading(nextData, access_token);
						}
					}
				}
			);
		},

		getImgUrl: function(data, access_token) {
			var pane = createImgPane('https://graph.facebook.com/' + data.id + '/picture?access_token=' + access_token);

			if (data.name) {
				pane.dataToggle = 'tooltip';
				pane.dataPlacement = 'left';
				pane.title = data.name;
			}

			document.getElementById('pic_container').appendChild(pane);

		},

		
		setLazyLoad: function(access_token) {
			return $(window).scroll(function() {
				if (shouldLoad() && postData != nextData) {
					postData = nextData; // avoid duplicated request call
					loading(nextData, access_token);
				}
			});
		},

		shouldLoad: function() {
			if($(document).height() - $(window).height() - $(window).scrollTop() < 300) {
				return true;
			} else {
				return false;
			}
		},

		createImgPane: function(url) {
			var div = document.createElement('div');
			div.className = 'white-panel';

			//data-toggle="tooltip" data-placement="left" title="Tooltip on left"
			var img = document.createElement('img');
			img.src = url;

			div.appendChild(img);

			return div;
		},
	}
})();
