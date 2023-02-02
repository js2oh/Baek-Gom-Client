// Helper function to clean up the whitespacese in the tags
export const formatTags = (tags) => tags.map(tag=>tag.trim()).filter(tag=>tag!=='');
