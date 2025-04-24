let accountsNumbers;
if (localStorage.getItem("AccountNumbers") === null) {

    fetch("https://blcro.fra1.digitaloceanspaces.com/TP261/test.json")
        .then((res) => res.json())
        .then((data) => {
            accountsNumbers = data;
            console.log(accountsNumbers);
            localStorage.setItem("AccountNumbers", JSON.stringify(accountsNumbers));
        })
} else {
    accountsNumbers = JSON.parse(localStorage.getItem("AccountNumbers"));
}
