function formSubmit(oform) {
  var dataString = $(oform).serialize(); // to get the form data
  var url = $(oform).attr('action');
  $.ajax({
    type: "POST",
    url: url,
    data: dataString,
    success: function(data){
      if(data.success){
        $(oform)[0].reset(); // to reset form data
        console.log($(oform).find('.message').val());
        $(oform).find('.message').html(data.message);
      }
      else{
        $(oform).find('.message').html(data.message);
      }
    }
  })
}
