const form = document.getElementById("submit");
const inputs = document.querySelectorAll("#submit input");
const ul = document.querySelector("li");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  // let counter = localStorage.length;
  let obj = {};
  // console.log(counter);
  Array.from(inputs).forEach((e) => {
    obj[e.id] = e.value;
  });
  localStorage.setItem(obj.description, obj.Link);
  storagePersistence(obj.description, obj.Link);
  // counter += 1;
  form.reset();
});

function storagePersistence(description, Link) {
  const link = document.createElement("li");
  const anchor = document.createElement("a");
  const clearlink = document.createElement("button");

  if (localStorage.length != 0) {
    anchor.href = Link;
    anchor.target = "blank";
    clearlink.setAttribute("id", description);
    anchor.appendChild(document.createTextNode(description));
    clearlink.appendChild(document.createTextNode("remove"));
    clearlink.classList.add("clear");
    link.append(anchor, clearlink);
    document.querySelector(".create_link").appendChild(link);
  }
}

window.addEventListener("load", (event) => {
  // for (let index = 0; index < localStorage.length; index++) {
  //   storagePersistence(index);
  // }
  loadElement();
});

////////// Function to clear or edit individual links /////////

const removeLink = document.querySelector("#clear");
removeLink.addEventListener("click", (e) => {
  e.preventDefault();
  clearElement();
});

function clearElement() {
  const linkClear = document.querySelectorAll("li button");

  linkClear.forEach((e) => {
    e.classList.toggle("visible");
    e.addEventListener("click", (event) => {
      event.preventDefault();
      console.log(event.target.id);
      localStorage.removeItem(event.target.id);
      location.reload();
    });
  });
}
///////////////////////// End of clear or edit Fucntion ///////////////

///////// Load elements from localStorage ////////
function loadElement(bool) {
  assortedData().forEach((e) => {
    const link = document.createElement("li");
    const anchor = document.createElement("a");
    const clearlink = document.createElement("button");

    anchor.href = localStorage.getItem(e);
    anchor.target = "blank";
    clearlink.setAttribute("id", e);
    anchor.appendChild(document.createTextNode(e));
    clearlink.appendChild(document.createTextNode("remove"));
    clearlink.classList.add("clear");
    link.append(anchor, clearlink);
    document.querySelector(".create_link").appendChild(link);
  });
}

function assortedData() {
  let arr = [];
  if (localStorage.length != 0) {
    for (var i = 0; i < localStorage.length; i++) {
      arr.push(localStorage.key(i));
    }
  }
  return arr;
}
