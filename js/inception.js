class Inception {
  static get inception() {
    if (!this._inception) {
      this._inception = new Inception;
    }

    return this._inception
  }

  initialize() {
    this.displayField = document.querySelector("#displayField");
    this.dropField    = document.querySelector("#dropField");

    this.dropField.addEventListener("drop", this.dropHandler.bind(this));
    this.dropField.addEventListener("dragover", this.dragoverHandler.bind(this));

    window.addEventListener('resize', this.decept.bind(this));

    this.initializeImages();
  }

  initializeImages() {
    this.images = new Images(this.displayField);

    document.body.addEventListener('mousewheel', () => this.images.scroll());
  }

  dropHandler(event) {
    event.preventDefault();

    this.dropField.classList.add("hidden");
    this.displayField.classList.remove("hidden");

    this.images.source = URL.createObjectURL(event.dataTransfer.files[0]);
  }

  dragoverHandler(event) { event.preventDefault(); }
  inceptiualize()        { this.images.inceptiualize() }
  decept()               { this.images.decept() }
};
