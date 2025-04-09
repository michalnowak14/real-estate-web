interface SliderImage {
  src: string;
  alt: string;
}

export class ImageSlider {
  private container: Element;
  private images: SliderImage[] = [
    { src: "../../dist/images/slider4.jpg", alt: "Luxury Apartment" },
    { src: "../../dist/images/slider2.jpg", alt: "Modern House" },
    { src: "../../dist/images/slider5.jpg", alt: "Beachfront Property" },
  ];
  private currentIndex: number = 0;

  constructor(container: Element) {
    this.container = container;
    this.renderSlider();
    this.setupControls();
  }

  private renderSlider() {
    this.container.innerHTML = this.images
      .map(
        (img, index) => `
            <img 
                src="${img.src}" 
                alt="${img.alt}" 
                class="slider-image ${index === 0 ? "active" : ""}"
                style="display: ${index === 0 ? "block" : "none"}"
            >
        `
      )
      .join("");
  }

  private setupControls() {
    const prevButton = document.querySelector(".slider-prev");
    const nextButton = document.querySelector(".slider-next");

    if (prevButton) {
      prevButton.addEventListener("click", () => this.changeSlide(-1));
    }

    if (nextButton) {
      nextButton.addEventListener("click", () => this.changeSlide(1));
    }
  }

  private changeSlide(direction: number) {
    const images = this.container.querySelectorAll(".slider-image");

    images[this.currentIndex].classList.remove("active");
    (images[this.currentIndex] as HTMLImageElement).style.display = "none";

    this.currentIndex =
      (this.currentIndex + direction + images.length) % images.length;

    images[this.currentIndex].classList.add("active");
    (images[this.currentIndex] as HTMLImageElement).style.display = "block";
  }
}
