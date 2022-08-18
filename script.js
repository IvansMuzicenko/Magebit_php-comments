import generateId from "./helpers.js";
const authorsForm = document.querySelector("#authors-form");
const commentsForm = document.querySelector("#comments-form");

const getAllAuthors = function () {
  fetch("api.php?api=get-all-authors", {
    method: "GET",
  })
    .then(async (response) => await response.json())
    .then((data) => {
      const authorSelect = document.querySelectorAll(".author_select");
      authorSelect.forEach((selector) => {
        selector.innerHTML = "";
        if (selector.classList.contains("filter")) {
          selector.innerHTML =
            "<option value='all' selected='selected'>All</option>";
        }
        data["authors"].forEach((author) => {
          addAuthor(selector, author.id, author.firstname, author.lastname);
        });
      });
    });
};
getAllAuthors();

const addAuthor = function (selector, id, firstname, lastname) {
  const authorSelect = selector;

  const newOption = document.createElement("option");

  newOption.value = id;
  newOption.textContent = firstname + " " + lastname;

  authorSelect.append(newOption);
};

const getComments = function () {
  let filter = "";
  const filterValue = document.querySelector(".filter").value;

  if (filterValue != "all" && filterValue != "") {
    filter = `&id=${filterValue}`;
  }
  fetch("api.php?api=get-comments" + filter, {
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
getComments();

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

document.querySelector(".filter").onchange = function () {
  getComments();
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
