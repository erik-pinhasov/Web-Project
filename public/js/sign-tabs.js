function updateUrl(str) {
  window.history.pushState(str, str.toUpperCase(), str);
  replacePlaces(str);
}

function replacePlaces(str) {
  var main = document.getElementById("main-container");
  var content = main.querySelector(".content");
  var img = main.querySelector(".img");
  var welcome = main.querySelector("#welcome-text");

  if (str === "signin") {
    welcome.textContent = "Welcome Back";
    img.classList.remove("right");
    main.insertBefore(img, content);
  } else {
    welcome.textContent = "Let's Get Started";
    img.classList.add("right");
    main.insertBefore(content, img);
  }
  $(".alert").addClass("d-none");
}

function showError(message) {
  $(".alert").text(`${message}`);
  $(".alert").removeClass("d-none");
}

// Validate password matching
function validateForm() {
  var result =
    $("#PasswordInputSignup").val() === $("#RePasswordInputSignup").val();
  if (result == false) {
    showError("passwords must match.");
  }
  return result;
}
$("#signin-form").submit(function (event) {
  event.preventDefault();
  $.post("/users/signin", $(this).serialize(), function () {
    location.href = "/";
  }).fail(function () {
    showError("Username/email or Password are wrong.");
  });
});

$("#signup-form").submit(function (event) {
  event.preventDefault();
  if (!validateForm()) return;
  $.post("/users/signup", $(this).serialize(), function () {
    location.href = "/";
  }).fail(function () {
    showError("Username/email allready existed.");
    return;
  });
});
