import type { TestRoute, Waypoint } from '../types/route';

/**
 * Generates a Google Maps driving directions URL with all intermediate waypoints.
 * Supported on mobile (iOS/Android) and desktop.
 */
export function buildGoogleMapsRouteUrl(origin: Waypoint, waypoints: Waypoint[], destination: Waypoint): string {
  const originStr = `${origin.lat.toFixed(5)},${origin.lng.toFixed(5)}`;
  const destStr = `${destination.lat.toFixed(5)},${destination.lng.toFixed(5)}`;
  
  if (waypoints.length === 0) {
    return `https://www.google.com/maps/dir/?api=1&origin=${originStr}&destination=${destStr}&travelmode=driving`;
  }

  const waypointsStr = waypoints.map(w => `${w.lat.toFixed(5)},${w.lng.toFixed(5)}`).join('|');
  return `https://www.google.com/maps/dir/?api=1&origin=${originStr}&destination=${destStr}&waypoints=${encodeURIComponent(waypointsStr)}&travelmode=driving`;
}

/**
 * Generates an Apple Maps driving directions URL with all intermediate waypoints.
 * Automatically triggers the native Apple Maps app on iPhone/iPad/Mac.
 */
export function buildAppleMapsRouteUrl(origin: Waypoint, waypoints: Waypoint[] = [], destination: Waypoint): string {
  const saddr = `${origin.lat.toFixed(5)},${origin.lng.toFixed(5)}`;
  if (!waypoints || waypoints.length === 0) {
    return `https://maps.apple.com/?saddr=${saddr}&daddr=${destination.lat.toFixed(5)},${destination.lng.toFixed(5)}&dirflg=d`;
  }
  
  // Apple Maps format for multiple waypoints: daddr=stop1+to:stop2+to:finalStop
  const stops = [...waypoints.map(w => `${w.lat.toFixed(5)},${w.lng.toFixed(5)}`), `${destination.lat.toFixed(5)},${destination.lng.toFixed(5)}`];
  return `https://maps.apple.com/?saddr=${saddr}&daddr=${stops.join('+to:')}&dirflg=d`;
}

/**
 * Generates a Google Maps pinpoint URL for a specific spot (e.g. a maneuver spot or junction)
 */
export function buildGoogleMapsPinpointUrl(lat: number, lng: number, label?: string): string {
  const query = label ? `${lat.toFixed(5)},${lng.toFixed(5)}+(${encodeURIComponent(label)})` : `${lat.toFixed(5)},${lng.toFixed(5)}`;
  return `https://www.google.com/maps/search/?api=1&query=${query}`;
}

/**
 * Generates an Apple Maps pinpoint URL
 */
export function buildAppleMapsPinpointUrl(lat: number, lng: number, label: string): string {
  return `https://maps.apple.com/?ll=${lat.toFixed(5)},${lng.toFixed(5)}&q=${encodeURIComponent(label)}`;
}

/**
 * Generates and downloads a standard GPX file compatible with Google Earth, OsmAnd, Garmin, and Strava
 */
export function downloadRouteGpx(route: TestRoute): void {
  const gpxHeader = `<?xml version="1.0" encoding="UTF-8"?>
<gpx version="1.1" creator="Sligo Driving Test Routes" xmlns="http://www.topografix.com/GPX/1/1">
  <metadata>
    <name>${escapeXml(route.title)}</name>
    <desc>${escapeXml(route.overview)}</desc>
  </metadata>
  <rte>
    <name>${escapeXml(route.title)}</name>`;

  const gpxWaypoints = route.waypoints.map(w => `
    <rtept lat="${w.lat}" lon="${w.lng}">
      <name>${escapeXml(w.name)}</name>
      <desc>${escapeXml(w.description || '')}</desc>
    </rtept>`).join('');

  const gpxFooter = `
  </rte>
</gpx>`;

  const blob = new Blob([gpxHeader + gpxWaypoints + gpxFooter], { type: 'application/gpx+xml;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `Sligo_Test_Route_${route.routeNumber}_${route.title.replace(/\s+/g, '_')}.gpx`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

function escapeXml(unsafe: string): string {
  return unsafe.replace(/[<>&'"]/g, (c) => {
    switch (c) {
      case '<': return '&lt;';
      case '>': return '&gt;';
      case '&': return '&amp;';
      case '\'': return '&apos;';
      case '"': return '&quot;';
      default: return c;
    }
  });
}
