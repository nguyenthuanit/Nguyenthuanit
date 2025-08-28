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

// đăng nhập
async function login() {
  const user = document.getElementById("username").value.trim();
  const pass = document.getElementById("password").value.trim();

  if (!user || !pass) {
    showToast("Vui lòng nhập đầy đủ thông tin.", "error");
    return;
  }

  try {
    const res = await fetch("taikhoan.json");
    const text = await res.text();
    const lines = text.trim().split("\n");

    let success = false;
    let redirectUrl = null;
    for (let line of lines) {
      if (!line.trim()) continue;
      const acc = JSON.parse(line);
      if (acc.username === user && acc.password === pass) {
        success = true;
        redirectUrl = acc.redirect || "index.html";
        break;
      }
    }

    if (success) {
      showToast("Đăng nhập thành công!", "success", 1200);
      setTimeout(() => { window.location.href = redirectUrl; }, 1000);
    } else {
      showToast("Sai tài khoản hoặc mật khẩu!", "error");
    }
  } catch (err) {
    console.error(err);
    showToast("Lỗi tải dữ liệu!", "error");
  }
}
