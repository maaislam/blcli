document.querySelectorAll('a > span.css-y6l269').forEach(function (el) {
    if (
        (el.textContent === 'Learn more' || el.textContent === 'Learn More') &&
        !el.classList.contains('copy-changed')
    ) {
        el.textContent = `How it works`;
        el.classList.add('copy-changed');
    }
})