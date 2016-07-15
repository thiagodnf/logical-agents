// For any third party dependencies, like jQuery, place them in the lib folder.

// Configure loading modules from the lib directory,
// except for 'app' ones, which are in a sibling
// directory.
requirejs.config({
    baseUrl: 'js',
    shim : {
        bootstrap : {
            deps : [ 'jquery']
        },
        bootstrap_select : {
            deps : [ 'bootstrap']
        },
    },
    paths: {
        app: 'app',
		jquery: 'vendor/jquery.min',
        bootstrap: 'vendor/bootstrap.min',
        bootstrap_select: 'vendor/bootstrap-select.min',
        snap_svg: 'vendor/snap.svg-min',
        bootstrap_submenu: 'vendor/bootstrap-submenu.min',
        jquery_form_validator: 'vendor/jquery.form-validator.min',
        joii: 'vendor/joii.min',
        snackbar: 'vendor/snackbar.min',

		agent: 'app/agents/agent',
        environment: 'app/environments/environment',
        environment_clear: 'app/environments/environment.clear',
        perception: 'app/perceptions/perception',
        action: 'app/actions/action',

        array_utils: 'app/utils/array.utils',
        random_utils: 'app/utils/random.utils',
        dirt_utils: 'app/utils/dirt.utils',
        snackbar_utils: 'app/utils/snackbar.utils',
    }
});

// Start loading the main app file. Put all of
// your application logic in there.
requirejs(['app/main']);
