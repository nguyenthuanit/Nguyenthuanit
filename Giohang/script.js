let products = {};
let cart = [];

// Load dữ liệu sản phẩm từ JSON
fetch('products.json')
  .then(res => res.json())
  .then(data => {
    products = data;
  })
  .catch(err => console.error('Lỗi load sản phẩm:', err));

// Lấy element
const qrInput = document.getElementById('qrInput');
const cartTable = document.querySelector('#cartTable tbody');
const totalEl = document.getElementById('total');

// Bắt sự kiện Enter
qrInput.addEventListener('keypress', function(e) {
  if (e.key === 'Enter') {
    const code = qrInput.value.trim();
    if(code) addItemToCart(code);
    qrInput.value = '';
  }
});

function addItemToCart(code) {
  if(!products[code]){
    alert('Sản phẩm không tồn tại!');
    return;
  }

  const existingItem = cart.find(item => item.code === code);
  if(existingItem){
    existingItem.qty++;
  } else {
    cart.push({ code, name: products[code].name, price: products[code].price, qty: 1 });
  }
  renderCart();
}

function renderCart() {
  cartTable.innerHTML = '';
  let total = 0;

  cart.forEach((item, index) => {
    const subtotal = item.price * item.qty;
    total += subtotal;

    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${item.name}</td>
      <td>${item.qty}</td>
      <td>${item.price.toLocaleString()}</td>
      <td>${subtotal.toLocaleString()}</td>
      <td><button onclick="removeItem(${index})">❌</button></td>
    `;
    cartTable.appendChild(row);
  });

  totalEl.textContent = total.toLocaleString();
}

function removeItem(index) {
  cart.splice(index, 1);
  renderCart();
}

function clearCart() {
  if(confirm('Bạn có chắc muốn xóa toàn bộ giỏ hàng?')){
    cart = [];
    renderCart();
  }
}
