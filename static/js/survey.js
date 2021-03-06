define(['domReady', 'jquery', 'jqueryUI', 'formMethods', 'progressBar'], function(domReady, $, ui, formMethods, progressBar){
    domReady(function(){
    //    questions is a 2D array, where col_1 = question text and col_2 = number of response options
        var currentQuestionIndex = 0;
        var form = $('.form');
        var questionTitle = form.find('#form-question');
        var formButtonsDiv = form.find('div.form-options');
        var currentQuestion = questions[currentQuestionIndex];
        var responseValues = {};
        var submitButton = $('.submit-btn');
        var nextButton = $('.next-btn');
        var previousButton = $('.previous-btn');
        var errorText = $('.error-text');

        var bar = new progressBar.Circle(container, {
          trailColor: '#eee',
          trailWidth: 1,
          duration: 1400,
          easing: 'bounce',
          strokeWidth: 6,
          from: {color: '#EF3D59', a:0},
          to: {color: '#2ecc71', a:1},
          // Set default step function for all animate calls
          step: function(state, circle) {
            circle.path.setAttribute('stroke', state.color);
            var value = Math.round(circle.value() * 100);
            if (value === 0) {
              circle.setText('');
            } else {
              circle.setText(value);
            }
          }
        });
        bar.text.style.fontFamily = 'Montserrat';
        bar.text.style.fontSize = '1rem';
        bar.animate((currentQuestionIndex+1)/questions.length);

        formMethods.populateForm(formButtonsDiv, currentQuestion, questionTitle)

        $('.response-btn').click(function(){
            $('.response-btn').removeClass('btn-selected')
            $(this).addClass('btn-selected')
            responseValues[currentQuestionIndex] = $(this).val()
            $('.input-text').val(JSON.stringify(responseValues))
            $('.error-text').css('visibility', 'hidden')
            if(currentQuestionIndex + 1 == questions.length){
                $(submitButton).removeAttr("disabled")
            }
        })

        $(nextButton).click(function(){
            if (formMethods.isResponseSelected(formButtonsDiv, responseValues, currentQuestionIndex, errorText)){
                currentQuestionIndex++;
                if (currentQuestionIndex + 1 == questions.length){
                    $(this).css('visibility', 'hidden')
                }
                currentQuestion = questions[currentQuestionIndex]
                formMethods.updateForm(questionTitle, currentQuestion, responseValues, currentQuestionIndex)
                $('.previous-btn').css('visibility', 'visible')
                bar.animate((currentQuestionIndex+1)/questions.length);
            }
        });

        $(previousButton).click(function(){
            currentQuestionIndex--
            if (currentQuestionIndex == 0){
                $(this).css('visibility', 'hidden')
            }
            currentQuestion = questions[currentQuestionIndex]
            formMethods.updateForm(questionTitle, currentQuestion, responseValues, currentQuestionIndex)
            $('.next-btn').css('visibility', 'visible')
            bar.animate((currentQuestionIndex+1)/questions.length);
        });

        $(submitButton).click(function(){
            if(formMethods.isResponseSelected(formButtonsDiv, responseValues, currentQuestionIndex, errorText)){
                $('.input-text').val(JSON.stringify(responseValues))
            }
        });
    });
});