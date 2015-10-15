'use strict';
/*global  $, TweenMax, TimelineMax */
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
	}($('.activities')));
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

		l.append($('>ul li', container).clone());
		nav.append(l);
		div.append(nav);

		$('>ul li a', container).colorbox({
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


	}($('.activities.content')));
});
