function showToast(msg, type = "success") {
    const toast = document.getElementById("toast");
    toast.textContent = msg;
    toast.className = `show ${type}`;
    setTimeout(() => toast.className = "", 3000);
}

function formatCurrency(value) {
    return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD"
    }).format(value);
}

function getRoleFromToken() {
    if (!token) return null;
    const payload = JSON.parse(atob(token.split('.')[1]));
    return payload.role;
}

function updateUIForRole() {
    const role = getRoleFromToken();
    document.getElementById("adminControls").style.display =
        role === "ROLE_ADMIN" ? "block" : "none";
}
