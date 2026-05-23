// Danh sách sản phẩm mặc định ban đầu (dự phòng nếu vào thẳng trang chi tiết)
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

if (!localStorage.getItem('products')) {
    localStorage.setItem('products', JSON.stringify(defaultProducts));
}

const products = JSON.parse(localStorage.getItem('products'));

// Lấy ID sản phẩm từ URL
const urlParams = new URLSearchParams(window.location.search);
const productId = parseInt(urlParams.get('id'));

// Tìm sản phẩm theo ID
const product = products.find(p => p.id === productId);

// Hiển thị thông tin sản phẩm
if (productId && product) {
    document.getElementById('productName').textContent = product.name;
    document.getElementById('productImage').src = product.image;
    document.getElementById('productPrice').textContent = product.price;
    document.getElementById('productDescription').textContent = product.description;
} else {
    document.body.innerHTML = `
        <div style="text-align: center; padding: 100px 20px; font-family: Arial, sans-serif;">
            <h1 style="color: #e74c3c; font-size: 32px; margin-bottom: 20px;">Sản phẩm không tồn tại hoặc đã bị xóa</h1>
            <a href="index.html" style="background-color: #04AA6D; border: none; color: white; padding: 15px 30px; text-decoration: none; display: inline-block; font-size: 16px; border-radius: 5px; font-weight: bold; transition: background-color 0.2s;">Quay lại trang chủ</a>
        </div>
    `;
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
    const themeToggle = document.getElementById('themeToggle');
    if (themeToggle) {
        const isDark = document.documentElement.classList.contains('dark-theme');
        themeToggle.textContent = isDark ? '☀️' : '🌙';
    }
}

// Chạy khởi tạo icon khi tải xong
document.addEventListener('DOMContentLoaded', () => {
    updateThemeToggleIcon();
});