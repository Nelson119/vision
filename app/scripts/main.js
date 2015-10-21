'use strict';
/*eslint-disable new-cap, no-unused-vars */
/*global  $, TweenMax, TimelineMax, google, _, blueimp */
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

        var tl = new TimelineMax({paused: true, onComplete: function(){

        }});

		$('nav li', header).on('mouseover', function(){
			var $this = $(this);

            if(!$('nav li.active', header).length){
                $('nav i', header).fadeIn(250);
            }

			if($this.index() === $('nav li.on', header).index()) {
				return;
			}

			var overlay = $('nav i', header);
			var activeColor = '#d70b2a';
			var normalColor = '#313131';

            tl.stop();

			tl = new TimelineMax({paused: true, onComplete: function(){

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

            // $('nav i', header).on('mouseout', function(){
            //     if(!$('nav li.active', header).length){
            //         $('nav i', header).hide();
            //     }
            //     $('nav li.active', header).trigger('mouseover');
            // });
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
		$('nav li.active', header).trigger('mouseover');
        if(!$('nav li.active', header).length){
            $('nav i', header).hide();
        }
        $('nav li:not(:eq(2))', header).on('mouseout', function(){
            if(!$('nav li.active', header).length){
                $('nav i', header).hide();
            }
            $('nav li.active', header).trigger('mouseover');
        });
        $('.page,.highlight').on('mouseover', function(){
            if(!$('nav li.active', header).length){
                $('nav i', header).hide();
            }
            $('nav li.active', header).trigger('mouseover');
        });


		var stickMenu = header;

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
                btn.addClass('active').siblings().removeClass('active');
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
	}($('.activities, .marketing, .management, .news')));
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
			if(!active.next().next().length){
				return;
			}
			active.next().addClass('active').siblings().removeClass('active');
			$(window).trigger('resize');
            if(!active.next().next().length){
                $('.next', container).hide();
            }
            if(active.prev().prev().length){
                $('.prev', container).show();
            }
		});

		$('.prev', container).on('click', function(){
			var active = $('>ul li.active', container);
			if(!active.prev().prev().length){
				return;
			}
			active.prev().addClass('active').siblings().removeClass('active');
			$(window).trigger('resize');
            if(!active.prev().prev().length){
                $(this).hide();
            }
            if(!active.next().next().length){
                $('.next', container).hide();
            }
		});


        $('>ul li a, .activities-list li a', container).on('click', function(){
            var data = [
                {
                    title: '陳建銘議員石牌公園『愛與環保...',
                    href: 'images/activities/event02.png',
                    type: 'image/jpeg',
                    thumbnail: 'images/activities/event02.png',
                    date: '2014.10.26'
                },
                {
                    title: '吉廣建設江子翠住宅開工動土典禮',
                    href: 'images/activities/event02.png',
                    type: 'image/jpeg',
                    thumbnail: 'images/activities/event02.png',
                    date: '2014.10.26'
                }
            ];
            var gallery = blueimp.Gallery(data, {
                thumbnailProperty: 'thumbnail',
                closeOnSlideClick: false,
                transitionSpeed: 1000,
                onopened: function(){
                    $(window).on('resize', function(){
                        var idx = $('#blueimp-gallery .indicator .active').index();
                        var img = $('.slide-content').eq(idx);
                        var top = img.offset().top - img.parent().offset().top;
                        var left = img.offset().left - img.parent().offset().left;
                        TweenMax.to($('#blueimp-gallery .next'), 0.5, {
                            left: left + img.width(),
                            top: top + img.height() / 2 - $('#blueimp-gallery .next').height() / 2
                        });
                        TweenMax.to($('#blueimp-gallery .prev'), 0.5, {
                            left: left - $('#blueimp-gallery .prev').width(),
                            top: top + img.height() / 2 - $('#blueimp-gallery .prev').height() / 2
                        });
                        TweenMax.to($('#blueimp-gallery .close'), 0.5, {
                            left: left + img.width() + 10,
                            top: top
                        });
                    TweenMax.to($('#blueimp-gallery .title'), 0.5, {
                        left: left,
                        top: top + img.height() + 10
                    });
                    }).trigger('resize');
                    var i = $('#blueimp-gallery .indicator .active').index();
                    $('#blueimp-gallery .title').append('<b>' + data[i].date + '</b>');
                },
                onslideend: function(){
                    $(window).trigger('resize');
                }
            });
        });


		// var div = $(document.createElement('div'));
		// var nav = $(document.createElement('nav'));
		// var l = $(document.createElement('ul'));

		// l.append($('>ul li, .activities-list li', container).clone());
		// nav.append(l);
		// div.append(nav);
  //       $('>ul li a, .activities-list li a', container).each(function(i, d){
  //           $(this).attr('href', $('img', this).attr('src'));
  //       });
		// $('>ul li a, .activities-list li a', container).colorbox({
		// 	innerHeight: 725,
		// 	innerWidth: 965,
		// 	fixed: true,
  //           overlayClose: false,
		// 	rel: 'group all',
		// 	transition: 'fade',
		// 	title: $(this).attr('title'),
  //           scrolling: true,
		// 	current: function(){
		// 		$('li', div).eq($(this).parents('li').index())
		// 			.addClass('active')
		// 			.siblings().removeClass('active');
		// 		return div.html();
		// 	},
		// 	onComplete: function(){
		// 		$('#cboxTitle').attr('title', $('span >b', this).html());
		// 		$(this).parents('li').addClass('active').siblings().removeClass('active');
		// 		$(window).trigger('resize');
		// 		$('#cboxCurrent nav ul li').on('click', function(){
		// 			$('>ul li', container).eq($(this).index()).find('a').trigger('click');
		// 		});
		// 		TweenMax.set($('#cboxCurrent ul'), {
		// 			marginLeft: ($(window).width() - $('#cboxCurrent li').width()) / 2 - $('#cboxCurrent .active').offset().left
		// 		});
		// 	},
		// 	onClosed: function(){
		// 		TweenMax.set($('.container'), {scrollLeft: 0});
		// 	}
		// });

		// var cboxNav = $('<ul></ul>');
		// cboxNav.append($('>ul li ', container).clone());



	}($('.activities.content, .marketing, .management')));

	// map
	if($('#map').length){
		(function(m){

            var places = [];

            var mapSection = $('.page.map');

            var activeIndex = 1;


            function goto(index){
                $('nav >aside >ul >li', mapSection).eq(index - 1).addClass('active').siblings().removeClass('active');
                var target = $('nav >aside >ul', mapSection);
                var offset = 608 + (304 * index) * -1;

                TweenMax.to(target, 0.5, {
                    marginTop: offset
                });

            }

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
                            var aside = $('<aside class="inmap"></aside>');
                            aside.append('<h3>' + place.name + '</h3>');
                            aside.append('<p>' + place.address + '</p>');
                            aside.append('<a class=\'activate-map\' href=\'#' + place.id + '\'><i class=\'icon-right-open-mini\'></i><span>詳細資訊</span></a>');

                            container.append(aside);

                            goto(place.index);

                            // container.append('<img src=\'' + place.image + '\'>');
                            infowindow.setContent(container.html());
                            infowindow.open(map, this);
                            map.setZoom(16);
                            map.setCenter(marker.getPosition());

                            $('.inmap .activate-map').colorbox({
                                inline: true,
                                overlayClose: false,
                                innerWidth: 1400,
                                innerHeight: 768,
                                onComplete: function(){
                                    $('.box-content .picture-preview').append('<a href=\'javascript:\' class=\'prev\'></a>');
                                    $('.box-content .picture-preview').append('<a href=\'javascript:\' class=\'next\'></a>');
                                }
                            });

                        });
                        place.marker = marker;

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
                $('nav >aside >ul >li', mapSection).each(function(idx, ele){
                    $('aside .box-content', ele).attr('id', 'marker' + new Date() * 1);
                    var datum = {
                        address: $(ele).attr('data-address'),
                        marker: null,
                        name: $(ele).attr('data-name'),
                        image: $(ele).attr('data-image'),
                        index: $(ele).attr('data-index'),
                        id: $('aside .box-content', ele).attr('id')
                    };
                    places.push(datum);
                    $('.name', ele).html(datum.name);
                    $('.address', ele).html(datum.address);
                    $('img', ele).attr('src', datum.image);
                    $('a', ele).attr('href', '#' + datum.id).colorbox({
                        inline: true,
                        overlayClose: false,
                        innerWidth: 1400,
                        innerHeight: 768,
                        onComplete: function(){
                            $(ele).addClass('active').siblings().removeClass('active');
                            $('.box-content .picture-preview').append('<a href=\'javascript:\' class=\'prev\'></a>');
                            $('.box-content .picture-preview').append('<a href=\'javascript:\' class=\'next\'></a>');
                        }
                    });


                });
                for(var i in places){
                    var place = places[i];
                    geocodeAddress(geocoder, map, place);
                }

            }

            $('nav >aside >ul >li.active', mapSection).next().eq(activeIndex).addClass('active').siblings().removeClass('active');

            $('nav .next', mapSection).on('click', function(){
                if(!$('nav >aside >ul >li.active', mapSection).next().length){
                    return false;
                }
                var index = $('nav >aside >ul >li.active', mapSection).next().attr('data-index');
                goto(index);
                var marker = _.find(places, {index: index}).marker;
                var trig = new google.maps.event.trigger(marker, 'click' );
            });

            $('nav .prev', mapSection).on('click', function(){
                if(!$('nav >aside >ul >li.active', mapSection).prev().length){
                    return false;
                }
                var index = $('nav >aside >ul >li.active', mapSection).prev().attr('data-index');
                goto(index);
                var marker = _.find(places, {index: index}).marker;
                var trig = new google.maps.event.trigger(marker, 'click' );
            });

            initMap();
            $('#colorbox').addClass('map-detail');

		}($('#map')));
	}

    //footer
    (function(footer){

        $('.top', footer).on('click', function(){
            var offset = $(window).scrollTop();
            TweenMax.to($('body, html'), offset / 3000, {
                scrollTop: 0
            });
        });

    }($('footer')));


    //marquee
    (function(marquee){
        $('.mq ul').marquee({

        });
    }($('.marquee')));
});
