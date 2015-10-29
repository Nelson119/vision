'use strict';
/*eslint-disable new-cap, no-unused-vars */
/*global  $, TweenMax, google, _, MarkerClusterer */

$(function(window){
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

    // google.load('visualization', '1', { packages: ['corechart'] });

    /**
    * Sector type mapped to a style rule.
    * @type {Object}
    * @const
    */
    var LAYER_STYLES = {
        'Residential': {
          'min': 0,
          'max': 10000,
          'colors': [
            '#f4cccc',
            '#ea9999',
            '#e06666',
            '#cc0000',
            '#990000'
          ]
        },
        'Non-Residential': {
          'min': 0,
          'max': 10000,
          'colors': [
            '#d0e0e3',
            '#a2c4c9',
            '#76a5af',
            '#45818e',
            '#134f5c'
          ]
        },
        'Total': {
          'min': 0,
          'max': 20000,
          'colors': [
            '#d9d2e9',
            '#b4a7d6',
            '#8e7cc3',
            '#674ea7',
            '#351c75'
          ]
        }
    };

    // map
    if($('#map').length){
        (function(m){

            var places = [];

            var mapSection = $('.page.map');

            var activeIndex = 1;

            var markerInfoWindow = null;

            var markers = {};

            var total = 0;

            var newCoordinates = [];

            var map = null;


            function bindNavButton(){

                var count = $('.map-detail .picture-collection:last li').length;
                var page = [];
                var index = 0;
                while($('.map-detail .picture-collection li').eq(index).length){
                    page.push(index);
                    index += 4;
                }
                function navNext(){
                    var ul = $('.map-detail .picture-collection');
                    var pageIndex = ul.attr('data-offset') * 1;
                    pageIndex++;
                    if(page[pageIndex] === undefined){
                        return;
                    }
                    var li = $('li', ul).eq(page[pageIndex]);

                    TweenMax.to(ul, 0.5, {
                        marginLeft: ul.offset().left - li.offset().left + 35
                    });
                    if(page[pageIndex + 1] === undefined){
                        $(this).hide();
                    }
                    if(page[pageIndex - 1] !== undefined){
                        $('.map-detail .picture-preview .prev').show();
                    }
                    ul.attr('data-offset', pageIndex);
                }

                function navPrev(){

                    var ul = $('.map-detail .picture-collection');
                    var pageIndex = ul.attr('data-offset') * 1;
                    pageIndex--;

                    if(page[pageIndex] === undefined){
                        return;
                    }
                    var li = $('li', ul).eq(page[pageIndex]);
                    TweenMax.to(ul, 0.5, {
                        marginLeft: ul.offset().left - li.offset().left + 35
                    });
                    if(page[pageIndex - 1] === undefined){
                        $(this).hide();
                    }
                    if(page[pageIndex + 1] !== undefined){
                        $('.map-detail .picture-preview .next').show();
                    }
                    ul.attr('data-offset', pageIndex);
                }

                $('.map-detail .picture-preview .next').unbind('click').on('click', navNext);
                $('.map-detail .picture-preview .prev').unbind('click').on('click', navPrev);
            }

            function goto(index){
                $('nav >aside >ul >li', mapSection).eq(index - 1).addClass('active').siblings().removeClass('active');
                var target = $('nav >aside >ul', mapSection);
                var singleHeight = 280;
                var offset = singleHeight * 2 + (singleHeight * index) * -1;
                if(index - 1 === $('nav >aside >ul >li:last').index() * 1){
                    offset += singleHeight;
                }
                if(index - 1 === 0){
                    offset -= singleHeight;
                }

                TweenMax.to(target, 0.5, {
                    marginTop: offset
                });

            }

            function clusters(geocoder){
                $.each(markers, function(i, d){
                    // drawVisualization(i);
                    var mc = new MarkerClusterer(map, d, { ignoreHidden: true });
                    // var pos = null;
                    // for(var it in d){
                    //     var mk = d[it];
                    //     pos = mk.position;
                    // }
                    // <iframe width="500" height="300" scrolling="no" frameborder="no" src="https://www.google.com/fusiontables/embedviz?
                    // q=select+col6+from+17PoqyjR1FGNOO8cxjdGBlK8m_TVAuMbAbjCBkeo
                    // &amp;viz=MAP&amp;
                    // h=false&amp;
                    // lat=23.46848199211126&amp;
                    // lng=121.23255939062507&amp;
                    // t=1&amp;z=7&amp;l=col6"></iframe>
                });
            }

            function cityOverLay(){

            }

            function geocodeAddress(geocoder, place) {

                markerInfoWindow = new google.maps.InfoWindow();

                geocoder.geocode({'address': place.address}, function(results, status) {
                    if (status === google.maps.GeocoderStatus.OK) {
                        // map.setCenter(results[0].geometry.location);
                        var marker = new google.maps.Marker({
                            map: map,
                            position: results[0].geometry.location,
                            title: place.name
                        });
                        marker.setIcon('images/map/marker.png');
                        marker.setVisible(false);
                        marker.addListener('click', function() {
                            var container = $('<div></div>');
                            var aside = $('<aside class="inmap"></aside>');
                            aside.append('<h3>' + place.name + '</h3>');
                            aside.append('<p>' + place.address + '</p>');
                            aside.append('<a class=\'activate-map\' href=\'#' + place.id + '\'><i class=\'icon-right-open-mini\'></i><span>詳細資訊</span></a>');

                            container.append(aside);

                            goto(place.index);

                            markerInfoWindow.setContent(container.html());
                            markerInfoWindow.open(map, this);
                            map.setZoom(16);
                            map.setCenter(marker.getPosition());

                            $('.inmap .activate-map').colorbox({
                                inline: true,
                                overlayClose: false,
                                innerWidth: 1150,
                                innerHeight: 768,
                                onComplete: function(){
                                    $('.map-detail .box-content .picture-preview').append('<a href=\'javascript:\' class=\'prev\'></a>');
                                    $('.map-detail .box-content .picture-preview').append('<a href=\'javascript:\' class=\'next\'></a>');
                                    bindNavButton();
                                    $('.map-detail .picture-collection li').unbind('click').on('click', function(){
                                        $(this).addClass('active').siblings().removeClass('active');
                                        $('.map-detail .picture-preview .picture img').attr('src', $('img', this).attr('src'));
                                        $('.map-detail .picture').next().html(this.title);
                                    });
                                    $('.map-detail .picture-collection').css('margin-left', '35px');
                                    $('.map-detail .picture-preview .prev').hide();
                                    $('.map-detail .picture-collection').attr('data-offset', 0);
                                }
                            });

                        });

                        $(results[0].address_components).filter(function(){
                            if(/縣|市/ig.test(this.long_name)){
                                place.city = this.long_name;
                            }
                        }).first();

                        place.marker = marker;

                        if(markers[place.city] === undefined){
                            markers[place.city] = [];
                        }

                        markers[place.city].push(marker);

                        total++;

                        if(total === places.length){
                            clusters(geocoder);
                        }
                    }
                });
            }
            function initMap() {

               var minZoomLevel = 7;


               // Bounds for Twiwan
               var strictBounds = new google.maps.LatLngBounds(
                 new google.maps.LatLng(22, 120),
                 new google.maps.LatLng(25, 122)
               );

                map = new google.maps.Map(m[0], {
                    zoom: minZoomLevel,
                    center: {lat: 23.46848199211126, lng: 121.23255939062507},
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
                        innerWidth: 1150,
                        innerHeight: 768,
                        onComplete: function(){
                            $(ele).addClass('active').siblings().removeClass('active');
                            $('.map-detail .box-content .picture-preview').append('<a href=\'javascript:\' class=\'prev\'></a>');
                            $('.box-content .picture-preview').append('<a href=\'javascript:\' class=\'next\'></a>');
                            bindNavButton();

                            $('.map-detail .picture-collection li').unbind('click').on('click', function(){
                                $(this).addClass('active').siblings().removeClass('active');
                                $('.map-detail .picture-preview .picture img').attr('src', $('img', this).attr('src'));
                                $('.map-detail .picture').next().html(this.title);
                            });
                            $('.map-detail .picture-collection').css('margin-left', '35px');
                            $('.map-detail .picture-preview .prev').hide();
                            $('.map-detail .picture-collection').attr('data-offset', 0);
                        }
                    });


                });
                $.each(places, function(i, place) {
                    setTimeout(function(){
                        geocodeAddress(geocoder, place);
                    }, i * 350);
                });

               // Listen for the dragend event
               google.maps.event.addListener(map, 'dragend', function() {
                    if (strictBounds.contains(map.getCenter())){
                        return;
                    }
                 // We're out of bounds - Move the map back within the bounds

                 var c = map.getCenter(),
                     x = c.lng(),
                     y = c.lat(),
                     maxX = strictBounds.getNorthEast().lng(),
                     maxY = strictBounds.getNorthEast().lat(),
                     minX = strictBounds.getSouthWest().lng(),
                     minY = strictBounds.getSouthWest().lat();

                if (x < minX){
                    x = minX;
                }
                if (x > maxX){
                    x = maxX;
                }
                if (y < minY){
                    y = minY;
                }
                if (y > maxY){
                    y = maxY;
                }

                 map.setCenter(new google.maps.LatLng(y, x));
               });

               // Limit the zoom level
                google.maps.event.addListener(map, 'zoom_changed', function() {
                    if (map.getZoom() < minZoomLevel){
                        map.setZoom(minZoomLevel);
                    }
               });
            }

            $('nav >aside >ul >li.active', mapSection).next().eq(activeIndex).addClass('active').siblings().removeClass('active');

            $('nav >.next', mapSection).on('click', function(){
                if(!$('nav >aside >ul >li.active', mapSection).next().length){
                    return false;
                }
                var index = $('nav >aside >ul >li.active', mapSection).next().attr('data-index');
                goto(index);
                var marker = _.find(places, {index: index}).marker;
                var trig = new google.maps.event.trigger(marker, 'click' );
            });

            $('nav >.prev', mapSection).on('click', function(){
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


      function drawVisualization(county) {
        console.log(county);
        // google.visualization.drawChart({
        //   containerId: "visualization",
        //   dataSourceUrl: "http://www.google.com/fusiontables/gvizdata?tq=",
        //   query: "SELECT col6 " +
        //       "FROM 17PoqyjR1FGNOO8cxjdGBlK8m_TVAuMbAbjCBkeo WHERE County = '" + county + "'",
        //   chartType: "ColumnChart",
        //   options: {
        //     title: county,
        //     height: 400,
        //     width: 400
        //   }
        // });
      }


        }($('#map')));
    }

}(window));
