const singleProduct = document.getElementById("single-product");

const BASE_URL = "http://api.alikooshesh.ir:3000";
const API_KEY =
  "ahmadreza-mohammadiDf4FntTt7eDYpjB1y6JrubLGirgncMnWPauJW8NTAyK7FvVX46U3oFl1eQUJCxKcs1KnEsp2nYuX90qx3G2DgUxXBkBSIqbu1gqNVGpKjB3DH";
const ACCESS_TOKEN =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3N2E1MTcyOWZkODZmZmFjMzE4OTdmZiIsImlhdCI6MTczNjMxNzE3OSwiZXhwIjoxNzM2NDg5OTc5fQ.diochWTWo5pOCjvn0Exirouka-2VXh5bopw041_oXsE";



async function getSingleProductData() {
  const response = await fetch(`${BASE_URL}/api/records/products/${id}`, {
    headers: {
      api_key: API_KEY,
      Authorization: `Bearer ${ACCESS_TOKEN}`,
    },
  });
  const result = await response.json();
  console.log(result);
}

getSingleProductData();
