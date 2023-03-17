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

  function like_handler(postid, whatYouLiked, likeBtn) {
    if (whatYouLiked.indexOf(postid) >= 0) {
      var liked = true;
    } else {
      var liked = false;
    }

    if (liked === true) {
      fetch(`/toggle_like/${postid}`)
        .then((response) => response.json)
        .then((result) => {
          console.log(result);
          likeBtn.classList.remove("likes-liked");
          likeBtn.classList.add("likes-unliked");
        });
    } else {
      fetch(`/toggle_like/${postid}`)
        .then((response) => response.json)
        .then((result) => {
          console.log(result);
          likeBtn.classList.remove("likes-unliked");
          likeBtn.classList.add("likes-liked");
        });
    }

    console.log(postid);
    console.log(whatYouLiked);
  }

  allLikeBtns.forEach((likeBtn) => {
    const postid = likeBtn.getAttribute("data-postid");
    const whatYouLiked = likeBtn.getAttribute("data-whatYouLiked");
    likeBtn.addEventListener("click", () =>
      like_handler(postid, whatYouLiked, likeBtn)
    );
  });
});
