// 1. AuthToken을 받아오는 JS함수 구현
//  function getAuthToken (username, password) {}
//  주어진 매개변수 username과 password를 axios로 전달하고
//  돌아온 'token' 값을 console.log에 출력
//
//  2. form#login을 구현
//  username, password를 받는 input2개와
//  submit역활을 하는 button
//  해당 form에 'submit' 이 실행 되었을 때, form자체의 'submit'기능 대신
//  jQuery를 사용해서 아래 getAuthToken() 함수를 호출
//
//  3. 위 링크를 참조해서 받아온 token값을 'token'쿠키 key에 7일후 만료되도록 저장

function getAuthToken(username, password) {
  axios({
    url: 'http://localhost:8000/api/members/auth-token/',
    method: 'post',
    data: {
      username: username,
      password: password,
    }
  }).then(function(response) {
    var token = response.data.token
    setCookie('token', token, 7);

    var user = response.data.user
    setUserInfo(user)

  }).catch(function(error) {
    console.log(error.response);
  });
}

$('#input').submit(function(event) {
  var username = $('#username').val();
  var password = $('#password').val();
  getAuthToken(username, password);
  $('#username').val('');
  $('#password').val('');
  event.preventDefault();
})
