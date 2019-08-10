$(document).ready(function(){
    console.log(questions)
    var currentQuestionIndex = 0
    var formQuestions = $('form').children('div.question')
//    formQuestions.hide()
//    formQuestions.eq(currentQuestionIndex).show()
    $('.next-btn').click(function(){
        formQuestions.eq(0).find('h3').text(formQuestions.eq(currentQuestionIndex+1).find('h3').text())
        currentQuestionIndex++
    });
});