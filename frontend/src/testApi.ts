import api from "./lib/api";

export const testProductsApi = async () => {
  try {
    const res = await api.get("/products");
    console.log("PRODUCT API SUCCESS:", res.data);
  } catch (err: any) {
    console.error("PRODUCT API ERROR:", err.message);
  }
};
