define(['domReady', 'jquery', 'jqueryUI', 'formMethods', 'progressBar'], function(domReady, $, ui, formMethods, progressBar){
    domReady(function(){
    //    questions is a 2D array, where col_1 = question text and col_2 = number of response options
        var currentQuestionIndex = 0;
        var form = $('.form');
        var questionTitle = form.find('h3');
        var formButtonsDiv = form.find('div.form-check-inline');
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
        bar.text.style.fontSize = '2rem';
        bar.animate((currentQuestionIndex+1)/questions.length);

        formMethods.populateForm(formButtonsDiv, currentQuestion, questionTitle)

        $('.response-btn').click(function(){
            $('.response-btn').removeClass('btn-selected')
            $(this).addClass('btn-selected')
            responseValues[currentQuestionIndex] = $(this).val()
            $('.error-text').css('visibility', 'hidden')
        })

        $(nextButton).click(function(){
            if (formMethods.isResponseSelected(formButtonsDiv, responseValues, currentQuestionIndex, errorText)){
                currentQuestionIndex++;
                if (currentQuestionIndex + 1 == questions.length){
                    $(this).css('visibility', 'hidden')
                    $(submitButton).css('visibility', 'visible')
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
            $.ajax({
                type : "POST",
                url : '/process_survey',
                dataType: "json",
                data: JSON.stringify(responseValues),
                success: function (data) {
                    console.log(data);
                }
            });
        });
    });
});