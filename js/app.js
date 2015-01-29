var questionslist = [];

$.getJSON("questions.json", function(questions) {
  questions.forEach(function(question,i) {
    questionslist.push({
      question: question.question,
      responsetype: question.responsetype,
      options:  question.options,
      id: i
    });

    var responses;

    switch (question.responsetype){
      case "textbox":
        responses = '<div class="form-group"><input type="text" class="form-control" id="question"'+i+' placeholder="'+question.options+'"></div>';
      break;
      case "textarea":
            responses = '<div class="form-group"><input type="text" class="form-control" rows="3" id="question"'+i+' placeholder="'+question.options+'"></div>';
      break;
      case "singlechoice":
        responses = '<div class="row boxes">';
        $.each(question.options, function( index, value ) {
          if (value == "Other(s)"){
          responses = responses+'<div class ="checkbox" name="question'+i+'" id="question"'+i+'option'+index+'><label><input type="checkbox" value='+value+'></label><input type="text" value="" placeholder="Other"></div>';
        } else {
          responses = responses+'<div class ="checkbox" name="question'+i+'" id="question"'+i+'option'+index+'><label><input type="checkbox" value='+value+'></label>'+value+'</div>';     
        }
        });
        responses = responses + '</div>';  
      break;
      case "multichoice":
        responses = '<div class="row boxes">';
        $.each(question.options, function( index, value ) {
          if (value == "Other(s)"){
          responses = responses+'<div class ="checkbox" id="question"'+i+'option'+index+'><label><input type="checkbox" value='+value+'></label><input type="text" value="" placeholder="Other"></div>';
        } else {
          responses = responses+'<div class ="checkbox" id="question"'+i+'option'+index+'><label><input type="checkbox" value='+value+'></label>'+value+'</div>';     
        }
        });
        responses = responses + '</div>';
      break;
      case "matrix":
      var levels;

      $.each(question.options.levels, function( index, value ) {

            levels = levels + '<option>'+value+'</option>';
      });
      responses = '<div class="row boxes">';
      $.each(question.options.categories, function( index, value ) {
        responses = responses + '<div class="form-group"><label>'+value+'<select class="form-control">'+levels+'</select></label></div>';
      });
      responses = responses + '</div>'; 
      //console.log(responses);
      
      break;
    }

    var row = '<section class="slide"><h5>'+question.question+'</h5>'+responses+'</section>';
        $(row).insertBefore("#slides-list");


  });
}) // getJSON.fn
.fail( function(jqxhr, textStatus, error) { 
  console.log(textStatus + ", " + error);
}); // getJSON
