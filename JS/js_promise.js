myTracker = {
	enabled : {
		init : function (user) {
			localStorage.user = user; 
			console.log('enabled');
		},
		record_data : function (data) {

		},
		prepare_data : function () {
			// use localStorage as submission parameters
		},
		tracker_enabled : true
	},
	disabled : {
		init : function () {
			localStorage.clear();
			console.log('disabled');
		},
		prepare_data : function () {
			// aggregate data from DOM and create submission parameters
		},
		tracker_enabled : false
	}
}
myRecorder = {
	rec : {},
	openStream : function (stream) {
		console.log(myApp.dashboard.control.navigation);
	},

	recordStream : function (stream) {
		myRecorder.openStream(stream);
		console.log('Record');
	},
	stopRecord : function () {
		console.log('stop');
	}

 

}
myApp = {
	common : {
		tracker : {},
		init : function () {
			this.tracker = ((typeof(Storage) !== 'undefined') && (!localStorage.disabled)) ? myTracker.enabled : myTracker.disabled;
			$("#check_state_button").attr('disabled', true);
			myRecorder.openStream;
		},
		finalize : function () {
			console.log('finalized');
		},
		enableTracker: function () {
			console.log('enable Tracker');
			// Set tracker context in web storage
		},
		disableTracker: function () {
			// Close tracker by submitting existing data via ajax and disabling tracking features
		}
	},
	dashboard : {
		user : 'logged_in_user',
		init : function () { 
			myApp.common.tracker.init(this.user);
		},
		process: function (args) {
			alert(args);
			$("#start_button").on( "click", function() {
				$("p").append( "Started...");
				$.when( myApp.dashboard.control.ajax.ajax_func() )
					.fail( myApp.dashboard.control.ajax.failed_status )
					.done( myApp.dashboard.control.ajax.update_status );
			});
			$("#check_state_button").on( "click", function() {
				console.log(myApp.dashboard.control.navigation.getPath());
			});
			$("#toggle_tracker_button").on( "click", function() {
			
			});
			$("#recStart").on( "click", myRecorder.recordStream );
			$("#recStop").on( "click", myRecorder.stopRecord );
		},
		control: {
			ajax: {
				ajax_func: function () {
					return $.ajax({
						url : "index.php",
						dataType: 'json'
					});
				},
				failed_status: function () {
					alert('ajax failed');
				},
				update_status: function (data) {
					
					if (!data) {
						alert('response empty');
					} else if (data.navigation) {
						myApp.dashboard.control.navigation.state(data.navigation);
						$("#check_state_button").attr('disabled', false);
					} else {
						alert('unhandled response state');
					}
				}
			}, 
			navigation: {
				state: function (nav) {
					var state = {
						state_id: nav.state_id,
						path_id: nav.path_id,
						path: nav.path
					};
					localStorage.state = state.state_id;
					this.setPath(state.path);
				},
				setPath: function (path) { this.path = path; },
				getPath: function () { return this.path; }
			}
		},
		render : function () {
			$("div").each(function( i ) {
				$( this ).fadeIn().fadeOut( 1000 * (i+1) );
			});
		},
		record : function () {
			myRecorder.openStream;
		}
	}
};
UTIL = {
	fire : function (func, funcname, args) {
		var namespace = myApp;
		funcname = (funcname === undefined) ? 'init' : funcname;
		if (func !== '' && namespace[func] && typeof namespace[func][funcname] == 'function') {
				namespace[func][funcname](args);
		}
	},
	loadEvents : function () {
		'use_strict';
		var bodyId = document.body.id;
		var controller = document.body.getAttribute( "data-controller" );
		var action = document.body.getAttribute( "data-action" );
		
		UTIL.fire('common');
		UTIL.fire( controller );
		UTIL.fire( controller, action, 'arg1' );
		UTIL.fire( 'common', 'finalize' );
	}
};

$(document).ready(UTIL.loadEvents);

