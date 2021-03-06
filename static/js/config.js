requirejs.config({
     paths:{
        jquery: 'https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min',
        bootstrap: 'https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min',
        jqueryUI: 'https://ajax.googleapis.com/ajax/libs/jqueryui/1.10.3/jquery-ui.min',
        domReady: '../vendor/domReady',
        formMethods: 'formMethods',
        progressBar: '../vendor/progressbar.min',
        fontAwesome: "https://kit.fontawesome.com/a040392244"
     },
     shim:{
        jqueryUI:{
            deps: ['jquery']
        }
     }
});