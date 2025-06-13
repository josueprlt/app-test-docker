export function RegexForTitle(title) {
    // Regex to match any sequence of words separated by slashes at the end
    const regex = /^(.*?)(?:\s+)?((?:\w+\/)+\w+)$/i;
    let args = [];
    let newTitle = '';

    if (title) {
        const match = title.match(regex);

        if (match) {
            newTitle = match[1].trim();
            args = match[2].split('/').map(v => v.trim());
        } else {
            newTitle = title;
            args = [];
        }
    }
    return { newTitle, args };
}

export default { RegexForTitle };