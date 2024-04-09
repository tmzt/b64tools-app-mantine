

export const minimize = (input = '') => {
    return input
        .replace(/\s+/g, ' ')
        // Also remove all whitespace around tags
        .replace(/>\s*</g, '><')
        // Trim whitespace from start and end
        .replace(/^\s+|\s+$/g, '');
};
