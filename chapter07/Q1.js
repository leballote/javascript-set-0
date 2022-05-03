function fromHexToRGB(hex) {
    //it should work with or without the #, upper and lowercase
    // I could also make it work with more than one "#", but I think it is more secure if not 
    //Also, this was way easier without regex, but the hits suggested it 
    out = hex.toLowerCase()
        .replace("#", "") 
        .replace(/([a-f0-9]{2})([a-f0-9]{2})([a-f0-9]{2})/g, "($1, $2, $3)")
        .replaceAll(/([a-f0-9]){2}/g, str => parseInt(str, 16));

    out = "rgb " + out;
    return out;
}

console.log(fromHexToRGB("#3020ff"));
