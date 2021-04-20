$(document).ready(function () {
  const BaseURL = "http://localhost:5001";

  
  $("#form").submit(function (evt) {
    evt.preventDefault();
   
    ajaxPost();
  });

  $("#formService").submit(function (evt) {
    evt.preventDefault();
  
    ajaxPostService();
  });




// post function for new message
  function ajaxPost() {
    var formData = {
      name: $("#name").val(),
      email: $("#email").val(),
      message: $("#message").val(),
    };

    $.ajax({
      type: "POST",
      url: BaseURL + "/api/message",
      contentType: "application/json",
      data: JSON.stringify(formData),
      processData: true,
      dataType: "json",
      success: function (response) {
     
        if(response.length > 0){
          $('#messages').html( response.map((n,i) => (
            `  <div key='${n._id}' class='w3-card-4  w3-container w3-margin w3-padding-16'>
            <button id='deleteMessage' class='w3-red'>
            &times;
            </button><br/>
            <strong>From:</strong> ${n.name}<br/>
            <strong>Email:</strong> ${n.email}<br/>
            <strong>Message:</strong> ${n.message}<br/>
            <strong>Time Requested:</strong> ${n.time}<br/>
            <strong>Date Requested:</strong> ${n.date}
            </div>
            `
            )));

        } 
        if (response.successMessage) {
          $("#thanksMsg").html(response.successMessage);
        }
      
      },
      error: function (e) {
        console.log(e);
      },
    });
    restData();
  }
  function restData() {
    $("#name").val("");
    $("#email").val("");
    $("#message").val("");
  }


// post function for new service message
function ajaxPostService() {
  var formData = {
    name: $("#nameService").val(),
    email: $("#emailService").val(),
    message: $("#messageService").val(),
    time: `${$("#timeService").val()}`,
    date: `${$("#dateService").val()}`
  };

  $.ajax({
    type: "POST",
    url: BaseURL + "/api/message/serviceMessage",
    contentType: "application/json",
    data: JSON.stringify(formData),
    processData: true,
    dataType: "json",
    success: function (message) {
      $("#serviceThanksMsg").html("Thanks for requesting service. Your business is important to us. We will contact you as soon as possible. If you are requesting service today please call us at 520-555-5555");
    },
    error: function (e) {
      console.log(e);
    },
  });
  restData();
}
function restData() {
  $("#nameService").val("");
  $("#emailService").val("");
  $("#messageService").val("");
  $("#timeService").val("");
  $("#dateService").val("");
}







// gets messages and shows notification
  $.ajax({
    type: "GET",
    url: BaseURL + "/api/message",
    dataType: "json",
    success: function (messages) {
      if(messages.length > 0) {
      $('.message-notification').show();
      $('.message-notification-number').html( `${messages.length}`)
    } else {
      $('.message-notification').hide()
    }
  },
    error: function (e) {
      console.log(e)
    }

  })


  // delete message card
  $(document).on('click', '#deleteMessage', function(){
    var id = $(this).parent()[0].attributes[0].nodeValue
    
    $.ajax({
      url: BaseURL + '/api/message/delete',
      method: 'post',
      dataType: 'json',
      data:   {"id":id},
      success: function (messages) {
        $('.message-notification-number').html( `${messages.length}`)
        $('#messages').html( messages.map((n,i) => (
        `  <div key='${n._id}' class='w3-card-4  w3-container w3-margin w3-padding-16'>
        <button id='deleteMessage' class='w3-red'>
        &times;
        </button><br/>
        <strong>From:</strong> ${n.name}<br/>
        <strong>Email:</strong> ${n.email}<br/>
        <strong>Message:</strong> ${n.message}<br/>
        <strong>Time Requested:</strong> ${n.time}<br/>
        <strong>Date Requested:</strong> ${n.date}
        </div>
        `
        )))
      },
      error: function(err){
        console.log(err)
      }
    })
  })





});//end of document.ready


