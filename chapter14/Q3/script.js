let body = document.getElementsByTagName("body")[0];
let bodyParent = body.parentElement;
let firstRendered = false;

let template1 = document.getElementById("template-list-item");
let template2 = document.getElementById("template-item-full");

fetch("./data/countries.json")
    .then(response => response.json())
    .then(items => {
        renderPage(items);
    });


function renderPage(items) {
    const params = new Proxy(new URLSearchParams(window.location.search), 
        {
            get: (searchParams, prop) => searchParams.get(prop),
        }
    );
    if (params.key) {
        renderTemplate2(items, params.key)
    } else {
        renderTemplate1(items);
        firstRendered = true;
    }
    window.addEventListener("popstate", e => {
        renderPage(items);
    })
}

function renderTemplate1(items) {
    if (!firstRendered) {
        firstRenderTemplate1(items);
    } else {
        reRenderTemplate1();
    }
}

function firstRenderTemplate1(items) {
    let currentBody = bodyParent.querySelector("body");
    if (currentBody !== body) bodyParent.replaceChild(body, currentBody);
    let countries = body.querySelector("#countries");
    for (let key in items) {
        let item = items[key];
        let { country, text, imagePath } = item;
        let fragment = template1.content.cloneNode(true);

        let li = fragment.querySelector("li");
        li.setAttribute("data-key", key);

        let h2 = fragment.querySelector("h2"); 
        h2.textContent = country; 
    
        let img = fragment.querySelector("img");
        img.src = imagePath;
    
        let p = fragment.querySelector("p");
    
        let maxChars = 400;
        let extra = text.length > maxChars ? "...": "";
        p.textContent = text.slice(0, maxChars) + extra; 
        
        countries.appendChild(li);
    }

    countries.addEventListener("click", evt => {
        let target = evt.target;
        let li = target.closest("li");
        if (li) {
            renderTemplate2(items, li.getAttribute("data-key"));
        }
    }); 
    firstRendered = true;
}

function renderTemplate2(items, key) {
    let fragment = template2.content.cloneNode(true);
    let newBody = document.createElement("body");
    let item = items[key];
    let { country, text, imagePath } = item;
    history.pushState(null, null, `?key=${key}`);

    let img = fragment.getElementById("item-side-image");
    img.src = imagePath;
    let h2 = fragment.getElementById("item-title");
    h2.textContent = country;
    let p = fragment.getElementById("item-text");
    p.textContent = text;

    body.remove();
    newBody.appendChild(fragment);
    bodyParent.appendChild(newBody);

    let goBack = document.getElementById("go-back");
    goBack.addEventListener("click", e => {
        renderTemplate1(items);
        history.pushState(null, null, "index.html");
        e.preventDefault();
    });
}

function reRenderTemplate1() {
    let currentBody = bodyParent.getElementsByTagName("body")[0];
    currentBody.remove();
    bodyParent.appendChild(body);
}