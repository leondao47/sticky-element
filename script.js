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

  static showingItems;
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

const getOtherStickyElements = () => {
  let otherStickyElements = document.querySelectorAll("div");
  otherStickyElements = Array.from(otherStickyElements);
  otherStickyElements = otherStickyElements.filter(
    (item) => getComputedStyle(item).position === "sticky"
  );
  return otherStickyElements;
};

const getTotalOffset = (items) => {
  items = Array.from(items);
  return items.reduce((offset, item) => offset + item.offsetHeight, 0);
};

const updateTopValue = (stickyItems) => {
  const stickyItemsArray = Array.from(stickyItems);
  for (key in stickyItemsArray) {
    const previousItems = stickyItemsArray.slice(0, key);
    const totalOffset = getTotalOffset(previousItems);
    stickyItemsArray[key].root.style.top = `${totalOffset}px`;
  }
};

let prevScrollpos = window.pageYOffset;

const handleStickyItemElements = () => {
  const stickyItems = getAllStickyItems();
  StickyItem.showingItems = stickyItems;
  const scrollDownStickyItems = getScrollDownStickyItems();
  const scrollUpStickyItems = getScrollUpStickyItems();
  let currentScrollPos = window.pageYOffset;
  const isScrollingDown = currentScrollPos > prevScrollpos;
  if (isScrollingDown) {
    scrollUpStickyItems.forEach((item) => {
      item.root.style.top = `-${item.offsetHeight}px`;
    });
    StickyItem.showingItems = scrollDownStickyItems;
  }
  updateTopValue(StickyItem.showingItems);
  prevScrollpos = currentScrollPos;
};

const handleOtherStickyElements = () => {
  const otherStickyElements = getOtherStickyElements();
  for (element of otherStickyElements) {
    const offset = `${10 + getTotalOffset(StickyItem.showingItems)}px`;
    element.style.top = offset;
  }
};

window.addEventListener("scroll", handleStickyItemElements);
window.addEventListener("scroll", handleOtherStickyElements);
