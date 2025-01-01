document.addEventListener("DOMContentLoaded",()=>{

    const products = [
        {id:1 , name: "Product 1", price: 3.33},
        {id:2 , name: "Product 2", price: 5.33},
        {id:3 , name: "Product 3", price: 4.33},
    ];

    const cart = [];
    const productList = document.querySelector("#product-list");
    const cartItems = document.querySelector("#cart-items");
    const emptyCartMessage = document.querySelector("#empty-cart");
    const cartTotalMessage = document.querySelector("#cart-total");
    const totalPriceDisplay = document.querySelector("#total-price");
    const checkOutBtn = document.querySelector("#checkout-btn");

    products.forEach((product) => {
        const productdiv=document.createElement('div');
        productdiv.classList.add('product');
        productdiv.innerHTML=`
        <span>${product.name} - $${product.price}</span>
        <button data-id="${product.id}">Add to cart</button>
        `;
        productList.appendChild(productdiv);
    })

    productList.addEventListener("click",(e)=>{
        if(e.target.tagName === 'BUTTON'){
           const productId =parseInt(e.target.getAttribute('data-id'));
            console.log(productId)
            const product= products.find(p => p.id === productId);
            addtoCart(product);
        }
    })

    function addtoCart(product){
        cart.push(product);
        renderItem();
    }

    function renderItem(){
        cartItems.innerHTML="";
        let totalPrice = 0;

        if(cart.length > 0){
            emptyCartMessage.classList.add("hidden");
            cartTotalMessage.classList.remove("hidden");
            cart.forEach((item,index)=>{
                totalPrice += item.price
                const cartItm = document.createElement('div');
                cartItm.innerHTML=`
                ${item.name} - $${item.price.toFixed(2)}
                `;
                cartItems.appendChild(cartItm);
                totalPriceDisplay.textContent=`${totalPrice.toFixed(2)}`
            });
        }else{
            cartTotalMessage.classList.add("hidden");          
            emptyCartMessage.classList.remove("hidden");
        }
    }

    checkOutBtn.addEventListener("click",()=>{
        while (cart.length > 0) {
          cart.pop();
        }
        alert("All products from cart have been removed successfully!");
        totalPriceDisplay.textContent= `$0.00`;
        renderItem();
    })

})