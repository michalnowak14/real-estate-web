async function loadComponent(
  containerId: string,
  filePath: string
): Promise<void> {
  try {
    const response = await fetch(filePath);
    if (!response.ok) throw new Error(`Failed to load ${filePath}`);
    const html = await response.text();
    const container = document.getElementById(containerId);
    if (container) {
      container.innerHTML = html;
    } else {
      console.warn(`Container with ID "${containerId}" not found.`);
    }
  } catch (error) {
    console.error(error);
  }
}

document.addEventListener("DOMContentLoaded", () => {
  loadComponent("nav-container", "components/nav.html");
  loadComponent("footer-container", "components/footer.html");
});
