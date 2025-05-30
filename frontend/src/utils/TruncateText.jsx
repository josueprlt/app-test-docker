export function TruncateText(nbrs, text) {
    if (text.length <= nbrs) {
        return text;
    }
    return text.slice(0, nbrs) + '...';
}

export default { TruncateText };