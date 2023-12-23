
document.addEventListener('contextmenu', function (e) {
  e.preventDefault();
});

const loginForm = document.querySelector('.login-form');
const inp_username = document.querySelector('#username');
const inp_password = document.querySelector('#password');
const userlabel = document.querySelector('#userlabel');
const passlabel = document.querySelector('#passlabel');
const selectlabel = document.querySelector('#selectlabel');

function coloruserLabel() {
  inp_username.style.border = '3px solid red';
  userlabel.style.textAlign = 'center';
  userlabel.style.color = 'red';
}

function colorpassLabel() {
  inp_password.style.border = '3px solid red';
  passlabel.style.textAlign = 'center';
  passlabel.style.color = 'red';
}

const checkUser = (inputObj) => {
  const username = inputObj['username'].trim();
  if (username === '') {
    coloruserLabel();
    userlabel.textContent = `กรุณาป้อนข้อมูลผู้ใช้!`;
  } else if (username.includes(' ')) {
    coloruserLabel();
    userlabel.textContent = `ห้ามให้ชื่อมีช่องว่าง!`;
  } else if (username.length <= 3) {
    coloruserLabel();
    userlabel.textContent = `ต้องมีมากกว่า 3 ตัวอักษร!`;
  } else if (!isNaN(parseInt(username.charAt(0), 10))) {
    coloruserLabel();
    userlabel.textContent = `ห้ามใช้ชื่อที่มีตัวเลขขึ้นต้น!`;
  } else {
    checkPass(inputObj);
    userlabel.textContent = ``;
    inp_username.style.border = 'none';
    return username;
  }
}

const checkPass = (inputObj) => {
  const password = inputObj['password'];
  const hasNumber = /\d/.test(password);
  const hasLetter = /[a-zA-Z]/.test(password);
  if (password === '') {
    colorpassLabel();
    passlabel.textContent = `กรุณาป้อนรหัสผ่าน!`;
  } else if (password.includes(' ')) {
    colorpassLabel();
    passlabel.textContent = `ห้ามให้รหัสมีช่องว่าง!`;
  } else if (password.length <= 4) {
    colorpassLabel();
    passlabel.textContent = `รหัสต้องมีมากกว่า 4 ตัวอักษร!`;
  } else if (!(hasNumber && hasLetter)) {
    colorpassLabel();
    passlabel.textContent = `รหัสผ่านต้องมีทั้งตัวเลขและตัวอักษร!`;
  }else {
    checkRole(inputObj);
    passlabel.textContent = ``;
    inp_password.style.border = 'none';
    return password;
  }
};

const checkRole = (inputObj) => {
  const username = inputObj['username'];
  const password = inputObj['password'];
  const role = inputObj['role'];

  if (role === 'Select Role'){
    selectlabel.style.textAlign = 'center';
    selectlabel.style.color = 'red';
    selectlabel.textContent = `โปรดเลือกหน้าที่!`;
    return;
  }
  checkUserPass(inputObj);
  selectlabel.textContent = ``;
};

const checkUserPass = (inputObj) => {
  const username = inputObj['username'];
  const password = inputObj['password'];
  const users = [
    {username : 'andy', password: 'andy1234'},
    {username : 'bobby', password: 'bobby2345'},
    {username : 'candy', password: 'candy3456'},
    {username : 'Donut', password: 'donut1140'},
  ];

  for (const user of users) {
    if (username === user.username && password === user.password) {
      alert('Login Success.....\n'+'Welcome........' + '\nUsername : ' + username);
      window.location.href = 'https://example.com';
      return;
    }
  }

  alert('ไม่พบข้อมูลผู้ใช้');
};

const validateInput = (inputObj) => {
  checkUser(inputObj);
};

const hdlLogin = event => {
    event.preventDefault();
    let inputObj = {}
    for(let event of loginForm.elements) {
      inputObj[event.id] = event.value
    }
    validateInput(inputObj);
}

loginForm.addEventListener('submit', hdlLogin);