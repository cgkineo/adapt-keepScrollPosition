define([ 'core/js/adapt' ], function(Adapt) {

	var position = {};

	function savePosition() {
		if (!shouldRestorePosition()) return;
		position[Adapt.location._currentId] = window.scrollY || window.pageYOffset;
	}

	function restorePosition() {
		if (!shouldRestorePosition()) return;
		var savedPosition = position[Adapt.location._currentId];

		if (savedPosition) $(window).scrollTop(savedPosition);
	}

	function shouldRestorePosition() {
		if (!Adapt.location._currentId) return false;
		try {
			var model = Adapt.findById(Adapt.location._currentId);
			var config = model.get('_keepScrollPosition');
			if (config && config._isEnabled === false) return false;
		} catch(e) {}
		return true;
	}

	Adapt.on({
		'menuView:ready pageView:ready': restorePosition,
		'remove': savePosition
	});

});
