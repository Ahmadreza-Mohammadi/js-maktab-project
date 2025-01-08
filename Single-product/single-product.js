const BASE_URL = "http://api.alikooshesh.ir:3000";
const API_KEY =
  "ahmadreza-mohammadiDf4FntTt7eDYpjB1y6JrubLGirgncMnWPauJW8NTAyK7FvVX46U3oFl1eQUJCxKcs1KnEsp2nYuX90qx3G2DgUxXBkBSIqbu1gqNVGpKjB3DH";
const ACCESS_TOKEN =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3N2E1MTcyOWZkODZmZmFjMzE4OTdmZiIsImlhdCI6MTczNjMxNzE3OSwiZXhwIjoxNzM2NDg5OTc5fQ.diochWTWo5pOCjvn0Exirouka-2VXh5bopw041_oXsE";

const singleProduct = document.getElementById("single-product");
const params = new URLSearchParams(window.location.search);
const productId = params.get("id");
const colorsBox = document.getElementById("colors-box");
const sizesBox = document.getElementById("sizes-box");
const priceBar = document.getElementById("price-bar");
const productImage = document.getElementById("product-image");
const productName = document.getElementById("product-name");
const plusBtn = document.getElementById("plus-btn");
const minusBtn = document.getElementById("minus-btn");
const productCount = document.getElementById("product-count");
const addToCartBtn = document.getElementById("add-to-cart-btn");
const warningText = document.getElementById("warning-text");

let count = 1;
let cart = {
  id: null,
  selectedSizeValue: null,
  selectedColorValue: null,
  count: count,
};

async function renderSingleProductData() {
  const response = await fetch(
    `${BASE_URL}/api/records/products${`?filterKey=id&filterValue=${productId}`}`,
    {
      headers: {
        api_key: API_KEY,
        Authorization: `Bearer ${ACCESS_TOKEN}`,
      },
    }
  );
  const resToJson = await response.json();
  const result = await resToJson.records[0];
  cart.id = await result.id;

  productImage.innerHTML = `
  <img src="${result.imageURL[0]}" alt="shoe" />
  `;

  productName.innerHTML = result.name;

  const sizes = await result.sizes;
  sizesBox.innerHTML = "";
  sizes.forEach((size) => {
    sizesBox.innerHTML += `
      <div class="size-option p-4 w-8 h-8 border-2 border-black rounded-full text-[#6b6b6c] flex justify-center items-center cursor-pointer">
        ${size}
      </div>
    `;
  });

  const colors = await result.colors;
  colorsBox.innerHTML = "";
  colors.forEach((color) => {
    colorsBox.innerHTML += `
      <button style="background-color: ${color};" class="color-option border-2 border-black flex items-center w-full px-4 py-4 rounded-full h-8 hover:bg-gray-500 cursor-pointer">
      </button>
    `;
  });

  const itemsLeft = await result.items_left;

  priceBar.innerHTML = `$${result.price}.00`;
  productCount.innerHTML = count;

  // plus the count
  plusBtn.addEventListener("click", () => {
    if (count < itemsLeft) {
      count++;
      productCount.innerHTML = count;
      cart.count = count; // Update the cart count
      console.log(cart);
    }
  });

  // minus the count
  minusBtn.addEventListener("click", () => {
    if (count > 1) {
      count--;
      productCount.innerHTML = count;
      cart.count = count; // Update the cart count
      console.log(cart);
    }
  });

  // Selecting size
  const selectedSize = document.querySelectorAll(".size-option");
  selectedSize.forEach((element) => {
    element.addEventListener("click", (e) => {
      selectedSize.forEach((el) => el.classList.remove("border-4"));
      e.currentTarget.classList.add("border-4");

      // Get the value of the selected size
      cart.selectedSizeValue = e.currentTarget.textContent.trim();
      console.log(cart.selectedSizeValue);

      // Log the updated cart
      console.log("Cart:", cart);
    });
  });

  // Selecting color
  const selectedColor = document.querySelectorAll(".color-option");
  selectedColor.forEach((element) => {
    element.addEventListener("click", (e) => {
      selectedColor.forEach((el) => el.classList.remove("border-4"));
      e.currentTarget.classList.add("border-4");

      // Get the value of the selected color
      cart.selectedColorValue = e.currentTarget.style.backgroundColor;
      console.log(cart.selectedColorValue);

      // Log the updated cart
      console.log("Cart:", cart);
    });
  });
  return cart;
}

renderSingleProductData();

async function postCart(cart) {
  const resData = await fetch(`${BASE_URL}/api/records/cart`, {
    method: "POST",
    headers: {
      api_key: API_KEY,
      Authorization: `Bearer ${ACCESS_TOKEN}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(cart), // Set the body of the request
  });
  const result = await resData.json(); // Call the json() method correctly
  if(result){
    window.location.href = "../Home/home.html";
  }
}

// Call the function with the cart object
addToCartBtn.addEventListener("click", () => {
  // Check if all necessary values are selected
  if (!cart.selectedSizeValue || !cart.selectedColorValue || !cart.count) {
    warningText.style.display = "flex";
  } else {
    postCart(cart);
  }
});
