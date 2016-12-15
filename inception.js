function init() {
  var container = new Inception;
}

class Inception {
  constructor() {
    this.dropField    = document.querySelector("#dropField");
    this.displayField = document.querySelector("#displayField");
    this.outerImage   = new Image(document.querySelector("#outerImage"));
    // this.innerImage   = document.querySelector("#innerImage");
    // this.points       = document.getElementsByClassName("point");

    this.dropField.addEventListener("drop", this.dropHandler.bind(this));
    this.dropField.addEventListener("dragover", this.dragoverHandler.bind(this));

    // this.outerImage.addEventListener("load", this.outerImageLoadHandler.bind(this));
    // this.outerImage.addEventListener("scrollfnction", this.scroll.bind(this));
    document.body.addEventListener('mousewheel', this.scroll.bind(this));

    // this.innerImage.addEventListener("load", this.innerImageLoadHandler.bind(this));
    // this.innerImage.addEventListener("scrollfnction", this.scroll.bind(this));
    // this.points[0].addEventListener("drag", this.dragPointHandler.bind(this));
    // this.points[0].addEventListener("dragend", this.dropPointHandler.bind(this));
  }

  dropHandler(event) {
    event.preventDefault();

    this.dropField.classList.add("hidden")
    this.displayField.classList.remove("hidden");
    this.displayField.style.width = document.body.clientWidth;
    this.displayField.style.height = document.body.clientHeight;

    this.outerImage.src = URL.createObjectURL(event.dataTransfer.files[0]);
  }

  dragoverHandler(event) {
    event.preventDefault();
  }

  outerImageLoadHandler(event) {
    // this.resetPointPositions();
  }

  innerImageLoadHandler(event) {
    this.innerImage.style.maxHeight = this.displayField.clientHeight / 4;
    this.innerImage.style.maxWidth  = this.displayField.clientWidth / 4;

    this.innerImage.style.left = (document.body.clientWidth - this.innerImage.clientWidth) / 2
    this.innerImage.style.top = (document.body.clientHeight - this.innerImage.clientHeight) / 2
  }

  scroll(event) {
    if (event.deltaY > 0) {
      console.debug("scroll out");
      this.outerImage.zoomOut();
    } else {
      this.outerImage.zoomIn();
      console.debug("scroll in");

    }
  }

  // resetPointPositions() {
  //   var middle = {
  //     x: this.displayField.clientWidth / 2,
  //     y: this.displayField.clientHeight / 2
  //   }
  //   var offset = 20
  //
  //   this.points[0].style.top  = middle.y - offset;
  //   this.points[0].style.left = middle.x - offset;
  //
  //   this.points[1].style.top  = middle.y + offset;
  //   this.points[1].style.left = middle.x - offset;
  //
  //   this.points[2].style.top  = middle.y + offset;
  //   this.points[2].style.left = middle.x + offset;
  //
  //   this.points[3].style.top  = middle.y - offset;
  //   this.points[3].style.left = middle.x + offset;
  // }

  // dragPointHandler(event) {
  //   event.preventDefault();
  //   this.points[0].classList.add("hidden");
  // }

  // dropPointHandler(event) {
  //   event.preventDefault();
  //   this.points[0].classList.remove("hidden");
  //   this.points[0].style.top  = event.clientY - 5;
  //   this.points[0].style.left = event.clientX - 5;
  // }
}

class Image {
  constructor(element) {
    this.element = element;
    this.element.addEventListener("load", this.onload.bind(this));
    // this.center = { x: 0, y: 0 };
  }

  set src(source) {
    this.element.src = source;
  }

  onload(event) {
    // this.element.style.maxHeight = this.displayField.clientHeight;
    // this.element.style.maxWidth  = this.displayField.clientWidth;
    //
    // this.element.style.left = (this.displayField.clientWidth - this.outerImage.clientWidth) / 2;
    // this.element.style.top  = (this.displayField.clientHeight - this.outerImage.clientHeight) / 2;
    // this.resizeTo(100, 100);
    this.resetMargin();
  }

  resetMargin() {
    this.element.style.marginLeft = -this.element.clientWidth / 2;
    this.element.style.marginTop = -this.element.clientHeight / 2;
  }

  zoomIn() {
    var ratio = 10;
    this.resizeTo(this.width + ratio, this.height + ratio);
    this.resetMargin();
  }

  zoomOut() {
    var ratio = -10;
    this.resizeTo(this.width + ratio, this.height + ratio);
    this.resetMargin();
  }

  get height() {
    return parseInt(this.element.style.height) || this.element.clientHeight
  }

  get width() {
    return parseInt(this.element.style.width) || this.element.clientWidth
  }

  resizeTo(width, height) {
    this.element.style.height = height;
    this.element.style.width  = width;
  }
}
