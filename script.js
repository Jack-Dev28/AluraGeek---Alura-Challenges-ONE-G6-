    const addProductForm = document.getElementById('addProductForm');
    const productNameInput = document.getElementById('productName');
    const productPriceInput = document.getElementById('productPrice');
    const productImageInput = document.getElementById('productImage');
    const productGrid = document.querySelector('.product-grid');

    // Function to add a new product to the grid
    function addProduct(productName, productPrice, productImage) {
        const newProduct = document.createElement('div');
        newProduct.classList.add('product');
        newProduct.dataset.productName = productName;
        newProduct.dataset.productPrice = productPrice;
        newProduct.innerHTML = `
            <div class="card-container-img">
                <img src="${productImage}" alt="${productName}">
            </div>
            <div class="card-container-info">
                <p>${productName}</p>
                <span class="price">$ ${productPrice}</span>
                <button class="remove-product">❌</button>
            </div>
        `;
        productGrid.appendChild(newProduct);
    }

    // Event listener for the add product form
    addProductForm.addEventListener('submit', (event) => {
    event.preventDefault(); // Prevent form from submitting normally

    const productName = productNameInput.value;
    const productPrice = productPriceInput.value;
    const productImage = productImageInput.files[0];

    // Read the image file as a data URL
    const reader = new FileReader();
    reader.onload = (event) => {
        addProduct(productName, productPrice, event.target.result); // Add product to grid
        addProductForm.reset(); // Reset the form
    };
    reader.readAsDataURL(productImage);
    });

    // Event listener for the remove product buttons
    productGrid.addEventListener('click', (event) => {
        if (event.target.classList.contains('remove-product')) {
            const productToRemove = event.target.closest('.product'); // Find the closest .product ancestor
            productToRemove.remove(); // Remove the product element from the grid
        }
    });

    // Initialize the remove product buttons for default products
    const defaultProducts = document.querySelectorAll('.product');
    defaultProducts.forEach((product) => {
    const removeButton = product.querySelector('.remove-product');
    removeButton.addEventListener('click', () => {
        product.remove(); // Remove the product element from the grid
    });
    });