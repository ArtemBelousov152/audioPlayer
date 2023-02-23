export default function closeError() {
    const errorWindow = document.querySelector('.error');
    const errorClose = document.querySelector('.error__close');

    errorClose.addEventListener('click', () => {
        errorWindow.classList.remove('error_active');
    })
}