const template1 = document.getElementById("template-homepage");
const templateListItem = document.getElementById("template-list-item");
const template2 = document.getElementById("template-item-full");
const currentPageElement = document.getElementById("current-page");

//we only create once the page1, and only fill it when needed
const page1 = template1.cloneNode(true).content;
const countriesUl = page1.querySelector("#countries");

let filledPage1 = false;
let renderedAnyPage = false;

fetch("./data/countries.json")
  .then((response) => response.json())
  .then((countries) => {
    renderPage(countries);
  });

//countries is the recieved data (an object)
function renderPage(countries) {
  const params = getUrlParams();
  const { country } = params;

  if (country == null) {
    if (!filledPage1) {
      fillPage1(countries);
    }
    renderPage1(countries);
  } else {
    countryData = countries[country];
    renderPage2(countryData);
  }

  if (!renderedAnyPage) {
    window.addEventListener("popstate", () => {
      renderPage(countries);
    });
    renderedAnyPage = true;
  }
}

function fillPage1(countriesData) {
  for (const countryKey in countriesData) {
    const country = countriesData[countryKey];
    const { name, text, imagePath } = country;
    const countryLi = templateListItem
      .cloneNode(true)
      .content.querySelector("li");
    const itemImage = countryLi.querySelector(".item-side-image");
    const itemBody = countryLi.querySelector(".item-body");
    const itemTitle = itemBody.querySelector(".item-title");
    const itemText = itemBody.querySelector(".item-text");

    countryLi.setAttribute("data-key", countryKey);
    itemTitle.textContent = name;
    itemText.textContent = text;
    itemImage.src = imagePath;
    countriesUl.appendChild(countryLi);
  }

  filledPage1 = true;
}

function renderPage1() {
  const page1Clone = page1.cloneNode(true);
  currentPageElement.replaceChildren(page1Clone);

  const countriesUlClone = document.getElementById("countries");
  countriesUlClone.addEventListener("click", (e) => {
    const li = e.target.closest("li");
    if (li) {
      const countryKey = li.getAttribute("data-key");
      navigatePage2(countryKey);
    }
  });
}

function renderPage2(country) {
  const { name, text, imagePath } = country;
  const fragment = template2.cloneNode(true).content;
  const itemImage = fragment.querySelector(".item-side-image");
  const itemBody = fragment.querySelector(".item-body");
  const itemTitle = itemBody.querySelector(".item-title");
  const itemText = itemBody.querySelector(".item-text");

  itemImage.src = imagePath;
  itemTitle.textContent = name;
  itemText.textContent = text;

  currentPageElement.replaceChildren(fragment);

  const goBack = document.getElementById("go-back");

  goBack.addEventListener("click", (e) => {
    e.preventDefault();
    navigatePage1();
  });
}

function navigatePage1() {
  history.pushState(null, null, "./index.html");
  const popStateEvent = new PopStateEvent("popstate");
  dispatchEvent(popStateEvent);
}

function navigatePage2(countryKey) {
  history.pushState(null, null, `?country=${countryKey}`);
  const popStateEvent = new PopStateEvent("popstate");
  dispatchEvent(popStateEvent);
}

function getUrlParams() {
  const params = new Proxy(new URLSearchParams(window.location.search), {
    get: (searchParams, prop) => searchParams.get(prop),
  });
  return params;
}
