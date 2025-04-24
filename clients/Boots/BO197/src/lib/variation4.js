import variation3 from "./variation3";

const variation4 = () => {
  fireEvent("V4 Code Fired");
  const searchParams = new URLSearchParams(window.location.search).get(
    "searchTerm"
  );

  if (
    searchParams === "no7 foundation" ||
    searchParams === "No 7 foundation" ||
    document.referrer.contains("sitesearch")
  ) {
    variation3();
  }
};

export default variation4;
