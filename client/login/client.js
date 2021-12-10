const handleLogin = (e) => {
  e.preventDefault();
  
  if($('#user').val() == '' || $('#pass').val() == '') {
    handleError('Please fill out all fields!');
	return false;
  }
  
  sendAjax('POST', $('#loginForm').attr('action'), $('#loginForm').serialize(), redirect);
  
  return false;
};

const handleSignup = (e) => {
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

const LoginWindow = () => {
  return (
  <div className='box'>
  <form id='loginForm' name='loginForm'
        onSubmit={handleLogin}
		action='/login'
		method='POST'
		className='mainForm'
    >
    <label htmlFor='username'>Username: </label>
    <input id='user' type='text' name='username' placeholder='username' />
    <label htmlFor='pass'>Password: </label>
    <input id='pass' type='password' name='pass' placeholder='password' />
    <input className='formSubmit' type='submit' value='Sign in' />
  </form>
  </div>
  );
};

const SignupWindow = () => {
  return (
  <div className = 'box'>
  <form id='signupForm' 
        name='signupForm'
        onSubmit={handleSignup}
		action='/signup'
		method='POST'
		className='mainForm'
    >
    <label htmlFor='username'>Username*: </label>
    <input id='user' type='text' name='username' placeholder='username' />
	<label htmlFor='name'>Name: </label>
	<input id='name' type='text' name='name' placeholder='your name here' />
    <label htmlFor='pass'>Password*: </label>
    <input id='pass' type='password' name='pass' placeholder='password' />
    <label htmlFor='pass2'>Password again*: </label>
    <input id='pass2' type='password' name='pass2' placeholder='retype password' />
    <input className='formSubmit' type='submit' value='Sign up' />
  </form>
  </div>
  );
};

const createLoginWindow = (csrf) => {
  ReactDOM.render(
    <LoginWindow />,
    document.querySelector('#content')
  );
};

const createSignupWindow = () => {
  ReactDOM.render(
    <SignupWindow />,
    document.querySelector('#content')
  );
};

const setup = () => {
  const loginButton = document.querySelector('#loginButton');
  const signupButton = document.querySelector('#signupButton');
  
  signupButton.addEventListener('click', (e) => {
    e.preventDefault();
    createSignupWindow();
    return false;	
  });
  
  loginButton.addEventListener('click', (e) => {
    e.preventDefault();
    createLoginWindow();
    return false;	
  });
  
  createLoginWindow(); // default view
};

$(document).ready(function() {
  setup();
});