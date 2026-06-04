console.log("Products frontend javascript file");

$(function () {
  $(".product-collection").on("change", () => {
    const selectedValue = $(".product-collection").val();
    if (selectedValue === "STANDART") {
      $("#product-collection").hide()
      $("#product-volume").show();
    } else {
      $("#product-volume").hide();
      $("#product-collection").show();
    }
  });

  $("#process-btn").on("click", () => {
    $(".dish-container").slideToggle(500);
    $("#process-btn").css("display", "none");
  })

  $("#cancel-btn").on("click", () => {
    $(".dish-container").slideToggle(100);
    $("#process-btn").css("display", "flex");
  });

  $(".new-product-status").on("change", async function(e) {
    const id = e.target.id,
      CourseStatus = $(`#${id}.new-product-status`).val();

    try{
      const response = await axios.post(`/admin/course/${id}`, {courseStatus: CourseStatus});
      console.log("response:", response);
      const result = response.data;
      if(result.data) {
        console.log("Product updated!");
        $(".new-product-status").blur();
      } else alert("Product update failed!");
    } catch(err) {
      console.log(err);
      alert("Product update failed!");
    }
  })
});

function validateSignupForm() {
  const courseName = $(".product-name").val(),
    coursePrice = $(".product-price").val(),
    courseLeftCount = $(".product-left-count").val(),
    CourseCollection = $(".product-collection").val(),
    courseDesc = $(".product-desc").val(),
    courseStatus = $(".product-status").val();

  if(courseName === "" ||
     coursePrice === "" ||
     courseLeftCount === "" ||
     CourseCollection === "" ||
     courseDesc === "" ||
     courseStatus === ""
    ) {
      alert("Please insert all details!");
      return false;
    } else return true;
  }
  
  function previewFileHandler(input, order) {
    const imgClassName = input.className;
    console.log("input:", input);
    
    const file = $(`.${imgClassName}`).get(0).files[0],
      fileType = file["type"],
      validImageType = ["image/jpg", "image/jpeg", "image/png"];
 
    if(!validImageType.includes(fileType)) {
        alert("Please insert only jpg, jpeg, png!");
    } else {
      if(file) {
        const reader = new FileReader();
        reader.onload = function() {
          $(`#image-section-${order}`).attr("src", reader.result);
        };
        reader.readAsDataURL(file);
      }
    }
  }