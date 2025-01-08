const BASE_URL = "http://api.alikooshesh.ir:3000";
const API_KEY =
  "ahmadreza-mohammadiDf4FntTt7eDYpjB1y6JrubLGirgncMnWPauJW8NTAyK7FvVX46U3oFl1eQUJCxKcs1KnEsp2nYuX90qx3G2DgUxXBkBSIqbu1gqNVGpKjB3DH";
const ACCESS_TOKEN =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3N2E1MTcyOWZkODZmZmFjMzE4OTdmZiIsImlhdCI6MTczNjIzOTkxNiwiZXhwIjoxNzM2NDEyNzE2fQ.WyZSYBtufgzmJqlRTIgBl0dRLm9GR2Qwt7pBsMS83EM";

// import { ACCESS_TOKEN, API_KEY, BASE_URL } from "../Api/user-validation";


const brandHeader = document.getElementById("brand-name");
const params = new URLSearchParams(window.location.search);
const brandName = params.get("brand");

const filteredProductsSection = document.getElementById("filtered-section");

 async function getFilteredBrands(brandName) {
  const res = await fetch(
    `${BASE_URL}/api/records/products${
      brandName !== "ALL" ? `?filterKey=brand&filterValue=${brandName}` : ""
    }`,
    {
      headers: {
        api_key: API_KEY,
        Authorization: `Bearer ${ACCESS_TOKEN}`,
      },
    }
  );
  const result = await res.json();
  const filteredProducts = result.records;
  return filteredProducts;
}

 async function renderFilteredProducts(brand) {
  const filtered = await getFilteredBrands(brand);
  brandHeader.innerHTML = brandName
  filteredProductsSection.innerHTML = "";
  filtered.map((product) => {
    filteredProductsSection.innerHTML += `
       
         <div class="w-[182px] h-[244px]">
          <div
            class="w-[182px] h-[182px] bg-[#f3f3f3] flex justify-center items-center rounded-[24px]"
          >
            <img
              class="w-[142px] h-[142px]"
              src="${product.imageURL}"
              alt=""
            />
          </div>
          <div class="mt-[12px] flex flex-col gap-[8px]">
            <span class="font-[inter] text-[20px] font-[700]"
              >${product.name}</span
            >
            <span class="font-[inter] text-[16px] font-[600]">$${product.price}.00</span>
          </div>
        </div>
        `;
  });
}

renderFilteredProducts(brandName);
