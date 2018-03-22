// -> function initUserInfo() {}
// 0. UserDetail과 /api/members/info/를 연결시키는 부분을 백엔드에 구현, Postman으로 테스트
// 1. 클라이언트에 'token'이라는 Cookie가 있는지 확인
// 2. 만약 있다면 해당 값을 가져온 후
// 3. getUserInfo()를 실행
//   -> UserDetail에 get요청, pk없음
//        URL: /api/members/info/
//     -> request.user를 기준으로 serialize한 User정보를 리턴
// 4. 유저정보를 가져온 후 getAuthToken의 .then()아래 유저정보 표시 로직을 실행

function initUserInfo() {
  var token = getCookie('token')
  if (token) {
    getUserInfo(token)
  }
}

function getUserInfo(token) {
  axios({
    url: 'http://localhost:8000/api/members/info/',
    method: 'get',
    headers: {
      Authorization: 'token '.concat(token),
    }
  }).then(function(response) {
    var user = response.data
    setUserInfo(user)
  }).catch(function(error) {
    console.log(error)
  })
}

function setUserInfo(user) {
  $('h1#user-info').text(user.username.concat('(으)로 로그인 중입니다.'));
  // $('img#user-profile').attr('src', user.img_profile_url);
  // $('h3#user-name').text(user.last_name + user.first_name);
  $('h1#user-info').removeClass('none');
  $('form#input').addClass('none');
  // $('#btn-facebook').addClass('none');
}
