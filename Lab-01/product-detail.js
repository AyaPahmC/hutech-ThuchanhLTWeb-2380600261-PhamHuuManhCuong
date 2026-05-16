const products = {
    1: {
        name: "Sản Phẩm 1",
        image: "https://picsum.photos/id/684/600/400",
        price: "$100",
        description: "Đây là mô tả chi tiết về sản phẩm 1. Sản phẩm này có chất lượng cao, bền bỉ và được làm từ các vật liệu tốt nhất. Rất phù hợp cho những người yêu thích thẩm mỹ và chất lượng."
    },
    2: {
        name: "Sản Phẩm 2",
        image: "https://picsum.photos/id/1025/600/400",
        price: "$150",
        description: "Đây là mô tả chi tiết về sản phẩm 2. Sản phẩm này được thiết kế hiện đại, dễ sử dụng và có nhiều tính năng hữu ích. Đó là lựa chọn tuyệt vời cho gia đình bạn."
    },
    3: {
        name: "Sản Phẩm 3",
        image: "https://picsum.photos/id/1060/600/400",
        price: "$120",
        description: "Đây là mô tả chi tiết về sản phẩm 3. Sản phẩm này được kiểm chứng về chất lượng và độ an toàn. Nó là một lựa chọn kinh tế và hiệu quả."
    },
    4: {
        name: "Sản Phẩm 4",
        image: "https://picsum.photos/id/30/600/400",
        price: "$80",
        description: "Đây là mô tả chi tiết về sản phẩm 4. Sản phẩm này giá rẻ nhưng chất lượng không kém. Đó là lựa chọn hoàn hảo cho những người có ngân sách hạn chế."
    },
    5: {
        name: "Sản Phẩm 5",
        image: "https://picsum.photos/id/431/600/400",
        price: "$200",
        description: "Đây là mô tả chi tiết về sản phẩm 5. Sản phẩm này là hàng cao cấp với thiết kế sang trọng và chất lượng vượt trội. Nó là biểu tượng của sang trọng và phong cách."
    }
};

// Lấy ID sản phẩm từ URL
const urlParams = new URLSearchParams(window.location.search);
const productId = urlParams.get('id');

// Hiển thị thông tin sản phẩm
if (productId && products[productId]) {
    const product = products[productId];
    document.getElementById('productName').textContent = product.name;
    document.getElementById('productImage').src = product.image;
    document.getElementById('productPrice').textContent = product.price;
    document.getElementById('productDescription').textContent = product.description;
} else {
    document.body.innerHTML = '<h1>Sản phẩm không tìm thấy</h1>';
}