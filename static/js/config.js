requirejs.config({
     paths:{
        jquery: '../vendor/jquery-3.4.1.min',
        bootstrap: 'https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min',
        jqueryUI: 'http://ajax.googleapis.com/ajax/libs/jqueryui/1.10.3/jquery-ui.min',
        domReady: '../vendor/domReady',
        formMethods: 'formMethods',
        progressBar: '../vendor/progressbar.min'
     },
     shim:{
        jqueryUI:{
            deps: ['jquery']
        }
     }
});