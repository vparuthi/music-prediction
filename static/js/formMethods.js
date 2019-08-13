define(['jquery'], function(){
var formMethods = {};

formMethods.isResponseSelected = function(formButtonsDiv, responseValues, currentQuestionIndex, errorText){
    return true
    if (typeof responseValues[currentQuestionIndex] != 'undefined'){
        return true
    }
    $(formButtonsDiv).effect("shake", {distance: 5})
    $('.error-text').css({'visibility': 'visible'})
    return false
}

formMethods.updateForm = function(questionTitle, currentQuestion, responseValues, currentQuestionIndex){
    questionTitle.text(currentQuestion[0])
    $('.response-btn').removeClass('btn-selected')
    if (currentQuestion[1].length != 6){
        $('.response-btn').css('visibility', 'hidden')
        for(var i = 0; i < currentQuestion[1].length; i++){
            $(".response-btn[value='"+i.toString()+"']").css('visibility', 'visible').text(currentQuestion[1][i])
        }
    }
   this.reselectResponse(responseValues, currentQuestionIndex)
}

formMethods.reselectResponse = function (responseValues, currentQuestionIndex){
    if (typeof responseValues[currentQuestionIndex] != 'undefined'){
        responseSelected = responseValues[currentQuestionIndex]
        $("button[value='"+responseSelected.toString()+"']").addClass('btn-selected')
    }
    return
}

formMethods.populateForm = function(formButtonsDiv, currentQuestion, questionTitle){
    for (option in currentQuestion[1]){
        $('<button/>', {
            value: option,
            text: option.toString(),
            class: 'btn btn-circle btn-xl response-btn',
            id: option
        }).appendTo(formButtonsDiv);
    }
    questionTitle.text(currentQuestion[0])
    return
}

return formMethods;
});