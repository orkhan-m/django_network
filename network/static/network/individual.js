document.addEventListener("DOMContentLoaded", function () {
  function check_button(event) {
    event.preventDefault();
    console.log("SALAM VSEM BRODYAQAM");
  }

  // function to POST request following

  // check button
  document.querySelector(".follow-btn").addEventListener("click", check_button);
});

// function following() {
//   fetch(`/individual/${id}`)
//     .then((response) => response.json())
//     .then((emails) => {
//       // go through all the email
//       emails.forEach((email_object) => {
//         // create an HTML div tag for the email_ids
//         const div_email_id = document.createElement("div");
//         div_email_id.classList.add("list-emails");
//         div_email_id.innerHTML = `
//       <h5><strong>Sender:</strong> ${email_object.sender}</h5>
//       <h5><strong>To:</strong> ${email_object.recipients}</h5>
//       <h5><strong>Subject:</strong> ${email_object.subject}</h5>
//       <p>${email_object.body.substr(0, 20)}...</p>
//       <p><strong>Time:</strong> ${email_object.timestamp}</p>
//       `;
//         // If the email is read add class "read" if otherwise add class "unread"
//         div_email_id.classList.add(email_object.read ? "read" : "unread");
//         // Add click event to email
//         div_email_id.addEventListener("click", function () {
//           read_email(email_object.id);
//         });

//         // append new div to the "emails-view" class
//         document.querySelector("#emails-view").append(div_email_id);
//       });
//     });
// }
