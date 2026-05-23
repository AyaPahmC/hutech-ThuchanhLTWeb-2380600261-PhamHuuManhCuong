// ============================================================
// index.js - Logic cho trang Storefront mua sắm (index.html)
// Quản lý sản phẩm (Thêm/Sửa/Xóa) được thực hiện tại admin.html
// ============================================================

// Danh sách sản phẩm mặc định (dùng để khởi tạo lần đầu)
const defaultProducts = [
    {
        id: 1,
        name: "Sản Phẩm 1",
        image: "https://picsum.photos/id/684/600/400",
        price: "$100",
        description: "Đây là mô tả chi tiết về sản phẩm 1. Sản phẩm này có chất lượng cao, bền bỉ và được làm từ các vật liệu tốt nhất. Rất phù hợp cho những người yêu thích thẩm mỹ và chất lượng."
    },
    {
        id: 2,
        name: "Sản Phẩm 2",
        image: "https://picsum.photos/id/1025/600/400",
        price: "$150",
        description: "Đây là mô tả chi tiết về sản phẩm 2. Sản phẩm này được thiết kế hiện đại, dễ sử dụng và có nhiều tính năng hữu ích. Đó là lựa chọn tuyệt vời cho gia đình bạn."
    },
    {
        id: 3,
        name: "Sản Phẩm 3",
        image: "https://picsum.photos/id/1060/600/400",
        price: "$120",
        description: "Đây là mô tả chi tiết về sản phẩm 3. Sản phẩm này được kiểm chứng về chất lượng và độ an toàn. Nó là một lựa chọn kinh tế và hiệu quả."
    },
    {
        id: 4,
        name: "Sản Phẩm 4",
        image: "https://picsum.photos/id/30/600/400",
        price: "$80",
        description: "Đây là mô tả chi tiết về sản phẩm 4. Sản phẩm này giá rẻ nhưng chất lượng không kém. Đó là lựa chọn hoàn hảo cho những người có ngân sách hạn chế."
    },
    {
        id: 5,
        name: "Sản Phẩm 5",
        image: "https://picsum.photos/id/431/600/400",
        price: "$200",
        description: "Đây là mô tả chi tiết về sản phẩm 5. Sản phẩm này là hàng cao cấp với thiết kế sang trọng và chất lượng vượt trội. Nó là biểu tượng của sang trọng và phong cách."
    }
];

// Khởi tạo localStorage nếu chưa có dữ liệu
if (!localStorage.getItem('products')) {
    localStorage.setItem('products', JSON.stringify(defaultProducts));
}

// Lấy danh sách sản phẩm từ localStorage
function getProducts() {
    return JSON.parse(localStorage.getItem('products')) || [];
}

// Render lưới sản phẩm (chỉ hiển thị, không có chức năng CRUD)
function renderProducts() {
    const productList = document.getElementById('productList');
    const products = getProducts();
    productList.innerHTML = '';

    // Xử lý khi danh sách trống
    if (products.length === 0) {
        productList.innerHTML = `
            <div style="grid-column: 1 / span 3; text-align: center; padding: 60px 20px; background-color: var(--bg-card); border: 2px dashed var(--border-color); border-radius: 16px; margin: 10px 0;">
                <p style="font-size: 18px; margin-bottom: 8px;">🛍️</p>
                <p style="font-size: 16px; font-weight: 600; color: var(--text-muted); margin-bottom: 6px;">Hiện chưa có sản phẩm nào</p>
                <p style="font-size: 13.5px; color: var(--text-muted); margin-bottom: 20px;">Quản trị viên có thể thêm sản phẩm mới qua trang Quản Lý.</p>
                <a href="admin.html" style="background: linear-gradient(135deg, #4f46e5, #6366f1); color: white; padding: 10px 22px; border-radius: 10px; text-decoration: none; font-weight: 700; font-size: 14px; box-shadow: 0 4px 12px rgba(99,102,241,0.25);">🛠️ Đi đến trang Quản Lý</a>
            </div>
        `;
        return;
    }

    products.forEach(product => {
        const card = document.createElement('div');
        card.className = 'product-card';
        card.innerHTML = `
            <a href="product-detail.html?id=${product.id}">
                <img src="${product.image}" alt="${product.name}">
                <h2>${product.name}</h2>
                <p class="product-desc-short">${product.description.substring(0, 50)}...</p>
                <p class="product-price-tag">Giá: ${product.price}</p>
                <button class="button button4">Mua Ngay</button>
            </a>
        `;
        productList.appendChild(card);
    });
}

// Logic chuyển đổi chế độ Sáng/Tối
const themeToggle = document.getElementById('themeToggle');
if (themeToggle) {
    themeToggle.addEventListener('click', () => {
        const isDark = document.documentElement.classList.toggle('dark-theme');
        localStorage.setItem('theme', isDark ? 'dark' : 'light');
        updateThemeToggleIcon();
    });
}

function updateThemeToggleIcon() {
    const toggle = document.getElementById('themeToggle');
    if (toggle) {
        toggle.textContent = document.documentElement.classList.contains('dark-theme') ? '☀️' : '🌙';
    }
}

// Khởi chạy khi tải trang
document.addEventListener('DOMContentLoaded', () => {
    renderProducts();
    updateThemeToggleIcon();
});
