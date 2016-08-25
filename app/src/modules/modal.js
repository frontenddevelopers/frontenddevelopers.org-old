const modal = document.getElementsByClassName('js--modal')[0];
const modalOpen = document.getElementsByClassName('js--modal-open')[0];
const modalClose = document.getElementsByClassName('js--modal-close')[0];

function openModal() {
  modal.className += ' modal--open';
}

function closeModal() {
  modal.className = modal.className.replace(/(?:^|\s)modal--open(?!\S)/g, '');
}

modalOpen.addEventListener('click', () => {
  openModal();
});

modalClose.addEventListener('click', () => {
  closeModal();
});
