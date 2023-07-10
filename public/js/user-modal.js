// Bootstrap modal for editing user details

let userId;

// Reset the modal inputs
function resetModal() {
  $("#password").val("");
  $("#repeatPassword").val("");
  $("#changePasswordCheckbox").prop("checked", false);
  $("#passwordSection").hide();
  $("#alert-user-msg").addClass("d-none");
}

// Show modal with user details
function showUserModal(id) {
  userId = id;
  resetModal();
  $("#userModal")
    .modal({
      backdrop: false,
      keyboard: false,
    })
    .modal("show");
}

// Show/hide password change option when clicking the radio button
$(document).ready(function () {
  $("#changePasswordCheckbox").change(function () {
    if ($(this).is(":checked")) {
      $("#passwordSection").show();
    } else {
      $("#passwordSection").hide();
    }
  });
});

// Validate the modal input fields
function validateForm(formData) {
  const { username, email, password, repPassword } = formData;

  if (username === "") {
    showMsg("Username is required", 0);
    return false;
  }

  if (email === "") {
    showMsg("Email is required", 0);
    return false;
  }

  if (!/\S+@\S+\.\S+/.test(email)) {
    showMsg("Invalid email format", 0);
    return false;
  }

  if (!$("#changePasswordCheckbox").is(":checked")) {
    showMsg("Profile edited successfully", 1);
    return true;
  }

  if (password === "" || repPassword === "") {
    showMsg("Password is required", 0);
    return false;
  }

  if (password !== repPassword) {
    showMsg("Passwords do not match", 0);
    return false;
  }

  return true;
}

// Place a message in the modal when error occurs
function showMsg(message) {
  $("#alert-user-msg").text(message).removeClass("d-none");
}

$("#close-user-modal-btn").click(resetModal());

// Update user details by sending post request
function updateProfile(user) {
  $.post(
    "/users/profile",
    user,
    function () {
      showMsg("Profile edited successfully", 1);
    },
    "html"
  ).fail(function () {
    showMsg("Profile editing failed", 0);
  });
  setTimeout(function () {
    resetModal();
    window.location.reload();
  }, 1000);
}

// Message color is green when editing success, otherwise changes to red
function showMsg(message, isSuccess) {
  const alertElement = $("#alert-user-msg");
  if (isSuccess) {
    alertElement[0].style.color = "#155724";
    alertElement[0].style.backgroundColor = "#d4edda";
  } else {
    alertElement[0].style.color = "#721c24";
    alertElement[0].style.backgroundColor = "#f8d7da";
  }
  alertElement.text(message).removeClass("d-none");
}

// Submiting user details change
$("#submit-btn").on("click", function () {
  const userData = {
    id: parseInt(userId),
    username: $("#username").val(),
    email: $("#email").val(),
    password: $("#password").val(),
    repPassword: $("#repeatPassword").val(),
  };

  $("#alert-user-msg").addClass("d-none");

  if (!validateForm(userData)) {
    return;
  }
  $("#alert-user-msg").addClass("d-none");
  updateProfile(userData);
});
