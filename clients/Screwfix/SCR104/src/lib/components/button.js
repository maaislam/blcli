const button = (id, device) => {
  const html = `
        <a class="${id}__purchaseLink ${id}__${device}-link" href="/jsp/account/allPurchasesPage.jsp">Shop all past Purchases</a>
    `;

  return html.trim();
};

export default button;
