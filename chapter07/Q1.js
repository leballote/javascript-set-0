function fromHexToRGB(hex) {
    hex = hex.trim();
    const reg = /^#?(?<r>[a-f0-9]{2})(?<g>[a-f0-9]{2})(?<b>[a-f0-9]{2})$/i;
    const match = hex.match(reg);
    if (match) {
        const {r, g, b} = match.groups;
        return `rgb (${parseInt(r, 16)}, ${parseInt(g, 16)}, ${parseInt(b, 16)})`;
    } else {
        throw new Error("Not valid input");
    }
}

console.log(fromHexToRGB("#3020ff"));
console.log(fromHexToRGB("3020ff "));
//console.log(fromHexToRGB("3020#ffX")); //error