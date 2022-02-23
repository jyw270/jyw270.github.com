/* ***********************************
Challenge!

The form on the index.html file now has two additional fields, one for title and one for description.
For this challenge, do each of these steps:

1. Capture the data for title and description and put them in the database
2. Retrieve the title and description from the database and display them on the page
when the image and data have been successfully saved to the database.
3. Clear out the form data once an image and the data has been successfully saved.
************************************* */
//App ID and JS Key from B4A
Parse.initialize(
  "L1NhFKVlzfpCU4tSLL2vZocRXcP30f1xrcZvGrzS",
  "L43IGWdzuIh7h5Db5glkNSmaE6KmSSuvMHbzZYtK"
);
// Parse server
Parse.serverURL = "https://parseapi.back4app.com/";

document.querySelector("#upload").addEventListener("submit", function (event) {
  event.preventDefault();

  const fileUploadControl = document.querySelector("#fileupload");
  const title = document.querySelector("#title");
  const description = document.querySelector("#description");
  // this is a good place to collect data from the other fields
  if (fileUploadControl.files.length > 0) {
    const file = fileUploadControl.files[0];
    const name = fileUploadControl.files[0].name;
    const type = fileUploadControl.files[0].type;
    const size = fileUploadControl.files[0].size;
    if (
      (size < 100000 && type == "image/jpeg") ||
      type == "image/png" ||
      type == "image/webp"
    ) {
      uploadPhoto(name, file, title, description);
    } else {
      alert("the file is too big or is not a .jpg or .png file");
    }
  }
});

async function uploadPhoto(name, file, title, description) {
  const newPhoto = new Parse.Object("uploads");
  newPhoto.set("filename", name);
  newPhoto.set("file", new Parse.File(name, file));
  newPhoto.set("title", title.value);
  newPhoto.set("description", description.value);
  //This is a good place to save data from the other fields to the database
  try {
    const result = await newPhoto.save();
    console.log(result.id);
    getNewPhoto(result.id);
  } catch (error) {
    console.error("Error while uploading the photo: ", error);
  }
}

async function getNewPhoto(photoId) {
  const records = Parse.Object.extend("uploads");
  const query = new Parse.Query(records);
  query.equalTo("objectId", photoId);
  try {
    const results = await query.find();
    const photoURL = results[0].get("file").url();
    const photoName = results[0].get("filename");
    const photoTitle = results[0].get("title");
    const photoDescription = results[0].get("description");
    // This is a good place to get data from the database fields
    showUploadedPhoto(photoURL, photoName, photoTitle, photoDescription);
    // This is a good place to run a function that clears out the form, which you will write below.
  } catch (error) {
    console.error("Error while getting photo", error);
  }
}

function showUploadedPhoto(photoURL, photoName, photoTitle, photoDescription) {
  let html = `<p>You just uploaded ${photoName}:</p>`;
  html += `<img src="${photoURL}">`;
  html += `<h2>${photoTitle}</h2><p>${photoDescription}</p>`;
  // This is a good place to add more data to the HTML
  document.querySelector("#uploaded-img").innerHTML = html;
  clearForm();
}

// This is a good place to write a function that clears out the form.
function clearForm() {
  const fields = document.querySelectorAll(".field");
  for (let i = 0; i < fields.length; i++) {
    fields[i].value = "";
  }
}
