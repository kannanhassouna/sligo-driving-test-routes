import { SLIGO_TEST_ROUTES, SLIGO_TEST_CENTRE, SLIGO_MANEUVER_SPOTS, SLIGO_TRICKY_JUNCTIONS } from '../src/data/sligoRoutes';

console.log("==========================================");
console.log("SLIGO DRIVING TEST ROUTES VERIFICATION");
console.log("==========================================");

let totalErrors = 0;

function assert(condition: boolean, message: string) {
  if (!condition) {
    console.error(`❌ FAIL: ${message}`);
    totalErrors++;
  } else {
    console.log(`✅ PASS: ${message}`);
  }
}

// 1. Test Centre verification
console.log("\n--- 1. Test Centre Verification ---");
assert(SLIGO_TEST_CENTRE.name.includes("Sligo"), "Test Centre name contains Sligo");
assert(SLIGO_TEST_CENTRE.eircode === "F91 N267", `Test Centre Eircode is F91 N267 (actual: ${SLIGO_TEST_CENTRE.eircode})`);
assert(SLIGO_TEST_CENTRE.lat === 54.23857 && SLIGO_TEST_CENTRE.lng === -8.46242, `Coordinates are exact (54.23857, -8.46242)`);
assert(SLIGO_TEST_CENTRE.googleMapsUrl.includes("54.23857,-8.46242"), "Google Maps Test Centre URL is valid");
assert(SLIGO_TEST_CENTRE.appleMapsUrl.includes("54.23857,-8.46242"), "Apple Maps Test Centre URL is valid");

// 2. All 6 Routes verification
console.log("\n--- 2. Route Circuits & Waypoint Verification ---");
assert(SLIGO_TEST_ROUTES.length === 6, `Total route count is 6 (actual: ${SLIGO_TEST_ROUTES.length})`);

SLIGO_TEST_ROUTES.forEach((route) => {
  console.log(`\nVerifying Route ${route.routeNumber}: ${route.title}...`);
  
  // Starting waypoint
  const firstWaypoint = route.waypoints[0];
  assert(
    firstWaypoint.lat === 54.23857 && firstWaypoint.lng === -8.46242,
    `Route ${route.routeNumber} starts at test centre (54.23857, -8.46242)`
  );

  // Finishing waypoint
  const lastWaypoint = route.waypoints[route.waypoints.length - 1];
  assert(
    lastWaypoint.lat === 54.23857 && lastWaypoint.lng === -8.46242,
    `Route ${route.routeNumber} finishes back at test centre (54.23857, -8.46242)`
  );

  // Bounds check for all waypoints
  route.waypoints.forEach((w, idx) => {
    const inLatBounds = w.lat >= 54.20 && w.lat <= 54.32;
    const inLngBounds = w.lng >= -8.55 && w.lng <= -8.40;
    if (!inLatBounds || !inLngBounds) {
      assert(false, `Route ${route.routeNumber} Waypoint ${idx} (${w.name}) out of bounds: [${w.lat}, ${w.lng}]`);
    }
  });

  // Google Maps URL checks
  assert(
    route.googleMapsUrl.includes("origin=54.23857,-8.46242") &&
    route.googleMapsUrl.includes("destination=54.23857,-8.46242") &&
    route.googleMapsUrl.includes("travelmode=driving"),
    `Route ${route.routeNumber} Google Maps URL has valid origin, destination & driving mode`
  );

  // Apple Maps URL checks
  assert(
    route.appleMapsUrl.includes("saddr=54.23857,-8.46242") &&
    route.appleMapsUrl.includes("dirflg=d"),
    `Route ${route.routeNumber} Apple Maps URL has valid start address & driving flag`
  );

  // Turn-by-turn cues checks
  assert(route.turnByTurn.length >= 6, `Route ${route.routeNumber} has detailed turn cues (count: ${route.turnByTurn.length})`);
  assert(
    route.turnByTurn[0].instruction.toLowerCase().includes("seamus mcdaniel") ||
    route.turnByTurn[0].streetName.toLowerCase().includes("cuilbeg") ||
    route.turnByTurn[0].instruction.toLowerCase().includes("cuilbeg"),
    `Route ${route.routeNumber} Step 1 mentions departing Seamus McDaniel / Cuilbeg`
  );

  // Maneuvers tested
  assert(route.maneuversTested.length > 0, `Route ${route.routeNumber} lists tested maneuvers (${route.maneuversTested.join(', ')})`);
});

// 3. Maneuver Spots checks
console.log("\n--- 3. Maneuver Spots Verification ---");
assert(SLIGO_MANEUVER_SPOTS.length === 6, `Total maneuver spots is 6 (actual: ${SLIGO_MANEUVER_SPOTS.length})`);
SLIGO_MANEUVER_SPOTS.forEach((spot) => {
  assert(spot.googleMapsUrl.includes(spot.lat.toFixed(5)), `Maneuver ${spot.title} has valid Google Maps URL`);
  assert(spot.appleMapsUrl.includes(spot.lat.toFixed(5)), `Maneuver ${spot.title} has valid Apple Maps URL`);
  assert(spot.examinerTips.length > 0, `Maneuver ${spot.title} has examiner tips`);
  assert(spot.commonFaults.length > 0, `Maneuver ${spot.title} has fail traps`);
});

// 4. Tricky Junctions checks
console.log("\n--- 4. Tricky Junctions Verification ---");
assert(SLIGO_TRICKY_JUNCTIONS.length === 5, `Total tricky junctions is 5 (actual: ${SLIGO_TRICKY_JUNCTIONS.length})`);
SLIGO_TRICKY_JUNCTIONS.forEach((junc) => {
  assert(junc.recommendedLane.length > 0, `Junction ${junc.name} has lane recommendation`);
  assert(junc.examinerWatchpoints.length > 0, `Junction ${junc.name} has examiner watchpoints`);
});

console.log("\n==========================================");
if (totalErrors === 0) {
  console.log("🎉 ALL VERIFICATIONS PASSED WITH ZERO ERRORS!");
} else {
  console.error(`❌ Total verification errors: ${totalErrors}`);
  process.exit(1);
}
console.log("==========================================");
