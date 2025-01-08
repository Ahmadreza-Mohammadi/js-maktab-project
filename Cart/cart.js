const BASE_URL = "http://api.alikooshesh.ir:3000";
const API_KEY =
  "ahmadreza-mohammadiDf4FntTt7eDYpjB1y6JrubLGirgncMnWPauJW8NTAyK7FvVX46U3oFl1eQUJCxKcs1KnEsp2nYuX90qx3G2DgUxXBkBSIqbu1gqNVGpKjB3DH";
const ACCESS_TOKEN =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3N2E1MTcyOWZkODZmZmFjMzE4OTdmZiIsImlhdCI6MTczNjMxNzE3OSwiZXhwIjoxNzM2NDg5OTc5fQ.diochWTWo5pOCjvn0Exirouka-2VXh5bopw041_oXsE";

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

  cartData.forEach(product => {
    cartProducts.innerHTML += `
      <div class="rounded-3xl p-5 flex gap-4 items-center">
        <div class="bg-[#f3f3f3] rounded-3xl">
          <img
            class="w-[142px] h-[142px]"
            src="${product.imageURL || '../assets/imgs/shoe.png'}"
            alt="${product.name || 'Product Image'}"
          />
        </div>
        <div class="flex flex-col gap-5">
          <div class="w-56 flex justify-between">
            <span class="text-xl font-bold font-[inter]">${product.name}</span>
            <span class="flex items-center">
              <img class="h-5" src="../assets/svgs/recycle.svg" alt="Recycle Icon" />
            </span>
          </div>
          <div class="flex items-center gap-3">
            <div class="bg-black w-5 h-5 rounded-full" style="background-color: ${product.color || 'black'}"></div>
            <span class="text-${product.SelectedColorValue}-500"></span> |
            <span class="text-[#7b7a78]">Size = ${product.size || 'N/A'}</span>
          </div>
          <div class="flex justify-between items-center">
            <span class="font-bold text-xl font-[inter]">$${product.price || 'N/A'}</span>
            <div class="bg-[#f3f3f3] p-1 w-24 rounded-3xl flex justify-between">
              <span class="p-1">-</span>
              <span class="p-1">${product.quantity || '1'}</span>
              <span class="p-1">+</span>
            </div>
          </div>
        </div>
      </div>
    `;
  });
}

renderCartProducts();
