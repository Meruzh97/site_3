const modalBtn = document.querySelectorAll('[data-modal]');
const modalClose = document.querySelectorAll('.modal__close');
const modal = document.querySelectorAll('.modal');


modalBtn.forEach(item => {
    item.addEventListener('click', event => {
        let $this = event.currentTarget;
        let modalId = $this.getAttribute('data-modal');
        let modal = document.getElementById(modalId);
        modal.classList.add('show');

        let modalContent = modal.querySelector('.modal__content');
        modalContent.addEventListener('click', event=>{
            event.stopPropagation();
        })

        setTimeout(function(){
            modalContent.style.transform = 'none';
            modalContent.style.opacity = 1;
        },20)
    }) 
})

modalClose.forEach(item=>{
    item.addEventListener('click', event=>{
        let currentModal = event.currentTarget.closest('.modal');
        closeModal(currentModal);
    })
})

modal.forEach(item=>{
    item.addEventListener('click', event=>{
        let currentModal = event.currentTarget;
        closeModal(currentModal);
    })
})


function closeModal(currentModal){
    let modalContent = currentModal.querySelector('.modal__content');
    modalContent.removeAttribute('style');
    setTimeout(function(){
        currentModal.classList.remove('show');
    }, 20)

}