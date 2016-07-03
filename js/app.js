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

		agent: 'app/agent',
        environment: 'app/environment',
        panel: 'app/panel',
        perception: 'app/perception',
        action: 'app/action',

        random_rule: 'app/rules/random.rule',
        previous_memory_rule: 'app/rules/previous.memory.rule',
        full_memory_rule: 'app/rules/full.memory.rule',
        zig_zag_rule: 'app/rules/zig-zag.rule',
        greedy_rule: 'app/rules/greedy.rule',
        intelligent_rule: 'app/rules/intelligent.rule',

        array_utils: 'app/utils/array.utils',
        random_utils: 'app/utils/random.utils',
    }
});

// Start loading the main app file. Put all of
// your application logic in there.
requirejs(['app/main']);
