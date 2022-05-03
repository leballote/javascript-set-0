function printAttr(element, attributes) {
    for (let attr of attributes) {
        console.log(element.getAttribute(attr));
    }
}

let el = document.getElementById("a");
printAttr(el, ["id", "class", "style", "val"]);