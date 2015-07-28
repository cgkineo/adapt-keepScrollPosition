/*
* adapt-keepScrollPosition
* License - http://github.com/adaptlearning/adapt_framework/LICENSE
* Maintainers - Oliver Foster <oliver.foster@kineo.com>, Tom Greenfield
*/

define([ "coreJS/adapt" ], function(Adapt) {

	var position = {};

	function savePosition() {
		position[Adapt.location._currentId] = window.scrollY || window.pageYOffset;
	}

	function restorePosition() {
		var savedPosition = position[Adapt.location._currentId];

		if (savedPosition) $(window).scrollTop(savedPosition);
	}

	Adapt
		.on("menuView:ready pageView:ready", restorePosition)
		.on("remove", savePosition);

});