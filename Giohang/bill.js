// bill.js - xử lý xuất hóa đơn chi tiết hơn

function exportInvoice() {
  if(cart.length === 0){
    alert('Giỏ hàng đang trống!');
    return;
  }

  // Tạo cửa sổ mới để hiển thị hóa đơn
  let invoiceWindow = window.open('', 'HÓA ĐƠN', 'width=400,height=600');
  invoiceWindow.document.write('<html><head><title>HÓA ĐƠN</title>');
  invoiceWindow.document.write('<style>');
  invoiceWindow.document.write(`
    body { font-family: Arial, sans-serif; padding: 20px; }
    h2 { text-align: center; }
    table { width: 100%; border-collapse: collapse; margin-top: 20px; }
    table, th, td { border: 1px solid #000; }
    th, td { padding: 8px; text-align: left; }
    tfoot td { font-weight: bold; }
  `);
  invoiceWindow.document.write('</style></head><body>');
  invoiceWindow.document.write('<h2>🛒 HÓA ĐƠN POS</h2>');

  invoiceWindow.document.write('<table>');
  invoiceWindow.document.write('<thead><tr><th>Tên</th><th>SL</th><th>Đơn giá</th><th>Thành tiền</th></tr></thead><tbody>');

  let total = 0;
  cart.forEach(item => {
    const subtotal = item.qty * item.price;
    total += subtotal;
    invoiceWindow.document.write(`<tr>
      <td>${item.name}</td>
      <td>${item.qty}</td>
      <td>${item.price.toLocaleString()}</td>
      <td>${subtotal.toLocaleString()}</td>
    </tr>`);
  });

  invoiceWindow.document.write('</tbody>');
  invoiceWindow.document.write(`<tfoot><tr><td colspan="3">TỔNG</td><td>${total.toLocaleString()} VND</td></tr></tfoot>`);
  invoiceWindow.document.write('</table>');

  invoiceWindow.document.write('<p style="text-align:center; margin-top:20px;">Cảm ơn quý khách!</p>');

  invoiceWindow.document.write('</body></html>');
  invoiceWindow.document.close();

  invoiceWindow.print();
}
