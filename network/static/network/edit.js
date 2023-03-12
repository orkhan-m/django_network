document.addEventListener("DOMContentLoaded", function () {
  const allEditBtns = document.querySelectorAll(".btn-edit-content");
  const allSaveForms = document.querySelectorAll(".btn-save-edit-form");
  const allSaveBtns = document.querySelectorAll(".btn-save-edit");
  const allCancelBtns = document.querySelectorAll(".btn-cancel-edit");

  function edit_button(event) {
    event.preventDefault();
    const postDiv = this.closest(".individual-post");
    const paragraph = postDiv.querySelector(".post-text");
    const paragraphbg = postDiv.querySelector(".individual-post-content");
    paragraph.contentEditable = true;

    paragraphbg.style.backgroundColor = "#dad0b0";

    postDiv.querySelector(".btn-edit-content").style.display = "none";
    postDiv.querySelector(".btn-save-edit").style.display = "block";
    postDiv.querySelector(".btn-save-edit-form").style.display = "block";
    postDiv.querySelector(".btn-cancel-edit").style.display = "block";
  }

  function cancel_button(event) {
    event.preventDefault();
    const postDiv = this.closest(".individual-post");
    const paragraph = postDiv.querySelector(".post-text");
    const paragraphbg = postDiv.querySelector(".individual-post-content");
    paragraph.contentEditable = false;

    paragraphbg.style.backgroundColor = "#F9F5E7";

    postDiv.querySelector(".btn-edit-content").style.display = "block";
    postDiv.querySelector(".btn-save-edit").style.display = "none";
    postDiv.querySelector(".btn-save-edit-form").style.display = "none";
    postDiv.querySelector(".btn-cancel-edit").style.display = "none";
  }

  // function save_button(event) {
  //   event.preventDefault();
  //   const postDiv = this.closest(".individual-post");
  //   const paragraph = postDiv.querySelector(".post-text");
  //   const paragraphbg = postDiv.querySelector(".individual-post-content");
  //   paragraph.contentEditable = false;

  //   paragraphbg.style.backgroundColor = "#F9F5E7";

  //   postDiv.querySelector(".btn-edit-content").style.display = "block";
  //   postDiv.querySelector(".btn-save-edit").style.display = "none";
  //   postDiv.querySelector(".btn-save-edit-form").style.display = "none";
  //   postDiv.querySelector(".btn-cancel-edit").style.display = "none";

  //   // get the new edited text
  //   var textareaContent = document.querySelector(".post-text-edited").ariaValueMax;

  //   // Send the content to the view using an AJAX request
  //   var xhr = new XMLHttpRequest();
  //   xhr.open("POST", "/post_individual/");
  //   xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
  //   xhr.onload = function () {
  //     if (xhr.status === 200) {
  //       console.log(xhr.responseText);
  //     } else {
  //       console.log("Request failed.  Returned status of " + xhr.status);
  //     }
  //   };
  //   xhr.send(JSON.stringify({ textarea_content: textareaContent }));
  // }

  allEditBtns.forEach((editBtn) => {
    editBtn.addEventListener("click", edit_button);
  });

  allCancelBtns.forEach((cancelBtn) => {
    cancelBtn.addEventListener("click", cancel_button);
  });

  // allSaveBtns.forEach((saveBtn) => {
  //   saveBtn.addEventListener("click", save_button);
  // });
});
