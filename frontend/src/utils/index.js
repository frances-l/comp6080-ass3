const TOKEN_KEY = 'user_token';

function isLogin() {
  if (localStorage.getItem(TOKEN_KEY)) {
    return true;
  }

  return false;
}

export default isLogin;
