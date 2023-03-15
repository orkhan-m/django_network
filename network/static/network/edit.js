document.addEventListener("DOMContentLoaded", function () {
  const allEditBtns = document.querySelectorAll(".btn-edit-content");
  const allCancelBtns = document.querySelectorAll(".btn-cancel-edit");

  function edit_button(event) {
    event.preventDefault();
    const postDiv = this.closest(".individual-post");
    const paragraphbg = postDiv.querySelector(".post-text");

    paragraphbg.style.backgroundColor = "#dad0b0";

    postDiv.querySelector(".btn-edit-content").style.display = "none";
    postDiv.querySelector(".btn-save-edit").style.display = "block";
    postDiv.querySelector(".btn-cancel-edit").style.display = "block";

    paragraphbg.disabled = false;
  }

  function cancel_button(event) {
    event.preventDefault();
    const postDiv = this.closest(".individual-post");
    const paragraphbg = postDiv.querySelector(".post-text");

    paragraphbg.style.backgroundColor = "#F9F5E7";

    postDiv.querySelector(".btn-edit-content").style.display = "block";
    postDiv.querySelector(".btn-save-edit").style.display = "none";
    postDiv.querySelector(".btn-cancel-edit").style.display = "none";

    paragraphbg.disabled = true;
  }

  allEditBtns.forEach((editBtn) => {
    editBtn.addEventListener("click", edit_button);
  });

  allCancelBtns.forEach((cancelBtn) => {
    cancelBtn.addEventListener("click", cancel_button);
  });

  const allLikeBtns = document.querySelectorAll(".likes");

  function like_button() {
    const postDiv = this.closest(".individual-post");
    var likes = postDiv.querySelector(".likes");

    postDiv.querySelector(".likes").style.color = "white";
    postDiv.querySelector(".likes").style.color = "red";
  }

  allLikeBtns.forEach((likeBtn) => {
    likeBtn.addEventListener("click", like_button);
  });
});
