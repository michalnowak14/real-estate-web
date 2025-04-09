interface Property {
  id: number;
  title: string;
  type: string;
  price: number;
  location: {
    city: string;
    neighborhood: string;
  };
}

export class SearchFilter {
  private searchInput: HTMLInputElement;
  private properties: Property[] = [];
  private resultsContainer: HTMLElement | null;

  constructor(searchInput: HTMLInputElement) {
    this.searchInput = searchInput;
    this.resultsContainer = document.querySelector(".search-results");

    this.loadProperties();
    this.setupEventListeners();
  }

  private async loadProperties() {
    try {
      const response = await fetch("dist/data/properties.json");
      if (!response.ok) {
        throw new Error(`Failed to fetch properties: ${response.statusText}`);
      }

      const data = await response.json();
      this.properties = Array.isArray(data.properties) ? data.properties : [];

      console.log("Properties loaded for search:", this.properties);
    } catch (error) {
      console.error("Error loading properties:", error);
      if (this.resultsContainer) {
        this.resultsContainer.innerHTML = "<p>Failed to load properties.</p>";
      }
    }
  }

  private setupEventListeners() {
    this.searchInput.addEventListener("input", () => this.filterProperties());
  }

  private filterProperties() {
    const searchTerm = this.searchInput.value.toLowerCase().trim();

    if (searchTerm.length < 2) {
      this.clearResults();
      return;
    }

    const filteredProperties = this.properties.filter(
      (property) =>
        property.title.toLowerCase().includes(searchTerm) ||
        property.location.city.toLowerCase().includes(searchTerm) ||
        property.location.neighborhood.toLowerCase().includes(searchTerm)
    );

    this.displayResults(filteredProperties);
  }

  private displayResults(properties: Property[]) {
    if (!this.resultsContainer) return;

    this.resultsContainer.innerHTML =
      properties.length === 0
        ? "<p>No properties found.</p>"
        : properties
            .map(
              (property) => `
                  <div class="search-result">
                      <h3>${property.title}</h3>
                      <p>Location: ${property.location.neighborhood}, ${
                property.location.city
              }</p>
                      <p>Type: ${property.type}</p>
                      <p>Price: $${property.price.toLocaleString()}</p>
                  </div>
              `
            )
            .join("");
  }

  private clearResults() {
    if (this.resultsContainer) {
      this.resultsContainer.innerHTML = "";
    }
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const searchInput = document.getElementById(
    "search-input"
  ) as HTMLInputElement;
  if (searchInput) {
    new SearchFilter(searchInput);
  } else {
    console.error("Search input field not found!");
  }
});
