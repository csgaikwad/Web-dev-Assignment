$(document).ready(function () {
  // Function to handle placeholder behavior
  function handlePlaceholder(input, placeholder) {
    // Function to check input value and update placeholder class
    function checkInputValue() {
      if ($(input).val() !== "") {
        $(placeholder).addClass("active");
      } else {
        $(placeholder).removeClass("active");
      }
    }

    // Check input value on page load
    checkInputValue();

    // Add event listener for input focus
    $(input).on("focus", function () {
      $(placeholder).addClass("active");
    });

    // Add event listener for input blur (when focus is lost)
    $(input).on("blur", function () {
      checkInputValue();
    });
  }

  // Call the function for each input
  handlePlaceholder("#email", "#emailPlaceholder");
  handlePlaceholder("#firstName", "#firstNamePlaceholder");
  handlePlaceholder("#lastName", "#lastNamePlaceholder");

  // Scroll behavior for navigation
  $(window).scroll(function () {
    if ($(this).scrollTop() > 5) {
      $("nav").css({
        "box-shadow": "0 5px 5px rgba(0, 0, 0, 0.2)",
        "background-color": "white",
      });
    } else {
      $("nav").css({
        "box-shadow": "none",
        "background-color": "transparent",
      });
    }
  });

  // Modal padding adjustment
  $("#exampleModalCenter").on("show.bs.modal", function () {
    $("nav").css("padding-right", "1rem");
  });

  $("#exampleModalCenter").on("hidden.bs.modal", function () {
    $("nav, body").css("padding-right", "0");
  });

  // Form submission handling with Axios
  $(".contactUsForm").on("submit", function (event) {
    event.preventDefault();

    const formData = {
      email: $("#email").val(),
      firstName: $("#firstName").val(),
      lastName: $("#lastName").val(),
      termsCheckbox: $("#termsCheckbox").is(":checked"),
    };
    // console.log(formData);

    // Make POST request with Axios
    axios
      .post("https://getform.io/f/aejyjzob", formData)
      .then((response) => {
        console.log("Form data submitted successfully:");
        $(".contactUsForm")[0].reset();
        $("#exampleModalCenter").modal("hide"); // Hide the modal
        Swal.fire({
          title: "Success!",
          text: "Form submitted successfully.",
          icon: "success",
          confirmButtonText: "OK"
        });
      })
      .catch((error) => {
        console.error("Error submitting form data:", error);
        Swal.fire({
          title: "Error!",
          text: "Something went wrong. Please try again later.",
          icon: "error",
          confirmButtonText: "OK"
        });
      });
  });
});
