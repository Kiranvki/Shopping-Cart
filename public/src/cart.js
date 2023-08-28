let ShoppingCart = document.getElementById("shopping-cart");
let label = document.getElementById("label");

/**
 * ! Basket to hold all the selected items
 * ? the getItem part is retrieving data from the local storage
 * ? if local storage is blank, basket becomes an empty array
 */

let basket = JSON.parse(localStorage.getItem("data")) || [];
let shopItems = [];
/**
 * ! To calculate total amount of selected Items
 */

let calculation = () => {
  let cartIcon = document.getElementById("cartAmount");
  cartIcon.innerHTML = basket.map((x) => x.item).reduce((x, y) => x + y, 0);
};

calculation();

let fetchShopItems = async () => {
  try {
    const response = await fetch("/api/v1/product/getAll");
    if (!response.ok) {
      throw new Error("Failed to fetch data from the API");
    }
    const data = await response.json();
    console.log("data", data.products);
    shopItems = data.products.map((item) => ({
      id: item.id,
      name: item.title,
      desc: item.desc,
      // img: item.image_url,
      price: item.price,
    })); // Map the fetched data to match your item structure
    generateCartItems();
    TotalAmount();
    // Call the function to generate the shop interface
  } catch (error) {
    console.error(error);
  }
};
fetchShopItems();

/**
 * ! Generates the Cart Page with product cards composed of
 * ! images, title, price, buttons, & Total price
 * ? When basket is blank -> show's Cart is Empty
 */

let generateCartItems = () => {
  console.log("data1 :>> ", shopItems);
  if (basket.length !== 0) {
    return (ShoppingCart.innerHTML = basket
      .map((x) => {
        let { id, item } = x;
        let search = shopItems.find((x) => x.id === id) || [];
        let { price, name } = search;
        return `
      <div class="cart-item">
        <div class="details">
          <div class="title-price-x">
            <h4 class="title-price">
              <p>${name}</p>
              <p class="cart-item-price">Rs ${price}</p>
            </h4>
            <i onclick="removeItem(${id})" class="bi bi-x-lg"></i>
          </div>

          <div class="cart-buttons">
            <div class="buttons">
              <i onclick="decrement(${id})" class="bi bi-dash-lg"></i>
              <div id=${id} class="quantity">${item}</div>
              <i onclick="increment(${id})" class="bi bi-plus-lg"></i>
            </div>
          </div>
          <h3>Rs ${item * price}</h3>
        
        </div>
      </div>
      `;
      })
      .join(""));
  } else {
    ShoppingCart.innerHTML = "";
    label.innerHTML = `
    <h2>Cart is Empty</h2>
    <a href="index.html">
      <button class="HomeBtn">Back to Home</button>
    </a>
    `;
  }
};

generateCartItems();

/**
 * ! used to increase the selected product item quantity by 1
 */

let increment = (id) => {
  let selectedItem = id;
  let search = basket.find((x) => x.id === selectedItem.id);

  if (search === undefined) {
    basket.push({
      id: selectedItem.id,
      item: 1,
    });
  } else {
    search.item += 1;
  }
  generateCartItems();
  update(selectedItem.id);
  localStorage.setItem("data", JSON.stringify(basket));
};

/**
 * ! used to decrease the selected product item quantity by 1
 */

let decrement = (id) => {
  let selectedItem = id;
  let search = basket.find((x) => x.id === selectedItem.id);

  if (search === undefined) return;
  else if (search.item === 0) return;
  else {
    search.item -= 1;
  }
  update(selectedItem.id);
  basket = basket.filter((x) => x.item !== 0);
  generateCartItems();
  localStorage.setItem("data", JSON.stringify(basket));
};

/**
 * ! To update the digits of picked items on each item card
 */

let update = (id) => {
  let search = basket.find((x) => x.id === id);
  document.getElementById(id).innerHTML = search.item;
  calculation();
  TotalAmount();
};

/**
 * ! Used to remove 1 selected product card from basket
 * ! using the X [cross] button
 */

let removeItem = (id) => {
  let selectedItem = id;
  basket = basket.filter((x) => x.id !== selectedItem.id);
  calculation();
  generateCartItems();
  TotalAmount();
  localStorage.setItem("data", JSON.stringify(basket));
};

/**
 * ! Used to calculate total amount of the selected Products
 * ! with specific quantity
 * ? When basket is blank, it will show nothing
 */

let TotalAmount = () => {
  // console.log('basket :>> ', basket.price);
  if (basket.length !== 0) {
    let amount = basket
      .map((x) => {
        let { id, item } = x;
        let filterData = shopItems.find((x) => x.id === id);

        return filterData.price * item;
      })
      .reduce((x, y) => x + y, 0);

    return (label.innerHTML = `
    <h2>Total Bill : Rs ${amount}</h2>
    <button class="checkout" onClick="checkOut(${amount}, document.getElementById('name').value)">Checkout</button>
    <button onClick="clearCart()" class="removeAll">Clear Cart</button>
   
    <div class="form-group">
      <input type="text" name="name" class="form-control" id="name" value="">
     <!-- <button class="couponbutton" onclick="apply_coupon()">apply coupon</button> -->
      <label class="">Enter Coupon Code</label>
    </div>
    <br><br>
    `);
  } else return;
};

TotalAmount();

/**
 * ! Used to clear cart, and remove everything from local storage
 */

//  var clearCart = () => {
function clearCart() {
  console.log("testing");
  basket = [];
  generateCartItems();
  calculation();
  localStorage.setItem("data", JSON.stringify(basket));
}

function apply_coupon() {
  const coupon = "100";
}

// Checout function

function checkOut(amount, couponCode) {
  const postData = {
    coupon: couponCode,
    cart: basket.map((x) => ({ productId: x.id, count: x.item })),
    finalTotal: amount
  };

  // Replace this with your server endpoint
  const url = "/api/v1/order/checkout";
  fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(postData),
  })
    .then((response) => {
      if (response.ok) {
        basket = [];
        generateCartItems();
        calculation();
        localStorage.setItem("data", JSON.stringify(basket));
        return response.json();

      } else {
        throw new Error("Failed to post data");
      }
    })
    .then((data) => {
      console.log("Response data:", data.msg);
      if(data){
        let id = data
        localStorage.setItem("Xid", JSON.stringify(id));
        window.location.href = "http://localhost:5000/table.html"
      }
    })
    .catch((error) => {
      console.error("An error occurred:", error);
    });
}
