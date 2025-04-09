document.addEventListener("DOMContentLoaded", () => {
  const map = L.map("map").setView([40.760871, -73.951148], 13);

  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution:
      '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  }).addTo(map);

  L.marker([40.760871, -73.951148])
    .addTo(map)
    .bindPopup("Real Estate Office")
    .openPopup();
});
