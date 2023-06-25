let userId;

function showUserModal(id) {
  userId = id;
  $("#userModal")
    .modal({
      backdrop: false,
      keyboard: false,
    })
    .modal("show");
}

function validateForm(formData) {
  const { username, email, password, repPassword } = formData;

  if (username === "") {
    showError("Username is required");
    return false;
  }

  if (email === "") {
    showError("Email is required");
    return false;
  }

  if (!/\S+@\S+\.\S+/.test(email)) {
    showError("Invalid email format");
    return false;
  }

  if (password === "" || repPassword === "") {
    showError("Password is required");
    return false;
  }

  if (password !== repPassword) {
    showError("Passwords do not match");
    return false;
  }

  return true;
}

function showError(message) {
  $("#alert-user-msg").text(message).removeClass("d-none");
}

$("#close-user-modal-btn").click(function () {
  $("#userModal").hide();
});

$("#submit-btn").on("click", function () {
  const userData = {
    id: parseInt(userId),
    username: $("#username").val(),
    email: $("#email").val(),
    password: $("#password").val(),
    repPassword: $("#rep-password").val(),
  };

  $("#alert-user-msg").addClass("d-none");

  if (!validateForm(userData)) {
    return;
  }
  delete userData.repPassword;
  updateProfile(userData);
});

function updateProfile(user) {
  $.post(
    "/users/profile",
    user,
    function () {
      window.location.reload();
    },
    "html"
  ).fail(function () {
    alert("modal update-item error");
  });
  $("#userModal").hide();
}
