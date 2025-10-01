function extract(text, regex) {
    const match = text.match(regex);
    return match ? match[1].trim() : null;
}

function parsedData(extractedText) {
    
}
