$(document).ready(function () {
  // Function to handle navigation scroll behavior
  function handleNavScroll() {
    if ($(window).scrollTop() < 5) {
      $("nav").css({
        "box-shadow": "none",
        "background-color": "transparent",
      });
    } else {
      $("nav").css({
        "box-shadow": "0 5px 5px rgba(0, 0, 0, 0.2)",
        "background-color": "white",
      });
    }
  }
  // Check scroll position on page load
  handleNavScroll();

  // Scroll behavior for navigation
  $(window).scroll(function () {
    handleNavScroll();
  });

  // Modal padding adjustment
  $("#exampleModalCenter").on("show.bs.modal", function () {
    $("nav").css("padding-right", "1rem");
  });

  $("#exampleModalCenter").on("hidden.bs.modal", function () {
    $("nav, body").css("padding-right", "0");
  });

  // Handle placeholder behavior
  function handlePlaceholder(input, placeholder) {
    function checkInputValue() {
      if ($(input).val() !== "") {
        $(placeholder).addClass("active");
      } else {
        $(placeholder).removeClass("active");
      }
    }

    checkInputValue();

    $(input).on("focus", function () {
      $(placeholder).addClass("active");
    });

    $(input).on("blur", function () {
      checkInputValue();
    });
  }

  handlePlaceholder("#email", "#emailPlaceholder");
  handlePlaceholder("#firstName", "#firstNamePlaceholder");
  handlePlaceholder("#lastName", "#lastNamePlaceholder");

  // Form submission handling with Axios
  $(".contactUsForm").on("submit", function (event) {
    event.preventDefault();

    const formData = {
      email: $("#email").val(),
      firstName: $("#firstName").val(),
      lastName: $("#lastName").val(),
      termsCheckbox: $("#termsCheckbox").is(":checked"),
    };

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
          confirmButtonText: "OK",
        });
      })
      .catch((error) => {
        console.error("Error submitting form data:", error);
        Swal.fire({
          title: "Error!",
          text: "Something went wrong. Please try again later.",
          icon: "error",
          confirmButtonText: "OK",
        });
      });
  });

  // Function to handle dot click
  const carousel = $(".carousel");
  const dots = $(".dot");
  let currentIndex = 0;

  dots.on("click", function () {
    dots.removeClass("active");
    $(this).addClass("active");
    currentIndex = $(this).index();
    const imgWidth = carousel.find("img").first().width() + 14;
    const scrollAmount = currentIndex * imgWidth * 3;
    carousel.scrollLeft(scrollAmount);
  });

  function autoScroll() {
    currentIndex = (currentIndex + 1) % dots.length;
    dots.eq(currentIndex).click();
  }

  setInterval(autoScroll, 4000);

  let currentIndex2 = 0;
  const images = $(".image-container img");
  const totalImages = images.length;
  const lines = $(".line");

  function showImage(index) {
    images.hide();
    $(images[index]).show();
    lines.removeClass("active");
    $(lines[index]).addClass("active");
  }

  function nextImage() {
    currentIndex2 = (currentIndex2 + 1) % totalImages;
    showImage(currentIndex2);
  }

  lines.click(function () {
    lines.removeClass("active");
    $(this).addClass("active");
    const target = $(this).data("target");
    images.hide();
    $(target).show();
    currentIndex2 = images.index($(target));
  });

  setInterval(nextImage, 2000);
  showImage(currentIndex2);
});
