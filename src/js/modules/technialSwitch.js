export default function technicalSwitch() {
    const server = document.querySelector('.tech__server');
    const amazon = document.querySelector('.tech__amazon');
    const serverGrid = document.querySelector('.tech__serverGrid');
    const amazonGrid = document.querySelector('.tech__amazonGrid');
    const activeClass = 'tech__nav_item-active'

    server.addEventListener('click', () => {
        amazonGrid.style.display = 'none';
        amazon.classList.remove(activeClass);

        serverGrid.style.display = 'grid';
        server.classList.add(activeClass);
    })

    amazon.addEventListener('click', () => {
        amazonGrid.style.display = 'grid';
        amazon.classList.add(activeClass);

        serverGrid.style.display = 'none';
        server.classList.remove(activeClass);
    })
}