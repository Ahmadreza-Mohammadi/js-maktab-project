const productsList = document.getElementById("products-list")

export const BASE_URL = "http://api.alikooshesh.ir:3000";
export const API_KEY = "ahmadreza-mohammadiDf4FntTt7eDYpjB1y6JrubLGirgncMnWPauJW8NTAyK7FvVX46U3oFl1eQUJCxKcs1KnEsp2nYuX90qx3G2DgUxXBkBSIqbu1gqNVGpKjB3DH";
export const ACCESS_TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3N2E1MTcyOWZkODZmZmFjMzE4OTdmZiIsImlhdCI6MTczNjA3MDg5NiwiZXhwIjoxNzM2MjQzNjk2fQ.SLdHUUoxBncJpZVflZUgbxFfJEHyv0GG8s1SsjaK3B8";

async function getProducts() {
  try {
    const response = await fetch(`${BASE_URL}/api/records/products`, {
      headers: {
        "api_key": API_KEY,
        "Authorization": `Bearer ${ACCESS_TOKEN}`,
      },
    });
    
    if (!response.ok) {
      throw new Error('Network response was not ok ' + response.statusText);
    }

    const result = await response.json();
    const productsArray = result.records;

    productsArray.forEach((product) => {
      productsList.innerHTML += `
          <div class="w-[182px] h-[244px]">
          <div
            class="w-[182px] h-[182px] bg-[#f3f3f3] flex justify-center items-center rounded-[24px]"
          >
            <img
              class="w-[142px] h-[142px]"
              src=${product.imageURL}
              alt=""
            />
          </div>
          <div class="mt-[12px] flex flex-col gap-[8px]">
            <span id = "test" class="font-[inter] text-[20px] font-[700]"
              >${product.name}</span
            >
            <span class="font-[inter] text-[16px] font-[600]">$${product.price}.00</span>
          </div>
        </div> 
      `
    });

  } catch (error) {
    console.error("Error:", error);
  }
}

getProducts();


