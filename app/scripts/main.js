'use strict';
/*global  $, TweenMax, TimelineMax, google */
var mapStyle = [
    {
        'featureType': 'all',
        'elementType': 'geometry.fill',
        'stylers': [
            {
                'visibility': 'on'
            }
        ]
    },
    {
        'featureType': 'all',
        'elementType': 'labels.text.fill',
        'stylers': [
            {
                'color': '#726e65'
            }
        ]
    },
    {
        'featureType': 'all',
        'elementType': 'labels.text.stroke',
        'stylers': [
            {
                'color': '#fffcfc'
            }
        ]
    },
    {
        'featureType': 'all',
        'elementType': 'labels.icon',
        'stylers': [
            {
                'visibility': 'off'
            }
        ]
    },
    {
        'featureType': 'administrative',
        'elementType': 'labels',
        'stylers': [
            {
                'visibility': 'off'
            }
        ]
    },
    {
        'featureType': 'administrative',
        'elementType': 'labels.text.fill',
        'stylers': [
            {
                'color': '#555555'
            }
        ]
    },
    {
        'featureType': 'administrative',
        'elementType': 'labels.text.stroke',
        'stylers': [
            {
                'color': '#f5f5f5'
            }
        ]
    },
    {
        'featureType': 'administrative.neighborhood',
        'elementType': 'labels',
        'stylers': [
            {
                'visibility': 'off'
            }
        ]
    },
    {
        'featureType': 'landscape',
        'elementType': 'all',
        'stylers': [
            {
                'color': '#f4f4f4'
            }
        ]
    },
    {
        'featureType': 'landscape',
        'elementType': 'labels.text.fill',
        'stylers': [
            {
                'color': '#a8a7a7'
            }
        ]
    },
    {
        'featureType': 'landscape.man_made',
        'elementType': 'geometry.fill',
        'stylers': [
            {
                'visibility': 'on'
            },
            {
                'hue': '#ff7400'
            }
        ]
    },
    {
        'featureType': 'poi',
        'elementType': 'all',
        'stylers': [
            {
                'visibility': 'off'
            }
        ]
    },
    {
        'featureType': 'poi.park',
        'elementType': 'geometry.fill',
        'stylers': [
            {
                'visibility': 'on'
            },
            {
                'weight': '1.68'
            },
            {
                'color': '#e0efd8'
            }
        ]
    },
    {
        'featureType': 'poi.park',
        'elementType': 'labels.text',
        'stylers': [
            {
                'visibility': 'off'
            }
        ]
    },
    {
        'featureType': 'road',
        'elementType': 'all',
        'stylers': [
            {
                'saturation': -100
            },
            {
                'lightness': '26'
            },
            {
                'gamma': '1.24'
            }
        ]
    },
    {
        'featureType': 'road.highway',
        'elementType': 'all',
        'stylers': [
            {
                'visibility': 'on'
            }
        ]
    },
    {
        'featureType': 'road.highway',
        'elementType': 'geometry.fill',
        'stylers': [
            {
                'lightness': '100'
            }
        ]
    },
    {
        'featureType': 'road.highway',
        'elementType': 'geometry.stroke',
        'stylers': [
            {
                'lightness': '44'
            }
        ]
    },
    {
        'featureType': 'road.highway',
        'elementType': 'labels.icon',
        'stylers': [
            {
                'visibility': 'off'
            }
        ]
    },
    {
        'featureType': 'road.arterial',
        'elementType': 'geometry.fill',
        'stylers': [
            {
                'lightness': '99'
            }
        ]
    },
    {
        'featureType': 'road.arterial',
        'elementType': 'geometry.stroke',
        'stylers': [
            {
                'lightness': '-2'
            }
        ]
    },
    {
        'featureType': 'road.arterial',
        'elementType': 'labels.icon',
        'stylers': [
            {
                'visibility': 'off'
            }
        ]
    },
    {
        'featureType': 'road.local',
        'elementType': 'geometry.fill',
        'stylers': [
            {
                'lightness': '16'
            }
        ]
    },
    {
        'featureType': 'road.local',
        'elementType': 'labels.text',
        'stylers': [
            {
                'visibility': 'off'
            }
        ]
    },
    {
        'featureType': 'transit',
        'elementType': 'all',
        'stylers': [
            {
                'visibility': 'off'
            }
        ]
    },
    {
        'featureType': 'water',
        'elementType': 'all',
        'stylers': [
            {
                'color': '#a7e4f7'
            },
            {
                'visibility': 'on'
            }
        ]
    },
    {
        'featureType': 'water',
        'elementType': 'geometry.fill',
        'stylers': [
            {
                'color': '#a9c4d9'
            },
            {
                'lightness': '47'
            },
            {
                'saturation': '0'
            }
        ]
    },
    {
        'featureType': 'water',
        'elementType': 'labels',
        'stylers': [
            {
                'visibility': 'on'
            }
        ]
    },
    {
        'featureType': 'water',
        'elementType': 'labels.text.fill',
        'stylers': [
            {
                'color': '#bdbdbd'
            }
        ]
    },
    {
        'featureType': 'water',
        'elementType': 'labels.text.stroke',
        'stylers': [
            {
                'color': '#f3f3f3'
            }
        ]
    }
];
$(function(){

	//nav
	(function(header){
		$('nav li', header).on('mouseover', function(){
			var $this = $(this);

			if($this.index() === $('nav li.on', header).index()) {
				return;
			}

			var overlay = $('nav i', header);
			var activeColor = '#d70b2a';
			var normalColor = '#313131';

			var tl = new TimelineMax({paused: true, onComplete: function(){

			}});

			var left = $this.offset().left - $this.parent().offset().left;
			left = $('nav').width() - $this.parent().width() + left - $this.parent().css('marginRight').replace(/px/, '');

			tl.add( [
				TweenMax.to($('ul', overlay), 0.25, {
					opacity: 0
				})
				, TweenMax.to(overlay, 0.25, {
					left: left
				})
				, TweenMax.to($('a', $this.siblings()), 0.25, {
					color: normalColor
				})
				, TweenMax.to($('a', $this), 0.25, {
					color: activeColor
				})
			] );
			overlay.html($('ul', $this).clone());
			tl.add([
				TweenMax.set($('ul', overlay), {
					height: 0
				})
			]);
			tl.add([
				TweenMax.to($('ul', overlay), 0.25, {
					opacity: 1,
					height: 'auto'
				}),
				function(){
					$this.addClass('on').siblings().removeClass('on');
				}
			]);
			tl.play();
		});
		$('.nav li.active', header).trigger('mouseover');
		// $('nav', header).on('mouseout', function(){
		// 	$('.nav li.active', header).trigger('mouseover');
		// });


		var stickMenu = header;
		// stickMenu.insertAfter($('header'));
		// TweenMax.set(stickMenu,{
		// 	top: 0,
		// 	position: 'absolute'
		// });
		var menuTimeline = new TimelineMax({paused: true, onComplete: function(){
		}});
		$(window).on('scroll resize', function(){

			menuTimeline.stop();
			menuTimeline = new TimelineMax({paused: true, onComplete: function(){
			}});
			var top = $(window).scrollTop();
			var originTop = stickMenu.offset().top;
			if(top <= originTop){
				TweenMax.set(stickMenu, {
					top: top
				});
			}


			menuTimeline.add([
				TweenMax.to(stickMenu, 0.7, {
					top: $(window).scrollTop(),
					delay: 0.3
				})
			]);
			menuTimeline.play();
		});
	}($('header')));

	//highlight
	(function(container){
		var active = $('ul li.active', container);
		var cur = $(document.createElement('div'));
		var fade = $(document.createElement('div'));

		cur.addClass('cur');
		fade.addClass('fade');

		cur.insertBefore($('>nav', container));
		fade.insertBefore($('>nav', container));
		function hook(index){
			$('>ul li', container).eq(index).addClass('active').siblings().removeClass('active');
			fade.css('background-image', cur.css('background-image'));
			TweenMax.set(fade, {
				opacity: 1,
				display: 'block'
			});
			active = $('ul li.active', container);
			cur.css('background-image', 'url(' + $('img', active).attr('src') + ')');

			TweenMax.to(fade, 0.5, {
				opacity: 0,
				onComplete: function(){
					TweenMax.set(fade, {display: 'none'});
				}
			});
		}


		$('>nav ul', container).html('');
		$('>ul li', container).each(function(idx){
			var btn = $('<li><a href=\'javascript:\'><img src=\'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVQYV2P4zwAAAgEBAOIxSPwAAAAASUVORK5CYII=\' alt=\'' + idx + '\'></a></li>');
			btn.on('click', function(){
				hook(idx);
			});
			$('>nav ul', container).append(btn);
			$('>nav ul', container).append('\r\n');
		});
		hook(0);



	}($('.highlight')));

	//activities nav
	(function(container){
		$('nav ul li', container).on('mouseover', function(){
			var overlay = $('nav i', container);
			var activeColor = '#fff';
			var normalColor = '#535353';

			var $this = $(this);
			var tl = new TimelineMax({paused: true, onComplete: function(){
			}});

			tl.add([
				TweenMax.to( overlay, 0.25, {
					left: $this.offset().left - $this.parent().offset().left
				}),
				TweenMax.to($('a', $this.siblings()), 0.25, {color: normalColor}),
				TweenMax.to($('a', $this), 0.25, {color: activeColor})

			]);
			tl.play();
		});
	}($('.activities, .marketing, .management')));
	//activities
	(function(container){
		$(window).on('resize', function(){
			var ul = $('>ul', container);
			var active = $('>ul li.active', container);
			var index = active.index();
			var w = $(window).width() > 1366 ? $(window).width() : 1366;
			var containerWidth = container.width();

			var offset = (w - containerWidth) / 2 - 588 * (index + 2);
			var padding = 595 + 600 - (w - containerWidth) / 2;


			TweenMax.to(ul, 0.5, {
				marginLeft: offset,
				paddingLeft: padding
			});
			if(active.next().length){
				$('.next', container).fadeIn(250);
			}else{
				$('.next', container).hide();
			}
			if(active.prev().length){
				$('.prev', container).fadeIn(250);
			}else{
				$('.prev', container).hide();
			}

		}).trigger('resize');

		$('.next', container).on('click', function(){
			var active = $('>ul li.active', container);
			if(!active.next().length){
				return;
			}
			active.next().addClass('active').siblings().removeClass('active');
			$(window).trigger('resize');
		});

		$('.prev', container).on('click', function(){
			var active = $('>ul li.active', container);
			if(!active.prev().length){
				return;
			}
			active.prev().addClass('active').siblings().removeClass('active');
			$(window).trigger('resize');
		});


		var div = $(document.createElement('div'));
		var nav = $(document.createElement('nav'));
		var l = $(document.createElement('ul'));

		l.append($('>ul li, .activities-list li', container).clone());
		nav.append(l);
		div.append(nav);

		$('>ul li a, .activities-list li a', container).colorbox({
			innerHeight: 725,
			innerWidth: 965,
			fixed: true,
			rel: 'group all',
			transition: 'fade',
			title: $(this).attr('title'),
			current: function(){
				$('li', div).eq($(this).parents('li').index())
					.addClass('active')
					.siblings().removeClass('active');
				return div.html();
			},
			onComplete: function(){
				$('#cboxTitle').attr('title', $('span >b', this).html());
				$(this).parents('li').addClass('active').siblings().removeClass('active');
				$(window).trigger('resize');
				$('#cboxCurrent nav ul li').on('click', function(){
					$('>ul li', container).eq($(this).index()).find('a').trigger('click');
				});
				TweenMax.set($('#cboxCurrent ul'), {
					marginLeft: ($(window).width() - $('#cboxCurrent li').width()) / 2 - $('#cboxCurrent .active').offset().left
				});
			},
			onClosed: function(){
				TweenMax.set($('.container'), {scrollLeft: 0});
			}
		});

		var cboxNav = $('<ul></ul>');
		cboxNav.append($('>ul li ', container).clone());


	}($('.activities.content, .marketing, .management')));

	// map
	(function(m){

		function geocodeAddress(geocoder, map, place) {

			var infowindow = new google.maps.InfoWindow();

			geocoder.geocode({'address': place.address}, function(results, status) {
				if (status === google.maps.GeocoderStatus.OK) {
					map.setCenter(results[0].geometry.location);
						var marker = new google.maps.Marker({
						map: map,
						position: results[0].geometry.location,
						title: place.name
					});
					marker.setIcon('images/map/marker.png');
					marker.addListener('click', function() {
						var container = $('<div></div>');
						container.append('<h3>' + place.name + '</h3>');
						container.append('<p>' + place.address + '</p>');
						container.append('<img src=\'' + place.image + '\'>');
						infowindow.setContent(container.html());
						infowindow.open(map, this);
						map.setZoom(16);
						map.setCenter(marker.getPosition());
					});

				}
			});
		}

		function initMap() {
			var map = new google.maps.Map(m[0], {
				zoom: 8,
				center: {lat: 25.5, lng: 120.6},
				styles: mapStyle

			});
			var geocoder = new google.maps.Geocoder();
			var places = [{
				address: '台北市北投區泉源路25號',
				marker: null,
				name: '龍邦僑園會館',
				image: 'images/map/map01.png',
				id: 1
			}, {
				address: '台北市信義路四段1號',
				marker: null,
				name: '信義路會館',
				image: 'images/map/map02.png',
				id: 2
			}, {
				address: '台北市凱達格蘭大道1號',
				marker: null,
				name: '總統府',
				image: 'images/map/map03.png',
				id: 3
			}];
			for(var i in places){
				var place = places[i];
				geocodeAddress(geocoder, map, place);
			}

		}
		initMap();
	}($('#map')));
});
