"use strict";

var handleLogin = function handleLogin(e) {
  e.preventDefault();

  if ($('#user').val() == '' || $('#pass').val() == '') {
    handleError('Please fill out all fields!');
    return false;
  }

  sendAjax('POST', $('#loginForm').attr('action'), $('#loginForm').serialize(), redirect);
  return false;
};

var handleSignup = function handleSignup(e) {
  e.preventDefault();

  if ($('#user').val() == '' || $('#pass').val() == '' || $('#pass2').val() == '') {
    handleError('Please fill out all required fields!');
    return false;
  }

  if ($('#pass').val() !== $('#pass2').val()) {
    handleError('Passwords do not match!');
    return false;
  }

  sendAjax('POST', $('#signupForm').attr('action'), $('#signupForm').serialize(), redirect);
  return false;
};

var LoginWindow = function LoginWindow() {
  return /*#__PURE__*/React.createElement("div", {
    className: "box"
  }, /*#__PURE__*/React.createElement("form", {
    id: "loginForm",
    name: "loginForm",
    onSubmit: handleLogin,
    action: "/login",
    method: "POST",
    className: "mainForm"
  }, /*#__PURE__*/React.createElement("label", {
    htmlFor: "username"
  }, "Username: "), /*#__PURE__*/React.createElement("input", {
    id: "user",
    type: "text",
    name: "username",
    placeholder: "username"
  }), /*#__PURE__*/React.createElement("label", {
    htmlFor: "pass"
  }, "Password: "), /*#__PURE__*/React.createElement("input", {
    id: "pass",
    type: "password",
    name: "pass",
    placeholder: "password"
  }), /*#__PURE__*/React.createElement("input", {
    className: "formSubmit",
    type: "submit",
    value: "Sign in"
  })));
};

var SignupWindow = function SignupWindow() {
  return /*#__PURE__*/React.createElement("div", {
    className: "box"
  }, /*#__PURE__*/React.createElement("form", {
    id: "signupForm",
    name: "signupForm",
    onSubmit: handleSignup,
    action: "/signup",
    method: "POST",
    className: "mainForm"
  }, /*#__PURE__*/React.createElement("label", {
    htmlFor: "username"
  }, "Username*: "), /*#__PURE__*/React.createElement("input", {
    id: "user",
    type: "text",
    name: "username",
    placeholder: "username"
  }), /*#__PURE__*/React.createElement("label", {
    htmlFor: "name"
  }, "Name: "), /*#__PURE__*/React.createElement("input", {
    id: "name",
    type: "text",
    name: "name",
    placeholder: "your name here"
  }), /*#__PURE__*/React.createElement("label", {
    htmlFor: "pass"
  }, "Password*: "), /*#__PURE__*/React.createElement("input", {
    id: "pass",
    type: "password",
    name: "pass",
    placeholder: "password"
  }), /*#__PURE__*/React.createElement("label", {
    htmlFor: "pass2"
  }, "Password again*: "), /*#__PURE__*/React.createElement("input", {
    id: "pass2",
    type: "password",
    name: "pass2",
    placeholder: "retype password"
  }), /*#__PURE__*/React.createElement("input", {
    className: "formSubmit",
    type: "submit",
    value: "Sign up"
  })));
};

var createLoginWindow = function createLoginWindow(csrf) {
  ReactDOM.render( /*#__PURE__*/React.createElement(LoginWindow, null), document.querySelector('#content'));
};

var createSignupWindow = function createSignupWindow() {
  ReactDOM.render( /*#__PURE__*/React.createElement(SignupWindow, null), document.querySelector('#content'));
};

var setup = function setup() {
  var loginButton = document.querySelector('#loginButton');
  var signupButton = document.querySelector('#signupButton');
  signupButton.addEventListener('click', function (e) {
    e.preventDefault();
    createSignupWindow();
    return false;
  });
  loginButton.addEventListener('click', function (e) {
    e.preventDefault();
    createLoginWindow();
    return false;
  });
  createLoginWindow(); // default view
};

$(document).ready(function () {
  setup();
});
"use strict";

var handleError = function handleError(message) {
  $('#errorMessage').text(message);
};

var redirect = function redirect(response) {
  window.location = response.redirect;
};

var sendAjax = function sendAjax(type, action, data, success) {
  $.ajax({
    cache: false,
    type: type,
    url: action,
    data: data,
    dataType: 'json',
    success: success,
    error: function error(xhr, status, _error) {
      var messageObj = JSON.parse(xhr.responseText);
      handleError(messageObj.error);
    }
  });
};
