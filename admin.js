document.addEventListener("DOMContentLoaded", () => {
    const userForm = document.getElementById("user-form");
    const usernameInput = document.getElementById("username");
    const emailInput = document.getElementById("email");
    const userList = document.getElementById("user-list");
    const searchInput = document.getElementById("search");
    const clearFieldsButton = document.getElementById("clear-fields");
    const clearAllButton = document.getElementById("clear-all");

    function loadUsers() {
        const users = JSON.parse(localStorage.getItem("users")) || [];
        userList.innerHTML = "";
        users.forEach(user => addUserToList(user));
    }

    function addUserToList(user) {
        const li = document.createElement("li");
        li.innerHTML = `${user.date} - ${user.name} (${user.email}) <button class='delete'>Excluir</button>`;
        userList.appendChild(li);

        li.querySelector(".delete").addEventListener("click", () => {
            deleteUser(user.email);
        });

        const button = li.querySelector(".delete");
        button.style.color = "#fff";
        button.style.backgroundColor = "#34a853";
        button.style.padding = "15px 20px";
        button.style.borderRadius = "12px";
        button.style.border = "1px solid rgb(240, 240, 240)";
        button.style.cursor = "pointer";
    }

    function saveUser(user) {
        let users = JSON.parse(localStorage.getItem("users")) || [];
        users.push(user);
        localStorage.setItem("users", JSON.stringify(users));
        addUserToList(user);
    }

    function deleteUser(email) {
        let users = JSON.parse(localStorage.getItem("users")) || [];
        users = users.filter(user => user.email !== email);
        localStorage.setItem("users", JSON.stringify(users));
        loadUsers();
    }

    function clearAllUsers() {
        localStorage.removeItem("users");
        loadUsers();
    }

    function searchUsers(query) {
        let users = JSON.parse(localStorage.getItem("users")) || [];
        userList.innerHTML = "";
        users.filter(user => user.name.includes(query) || user.email.includes(query))
            .forEach(user => addUserToList(user));
    }

    userForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const user = {
            name: usernameInput.value,
            email: emailInput.value,
            date: new Date().toLocaleString()
        };
        saveUser(user);
        usernameInput.value = "";
        emailInput.value = "";
    });

    clearFieldsButton.addEventListener("click", () => {
        usernameInput.value = "";
        emailInput.value = "";
    });

    clearAllButton.addEventListener("click", clearAllUsers);

    searchInput.addEventListener("input", (e) => {
        searchUsers(e.target.value);
    });

    loadUsers();
});
