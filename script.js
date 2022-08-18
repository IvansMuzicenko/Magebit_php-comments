import generateId from "./helpers.js";
const authorsForm = document.querySelector("#authors-form");
const commentsForm = document.querySelector("#comments-form");

const getAllAuthors = function () {
  fetch("api.php?api=get-all-authors", {
    method: "GET",
  })
    .then(async (response) => await response.json())
    .then((data) => {
      document.querySelector("#author_select").innerHTML = "";
      data["authors"].forEach((author) => {
        addAuthor(author.id, author.firstname, author.lastname);
      });
    });
};
getAllAuthors();

const addAuthor = function (id, firstname, lastname) {
  const authorSelect = document.querySelector("#author_select");

  const newOption = document.createElement("option");

  newOption.value = id;
  newOption.textContent = firstname + " " + lastname;

  authorSelect.append(newOption);
};

const getAllComments = function () {
  fetch("api.php?api=get-all-comments", {
    method: "GET",
  })
    .then(async (response) => await response.json())
    .then((data) => {
      document.querySelector("#comments-list").innerHTML = "";
      data["comments"].forEach((comment) => {
        addComment(
          comment.id,
          comment.message,
          comment.date,
          comment.firstname,
          comment.lastname
        );
      });
    });
};
getAllComments();

const addComment = function (id, message, date, firstname, lastname) {
  const commentsList = document.querySelector("#comments-list");

  const newComment = document.createElement("div");
  const newTitle = document.createElement("h3");
  const newMessage = document.createElement("p");

  newTitle.innerHTML = `<span>${firstname} ${lastname}</span> <span>${date}</span>`;
  newMessage.textContent = message;

  newComment.classList.add("comment");
  newTitle.classList.add("comment__title");
  newMessage.classList.add("comment__message");

  newComment.append(newTitle);
  newComment.append(newMessage);

  commentsList.append(newComment);
};

authorsForm.onsubmit = function (evt) {
  evt.preventDefault();

  const firstnameValue = document.querySelector(
    "[name='author_firstname']"
  ).value;
  const lastnameValue = document.querySelector(
    "[name='author_lastname']"
  ).value;

  const data = new FormData();
  data.set("author_id", generateId());
  data.set("author_firstname", firstnameValue);
  data.set("author_lastname", lastnameValue);
  fetch("api.php?api=add-author", {
    method: "POST",
    body: data,
  })
    .then(async (response) => await response.json())
    .then((data) => {
      if (data.status) {
        getAllAuthors();
      }
    });
};

commentsForm.onsubmit = function (evt) {
  evt.preventDefault();

  const commentAuthor = document.querySelector("[name='comment_author']").value;
  const commentMessage = document.querySelector(
    "[name='comment_message']"
  ).value;

  const data = new FormData();
  data.set("comment_id", generateId());
  data.set("comment_author", commentAuthor);
  data.set("comment_message", commentMessage);
  fetch("api.php?api=add-comment", {
    method: "POST",
    body: data,
  })
    .then(async (response) => await response.json())
    .then((data) => {
      if (data.status) {
        getAllComments();
      }
    });
};
