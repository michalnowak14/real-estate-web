import { ImageSlider } from "./ImageSlider.js";
import { PropertyGallery } from "./PropertyGallery.js";
import { SearchFilter } from "./SearchFilter.js";

class RealEstateApp {
  private imageSlider?: ImageSlider;
  private propertyGallery?: PropertyGallery;
  private searchFilter?: SearchFilter;

  constructor() {
    document.addEventListener("DOMContentLoaded", () => {
      this.initializeComponents();
      this.attachEventListeners();
    });
  }

  private initializeComponents() {
    const sliderContainer = document.querySelector(".slider-images");
    if (sliderContainer) {
      this.imageSlider = new ImageSlider(sliderContainer);
    }

    const galleryContainer = document.querySelector(".properties-grid");
    if (galleryContainer) {
      this.propertyGallery = new PropertyGallery(".properties-grid");
    }

    const searchInput = document.getElementById(
      "search-input"
    ) as HTMLInputElement | null;
    if (searchInput) {
      this.searchFilter = new SearchFilter(searchInput);
    }
  }

  private attachEventListeners() {
    const mobileMenuToggle = document.querySelector(".mobile-menu-toggle");
    const navMenu = document.querySelector(".nav-menu");

    if (mobileMenuToggle && navMenu) {
      mobileMenuToggle.addEventListener("click", () => {
        navMenu.classList.toggle("active");
      });
    }
  }
}

new RealEstateApp();
