function signupSubmit(ctoken) {
  var dataString = $("#signupForm").serialize() + "&ctoken="+ctoken; // to get the form data
  var url = $("#signupForm").attr('action');
  $.ajax({
    type: "POST",
    url: url,
    data: dataString,
    success: function(data){
      if(data.success){
        $('#signupForm')[0].reset(); // to reset form data
        $('#signupMsg').html(data.message);
      }
      else{
        $('#signupMsg').html(data.message);
      }
    }
  })
}
