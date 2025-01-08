import { BASE_URL } from "./home.js";
import { API_KEY } from "./home.js";
import { ACCESS_TOKEN } from "./home.js";

// getProducts All && Filter
export async function getProductsList(brand) {
  try {
    const response = await fetch(
      `${BASE_URL}/api/records/products${
        brand !== "ALL" ? `?filterKey=brand&filterValue=${brand}` : ""
      }`,
      {
        method: "GET",
        headers: {
          api_key: API_KEY,
          Authorization: `Bearer ${ACCESS_TOKEN}`,
        },
      }
    );
    console.log(response);

    if (!response.ok) {
      window.location.href = "../Login/login.html";
      throw new Error("has error");
    }
    const result = await response.json();

    return result;
  } catch (error) {}
}
