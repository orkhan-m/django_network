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

  const MyLikesString = document
    .querySelector(".likes")
    .getAttribute("data-myLikes");
  const myLikesArray = JSON.parse(MyLikesString);
  const myLikes = Array.from(new Set(myLikesArray));

  function like_handler(postid, likeBtn, myLikes) {
    if (myLikes.includes(Number(postid))) {
      var liked = true;
    } else {
      var liked = false;
    }

    if (liked === true) {
      // TOSTUDY - fetch
      fetch(`/toggle_like/${postid}`)
        .then((response) => response.json)
        .then((result) => {
          console.log(result);
          likeBtn.classList.remove("likes-liked");
          likeBtn.classList.add("likes-unliked");
          // Update myLikes variable
          myLikes.splice(myLikes.indexOf(Number(postid)), 1);
          // NOTE change the number of likes with JS
          // get the number
          const likeNumber = document.querySelector(`.like-number-${postid}`);
          // Get the current likes count (convert to Integer)
          let likesNumberInt = parseInt(likeNumber.innerHTML);
          // decrease by one since like is removed
          likesNumberInt--;
          // replace value
          likeNumber.innerText = likesNumberInt;
        });
    } else if (liked === false) {
      fetch(`/toggle_like/${postid}`)
        .then((response) => response.json)
        .then((result) => {
          console.log(result);
          likeBtn.classList.remove("likes-unliked");
          likeBtn.classList.add("likes-liked");
          // Update myLikes variable
          if (!myLikes.includes(Number(postid))) {
            myLikes.push(Number(postid));
          }
          // NOTE change the number of likes with JS
          // get the number
          const likeNumber = document.querySelector(`.like-number-${postid}`);
          // Get the current likes count (convert to Integer)
          let likesNumberInt = parseInt(likeNumber.innerHTML);
          // decrease by one since like is removed
          likesNumberInt++;
          // replace value
          likeNumber.innerText = likesNumberInt;
        });
    }
  }

  allLikeBtns.forEach((likeBtn) => {
    const postid = likeBtn.getAttribute("data-postid");
    likeBtn.addEventListener("click", () =>
      like_handler(postid, likeBtn, myLikes)
    );
  });
});
