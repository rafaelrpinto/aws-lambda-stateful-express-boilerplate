/**
 * Executes a POST to check CSRF validation.
 */
function doPost() {
  $.ajax({
    method: "POST",
    url: "./doPost",
    data: {
      name: "John",
      location: "Boston"
    }
  }).done(async(msg)=> {
    console.log("Response: " + msg);
  });
}

$('#postButton').click(doPost);
