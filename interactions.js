const form = document.getElementById("submit");
const inputs = document.querySelectorAll("#submit input");
const ul = document.querySelector(".create_link");
const clear = document.querySelector(".clear button");
// let index;
// console.log('Endale')
let counter = localStorage.length;

form.addEventListener("submit", (e) => {
  e.preventDefault();
  let obj = {};
  Array.from(inputs).forEach((e) => (obj[e.id] = e.value));
  localStorage.setItem(`data${counter}`, JSON.stringify(obj));
  storagePersistence(counter);
  counter += 1;
  form.reset();
});

function storagePersistence(counter) {
  const link = document.createElement("li");
  const anchor = document.createElement("a");

  if (localStorage.length != 0) {
    let descriptionVar = JSON.parse(
      localStorage.getItem(`data${counter}`)
    ).description;
    let linkVar = JSON.parse(localStorage.getItem(`data${counter}`)).Link;
    anchor.href = linkVar;
    anchor.target = "blank";
    anchor.setAttribute("id", `${counter}`);
    anchor.appendChild(document.createTextNode(descriptionVar));
    link.appendChild(anchor);
    document.querySelector(".create_link").appendChild(link);
  }
  return counter;
}
window.addEventListener("load", (event) => {
  console.log("inside window before the for loop");
  if (localStorage.length != 0) {
    for (var i = 0; i < localStorage.length; i++) {
      console.log("inside window load");
      storagePersistence(i);
    }
  }
});
clear.addEventListener("click", () => {
  localStorage.clear();
  location.reload();
});

////////// Function to clear or edit individual links /////////
function clearEditLink() {
  for (let index = 0; index < localStorage.length; index++) {}
}
const clearlink = document.querySelectorAll(selectors);
function addClearButton() {}
