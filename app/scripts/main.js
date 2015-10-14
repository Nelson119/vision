'use strict';
/*global  $, TweenMax, TimelineMax */
$(function(){

	//nav
	(function(header){
		$('.nav li', header).on('mouseover', function(){
			var $this = $(this);

			if($this.index() === $('.nav li.on', header).index()) {
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

		$('>ul li a', container).colorbox({
			innerHeight: 540,
			innerWidth: 965,
			fixed: true,
			rel: 'group all',
			transition: 'fade',
			title: $(this).attr('title'),
			current: '',
			onComplete: function(){
				$('#cboxTitle').attr('title', $('span >b', this).html());
				$(this).parents('li').addClass('active').siblings().removeClass('active');
				$(window).trigger('resize');
			},
			onClosed: function(){
				TweenMax.set($('.container'), {scrollLeft: 0});
			}
		});

	}($('.activities.content')));
});
