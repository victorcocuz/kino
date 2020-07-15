/*******************************************************************************************************
MODALS
********************************************************************************************************/

// Listen for click to open modals
function listenForOpenModals() {
    Array.from(document.querySelectorAll('.modal-trigger')).forEach(elem => {
        elem.addEventListener('click', () => {
            document.querySelector(`#${elem.getAttribute('data-target')}`).classList.add('open')
        })
    })
}

// Listen for click to close modals
function listenForCloseModals() {
    Array.from(document.querySelectorAll('.modal')).forEach(elem => {
        elem.addEventListener('click', (evt) => {
            if (evt.target.classList.contains('modal')) {
                elem.classList.remove('open');
            }
        })
    })
}

export {
    listenForOpenModals,
    listenForCloseModals
}