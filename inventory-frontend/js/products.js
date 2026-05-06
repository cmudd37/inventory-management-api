async function getProducts(query = "") {
    const list = document.getElementById("products");
    list.innerHTML = `<div class="empty-state"><span>⏳</span>Loading products...</div>`;

    const url = query
        ? `${BASE_URL}/products?name=${encodeURIComponent(query)}`
        : `${BASE_URL}/products`;

    const res = await fetch(url, {
        headers: { "Authorization": "Bearer " + token }
    });

    if (res.status === 401 || res.status === 403) {
        logout();
        showToast("Session expired. Please sign in again.", "error");
        return;
    }

    const data = await res.json();
    renderProducts(data);
}

function handleSearch(val) {
    clearTimeout(searchTimeout);
    searchTimeout = setTimeout(() => getProducts(val.trim()), 350);
}

function renderProducts(data) {
    const list = document.getElementById("products");
    const role = getRoleFromToken();

    document.getElementById("productCount").textContent =
        `${data.length} item${data.length !== 1 ? "s" : ""}`;

    if (data.length === 0) {
        list.innerHTML = `<div class="empty-state"><span>📦</span>No products found</div>`;
        return;
    }

    list.innerHTML = "";
    data.forEach(p => {
        const li = document.createElement("li");
        li.className = "product-item";
        li.id = `product-${p.id}`;

        const adminButtons = role === "ROLE_ADMIN" ? `
            <button class="btn-warning" onclick="toggleEdit(${p.id})">Edit</button>
            <button class="btn-danger" onclick="deleteProduct(${p.id})">Delete</button>
        ` : `<div></div><div></div>`;

        const categoryOptions = allCategories.map(c =>
            `<option value="${c.id}" ${c.id === p.categoryId ? "selected" : ""}>${c.name}</option>`
        ).join("");

        li.innerHTML = `
            <div class="product-row">
                <div>
                    <div class="product-name">${p.name}</div>
                    <div class="product-id">#${p.id}</div>
                </div>
                <span class="product-category">${p.categoryName || "Uncategorized"}</span>
                <div class="product-meta product-price">${formatCurrency(p.price)}</div>
                <div class="product-meta product-qty">Qty: ${p.quantity}</div>
                ${adminButtons}
            </div>
            <div class="edit-panel" id="edit-${p.id}">
                <div class="form-group">
                    <label class="form-label">Name</label>
                    <input id="edit-name-${p.id}" value="${p.name.replace(/"/g, '&quot;')}">
                </div>
                <div class="form-group">
                    <label class="form-label">Price</label>
                    <input id="edit-price-${p.id}" type="number" step="0.01" value="${p.price}">
                </div>
                <div class="form-group">
                    <label class="form-label">Quantity</label>
                    <input id="edit-qty-${p.id}" type="number" value="${p.quantity}">
                </div>
                <div class="form-group">
                    <label class="form-label">Category</label>
                    <select id="edit-cat-${p.id}">${categoryOptions}</select>
                </div>
                <div style="display:flex;gap:0.5rem;">
                    <button class="btn-success" onclick="updateProduct(${p.id})">Save</button>
                    <button class="btn-secondary" style="padding:0.35rem 0.75rem;font-size:0.78rem;" onclick="toggleEdit(${p.id})">Cancel</button>
                </div>
            </div>
        `;
        list.appendChild(li);
    });
}

function toggleEdit(id) {
    document.getElementById(`edit-${id}`).classList.toggle("open");
}

async function createProduct() {
    const catId = document.getElementById("categoryId").value;
    if (!catId) { showToast("Please select a category", "error"); return; }

    const res = await fetch(`${BASE_URL}/products`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + token
        },
        body: JSON.stringify({
            name: document.getElementById("name").value,
            price: parseFloat(document.getElementById("price").value),
            quantity: parseInt(document.getElementById("quantity").value),
            categoryId: parseInt(catId)
        })
    });

    if (res.ok) {
        showToast("Product created");
        ["name", "price", "quantity"].forEach(id => document.getElementById(id).value = "");
        document.getElementById("categoryId").value = "";
        getProducts();
    } else {
        showToast("Failed to create product", "error");
    }
}

async function updateProduct(id) {
    const res = await fetch(`${BASE_URL}/products/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + token
        },
        body: JSON.stringify({
            name: document.getElementById(`edit-name-${id}`).value,
            price: parseFloat(document.getElementById(`edit-price-${id}`).value),
            quantity: parseInt(document.getElementById(`edit-qty-${id}`).value)
        })
    });

    if (res.ok) {
        showToast("Product updated");
        getProducts();
    } else {
        showToast("Update failed", "error");
    }
}

async function deleteProduct(id) {
    if (!confirm("Delete this product?")) return;

    const res = await fetch(`${BASE_URL}/products/${id}`, {
        method: "DELETE",
        headers: { "Authorization": "Bearer " + token }
    });

    if (res.ok) {
        showToast("Product deleted");
        getProducts();
    } else {
        showToast("Delete failed", "error");
    }
}
