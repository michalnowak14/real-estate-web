export interface Location {
  street: string;
  neighborhood: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
}

export interface PropertyFeatures {
  bedrooms: number;
  bathrooms: number;
  halfBathrooms?: number;
  squareFootage: number;
  parkingSpaces?: number;
  yearBuilt: number;
  lotSize?: number; // in square feet
}

export interface PropertyFinancials {
  price: number;
  pricePerSquareFoot?: number;
  propertyTax?: number;
  homeownerAssociationFee?: number;
}

export interface PropertyDetails {
  propertyType:
    | "Single Family"
    | "Condo"
    | "Townhouse"
    | "Apartment"
    | "Multi-Family"
    | "Land";
  style?: string;
  condition: "New" | "Like New" | "Good" | "Needs Renovation";
  floors?: number;
}

export interface Property {
  id: number;
  title: string;
  description: string;

  // Location details
  location: Location;

  // Property characteristics
  features: PropertyFeatures;

  // Financial information
  financials: PropertyFinancials;

  // Additional details
  details: PropertyDetails;

  // Media
  images: string[]; // Array of image URLs
  virtualTourUrl?: string;

  // Additional metadata
  listedDate: Date;
  lastUpdated: Date;

  // Optional extras
  amenities?: string[];
  nearbyPlaces?: {
    schools?: string[];
    shoppingCenters?: string[];
    parks?: string[];
    publicTransport?: string[];
  };

  // Agent/seller information
  listingAgent?: {
    name: string;
    contactEmail: string;
    contactPhone: string;
  };
}

// Example of how to use the interface
export const exampleProperty: Property = {
  id: 1,
  title: "Luxurious Downtown Loft",
  description:
    "Spacious modern loft in the heart of the city with stunning views and high-end finishes.",

  location: {
    street: "123 Urban Street",
    neighborhood: "Downtown",
    city: "San Francisco",
    state: "CA",
    zipCode: "94105",
    country: "United States",
  },

  features: {
    bedrooms: 2,
    bathrooms: 2,
    halfBathrooms: 1,
    squareFootage: 1800,
    parkingSpaces: 2,
    yearBuilt: 2018,
    lotSize: 0, // Applicable for condos/apartments
  },

  financials: {
    price: 1250000,
    pricePerSquareFoot: 694,
    propertyTax: 15625,
    homeownerAssociationFee: 750,
  },

  details: {
    propertyType: "Condo",
    style: "Modern",
    condition: "Like New",
    floors: 1,
  },

  images: [
    "/images/property1-main.jpg",
    "/images/property1-kitchen.jpg",
    "/images/property1-livingroom.jpg",
  ],
  virtualTourUrl: "https://virtualtour.example.com/property1",

  listedDate: new Date("2024-03-26"),
  lastUpdated: new Date("2024-03-26"),

  amenities: ["Gym", "Swimming Pool", "Rooftop Terrace", "24/7 Concierge"],

  nearbyPlaces: {
    schools: ["Downtown Elementary", "Urban High School"],
    shoppingCenters: ["City Mall", "Urban Shops"],
    parks: ["Central Park"],
    publicTransport: ["Metro Station", "Bus Stop"],
  },

  listingAgent: {
    name: "Jane Doe",
    contactEmail: "jane.doe@realestate.com",
    contactPhone: "+1 (555) 123-4567",
  },
};
