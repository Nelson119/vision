'use strict';
/*eslint-disable new-cap, no-unused-vars */
/*global  $, TweenMax, TimelineMax */

var data = [
];
$(function(){

	//nav
	(function(header){

        var tl = new TimelineMax({paused: true, onComplete: function(){

        }});
        var overlay = $('nav i', header);

		$('nav li', header).on('mouseover', function(){
			var $this = $(this);
            overlay.show();
            tl.stop();
			tl = new TimelineMax({paused: true, onComplete: function(){

			}});

			var left = $this.offset().left - $this.parent().offset().left;
			left = $('nav').width() - $this.parent().width() + left - $this.parent().css('marginRight').replace(/px/, '');

			tl.add( [
				TweenMax.to(overlay, 0.25, {
					left: left,
                    onComplete: function(){
                    }
				})
			] );
			tl.add([
				function(){
					$this.addClass('on').siblings().removeClass('on');
				}
			]);
			tl.play();
		});
        $('nav li', header).on('mouseout', function(){
            if(!$('nav >ul >li.active', header).length){
                overlay.hide();
            }
            $('nav >.menu-container ul >li.active', header).trigger('mouseover');
        }).trigger('mouseout');



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
		}).trigger('resize');
        $('.menu >ul').superfish({
            speedOut: 'normal',
            delay: 500
        });
	}($('header')));

    //highlight
    (function(container){
        var active = $('ul li.active', container);
        var cur = $(document.createElement('div'));
        var fade = $(document.createElement('div'));

        cur.addClass('cur');
        cur.on('click', function(){
            $('ul li.active', container).trigger('click');
        });
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
        $('>ul li', container).each(function(idx, ele){
            var btn = $('<li><a href=\'javascript:\'><img src=\'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVQYV2P4zwAAAgEBAOIxSPwAAAAASUVORK5CYII=\' alt=\'' + idx + '\'></a></li>');
            btn.on('click', function(){
                btn.addClass('active').siblings().removeClass('active');
                hook(idx);
            });
            if($(ele).hasClass('active')){
                btn.addClass('active');
            }
            $('>nav ul', container).append(btn);
            $('>nav ul', container).append('\r\n');
        });

        $('nav .prev', container).on('click', function(){
            if($('nav ul li.active', container).prev().length){
                $('nav ul li.active', container).prev().trigger('click');
            }else{
                $('nav ul li.active', container).siblings().last().trigger('click');
            }
        });

        var tick = 0;
        $('nav .next', container).on('click', function(){
            if($('nav ul li.active', container).next().length){
                $('nav ul li.active', container).next().trigger('click');
            }else{
                $('nav ul li.active', container).siblings().first().trigger('click');
            }
            clearTimeout(tick);
            tick = setTimeout(function(){
               $('nav .next', container).trigger('click');
            }, 5000);
        });
        tick = setTimeout(function(){
           $('nav .next', container).trigger('click');
        }, 7000);


        hook(0);



    }($('.highlight').length > 0 ? $('.highlight') : []));

	//activities nav
	(function(container){
		$('nav.categories ul li', container).on('mouseover', function(){
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
		}).on('mouseout', function(){
            $('nav.categories ul li.active', container).trigger('mouseover');
        });
        $('nav.categories ul li.active', container).trigger('mouseover');
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
            data = [];
            $('ul.hide li', this).each(function(){
                if(!( $(this).attr('data-video') || $(this).attr('data-src'))){
                    return;
                }
                data.push({
                    src: $(this).attr('data-video') || $(this).attr('data-src'),
                    subHtml: '<p>' + $(this).attr('data-description') + '</p>',
                    thumb: $(this).attr('data-src')
                });
            });
            if(data === []){
                return false;
            }
            $(this).lightGallery({
                thumbnail: true,
                dynamic: true,
                dynamicEl: data,
                loadYoutubeThumbnail: true,
                loadVimeoThumbnail: true,
                youtubeThumbSize: 'maxresdefault',
                youtubePlayerParams: {
                    modestbranding: 1,
                    showinfo: 0,
                    rel: 0,
                    controls: 0
                },
                vimeoPlayerParams: {
                    byline: 0,
                    portrait: 0,
                    color: 'fe805b'
                },
                videoMaxWidth: 800
            });
        });



	}($('.activities.content, .marketing, .management')));

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
        if(!marquee.length){
            return false;
        }
        $('.mq ul').marquee({

        });
    }($('.marquee')));
});
