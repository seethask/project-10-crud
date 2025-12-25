const API =
"https://script.google.com/macros/s/AKfycbwGNCV1cwBMzSJdjo8wQ861WqTM2JJp2a9yiGJ6A7l4jQosQtjTF5HFEnaCGqxWiBS0/exec";

/* SHOW PASSWORD */
function togglePassword() {
  const pass = document.getElementById("loginPass");
  pass.type = pass.type === "password" ? "text" : "password";
}

/* LOGIN */
function login() {
  const user = document.getElementById("loginUser").value;
  const pass = document.getElementById("loginPass").value;
  const msg = document.getElementById("msg");

  if (user === "admin" && pass === "admin123") {
    document.getElementById("loginBox").style.display = "none";
    document.getElementById("crudBox").style.display = "block";
    loadUsers();
  } else {
    msg.innerText = "❌ Invalid credentials";
  }
}

/* READ */
function loadUsers() {
  fetch(API + "?action=read")
    .then(res => res.json())
    .then(data => {
      let table = document.getElementById("userTable");
      table.innerHTML = `
        <tr>
          <th>Username</th>
          <th>Role</th>
          <th>Action</th>
        </tr>`;
      data.forEach(u => {
        table.innerHTML += `
          <tr>
            <td>${u.username}</td>
            <td>${u.role}</td>
            <td>
              <button onclick="editUser('${u.id}','${u.username}','${u.role}')">Edit</button>
              <button onclick="deleteUser('${u.id}')">Delete</button>
            </td>
          </tr>`;
      });
    });
}

/* CREATE */
function addUser() {
  fetch(API, {
    method: "POST",
    body: JSON.stringify({
      action: "create",
      username: document.getElementById("username").value,
      role: document.getElementById("role").value
    })
  }).then(loadUsers);
}

/* UPDATE */
function editUser(id, username, role) {
  const newUser = prompt("Username:", username);
  const newRole = prompt("Role:", role);

  fetch(API, {
    method: "POST",
    body: JSON.stringify({
      action: "update",
      id,
      username: newUser,
      role: newRole
    })
  }).then(loadUsers);
}

/* DELETE */
function deleteUser(id) {
  fetch(API, {
    method: "POST",
    body: JSON.stringify({
      action: "delete",
      id
    })
  }).then(loadUsers);
}
