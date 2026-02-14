// Fake Database
var users = [];
// CREATE
function addUser() {
var username = document.getElementById("username").value;
var role = document.getElementById("role").value;
if (!username || !role) {
alert("All fields required");
return;
}
users.push({ username: username, role: role });
renderUsers();
document.getElementById("username").value = "";
document.getElementById("role").value = "";
}
// READ
function renderUsers() {
var list = document.getElementById("userList");
list.innerHTML = "";
users.forEach(function (user, index) {
var item = document.createElement("li");
item.innerHTML =
user.username + " (" + user.role + ") " +
"<button onclick='editUser(" + index + ")'>Edit</button> "
+
"<button onclick='deleteUser(" + index +
")'>Delete</button>";
list.appendChild(item);
});
}
// UPDATE
function editUser(index) {
var newRole = prompt("Enter new role", users[index].role);
if (newRole) {
users[index].role = newRole;
renderUsers();
}
}
// DELETE
function deleteUser(index) {
users.splice(index, 1);
renderUsers();
}
