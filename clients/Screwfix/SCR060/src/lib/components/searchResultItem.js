export const searchResultItem = (id, item, searchTerm) => {
  console.log('🚀 ~ searchResultItem ~ item:', item);
  //const highlightedText = item.searchterm.toLowerCase();
  const highlightText = (text, term) => {
    const regex = new RegExp(`(${term})`, 'gi'); // 'gi' for case-insensitive and global match
    return text.replace(regex, `<span class="${id}__highlight">$1</span>`);
  };
  const html = `
      <li class="${id}__searchResults-item">
          <p>${highlightText(item.searchterm, searchTerm)}</p>
      </li>
    `;
  return html;
};
