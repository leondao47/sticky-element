const stickyTemplate = document.createElement("template");
stickyTemplate.innerHTML = `
  <style>
    #root {
      position: sticky;
      transition: top 0.3s;
    }
  </style>
  <div id="root">
    <slot></slot>
  <div>
`;

class StickyItem extends HTMLElement {
  constructor() {
    super();
    const shadow = this.attachShadow({ mode: "open" });
    shadow.appendChild(stickyTemplate.content.cloneNode(true));
    this.root = shadow.querySelector("#root");
  }
}

customElements.define("sticky-item", StickyItem);

const getAllStickyItems = () => {
  return document.querySelectorAll("sticky-item");
};

const getScrollDownStickyItems = () => {
  return document.querySelectorAll(`sticky-item[direction="down"]`);
};
const getScrollUpStickyItems = () => {
  return document.querySelectorAll(`sticky-item:not([direction="down"])`);
};

const updateTopValue = (stickyItems) => {
  const stickyItemsArray = Array.from(stickyItems);
  for (key in stickyItemsArray) {
    const previousItems = stickyItemsArray.slice(0, key);
    const totalOffset = previousItems.reduce(
      (offset, item) => offset + item.offsetHeight,
      0
    );
    stickyItemsArray[key].root.style.top = `${totalOffset}px`;
  }
};

let prevScrollpos = window.pageYOffset;

const handleScrollEvent = () => {
  const stickyItems = getAllStickyItems();
  let showingItems = stickyItems;
  const scrollDownStickyItems = getScrollDownStickyItems();
  const scrollUpStickyItems = getScrollUpStickyItems();
  let currentScrollPos = window.pageYOffset;
  const isScrollingDown = currentScrollPos > prevScrollpos;
  if (isScrollingDown) {
    scrollUpStickyItems.forEach((item) => {
      item.root.style.top = `-${item.offsetHeight}px`;
    });
    showingItems = scrollDownStickyItems;
  }
  updateTopValue(showingItems);
  prevScrollpos = currentScrollPos;
};

window.addEventListener("scroll", handleScrollEvent);
