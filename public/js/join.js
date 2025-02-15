// 1번조건 구현 완료
// 2번조건 구현 완료
// 3번조건 완료
// 4번은 완료는 아니지만 보류
const id = document.getElementById("userid");
const passwordInput = document.getElementById("password");
const passwordCheckInput = document.getElementById("password2");
const nickName = document.getElementById("nickname");
const emailText = document.getElementById("emailText"); // 이메일 helperText
const joinButton = document.querySelector(".join");
let emailCheck = false;
let pwCheck = false;
let pwCheck2 = false;
let nickNameCheck = false;
function emailLengthCheck(value) {
  if (value.length >= 4) {
    return true;
  } else {
    return false;
  }
} // 길이 체크

function duplicateEmail(users,email){
  for(let i = 0; i< users.length; i++){
    if (users[i].userid == email){
      return false;
    }
  }
  return true;
}
function duplicateNickName(users,nickName){
  for(let i = 0; i< users.length; i++){
    if (users[i].nickname == nickName){
      return false;
    }
  }
  return true;
}
function changeJoinButton(a, b, c, d) {
  if (a == true && b == true && c == true && d == true) {
    return true;
  }
  return false;
}

function validateEmail(email) {
  const Pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return Pattern.test(email);
} // 유효한 경우

function checkPassword(password) {
  const hasUpperCase = /[A-Z]/.test(password);
  const hasLowerCase = /[a-z]/.test(password);
  const hasNumber = /[0-9]/.test(password);
  const hasSpecialChar = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/.test(
    password,
  );
  if (password.length < 8 || password.length > 20) {
    return false;
  }
  if (!(hasUpperCase && hasLowerCase && hasNumber)) {
    return false;
  } // 셋중 하나라도 만족 못하면 return false
  if (!hasSpecialChar) {
    return false;
  } // 특수문자 없는 경우

  return true;
} // 비밀번호 체크
// form 개체에다가 FormData 박으면 다 출력 가능함
function checkNickNameSplit(element) {
  for (let i = 0; i < element.length; i++) {
    if (element[i] == " ") {
      return false;
    } // 순회하면서 한번이라도 공백이 있다면 false를 반환한다
  }
  return true; // 만약 문자열에서 공백이 발견되지 않는다면 true
}

id.addEventListener("input", function (event) {
  const emailText = document.getElementById("emailText");
  emailText.innerText = "*이메일을 입력해주세요.";
});

id.addEventListener("blur", function (event) {
  var joinButton = document.querySelector(".join");
  const email = event.target.value;
  emailCheck = false;
  fetch("/data.json")
  .then((response) => {
    // 응답을 JSON으로 파싱
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return response.json();
  }) 
  .then((data) => {
    const users = data.users;
    
  
  if (
    emailLengthCheck(email) == false ||
    validateEmail(email) == false ||
    email.length == 0
  ) {
    emailText.innerText =
      "*올바른 이메일 주소 형식을 입력해주세요.(예: example@example.com)";
    pwCheck = false;
    return false;
  } 
  else if(!duplicateEmail(users,email)){
    emailText.innerText =
      "*중복된 이메일입니다.";

  } // 
  
  else {
    emailText.innerText = ""; // 조건을 모두 충족한 경우라면 helperText를 없애준다
    emailCheck = true;
    if (changeJoinButton(emailCheck, pwCheck, pwCheck2, nickNameCheck)) {
      joinButton.style.backgroundColor = "#7F6AEE";
    } else {
      joinButton.style.backgroundColor = "#ACA0EB";
    }
    joinButton.offsetHeight;
  }

  console.log(emailCheck, pwCheck, pwCheck2, nickNameCheck);
});
});

passwordInput.addEventListener("blur", function (event) {
  var joinButton = document.querySelector(".join");
  const passwordText = document.getElementById("passwordText");

  const password = event.target.value; // eventValue는 비밀번호 input된 값
  if (checkPassword(password)) {
    // true라면?
    passwordText.innerText = "";
    pwCheck = true;
    if (changeJoinButton(emailCheck, pwCheck, pwCheck2, nickNameCheck)) {
      joinButton.style.backgroundColor = "#7F6AEE";
    } else {
      joinButton.style.backgroundColor = "#ACA0EB";
    }
    joinButton.offsetHeight;
  } else {
    pwCheck = false;
    passwordText.innerText =
      "*비밀번호는 8자 이상,20자 이하이며, 대문자,소문자,숫자,특수문자를 각각 최소 1개 포함해야 합니다.";
    return false;
  }
});

passwordCheckInput.addEventListener("blur", function (event) {
  var joinButton = document.querySelector(".join");
  const password2 = document.getElementById("passwordCheckText");
  const passwordCheckValue = event.target.value;
  const getPassword = document.getElementById("password").value;
  if (passwordCheckValue == getPassword) {
    password2.innerText = "";
    pwCheck2 = true;
    if (changeJoinButton(emailCheck, pwCheck, pwCheck2, nickNameCheck)) {
      joinButton.style.backgroundColor = "#7F6AEE";
    } else {
      joinButton.style.backgroundColor = "#ACA0EB";
    }
    joinButton.offsetHeight;
  } else if (passwordCheckValue.length == 0) {
    password2.innerText = "비밀번호를 입력해주세요.";
    pwCheck2 = false;
    return false;
  } else if (passwordCheckValue != getPassword) {
    password2.innerText = "비밀번호가 다릅니다.";
    pwCheck2 = false;
    return false;
  }

  console.log(emailCheck, pwCheck, pwCheck2, nickNameCheck);
});

nickName.addEventListener("blur", function (event) {
  var joinButton = document.querySelector(".join");
  const nickNameValue = event.target.value; // 안에 입력된 닉네임
  const nickNameInput = document.getElementById("nicknameText");

  fetch("/data.json")
  .then((response) => {
    // 응답을 JSON으로 파싱
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return response.json();
  }) 
  .then((data) => {
    const users = data.users;
  if (nickNameValue.length == 0) {
    nickNameInput.innerText = "*닉네임을 입력해주세요.";
    nickNameCheck = false;
    return false;
  } else if (!checkNickNameSplit(nickNameValue)) {
    nickNameInput.innerText = "*띄어쓰기를 없애주세요.";
    nickNameCheck = false;
    return false;
  } // false라면 공백이 있다는 뜻
  // 이자리에 fetch 넣고 duplicated 조건 넣을 것
  else if (nickNameValue.length > 10) {
    nickNameInput.innerText = "*닉네임은 최대 10자 까지 작성 가능합니다.";
    nickNameCheck = false;
    return false;
  } else if(!duplicateNickName(users,nickNameValue)){
    nickNameInput.innerText = "*중복된 닉네임입니다.";
    nickNameCheck = false;
    return false;
  }
  else {
    nickNameInput.innerText = "";
    nickNameCheck = true;
    if (changeJoinButton(emailCheck, pwCheck, pwCheck2, nickNameCheck)) {
      joinButton.style.backgroundColor = "#7F6AEE";
    } else {
      joinButton.style.backgroundColor = "#ACA0EB";
    }
    joinButton.offsetHeight;
  }
  
});
});
  




let submit = document.querySelector(".join");
submit.addEventListener("click", function (event) {
  event.preventDefault();
  if (changeJoinButton(emailCheck, pwCheck, pwCheck2, nickNameCheck)) {
    const f = document.querySelector('.join-form'); // 이거로 form 가져오고 
    const formData = new FormData(f);  //
    const data = Object.fromEntries(formData); // 이거로 바꾸니까 됐다 유후 ~ 
    console.log(data.userid);
    console.log(data.password);
    console.log(data.nickname);
    const arr = {
      "userid": data.userid,
      "password":data.password,
      "nickname":data.nickname
    }
    fetch("/join", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(arr), // json  형식으로
    })
      .then((response) => {
        // 응답을 JSON으로 파싱
        return response.json();
      })
      .then((data) => {
        console.log("서버 응답:", data);
      });

      setTimeout(function () {
        window.location.href = "login"; // 일정 시간 후에 페이지 이동
      }, 2000);
    
  }
});

const login = document.querySelector(".go-login");
login.addEventListener("click", () => {
  window.location.href = "login.html"; // 일정 시간 후에 페이지
});
const back = document.querySelector(".go-behind");
back.addEventListener("click", () => {
  window.location.href = "login.html"; // 일정 시간 후에 페이지
});

/* 
fetch("../data.json")
  .then((response) => {
    // 응답을 JSON으로 파싱
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return response.json();
  })
  .then((data) => {
    const users = data.users;
    const button = document.querySelector('.helpertext');

    const t = document.getElementById("real"); // form 태그의 id

    t.addEventListener("submit", function (event) {
      event.preventDefault(); // 이걸 통해 디폴트로 일어나는 것들을 방지하고

      var userid = document.getElementById("userid").value; // 입력시에 유저아이디
      var password = document.getElementById("password").value; // 입력시에 비밀번호
      if (userid == "") {
        button.innerText = '이메일을 입력해주세요.'
        return false;
      } else if (lengthid(userid) == false) {
        button.innerText ="입력하신 이메일이 너무 짧습니다."; // 너무 짧은 경우
        return false;
      } else if (!validateEmail(userid)) {
        button.innerText ="유효하지 않은 이메일 주소입니다.";
        return false;
      } else if (password == "") {
        button.innerText ="비밀번호를 입력해주세요";
        return false;
      } else if (!checkPassword(password)) {
        button.innerText =
          "비밀번호는 8자 이상, 20자 이하이며, 대문자, 소문자, 특수문자를 각각 최소 1개 포함해야 합니다.";
        return false;
      } else if (!(userid == users[0].userid && password == users[0].password)) {
        button.innerText ="비밀번호가 다릅니다."; // 바보냐 json에서 배열로 선언해두고 인덱스를 안하니 당연히 이상한값이 들어가지
        // 그리고 작업관리자에서 브레이크포인트로 뭔지 잘 찾아보고 질문할 것 
        return false;
      } // 만약 둘이 일치하지 않는다면
      else {
        var element = document.getElementById("submit2");
        element.style.backgroundColor = "#7F6AEE";
        element.offsetHeight; // 재렌더링을 발생시키고

        setTimeout(function () {
          window.location.href = "post.html/{item.post_id}"; // 일정 시간 후에 페이지 이동
        }, 3000); // 3초(3000밀리초) 후에 실행
      } // 이유는 js는 동기적으로 실행이 되기 떄문에....
    });
  })

*/

