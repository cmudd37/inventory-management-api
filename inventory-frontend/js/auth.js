function switchTab(tab) {
    ["login", "register"].forEach(t => {
        document.getElementById(`tab-${t}`).classList.toggle("active", t === tab);
        document.getElementById(`panel-${t}`).classList.toggle("active", t === tab);
    });
}

function setStatus(loggedIn) {
    const dot = document.getElementById("statusDot");
    const status = document.getElementById("status");
    if (loggedIn) {
        dot.classList.add("active");
        const role = getRoleFromToken();
        status.textContent = role === "ROLE_ADMIN" ? "Signed in · Admin" : "Signed in";
    } else {
        dot.classList.remove("active");
        status.textContent = "Not signed in";
    }
}

async function register() {
    const username = document.getElementById("reg-username").value.trim();
    const password = document.getElementById("reg-password").value.trim();
    if (!username || !password) { showToast("Please fill in all fields", "error"); return; }

    try {
        const res = await fetch(`${BASE_URL}/auth/register`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username, password })
        });

        if (res.ok) {
            showToast("Account created — you can now sign in");
            document.getElementById("reg-username").value = "";
            document.getElementById("reg-password").value = "";
            switchTab("login");
        } else {
            const text = await res.text();
            showToast(text || "Registration failed", "error");
        }
    } catch (e) {
        showToast("Registration failed", "error");
    }
}

async function login() {
    try {
        const res = await fetch(`${BASE_URL}/auth/login`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                username: document.getElementById("username").value,
                password: document.getElementById("password").value
            })
        });

        const data = await res.json();

        if (data.token) {
            token = data.token;
            localStorage.setItem("token", token);
            setStatus(true);
            updateUIForRole();
            await loadCategories();
            getProducts();
            showToast("Signed in successfully");
        } else {
            showToast("Invalid credentials", "error");
        }
    } catch (e) {
        showToast("Login failed", "error");
    }
}

function logout() {
    localStorage.removeItem("token");
    token = "";
    allCategories = [];
    setStatus(false);
    document.getElementById("products").innerHTML =
        `<div class="empty-state"><span>📦</span>Sign in and load products to get started</div>`;
    document.getElementById("productCount").textContent = "0 items";
    document.getElementById("adminControls").style.display = "none";
    showToast("Signed out");
}
