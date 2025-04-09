const itemContainer = document.getElementById(
  "item-container"
) as HTMLElement | null;

const urlParams = new URLSearchParams(window.location.search);
const propertyId: string | null = urlParams.get("id");

interface PropertyDetails {
  id: number;
  title: string;
  type: string;
  price: number;
  bedrooms: number;
  bathrooms: number;
  squareMeters: number;
  location: {
    city: string;
    neighborhood: string;
    coordinates: {
      lat: number;
      lng: number;
    };
  };
  amenities: string[];
  description: string;
  images: string[];
}

async function getPropertyDetails(
  id: string | null
): Promise<PropertyDetails | null> {
  if (!id) return null;

  try {
    const response = await fetch("../dist/data/properties.json");
    if (!response.ok) throw new Error("Failed to load property data");

    const data = await response.json();
    return (
      data.properties.find((p: PropertyDetails) => p.id === parseInt(id)) ||
      null
    );
  } catch (error) {
    console.error("Error loading property:", error);
    return null;
  }
}

async function renderPropertyDetails() {
  if (!itemContainer) return;

  const property = await getPropertyDetails(propertyId);

  if (!property) {
    itemContainer.innerHTML = "<h2>Property not found</h2>";
    return;
  }

  itemContainer.innerHTML = `
    <h2>${property.title}</h2>
    <img src="${property.images[0]}" alt="${property.title}">
    <p id="basic-info">${property.description}</p>
    <button class="show-more-btn">Show More</button>
    <div class="extra-info" style="display: none;">
      <strong>Price:</strong> $${property.price.toLocaleString()}<br>
      <strong>Bedrooms:</strong> ${property.bedrooms}<br>
      <strong>Bathrooms:</strong> ${property.bathrooms}<br>
      <strong>Size:</strong> ${property.squareMeters} m²<br>
      <strong>Location:</strong> ${property.location.neighborhood}, ${
    property.location.city
  }<br>
      <strong>Amenities:</strong> ${property.amenities.join(", ")}
      <h4>Property describtion:</h4>
      <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Consequuntur, nam. Aperiam, facilis. Nihil, vel aperiam! Placeat tempore assumenda, soluta, earum dicta hic aliquid distinctio officia quod, recusandae delectus itaque eum consequatur minus possimus quo quidem culpa vero repudiandae. Consectetur nobis facilis explicabo nisi obcaecati quis possimus molestias saepe neque a culpa eaque, sit quasi deleniti voluptates repudiandae quisquam, nihil numquam, sapiente consequatur aspernatur dolorum officiis asperiores. Ea veniam aspernatur facilis, maiores omnis ipsum eius quae. Nostrum quos vel aut at pariatur optio sunt est hic ad sint! Animi at maxime corrupti error ipsam illum numquam asperiores aliquid hic, cumque expedita doloremque quos, assumenda recusandae eaque facilis doloribus molestiae sed inventore nihil voluptate! Corporis, commodi! Deleniti facilis, fugiat reiciendis nulla velit neque dolore, illum aspernatur praesentium veritatis ut soluta voluptatem perferendis ratione animi laborum atque! Harum reiciendis dolorum perspiciatis laborum voluptatibus quia minus nihil ut libero voluptates voluptatem rem, dolore numquam cumque laudantium magni et unde sit quasi similique odit quidem ex quos? Natus dolores libero modi officia similique minus sunt tempore quidem numquam quis facilis, repellendus hic temporibus sequi accusamus aperiam non, quam molestias quo nostrum repellat! Repellat eos nesciunt, reprehenderit culpa ipsa deserunt fuga, blanditiis labore laboriosam minima laudantium perferendis officiis soluta. Qui, quam esse ullam iusto consequuntur quibusdam fugiat assumenda voluptas, laudantium eaque, unde rerum tempora hic! Asperiores velit nesciunt, nemo repudiandae ipsum magnam eligendi porro delectus quae? Quo molestiae iusto nulla veritatis ad repudiandae autem voluptatum necessitatibus dolorum incidunt! Sit, nesciunt consequuntur perferendis culpa debitis neque recusandae libero, cum dicta fuga vitae, ipsum enim voluptatum architecto pariatur placeat at amet rem reiciendis repellat necessitatibus! A eum obcaecati odit? Doloremque magnam quisquam, iusto consequatur quae dolores, modi libero earum facilis eos dolore sit maiores dolorum debitis molestiae mollitia cupiditate nisi labore. Quae natus repudiandae minima dolor! Vero, eveniet.</p>
    </div>
    
  `;
}

renderPropertyDetails();

if (itemContainer) {
  itemContainer.addEventListener("click", (event) => {
    const target = event.target as HTMLElement;

    if (target && target.classList.contains("show-more-btn")) {
      const extraInfo = target.nextElementSibling as HTMLElement;
      if (extraInfo && extraInfo.classList.contains("extra-info")) {
        extraInfo.style.display = "block";
        target.style.display = "none";
      }
    }
  });
}
