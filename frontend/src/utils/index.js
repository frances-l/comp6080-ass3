const TOKEN_KEY = 'TOKEN';

function isLogin() {
  if (localStorage.getItem(TOKEN_KEY)) {
    return true;
  }

  return false;
}

export default isLogin;
