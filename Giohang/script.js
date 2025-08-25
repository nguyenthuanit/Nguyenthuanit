let cart = [];
let products = {};

// Load sản phẩm
fetch('products.json')
  .then(res => res.json())
  .then(data => {
    data.forEach(p => {
      products[p.id] = p;
    });
  });

document.getElementById("qrInput").addEventListener("keypress", function(e) {
  if (e.key === "Enter") addProduct();
});

function addProduct() {
  const code = document.getElementById("qrInput").value.trim();
  if (!code) return;

  if (!products[code]) {
    alert("❌ Không tìm thấy sản phẩm: " + code);
    return;
  }

  const existing = cart.find(item => item.id === code);
  if (existing) {
    existing.qty++;
  } else {
    cart.push({ id: code, qty: 1 });
  }

  document.getElementById("qrInput").value = "";
  renderCart();
}

function renderCart() {
  const tbody = document.querySelector("#cartTable tbody");
  tbody.innerHTML = "";
  let total = 0;

  cart.forEach((item, index) => {
    const product = products[item.id];
    const thanhTien = product.price * item.qty;
    total += thanhTien;

    const row = `
      <tr>
        <td>${product.name}</td>
        <td>
          <button class="qty-btn" onclick="decreaseQty(${index})">-</button>
          ${item.qty}
          <button class="qty-btn" onclick="increaseQty(${index})">+</button>
        </td>
        <td>${product.price.toLocaleString()} đ</td>
        <td>${thanhTien.toLocaleString()} đ</td>
        <td><button class="remove-btn" onclick="removeItem(${index})">x</button></td>
      </tr>
    `;
    tbody.innerHTML += row;
  });

  document.getElementById("total").innerText = total.toLocaleString();
}

function increaseQty(index) {
  cart[index].qty++;
  renderCart();
}

function decreaseQty(index) {
  if (cart[index].qty > 1) {
    cart[index].qty--;
  } else {
    cart.splice(index, 1);
  }
  renderCart();
}

function removeItem(index) {
  cart.splice(index, 1);
  renderCart();
}

function clearCart() {
  if (confirm("Bạn có chắc muốn xóa giỏ hàng?")) {
    cart = [];
    renderCart();
  }
}

function exportInvoice() {
  if (cart.length === 0) {
    alert("🛒 Giỏ hàng trống!");
    return;
  }

  let now = new Date();
  let dateStr = now.toLocaleString("vi-VN");

  let bill = `
    <div style="font-family: monospace; padding:20px; width:300px; margin:auto; border:1px dashed #333;">
      <h2 style="text-align:center;">🧾 HÓA ĐƠN BÁN HÀNG</h2>
      <p style="text-align:center;">Mini Mart Demo</p>
      <p>Ngày: ${dateStr}</p>
      <hr>
      <table style="width:100%; font-size:14px;">
        <tr><th align="left">SP</th><th>SL</th><th>ĐG</th><th>TT</th></tr>`;

  let total = 0;
  cart.forEach(item => {
    const product = products[item.id];
    const thanhTien = product.price * item.qty;
    total += thanhTien;
    bill += `
      <tr>
        <td>${product.name}</td>
        <td align="center">${item.qty}</td>
        <td align="right">${product.price.toLocaleString()}</td>
        <td align="right">${thanhTien.toLocaleString()}</td>
      </tr>`;
  });

  bill += `
      </table>
      <hr>
      <p style="text-align:right; font-size:16px; font-weight:bold;">
        Tổng: ${total.toLocaleString()} VND
      </p>
      <p style="text-align:center;">Cảm ơn quý khách!</p>
    </div>
  `;

  let printWindow = window.open("", "_blank");
  printWindow.document.write(bill);
  printWindow.document.close();
  printWindow.print(); // tự động mở print dialog
}


  let invoice = "=== HÓA ĐƠN ===\n";
  let total = 0;
  cart.forEach(item => {
    const product = products[item.id];
    const thanhTien = product.price * item.qty;
    total += thanhTien;
    invoice += `${product.name} x${item.qty} = ${thanhTien.toLocaleString()} đ\n`;
  });
  invoice += "-------------------\n";
  invoice += "Tổng cộng: " + total.toLocaleString() + " đ";

  alert(invoice);
  console.log(invoice);
}

