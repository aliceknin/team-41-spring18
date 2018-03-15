function createUser() {

  var username = $('#username').val();
  var password = $('#pwd').val();
  var fullName = $('#fullname').val();
  var email = $('#email').val();

  if (username && password && fullName && email) {
    $.ajax({
      //swap to window.location.hostname when done
      url: 'http://' + window.location.hostname + ':8080/api/user/create/' + username + '/' + password + '/' + email + '/' + fullName
    });
  }
}
