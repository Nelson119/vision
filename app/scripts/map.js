'use strict';
/*eslint-disable new-cap, no-unused-vars */
/*global  $, TweenMax, google, _, MarkerClusterer, MarkerWithLabel */

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

            var clusters = {};

            var total = 0;

            var newCoordinates = [];

            var map = null;

            var polys = [];

            var countyWindows = [];

            var hint = $('<a id=\'hint-btn\' href=\'javascript:\'> 請用滑鼠左鍵點選您要辦活動的縣市/場地</a>');

            var minZoomLevel = 7;

            function goto(index){
                $('nav >aside >ul >li', mapSection).eq(index - 1).addClass('active').siblings().removeClass('active');
                var target = $('nav >aside >ul', mapSection);
                var singleHeight = 151;
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

            function lightboxOpen(place){

                var container = $('<div></div>');

                var aside = $('<aside class=\'inmap\'></aside>');

                var marker = _.find(places, {index: place.index}).marker;

                aside.append('<h3>' + place.name + '</h3>');
                aside.append('<p>' + place.address + '</p>');
                aside.append('<a class=\'activate-map\' href=\'#' + place.id + '\'><i class=\'icon-right-open-mini\'></i><span>詳細資訊</span></a>');

                container.append(aside);

                $('.inmap').remove();

                goto(place.index);
                var latLng = {lat: marker.getPosition().lat() + 0.0009, lng: marker.getPosition().lng()};
                map.setCenter(marker.getPosition());
                markerInfoWindow.setPosition(latLng);

                markerInfoWindow.setContent(container.html());
                markerInfoWindow.open(map);
                map.setZoom(16);

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

            }
            function parseLatLng(ll) {
                var lat = ll.replace(/[(](\d+\.\d+).*/, '$1');
                var lng = ll.replace(/.*\,\s*(\d+\.\d+)\)/, '$1');

                var latLng = new google.maps.LatLng(parseFloat(lat), parseFloat(lng));

                return latLng;
            }


            function bindEvent(county, polyLabel){
                var marker = new MarkerWithLabel({
                    position: new google.maps.LatLng(0, 0),
                    draggable: false,
                    raiseOnDrag: false,
                    map: map,
                    labelContent: polyLabel,
                    labelAnchor: new google.maps.Point(30, 20),
                    labelClass: 'labels', // the CSS class for the label
                    labelStyle: {opacity: 1.0},
                    icon: 'http://www.long-vision.com.tw/skin/images/blank.png',
                    visible: false
                 });
                google.maps.event.clearListeners(county, 'mousemove');
                google.maps.event.clearListeners(county, 'mouseout');
                google.maps.event.clearListeners(marker, 'click');
                var latLng = null;
                google.maps.event.addListener(marker, 'click', function(event) {
                    map.setCenter(county.center);
                    map.setZoom(county.zoomLevel);

                });
                google.maps.event.addListener(county, 'click', function(event) {
                    console.log(county.center);
                    map.setCenter(county.center);
                    map.setZoom(county.zoomLevel);

                });
                google.maps.event.addListener(county, 'mousemove', function(event) {
                    county.setOptions({
                        strokeColor: '#94dd40',
                        fillColor: '#50bc1e'
                    });
                    marker.setPosition(event.latLng);
                    marker.setVisible(true);
                    latLng = event.latLng;
                });
                google.maps.event.addListener(county, 'mouseout', function(event) {
                    marker.setVisible(false);
                    county.setOptions({
                        strokeColor: '#50bc1e',
                        fillColor: '#94dd40'
                    });
                });
            }

            function constructNewCoordinates(polygon) {
                var c = [];
                var coordinates = polygon.coordinates[0];
                for (var i in coordinates) {
                    c.push(
                    new google.maps.LatLng(coordinates[i][1], coordinates[i][0]));
                }
                return c;
            }


            function drawMap(data) {
                var rows = data.rows;
                for (var i in rows) {
                    newCoordinates = [];
                    var geometries = rows[i][4].geometries;
                    if (geometries) {
                        for (var j in geometries) {
                            newCoordinates.push(constructNewCoordinates(geometries[j]));
                        }
                    } else {
                        newCoordinates = constructNewCoordinates(rows[i][4].geometry);
                    }
                    var randomnumber = Math.floor(Math.random() * 4);
                    var county = new google.maps.Polygon({
                        paths: newCoordinates,
                        strokeColor: '#50bc1e',
                        strokeOpacity: 0.7,
                        strokeWeight: 1,
                        fillColor: '#94dd40',
                        fillOpacity: 0.7,
                        zoomLevel: (isNaN(rows[i][5]) ? 10 : rows[i][5]) * 1,
                        center: parseLatLng(rows[i][6])
                    });
                    bindEvent(county, rows[i][1]);
                    polys.push(county);
                    county.setMap(map);
                }
                hint.html(' ' + $('#map').attr('data-title'));
                hint.on('click', function(){
                    if(map.getZoom() === minZoomLevel){
                        return false;
                    }else{
                        map.setZoom(minZoomLevel);
                    }
                });
                $('#map').append(hint);
            }

            function addClusters(geocoder){
                $.each(markers, function(i, d){
                    var mc = new MarkerClusterer(map, d, { ignoreHidden: true });
                    mc.setMaxZoom(9);
                    clusters[i] = mc;

                });
            }

            function finalizePlace(geocoder, place){
                var marker = new google.maps.Marker({
                    map: map,
                    position: place.geometryLocation,
                    title: place.name
                });
                marker.setIcon('http://www.long-vision.com.tw/skin/images/map/marker.png');
                marker.setVisible(false);
                marker.addListener('click', function(){
                    lightboxOpen(place);
                });


                place.marker = marker;

                if(markers[place.city] === undefined){
                    markers[place.city] = [];
                }

                markers[place.city].push(marker);

                total++;

                if(total === places.length){
                    addClusters(geocoder);
                }
                place.btn.removeClass('disabled');

            }

            function geocodeAddress(geocoder, place) {

                markerInfoWindow = new google.maps.InfoWindow();
                if(!place.geometryLocation){
                    geocoder.geocode({'address': place.address}, function(results, status) {

                        if (status === google.maps.GeocoderStatus.OK) {
                            $(results[0].address_components).filter(function(){
                                if(/縣|市/ig.test(this.long_name)){
                                    place.city = this.long_name;
                                }
                                place.geometryLocation = results[0].geometry.location;
                                $.post('/wp-admin/admin-ajax.php',
                                    {
                                        action: 'update_map_geometry_location',
                                        id: place.postId,
                                        geometryLocation: JSON.stringify({lat: place.geometryLocation.lat(), lng: place.geometryLocation.lng()}),
                                        city: place.city
                                    }, function(r){
                                    // console.log(r);
                                    });
                                finalizePlace(geocoder, place);
                            }).first();
                        }else{
                            //console.log(status)
                        }
                    });

                }else{
                    finalizePlace(geocoder, place);
                }

                google.maps.event.addListener(markerInfoWindow, 'closeclick', function(){
                    map.setZoom(minZoomLevel);
                });
            }

            function initMap() {


               // Bounds for Twiwan
               var strictBounds = new google.maps.LatLngBounds(
                  new google.maps.LatLng(20, 120),
                  new google.maps.LatLng(30, 125)
               );

                map = new google.maps.Map(m[0], {
                    zoom: minZoomLevel,
                    center: {lat: 23.46848199211126, lng: 121.23255939062507},
                    styles: mapStyle

                });
                var geocoder = new google.maps.Geocoder();
                $('nav >aside >ul >li', mapSection).each(function(idx, ele){
                    $('aside .box-content', ele).attr('id', 'marker' + new Date() * 1 + Math.floor(Math.random() * 100000000));

                    var geometryLocation = !$(ele).attr('data-geometry') ?
                        null :
                        $.parseJSON($(ele).attr('data-geometry'));

                    var datum = {
                        address: $(ele).attr('data-address'),
                        marker: null,
                        name: $(ele).attr('data-name'),
                        image: $(ele).attr('data-image'),
                        index: $(ele).attr('data-index'),
                        postId: $(ele).attr('data-post-id'),
                        geometryLocation: !geometryLocation ? null : new google.maps.LatLng(geometryLocation.lat, geometryLocation.lng),
                        city: $(ele).attr('data-city'),
                        btn: $('figure, .location', ele),
                        id: $('aside .box-content', ele).attr('id')
                    };
                    places.push(datum);
                    $('.name', ele).html(datum.name);
                    $('.address', ele).html(datum.address);
                    $('>figure img', ele).attr('src', datum.image);
                    $('a.more', ele).attr('href', '#' + datum.id).colorbox({
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
                    $('figure, .location', ele).on('click', function(){
                        var marker = _.find(places, {index: $(ele).attr('data-index')}).marker;
                        var trig = new google.maps.event.trigger(marker, 'click' );
                    });
                    $('figure, .location', ele).addClass('disabled btn');


                });
                $.each(places, function(i, place) {
                    geocodeAddress(geocoder, place);
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
                    if (map.getZoom() > minZoomLevel){
                        $.each(polys, function(){
                            this.setOptions({
                                strokeOpacity: 0,
                                fillOpacity: 0,
                                clickable: false

                            });
                        });
                        $.each(markers, function(label){
                            $.each(this, function(i, d){
                                d.setVisible(true);
                            });
                        });
                        hint.html(' ' + '回到全台灣地圖');
                    }
                    else{
                        $.each(polys, function(){
                            this.setOptions({
                                strokeOpacity: 0.7,
                                fillOpacity: 0.7,
                                clickable: true
                            });
                        });
                        $.each(markers, function(label){
                            $.each(this, function(i, d){
                                d.setVisible(false);
                            });
                        });
                        hint.html(' ' + $('#map').attr('data-title'));
                    }
               });





                // Initialize JSONP request
                var script = document.createElement('script');
                var url = ['https://www.googleapis.com/fusiontables/v1/query?'];
                url.push('sql=');
                var query = 'SELECT * FROM ' +
                '1hjpbJtWGAWU273CAzyHsgdSIkH_XZ42h5naPUp0b';
                var encodedQuery = encodeURIComponent(query);
                url.push(encodedQuery);
                url.push('&callback=drawMap');
                url.push('&key=AIzaSyBf_sGPZtgUPenHRRZ-8nBUp7rZYru0bBo');
                script.src = url.join('');
                var body = document.getElementsByTagName('body')[0];
                body.appendChild(script);
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
            window.drawMap = drawMap;

            $('#colorbox').addClass('map-detail');
            window.map = map;
        }($('#map')));
    }

}(window));
