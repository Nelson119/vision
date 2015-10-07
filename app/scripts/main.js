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
			left = $('nav').width() - $this.parent().width() + left;

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
	}($('header')));

	//events
	(function(container){
		$('nav ul li', container).on('mouseover', function(){
			var overlay = $('nav i', container);
			var activeColor = '#fff';
			var normalColor = '#535353';

			var $this = $(this);
			var tl = new TimelineMax({paused: true, onComplete: function(){
				TweenMax.set($('a', $this.siblings()), {color: normalColor});
				TweenMax.set($('a', $this), {color: activeColor});

			}});

			tl.add(TweenMax.to( overlay, 0.25, {
				left: $this.offset().left - $this.parent().offset().left
			}));
			tl.play();
		});
	}($('.events')));
});
