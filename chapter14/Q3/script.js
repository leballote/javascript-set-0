let temp;
const template1 = document.getElementById("template-list-item");
const template2 = document.getElementById("template-item-full");
const currentPageElement = document.getElementById("current-page");
const page1 = new DocumentFragment();
const countriesUl = document.getElementById("countries");

let currentPage;
let renderedPage1 = false; 
let renderedAnyPage = false;


fetch("./data/countries.json")
    .then(response => response.json())
    .then(countries => {
        renderPage(countries);
    });

function renderPage(countries, shallPushState=true) {
    const params = new Proxy(new URLSearchParams(window.location.search), 
        {
            get: (searchParams, prop) => searchParams.get(prop),
        }
    );

    const {country} = params;  
    if (country == null) {
        renderPage1(countries, shallPushState);
    } else {
        renderPage2(countries, country, shallPushState);
    }

    if (!renderedAnyPage) {
        window.addEventListener("popstate", () => renderPage(countries, false));
        renderedAnyPage = true;
    }
}

function renderPage1(countries, shallPushState=true) {
    if (shallPushState) history.pushState(null, null, "./index.html"); 
    if (!renderedPage1) {
        for (const countryKey in countries) {
            const country = countries[countryKey];
            const {name, text, imagePath} = country;
            const countryLi = template1.cloneNode(true).content.querySelector("li");
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
        countriesUl.addEventListener("click", e => {
            const li = e.target.closest("li"); 
            if (li) {
                const countryKey = li.getAttribute("data-key");
                renderPage2(countries, countryKey);
            }
        });
        renderedPage1 = true;
    } 
    if (currentPage === "page2") {
        currentPageElement.replaceChildren(page1);
    } 
    currentPage = "page1";
}

function renderPage2(countries, countryKey, shallPushState=true) {
    if (shallPushState) history.pushState(null, null,`?country=${countryKey}`);
    const country = countries[countryKey];
    const{name, text, imagePath} = country;
    const fragment = template2.cloneNode(true).content;
    const itemImage = fragment.querySelector(".item-side-image");
    const itemBody = fragment.querySelector(".item-body");
    const itemTitle = itemBody.querySelector(".item-title");
    const itemText = itemBody.querySelector(".item-text");

    itemImage.src = imagePath;
    itemTitle.textContent = name; 
    itemText.textContent = text;


    page1.replaceChildren(...currentPageElement.children);
    currentPageElement.replaceChildren(fragment);

    const goBack =  currentPageElement.querySelector("#go-back"); 

    goBack.addEventListener("click", e => {
        e.preventDefault();
        renderPage1(countries);
    });
    currentPage = "page2";
}
