addToCart = () => {
    const productName = getFieldValue('product-name');
    const productQuantity = getFieldValue('product-quantity');
    const productPrice = getFieldValue('product-price');
    let productObj = {};
    productObj.quantity = productQuantity;
    productObj.price = productPrice * productQuantity;
    if (productName && productPrice && productQuantity) {
        addToLs(productName, productObj);
        setDisplay();
    }
};

addToLs = (productName, productObj) => {
    let addProduct = {};
    let previousCart = localStorage.getItem('cart');
    if (!previousCart) {
        addProduct = {};
    }
    else {
        addProduct = JSON.parse(previousCart);
    }
    addProduct[productName] = productObj;
    localStorage.setItem('cart', JSON.stringify(addProduct));
};

setDisplay = () => {
    document.getElementById('cart-summary').innerHTML = '';
    const cartItems = JSON.parse(localStorage.getItem('cart'));
    let cartTotal = 0;
    for (const cartItem in cartItems) {
        const cartProduct = `
            <div class="flex items-center gap-3 leading-10">
                <p>Name: <span id="cart-product-name">${cartItem}</span></p>
                <p>Quantity: <span id="cart-product-quantity">${cartItems[cartItem].quantity}</span></p>
                <p>Price: $<span id="cart-product-price">${cartItems[cartItem].price}</span></p>
                <i onclick="removeItem('${cartItem}', ${cartItems[cartItem].price}, this)" class="fa-solid fa-trash-can cursor-pointer"></i>
            </div>
        `;
        document.getElementById('cart-summary').innerHTML += cartProduct;
        cartTotal += parseFloat(cartItems[cartItem].price);
        document.getElementById('cart-total').innerText = cartTotal;
    };
};
setDisplay();

getFieldValue = elementId => {
    const filedValue = document.getElementById(elementId).value;
    document.getElementById(elementId).value = '';
    return filedValue;
};

removeItem = (name, price, button) => {
    const cartItems = JSON.parse(localStorage.getItem('cart'));
    for(cartItem in cartItems) {
        if(name === cartItem) {
            if (confirm(`You\'re removing ${name} from cart!`)) {
                button.parentNode.remove(this);
                delete cartItems[cartItem];
                document.getElementById('cart-total').innerText -= price;
                localStorage.setItem('cart', JSON.stringify(cartItems));
            };
        };
    };
};