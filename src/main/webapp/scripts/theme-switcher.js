document.getElementById('theme-toggle').addEventListener('click', function() {
    const body = document.body;
    if (body.classList.contains('light-theme')) {
        body.classList.replace('light-theme', 'dark-theme');
    } else {
        body.classList.replace('dark-theme', 'light-theme');
    }
});
