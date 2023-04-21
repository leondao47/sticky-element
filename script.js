const template = document.createElement("template");
template.innerHTML = `
  <div><slot></slot></div>
`;

class StickyItem extends HTMLElement {
  constructor() {
    super();
    const shadow = this.attachShadow({ mode: "open" });
    shadow.append(template.content.cloneNode(true));
    this.item = shadow.querySelector("div");
    this.item.style.height = "100px";
    const style = {
      display: "block",
      height: "100px",
    };
    Object.assign();
  }

  static get observedAttributes() {
    return ["direction"];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (name === "direction") {
      if (newValue === "down") {
      }
    }
  }

  updateValue(value) {
    this.checkbox.checked = value != null && value !== "false";
  }
}

customElements.define("sticky-item", StickyItem);

let prevScrollpos = window.pageYOffset;
let iniPos;
let isInitialized = false;

window.onscroll = function () {
  const sticky1 = document.querySelector(".sticky-1");
  const sticky2 = document.querySelector(".sticky-2");
  const sticky3 = document.querySelector(".sticky-3");
  const sticky4 = document.querySelector(".sticky-4");
  let currentScrollPos = window.pageYOffset;

  if (prevScrollpos > currentScrollPos) {
    // Show the navbar when the user scrolls up
    sticky1.classList.remove("hidden");
    sticky2.classList.remove("hidden");
    sticky3.classList.remove("hidden");
    sticky4.classList.remove("hidden");
    console.log("scrolling up");
  } else {
    // Hide the navbar when the user scrolls down
    console.log("scrolling down");
    sticky1.classList.add("hidden");
    sticky2.classList.add("hidden");
    sticky3.classList.add("hidden");
    sticky4.classList.add("hidden");
  }
  prevScrollpos = currentScrollPos;
};
