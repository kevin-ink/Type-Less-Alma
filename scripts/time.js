function convertMilitaryTime(text) {
    return text.replace(/\b([01]?[0-9]|2[0-3]):([0-5][0-9]):([0-5][0-9])\b/g, function(match, p1, p2) {
        let hours = parseInt(p1);
        let minutes = p2;
        let suffix = hours >= 12 ? 'PM' : 'AM';
        hours = hours % 12 || 12;
        return hours + ':' + minutes + ' ' + suffix;
    });
}

function processNode(node) {
    if (node.nodeType === Node.TEXT_NODE) {
        node.textContent = convertMilitaryTime(node.textContent);
    } else if (node.nodeType === Node.ELEMENT_NODE) {
        node.childNodes.forEach(processNode);
    }
}

const observer_t = new MutationObserver(mutations => {
    mutations.forEach(mutation => {
        mutation.addedNodes.forEach(processNode);
    });
});

observer_t.observe(document.body, { childList: true, subtree: true });

document.querySelectorAll('*').forEach(processNode);