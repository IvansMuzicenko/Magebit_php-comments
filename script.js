import generateId from "./helpers.js";
const authorsForm = document.querySelector("#authors-form");
const commentsForm = document.querySelector("#comments-form");

const getAllAuthors = function () {
  fetch("api.php?api=get-all-authors", {
    method: "GET",
  })
    .then(async (response) => await response.json())
    .then((data) => {
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
  });
};
