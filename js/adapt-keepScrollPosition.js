/*
* adapt-keepScrollPosition
* License - http://github.com/adaptlearning/adapt_framework/LICENSE
* Maintainers - Oliver Foster <oliver.foster@kineo.com>
*/

define(function(require) {

	var Adapt = require('coreJS/adapt');
	var Backbone = require('backbone');

	var scrollPos = {};
	var currentId = "";
	var isPopupOpened = false;

	//LOOK AT popupManager.js to see why this is written this way
	//NOTES: router:menu and router:page events are preceeded by popup:closed event which resets scroll.

	Adapt.on("popup:closed", function() {
		isPopupOpened = true;
		_.delay(function() {
			isPopupOpened = false;
		}, 500);
	})

	Adapt.on("router:menu router:page", function(model) {
		var model = model.toJSON();
		currentId = model._id;
		console.log(currentId);
	});

	$(window).on("scroll", function () {
		if (!isPopupOpened) {
			console.log(currentId + " updated to " + (window.scrollY || window.pageYOffset));
			scrollPos[currentId] = window.scrollY || window.pageYOffset;
		}
	})

	function newScrollTop(pos) {
		if (isPopupOpened && pos !== undefined && scrollPos[currentId] !== undefined) {
			console.log(currentId + " returning to " + scrollPos[currentId]);
			Adapt.trigger("keepScrollPosition:returnToPosition", currentId);
			return newScrollTop.old.call(this, scrollPos[currentId]);
		}
		if (pos === undefined) {
			return newScrollTop.old.call(this);
		} else {
			return newScrollTop.old.call(this, pos);
		}
	}
	newScrollTop.old = $.fn.scrollTop;

	$.fn.scrollTop = newScrollTop

})
