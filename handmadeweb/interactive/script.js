const site_wide_cursor = document.querySelector('.custom-cursor.site-wide');

document.addEventListener('mouseenter', () => {
    site_wide_cursor.style.display = 'block';

});

document.addEventListener('mouseleave', () => {
    site_wide_cursor.style.display = 'none';
});