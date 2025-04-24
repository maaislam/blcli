export const searchComponent = (ID) => {
  return `
    <div class="${ID}__container">
      <p class='${ID}__suggestionHeader'>Search Suggestions</p>
      <ul>
        <li>
          <a href="/6696-7371/pomysly-na-prezenty/prezenty-dla-niej">PREZENTY DLA NIEJ</a>
        </li>
        <li>
          <a href="/6696-7372/pomysly-na-prezenty/prezenty-dla-niego">PREZENTY DLA NIEGO</a> 
        </li>
        <li>
          <a href="/6696-7373/pomysly-na-prezenty/prezenty-dla-dziecka">PREZENTY DLA DZIECKA</a>
        </li>
        <li>
          <a href="/6696/pomysly-na-prezenty">Prezenty</a>
        </li>
        <li>
          <a href="/6696-8232/pomysly-na-prezenty/perfumy">Perfumy</a>
        </li>
        <li>
          <a href="/6696-8234/pomysly-na-prezenty/pielegnacja">Pielęgnacja</a>
        </li>
        <li>
          <a href="/305/pielegnacja-ciala">Pielęgnacja ciała</a>
        </li>
      </ul>
    </div>`;
};

export const overlay = (ID) => {
  return `<div class="${ID}__overlay"></div>`;
};
