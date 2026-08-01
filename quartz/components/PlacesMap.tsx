import {
  QuartzComponent,
  QuartzComponentConstructor,
  QuartzComponentProps,
} from "./types";
import { classNames } from "../util/lang";
import { resolveRelative } from "../util/path";
import z from "zod";
import { frontmatterSchema } from "../schemata";

const PlacesMap: QuartzComponent = ({
  fileData,
  allFiles,
  displayClass,
}: QuartzComponentProps) => {
  if (!fileData.frontmatter?.isMapPage) {
    return null;
  }

  // Strict alignment with Zod schema definition
  const places = allFiles
    .filter(
      (f) =>
        f.frontmatter?.type &&
        f.frontmatter?.coordinates &&
        Array.isArray(f.frontmatter.coordinates) &&
        f.frontmatter.coordinates.length === 2,
    )
    .map((f) => {
      const frontmatter = z.parse(frontmatterSchema, f.frontmatter);
      return {
        title: frontmatter?.title || f.name,
        url: resolveRelative(fileData.slug!, f.slug!),
        lat: frontmatter.coordinates![0],
        lng: frontmatter.coordinates![1],
        type: frontmatter.type || "Place",
        foundingDate: frontmatter.foundingDate || null,
        dissolutionDate: frontmatter.dissolutionDate || null,
      };
    });

  return (
    <div class={classNames(displayClass, "places-map-container")}>
      <div
        id="quartz-map"
        style={{
          height: "70vh",
          width: "100%",
          borderRadius: "8px",
          zIndex: 0,
        }}
      ></div>
      <script
        id="map-data"
        type="application/json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(places).replace(/</g, "\\u003c"),
        }}
      />
    </div>
  );
};

PlacesMap.css = `
.places-map-container {
  margin: 2rem 0;
  border: 1px solid var(--lightgray);
  border-radius: 8px;
}
/* Ensure popups adapt to Quartz's dark/light modes */
.leaflet-popup-content-wrapper {
  background: var(--light);
  color: var(--dark);
  border: 1px solid var(--lightgray);
}
.leaflet-popup-tip {
  background: var(--light);
}
.leaflet-popup-content a {
  color: var(--tertiary);
}
.custom-quartz-marker {
  background: transparent;
  border: none;
}
`;

PlacesMap.afterDOMLoaded = `
  const loadDependency = (type, url) => new Promise((resolve) => {
    if (document.querySelector(\`\${type}[href="\${url}"], \${type}[src="\${url}"]\`)) return resolve();
    const el = document.createElement(type === 'link' ? 'link' : 'script');
    if (type === 'link') { el.rel = 'stylesheet'; el.href = url; }
    else { el.src = url; }
    el.onload = resolve;
    document.head.appendChild(el);
  });

  const typeConfig = {
    'AdministrativeArea': { label: 'Адміністративна одиниця', color: '#ef4444' },
    'GovernmentOrganization': { label: 'Урядова організація', color: '#f97316' },
    'Organization': { label: 'Організація', color: '#eab308' },
    'Place': { label: 'Населений пункт', color: '#3b82f6' },
    'PlaceOfWorship': { label: 'Культова споруда', color: '#a855f7' }
  };

  const createSvgIcon = (color) => \`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 36" width="24px" height="36px">
      <path fill="\${color}" stroke="var(--light)" stroke-width="1.5" d="M12 0C5.373 0 0 5.373 0 12c0 8.442 11.233 23.364 11.603 23.856.208.277.597.277.805 0C12.77 35.364 24 20.442 24 12 24 5.373 18.627 0 12 0zm0 18c-3.314 0-6-2.686-6-6s2.686-6 6-6 6 2.686 6 6-2.686 6-6 6z"/>
    </svg>\`;

  // Bind execution to Quartz's internal SPA router lifecycle
  document.addEventListener("nav", async () => {
    const mapContainer = document.getElementById('quartz-map');
    
    if (!mapContainer) {
      // Teardown sequence: User navigated away from the map page
      if (window.quartzMapInstance) {
        window.quartzMapInstance.off();
        window.quartzMapInstance.remove();
        window.quartzMapInstance = null;
      }
      return;
    }

    // Teardown sequence: User navigated back to the map page
    if (window.quartzMapInstance) {
      window.quartzMapInstance.off();
      window.quartzMapInstance.remove();
      window.quartzMapInstance = null;
    }

    await Promise.all([
      loadDependency('link', 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css'),
      loadDependency('link', 'https://unpkg.com/leaflet.markercluster@1.5.3/dist/MarkerCluster.css'),
      loadDependency('link', 'https://unpkg.com/leaflet.markercluster@1.5.3/dist/MarkerCluster.Default.css')
    ]);
    await loadDependency('script', 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js');
    await loadDependency('script', 'https://unpkg.com/leaflet.markercluster@1.5.3/dist/leaflet.markercluster.js');

    const rawData = document.getElementById('map-data')?.textContent;
    if (!rawData) return;
    const places = JSON.parse(rawData);

    const map = L.map('quartz-map').setView([48.764995517698665, 28.163189727188115], 11);
    window.quartzMapInstance = map;

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap contributors'
    }).addTo(map);

    const markers = L.markerClusterGroup({
      maxClusterRadius: 40,
      spiderfyOnMaxZoom: true,
      showCoverageOnHover: false
    });

    places.forEach(place => {
      const config = typeConfig[place.type] || { label: place.type, color: '#9ca3af' };
      
      let datesHtml = '';
      if (place.foundingDate) datesHtml += \`<span style="color: var(--gray);">Засновано: \${place.foundingDate}</span><br>\`;
      if (place.dissolutionDate) datesHtml += \`<span style="color: var(--gray);">Ліквідовано: \${place.dissolutionDate}</span><br>\`;

      const customIcon = L.divIcon({
        html: createSvgIcon(config.color),
        className: 'custom-quartz-marker',
        iconSize: [24, 36],
        iconAnchor: [12, 36], 
        popupAnchor: [0, -36]
      });

      const marker = L.marker([place.lat, place.lng], { icon: customIcon });
      marker.bindPopup(\`
        <div style="font-family: var(--bodyFont); line-height: 1.4;">
          <strong><a href="\${place.url}">\${place.title}</a></strong><br>
          <span style="color: var(--gray);">Тип: \${config.label}</span><br>
          \${datesHtml}
        </div>
      \`);
      markers.addLayer(marker);
    });

    map.addLayer(markers);
    
    const ro = new ResizeObserver(() => {
      map.invalidateSize();
    });
    ro.observe(mapContainer);
  });
`;

export default (() => PlacesMap) satisfies QuartzComponentConstructor;
