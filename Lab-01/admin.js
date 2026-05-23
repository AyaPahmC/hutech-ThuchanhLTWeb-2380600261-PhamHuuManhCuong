// Danh sách sản phẩm mặc định (để dự phòng)
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

// Khởi tạo localStorage nếu chưa có dữ liệu sản phẩm
if (!localStorage.getItem('products')) {
    localStorage.setItem('products', JSON.stringify(defaultProducts));
}

// Lấy danh sách sản phẩm từ localStorage
function getProducts() {
    return JSON.parse(localStorage.getItem('products')) || [];
}

// Lưu danh sách sản phẩm vào localStorage
function saveProducts(products) {
    localStorage.setItem('products', JSON.stringify(products));
}

// Render bảng quản trị sản phẩm ra HTML
function renderAdminTable() {
    const tableBody = document.getElementById('adminProductTableBody');
    const products = getProducts();
    tableBody.innerHTML = '';

    if (products.length === 0) {
        tableBody.innerHTML = `
            <tr>
                <td colspan="6" style="text-align: center; padding: 40px; color: var(--text-muted); font-weight: 600;">
                    <div style="margin-bottom: 12px; font-size: 20px;">🛍️ Không có sản phẩm nào</div>
                    <button id="btnRestoreDefaults" class="btn-action btn-add-custom" style="font-size: 13px; padding: 8px 16px;">🔄 Khôi phục sản phẩm mẫu</button>
                </td>
            </tr>
        `;

        // Gắn sự kiện cho nút khôi phục mặc định
        const btnRestoreDefaults = document.getElementById('btnRestoreDefaults');
        if (btnRestoreDefaults) {
            btnRestoreDefaults.addEventListener('click', () => {
                saveProducts(defaultProducts);
                renderAdminTable();
            });
        }
        return;
    }

    products.forEach(product => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td data-label="ID"><strong>#${product.id}</strong></td>
            <td data-label="Hình Ảnh">
                <img src="${product.image}" alt="${product.name}" class="admin-table-thumb">
            </td>
            <td data-label="Tên Sản Phẩm"><span class="admin-table-name">${product.name}</span></td>
            <td data-label="Giá Cả"><strong class="admin-table-price">${product.price}</strong></td>
            <td data-label="Mô Tả"><span class="admin-table-desc" title="${product.description}">${product.description.substring(0, 45)}...</span></td>
            <td data-label="Thao Tác">
                <div class="admin-row-actions">
                    <button class="btn-row-edit" data-id="${product.id}" title="Sửa sản phẩm">✏️ Sửa</button>
                    <button class="btn-row-delete" data-id="${product.id}" title="Xóa sản phẩm">🗑️ Xóa</button>
                </div>
            </td>
        `;
        tableBody.appendChild(tr);
    });
}

// Tham chiếu phần tử modal
const productModal = document.getElementById('productModal');
const btnAddProduct = document.getElementById('btnAddProduct');
const btnCloseModal = document.getElementById('btnCloseModal');
const btnCancel = document.getElementById('btnCancel');
const addProductForm = document.getElementById('addProductForm');
const modalTitle = document.getElementById('modalTitle');
const btnSubmitForm = document.getElementById('btnSubmitForm');
const editProductIdInput = document.getElementById('editProductId');

// Đóng mở Modal ở chế độ Thêm mới
if (btnAddProduct) {
    btnAddProduct.addEventListener('click', () => {
        // Reset form và chuyển tiêu đề sang Thêm mới
        addProductForm.reset();
        editProductIdInput.value = "";
        modalTitle.innerHTML = "✏️ Thêm Sản Phẩm Mới";
        btnSubmitForm.innerHTML = "Lưu sản phẩm";
        productModal.classList.add('active');
    });
}

const closeModal = () => {
    productModal.classList.remove('active');
    addProductForm.reset();
};

if (btnCloseModal) btnCloseModal.addEventListener('click', closeModal);
if (btnCancel) btnCancel.addEventListener('click', closeModal);

if (productModal) {
    productModal.addEventListener('click', (e) => {
        if (e.target === productModal) {
            closeModal();
        }
    });
}

// Xử lý sự kiện click trên bảng (dùng event delegation cho Sửa và Xóa)
const tableBody = document.getElementById('adminProductTableBody');
if (tableBody) {
    tableBody.addEventListener('click', (e) => {
        // 1. Nhấn nút SỬA sản phẩm
        const btnEdit = e.target.closest('.btn-row-edit');
        if (btnEdit) {
            const productId = parseInt(btnEdit.getAttribute('data-id'));
            const products = getProducts();
            const product = products.find(p => p.id === productId);

            if (product) {
                // Điền thông tin cũ vào form để chỉnh sửa
                editProductIdInput.value = product.id;
                document.getElementById('prodName').value = product.name;
                document.getElementById('prodPrice').value = product.price.replace('$', '');
                document.getElementById('prodImage').value = product.image.startsWith('data:image') ? '' : product.image; // Không điền nếu là base64 để tránh dài
                document.getElementById('prodDesc').value = product.description;

                // Thay đổi tiêu đề modal và nút lưu
                modalTitle.innerHTML = `📝 Chỉnh Sửa Sản Phẩm #${product.id}`;
                btnSubmitForm.innerHTML = "Cập nhật sản phẩm";

                // Mở Modal
                productModal.classList.add('active');
            }
        }

        // 2. Nhấn nút XÓA sản phẩm
        const btnDelete = e.target.closest('.btn-row-delete');
        if (btnDelete) {
            const productId = parseInt(btnDelete.getAttribute('data-id'));
            const products = getProducts();
            const product = products.find(p => p.id === productId);

            if (product) {
                if (confirm(`Bạn có chắc chắn muốn xóa sản phẩm "${product.name}" này không?`)) {
                    let updatedProducts = products.filter(p => p.id !== productId);
                    saveProducts(updatedProducts);
                    renderAdminTable();
                }
            }
        }
    });
}

// Xử lý submit Form (Hỗ trợ cả THÊM MỚI và CẬP NHẬT)
if (addProductForm) {
    addProductForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const editIdValue = editProductIdInput.value;
        const name = document.getElementById('prodName').value.trim();
        const priceValue = document.getElementById('prodPrice').value.trim();
        const imageFile = document.getElementById('prodImageFile').files[0];
        let image = document.getElementById('prodImage').value.trim();
        const description = document.getElementById('prodDesc').value.trim();

        // Chuyển file sang Base64
        const getBase64 = (file) => {
            return new Promise((resolve, reject) => {
                const reader = new FileReader();
                reader.readAsDataURL(file);
                reader.onload = () => resolve(reader.result);
                reader.onerror = error => reject(error);
            });
        };

        if (imageFile) {
            // Kiểm tra định dạng tệp ảnh
            if (!imageFile.type.startsWith('image/')) {
                alert('⚠️ Lỗi: Tệp được chọn không phải là hình ảnh! Vui lòng chỉ chọn các tệp đuôi ảnh (.png, .jpg, .jpeg, .gif, .webp).');
                return;
            }

            // Kiểm tra kích thước tệp ảnh (< 1.5MB)
            const maxSize = 1.5 * 1024 * 1024;
            if (imageFile.size > maxSize) {
                alert('⚠️ Lỗi: Kích thước tệp quá lớn! Vui lòng tải lên ảnh nhỏ hơn 1.5MB để tối ưu hóa lưu trữ.');
                return;
            }

            try {
                image = await getBase64(imageFile);
            } catch (error) {
                alert('❌ Lỗi hệ thống khi đọc ảnh, vui lòng thử lại.');
                return;
            }
        }

        const products = getProducts();
        const formattedPrice = priceValue.startsWith('$') ? priceValue : `$${priceValue}`;

        if (editIdValue) {
            // CHẾ ĐỘ CHỈNH SỬA (UPDATE)
            const editId = parseInt(editIdValue);
            const index = products.findIndex(p => p.id === editId);

            if (index !== -1) {
                // Giữ lại ảnh cũ nếu không chọn file mới và không dán link mới
                if (!imageFile && !image) {
                    image = products[index].image;
                }

                products[index] = {
                    id: editId,
                    name: name,
                    image: image,
                    price: formattedPrice,
                    description: description
                };

                saveProducts(products);
                alert('🎉 Cập nhật thông tin sản phẩm thành công!');
            }
        } else {
            // CHẾ ĐỘ THÊM MỚI (CREATE)
            if (!image) {
                const randomId = Math.floor(Math.random() * 1000);
                image = `https://picsum.photos/id/${randomId}/600/400`;
            }

            const newId = products.length > 0 ? Math.max(...products.map(p => p.id)) + 1 : 1;
            const newProduct = {
                id: newId,
                name: name,
                image: image,
                price: formattedPrice,
                description: description
            };

            products.push(newProduct);
            saveProducts(products);
            alert('🎉 Thêm sản phẩm mới thành công!');
        }

        // Render lại bảng, đóng modal và reset
        renderAdminTable();
        closeModal();
    });
}

// Xử lý tạo nhanh 3 hàng sản phẩm mẫu (hàng ngẫu nhiên)
const btnAddRow = document.getElementById('btnAddRow');
if (btnAddRow) {
    btnAddRow.addEventListener('click', () => {
        const products = getProducts();
        let currentMaxId = products.length > 0 ? Math.max(...products.map(p => p.id)) : 0;

        const nouns = ["Bàn phím cơ", "Tai nghe Gaming", "Chuột không dây", "Đèn bàn thông minh", "Lót chuột cỡ lớn", "Balo chống nước"];
        const adjectives = ["cao cấp", "chính hãng", "thế hệ mới", "siêu bền", "đa năng", "hiện đại"];

        for (let i = 1; i <= 3; i++) {
            currentMaxId++;
            const randomId = Math.floor(Math.random() * 1000);
            const randomNoun = nouns[Math.floor(Math.random() * nouns.length)];
            const randomAdj = adjectives[Math.floor(Math.random() * adjectives.length)];
            const randomPrice = Math.floor(Math.random() * 180) + 30; // $30 to $210

            const newProd = {
                id: currentMaxId,
                name: `${randomNoun} ${randomAdj} ${currentMaxId}`,
                image: `https://picsum.photos/id/${randomId}/600/400`,
                price: `$${randomPrice}`,
                description: `Đây là mô tả chi tiết cho ${randomNoun.toLowerCase()} ${randomAdj}. Sản phẩm được trang bị những công nghệ tiên tiến nhất, mang lại trải nghiệm hoàn hảo cho người dùng trong phân khúc giá.`
            };

            products.push(newProd);
        }

        saveProducts(products);
        renderAdminTable();
        alert('🚀 Đã sinh thành công thêm 3 sản phẩm mẫu vào danh sách!');
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
    const themeToggle = document.getElementById('themeToggle');
    if (themeToggle) {
        const isDark = document.documentElement.classList.contains('dark-theme');
        themeToggle.textContent = isDark ? '☀️' : '🌙';
    }
}

// Khởi tạo render lần đầu khi tải trang
document.addEventListener('DOMContentLoaded', () => {
    renderAdminTable();
    updateThemeToggleIcon();
});
