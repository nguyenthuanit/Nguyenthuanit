// hiện / ẩn mật khẩu
document.getElementById('showPassword').addEventListener('change', function () {
  document.getElementById('password').type = this.checked ? 'text' : 'password';
});

// hiển thị toast
function showToast(text, type = 'error', ms = 2200) {
  const t = document.getElementById('toast');
  t.textContent = text;
  t.className = 'toast show ' + (type === 'success' ? 'success' : 'error');
  clearTimeout(t._h);
  t._h = setTimeout(() => { t.className = 'toast'; }, ms);
}

// danh sách tài khoản (nhúng trực tiếp)
const accounts = [
  { username: "admin", password: "123", redirect: "admin.html" },
  { username: "user", password: "123", redirect: "index.html" }
];

// đăng nhập
function login() {
  const user = document.getElementById("username").value.trim();
  const pass = document.getElementById("password").value.trim();

  if (!user || !pass) {
    showToast("Vui lòng nhập đầy đủ thông tin.", "error");
    return;
  }

  let success = false;
  let redirectUrl = null;

  for (let acc of accounts) {
    if (acc.username === user && acc.password === pass) {
      success = true;
      redirectUrl = acc.redirect || "index.html";
      break;
    }
  }

  if (success) {
    showToast("Đăng nhập thành công!", "success", 1200);
    // chuyển hướng sau khi hiển thị toast
    setTimeout(() => {
      window.location.href = redirectUrl;
    }, 1300);
  } else {
    showToast("Sai tài khoản hoặc mật khẩu!", "error");
  }
}

// ấn Enter trong input cũng login
document.getElementById("password").addEventListener("keypress", function (e) {
  if (e.key === "Enter") {
    login();
  }
});
document.getElementById("username").addEventListener("keypress", function (e) {
  if (e.key === "Enter") {
    login();
  }
});

// khi load trang, tự focus vào ô username
window.addEventListener("DOMContentLoaded", () => {
  document.getElementById("username").focus();
});
