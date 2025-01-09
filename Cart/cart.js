const BASE_URL = "http://api.alikooshesh.ir:3000";
const API_KEY =
  "ahmadreza-mohammadiDf4FntTt7eDYpjB1y6JrubLGirgncMnWPauJW8NTAyK7FvVX46U3oFl1eQUJCxKcs1KnEsp2nYuX90qx3G2DgUxXBkBSIqbu1gqNVGpKjB3DH";
const ACCESS_TOKEN =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3N2E1MTcyOWZkODZmZmFjMzE4OTdmZiIsImlhdCI6MTczNjQwNzQ0OSwiZXhwIjoxNzM2NTgwMjQ5fQ.eg_95HnQUzqfhW8LaXbe1m8o-mKIGdlkRXxupszuW9U";
const cartProducts = document.getElementById("cart-products-container");

async function renderCartProducts() {
  const response = await fetch(`${BASE_URL}/api/records/cart`, {
    headers: {
      api_key: API_KEY,
      Authorization: `Bearer ${ACCESS_TOKEN}`,
    },
  });
  const result = await response.json();
  const cartData = await result.records;
  console.log(cartData);

  cartData.forEach((product) => {
    cartProducts.innerHTML += `
     <div class="rounded-3xl p-5 flex gap-4 items-center">
          <div class="bg-[#f3f3f3] rounded-3xl">
            <img
              class="w-[142px] h-[142px]"
              src="${product.imageURL}"
              alt=""
            />
          </div>
          <div class="flex flex-col gap-5">
            <div class="w-56 flex justify-between">
              <span class="text-xl font-bold font-[inter] w-[180px]"
                >${product.name}</span
              >
              <span class="flex items-center">
                <img class="h-[20px]" src="../assets/svgs/recycle.svg" alt="" />
              </span>
            </div>
            <div class="flex items-center gap-3">
              <div  style="background-color:${product.selectedColorValue}" class=" w-5 h-5 rounded-full border-2 border-black"></div>
              <span ;" class="text-[#7b7a78]">${product.selectedColorValue}</span> |
              <span class="text-[#7b7a78]">Size = ${product.selectedSizeValue}</span>
            </div>
            <div class="flex justify-between items-center">
              <span class="font-bold text-xl font-[inter]">$${product.totalPrice}.00</span>
              <div
                class="bg-[#f3f3f3] p-1 w-24 rounded-3xl flex justify-between"
              >
                <button class="p-1">-</button>
                <span class="p-1">${product.count}</span>
                <button class="p-1">+</button>
              </div>
            </div>
          </div>
        </div>
    `;
  });
}

renderCartProducts();
