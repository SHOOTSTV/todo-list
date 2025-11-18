class ModalState {
  constructor(modalSelector, triggerButtonId) {
    this.modal = document.querySelector(modalSelector);
    this.triggerButton = document.getElementById(triggerButtonId);
  }

  init() {
    this.triggerButton.addEventListener("click", () => {
      this.open();
    });

    window.onclick = (event) => {
      if (event.target === this.modal) {
        this.close();
      }
    };
  }

  open() {
    this.modal.style.display = "flex";
  }

  close() {
    this.modal.style.display = "none";
  }
}

export default ModalState;
