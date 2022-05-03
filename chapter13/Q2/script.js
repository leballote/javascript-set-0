let buttonOnly3 = document.getElementById("button-only-three");

let button  = buttonOnly3;

let metterButtonOnly3 = document.getElementById("metter-button-only-three");

//I am aware I could do this function more general accepting a handler as an argument, I just didn't want it to get more complicated
function createCallback(button, metter) {
    let count = 0;
    return function out() {
        count++;
        metter.value += 1;
        console.log("the handler funciton was called " + count + " times");
        if (count >= 3) {
            button.removeEventListener("click", out);
        }
    };
}

let buttonOnly3Callback =  createCallback(buttonOnly3, metterButtonOnly3);

let buttonOnly3EventListener = buttonOnly3.addEventListener("click", buttonOnly3Callback)


