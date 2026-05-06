async function loadCategories() {
    try {
        const res = await fetch(`${BASE_URL}/categories`, {
            headers: { "Authorization": "Bearer " + token }
        });
        if (!res.ok) return;

        allCategories = await res.json();

        const select = document.getElementById("categoryId");
        select.innerHTML = `<option value="">Select category...</option>`;
        allCategories.forEach(c => {
            const opt = document.createElement("option");
            opt.value = c.id;
            opt.textContent = c.name;
            select.appendChild(opt);
        });
    } catch (e) { /* silent */ }
}
