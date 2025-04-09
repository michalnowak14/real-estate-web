interface Property {
  id: number;
  title: string;
  type: string;
  price: number;
  bedrooms: number;
  bathrooms: number;
  images: string[];
  location: {
    neighborhood: string;
    city: string;
  };
}

export class PropertyGallery {
  private container: Element | null;
  private properties: Property[] = [];
  private filteredProperties: Property[] = [];

  private searchInput!: HTMLInputElement;
  private typeSelect!: HTMLSelectElement;
  private priceRange!: HTMLInputElement;
  private priceDisplay!: HTMLSpanElement;

  private currentPage: number = 1;
  private itemsPerPage: number = 10;

  constructor(containerSelector: string) {
    this.container = document.querySelector(containerSelector);

    if (!this.container) {
      console.error("Properties container not found!");
      return;
    }

    this.searchInput = document.getElementById(
      "search-input"
    ) as HTMLInputElement;
    this.typeSelect = document.getElementById(
      "type-select"
    ) as HTMLSelectElement;
    this.priceRange = document.getElementById(
      "price-range"
    ) as HTMLInputElement;
    this.priceDisplay = document.getElementById(
      "price-display"
    ) as HTMLSpanElement;

    this.setupFilterListeners();

    this.loadProperties();
  }

  private setupFilterListeners() {
    if (this.searchInput) {
      this.searchInput.addEventListener("input", () => this.applyFilters());
    }

    if (this.typeSelect) {
      this.typeSelect.addEventListener("change", () => this.applyFilters());
    }

    if (this.priceRange) {
      this.priceRange.addEventListener("input", () => {
        if (this.priceDisplay) {
          this.priceDisplay.textContent = parseInt(
            this.priceRange.value
          ).toLocaleString();
        }
        this.applyFilters();
      });
    }
  }

  private async loadProperties() {
    try {
      const response = await fetch("../../dist/data/properties.json");
      if (!response.ok) {
        throw new Error(`Failed to fetch properties: ${response.statusText}`);
      }
      const data = await response.json();
      this.properties = data.properties || [];
      this.filteredProperties = [...this.properties];
      console.log("Properties loaded:", this.properties);
      this.renderProperties();
    } catch (error) {
      console.error("Error loading properties:", error);
      this.container!.innerHTML = "<p>Failed to load properties.</p>";
    }
  }

  private applyFilters() {
    const searchTerm = this.searchInput?.value.toLowerCase().trim() || "";
    const propertyType = this.typeSelect?.value || "";
    const maxPrice = this.priceRange
      ? parseInt(this.priceRange.value)
      : Infinity;

    this.filteredProperties = this.properties.filter((property) => {
      const matchesSearch =
        searchTerm === "" ||
        property.title.toLowerCase().includes(searchTerm) ||
        property.location.neighborhood.toLowerCase().includes(searchTerm) ||
        property.location.city.toLowerCase().includes(searchTerm);

      const matchesType = propertyType === "" || property.type === propertyType;
      const matchesPrice = property.price <= maxPrice;

      return matchesSearch && matchesType && matchesPrice;
    });

    this.currentPage = 1;
    this.renderProperties();

    if (this.filteredProperties.length === 0) {
      this.container!.innerHTML =
        "<p>No properties match your search criteria.</p>";
    }
  }

  private renderProperties() {
    if (!this.container) return;

    if (this.filteredProperties.length === 0) {
      this.container.innerHTML = "<p>No properties available.</p>";
      return;
    }

    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    const propertiesToShow = this.filteredProperties.slice(
      startIndex,
      endIndex
    );

    this.container.innerHTML = propertiesToShow
      .map(
        (property) => `
          <a href="details.html?id=${property.id}" class="property-card">
          <span class="type">For ${property.type}</span>
            <img src="${property.images[0]}" alt="${property.title}">
            <h3>${property.title}</h3>
            <p><i class="fa-solid fa-dollar-sign"></i>${property.price.toLocaleString()}</p>
            <p>${property.bedrooms} <i class="fa-solid fa-bed"></i> | ${
          property.bathrooms
        } <i class="fa-solid fa-shower"></i></p>
            <p><i class="fa-solid fa-location-dot"></i> ${
              property.location.neighborhood
            }, ${property.location.city}</p>
        
          </a>
        `
      )
      .join("");

    this.renderPaginationControls();
  }

  private renderPaginationControls() {
    const paginationContainer = document.getElementById("pagination-container");
    if (!paginationContainer) return;

    paginationContainer.innerHTML = "";

    const totalPages = Math.ceil(
      this.filteredProperties.length / this.itemsPerPage
    );

    const prevButton = document.createElement("button");
    prevButton.textContent = "❮";
    prevButton.disabled = this.currentPage === 1;
    prevButton.addEventListener("click", () => {
      if (this.currentPage > 1) {
        this.currentPage--;
        this.renderProperties();
      }
    });

    paginationContainer.appendChild(prevButton);

    for (let i = 1; i <= totalPages; i++) {
      const pageButton = document.createElement("button");
      pageButton.textContent = i.toString();
      if (i === this.currentPage) {
        pageButton.classList.add("active");
      }
      pageButton.addEventListener("click", () => {
        this.currentPage = i;
        this.renderProperties();
      });

      paginationContainer.appendChild(pageButton);
    }

    const nextButton = document.createElement("button");
    nextButton.textContent = "❯";
    nextButton.disabled = this.currentPage === totalPages;
    nextButton.addEventListener("click", () => {
      if (this.currentPage < totalPages) {
        this.currentPage++;
        this.renderProperties();
      }
    });

    paginationContainer.appendChild(nextButton);
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const galleryContainer = document.querySelector(".properties-container");
  if (galleryContainer) {
    new PropertyGallery(".properties-container");
  } else {
    console.error("Properties container not found!");
  }
});
