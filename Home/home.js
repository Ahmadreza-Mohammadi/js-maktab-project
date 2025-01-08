
const productsList = document.getElementById("products-list");
const brandsContainer = document.getElementById("brands-container");
const brands = [
  {
    name: "NIKE",
    imageURL: "../assets/imgs/051f30ca9c315b1ae177ad95b1079488.png",
  },
  {
    name: "ADIDAS",
    imageURL: "../assets/imgs/adidas.png",
  },
  {
    name: "PUMA",
    imageURL: "../assets/imgs/puma.png",
  },
  {
    name: "ASICS",
    imageURL: "../assets/imgs/asics.png",
  },
  {
    name: "REEBOK",
    imageURL: "../assets/imgs/reebok.png",
  },
  {
    name: "NEW BALANCE",
    imageURL: "../assets/imgs/newB.png",
  },
  {
    name: "CONVERSE",
    imageURL: "../assets/imgs/converse.png",
  },
  {
    name: "MORE",
    imageURL: "../assets/imgs/more.png",
  },
];
 const BASE_URL = "http://api.alikooshesh.ir:3000";
 const API_KEY =
  "ahmadreza-mohammadiDf4FntTt7eDYpjB1y6JrubLGirgncMnWPauJW8NTAyK7FvVX46U3oFl1eQUJCxKcs1KnEsp2nYuX90qx3G2DgUxXBkBSIqbu1gqNVGpKjB3DH";
 const ACCESS_TOKEN =
"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3N2E1MTcyOWZkODZmZmFjMzE4OTdmZiIsImlhdCI6MTczNjMxNzE3OSwiZXhwIjoxNzM2NDg5OTc5fQ.diochWTWo5pOCjvn0Exirouka-2VXh5bopw041_oXsE"


function renderHomeBrands() {
  brands.forEach((brand) => {
    brandsContainer.innerHTML += `
     
        <a href= "../Filtered/filtered.html?brand=${brand.name}" >
          <div
            
            class="w-[60px] h-[91px] flex flex-col items-center gap-[13px]"
            >
            <div
              class="w-[60px] h-[60px] bg-[#ececec] flex justify-center items-center rounded-full hover: cursor-pointer"
            >
              <img
                class="w-[30px] h-[19px]"
                src="${brand.imageURL}"
                alt=""
              />
            </div>
            <span class="brands">${brand.name}</span>
          </div>
        </a>
                          
    `;
  });
}

async function getHomeProducts() {
  try {
    const response = await fetch(`${BASE_URL}/api/records/products`, {
      headers: {
        api_key: API_KEY,
        Authorization: `Bearer ${ACCESS_TOKEN}`,
      },
    });

    if (!response.ok) {
      throw new Error("Network response was not ok " + response.statusText);
    }

    const result = await response.json();
    const productsArray = result.records;
    // console.log(productsArray);

    productsArray.forEach((product) => {
      console.log(product);
      productsList.innerHTML += `
          <a href="../Single-product/single-product.html?${product}" class="w-[182px] h-[244px]">
          <div
            class="w-[182px] h-[182px] bg-[#f3f3f3] flex justify-center items-center rounded-[24px]"
          >
            <img
              class="w-[142px] h-[142px]"
              src="${product.imageURL[0]}"
              alt=""
            />
          </div>
          <div class="mt-[12px] flex flex-col gap-[8px]">
            <span id="text-wrapper" class="font-[inter] text-[20px] font-[700]"
              >${product.name}</span
            >
            <span class="font-[inter] text-[16px] font-[600]"
              >$${product.price}.00</span
            >
          </div>
        </a>
      `;
    });
  } catch (error) {
    console.error("Error:", error);
  }
}

   getHomeProducts();
  //  getFilteredBrands("ASICS");
   renderHomeBrands();



