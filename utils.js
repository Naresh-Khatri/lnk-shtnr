function shortify(badaLink){
    const asciiSymbols = `!"#$%&'()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\]^_abcdefghijklmnopqrstuvwxyz"`
    let shortLink = ''
    for(let i=0;i<7;i++){
        let randNum = Math.ceil(Math.random()*asciiSymbols.length-1)
        shortLink+= asciiSymbols[randNum]
    }
    return shortLink
}

module.exports = shortify