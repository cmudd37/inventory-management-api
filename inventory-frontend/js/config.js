const BASE_URL = "https://inventory-management-api-4lge.onrender.com";

let token = localStorage.getItem("token") || "";
let allCategories = [];
let searchTimeout = null;
