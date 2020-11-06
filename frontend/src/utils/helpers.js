export default function getToken() {
  return `Bearer ${localStorage.getItem('user_token')}`;
}
