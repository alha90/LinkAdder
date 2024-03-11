const form = document.getElementById("submit");
const inputs = document.querySelectorAll("#submit input");
const ul = document.querySelector("li");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  let storageArray = [];
  let obj = {};
  Array.from(inputs).forEach((e) => {
    obj[e.id] = e.value;
  });

  if (
    localStorage.length != 0 &&
    Array.isArray(JSON.parse(localStorage.getItem("data")))
  ) {
    JSON.parse(localStorage.getItem("data")).forEach((e) => {
      storageArray.push(e);
    });
    storageArray.push(obj);
    localStorage.setItem("data", JSON.stringify(storageArray));
  } else {
    storageArray.push(obj);
    localStorage.setItem("data", JSON.stringify(storageArray));
  }
  storagePersistence(obj.description, obj.Link);
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
    let newArray = [];
    e.classList.toggle("visible");
    e.addEventListener("click", (event) => {
      event.preventDefault();
      assortedData().forEach((e) => {
        if (e.description != event.target.id) {
          newArray.push(e);
        }
      });
      localStorage.setItem("data", JSON.stringify(newArray));
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

    anchor.href = e.Link;
    anchor.target = "blank";
    clearlink.setAttribute("id", e.description);
    anchor.appendChild(document.createTextNode(e.description));
    clearlink.appendChild(document.createTextNode("remove"));
    clearlink.classList.add("clear");
    link.append(anchor, clearlink);
    document.querySelector(".create_link").appendChild(link);
  });
}

function assortedData() {
  let arr = [];
  if (
    localStorage.length != 0 &&
    Array.isArray(JSON.parse(localStorage.getItem("data")))
  ) {
    JSON.parse(localStorage.getItem("data")).forEach((e) => {
      arr.push(e);
    });
  }
  return arr;
}
