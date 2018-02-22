function createUser() {

  var username = $('#username').val();
  var password = $('#pwd').val();
  var fullName = $('#fullname').val();
  var email = $('#email').val();

  console.log("info grabbed for user");
  if (username && password && fullName && email) {
    $.ajax({
      //swap to window.location.hostname when done
      url: 'http://ec2-13-58-155-176.us-east-2.compute.amazonaws.com:8080/api/user/create/' + username + '/' + password + '/' + email + '/' + fullName,
      success: creationRedirect
    });
  }
}

function creationRedirect(result) {
  console.log("creation redirect is happening");
  window.location.href = window.location.hostname + ":8080/accountCreated.html";
}
