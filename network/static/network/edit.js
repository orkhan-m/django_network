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
  // CODE
  const whatYouLikedString = document
    .querySelector(".likes")
    .getAttribute("data-whatYouLiked");
  whatYouLiked = JSON.parse(whatYouLikedString);
  console.log("first defined: " + whatYouLiked);
  const allLikeNumbers = document.querySelectorAll(".like-number");

  function like_handler(postid, whatYouLiked, likeBtn) {
    if (whatYouLiked.indexOf(postid) >= 0) {
      console.log("like_handler id - disliked: " + postid);
      console.log(typeof whatYouLiked);
      console.log("like_handler wyl - disliked: " + whatYouLiked);
      var liked = true;
    } else {
      console.log("like_handler id - liked: " + postid);
      console.log(typeof whatYouLiked);
      console.log("like_handler wyl - liked: " + whatYouLiked);
      var liked = false;
    }

    // if (liked === true) {
    //   // Get the likes count element CODE
    //   const likeNumber = document.querySelector(".like-number");
    //   console.log("Element when like removed :" + likeNumber);
    //   // Get the current likes count (convert to Integer)
    //   let likesNumberInt = parseInt(likeNumber.innerHTML);
    //   // decrease by one since like is removed
    //   likesNumberInt--;
    //   // replace value
    //   likeNumber.innerText = likesNumberInt;
    // } else if (liked === false) {
    //   // Get the likes count element CODE
    //   const likeNumber = document.querySelector(".like-number");
    //   // Get the current likes count (convert to Integer)
    //   let likesNumberInt = parseInt(likeNumber.innerHTML);
    //   // decrease by one since like is removed
    //   likesNumberInt++;
    //   // replace value
    //   likeNumber.innerText = likesNumberInt;
    // }

    if (liked === true) {
      fetch(`/toggle_like/${postid}`)
        .then((response) => response.json)
        .then((result) => {
          console.log(result);
          likeBtn.classList.remove("likes-liked");
          likeBtn.classList.add("likes-unliked");
          // Convert whatYouLiked to array
          // const whatYouLikedArray = whatYouLiked.split(",");
          // Update whatYouLiked variable
          whatYouLiked.splice(whatYouLiked.indexOf(postid), 1);
          console.log("update in toggle: " + whatYouLiked);
        });
    } else if (liked === false) {
      console.log("aaaaaaaaaa" + typeof whatYouLiked);
      fetch(`/toggle_like/${postid}`)
        .then((response) => response.json)
        .then((result) => {
          console.log(result);
          likeBtn.classList.remove("likes-unliked");
          likeBtn.classList.add("likes-liked");
          // Convert whatYouLiked to array
          // const whatYouLikedArray = whatYouLiked.split(",");
          // Update whatYouLiked variable
          whatYouLiked.push(postid);
          console.log("update in toggle: " + whatYouLiked);
        });
    }
  }

  allLikeBtns.forEach((likeBtn) => {
    const postid = likeBtn.getAttribute("data-postid");
    console.log("run for loop: " + whatYouLiked);
    // const whatYouLiked = likeBtn.getAttribute("data-whatYouLiked");
    likeBtn.addEventListener("click", () =>
      like_handler(postid, whatYouLiked, likeBtn)
    );
  });
});
