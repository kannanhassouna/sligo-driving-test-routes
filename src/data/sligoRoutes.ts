import type { TestRoute, ManeuverSpot, TrickyJunction, Waypoint } from '../types/route';
import { buildGoogleMapsRouteUrl, buildAppleMapsRouteUrl, buildGoogleMapsPinpointUrl, buildAppleMapsPinpointUrl } from '../utils/navigationLinks';

export const SLIGO_TEST_CENTRE = {
  name: "RSA Driving Test Centre (Sligo)",
  premises: "Seamus McDaniel Motorcycles Ltd",
  address: "Cuilbeg, Carraroe, Co. Sligo",
  eircode: "F91 N267",
  lat: 54.23857,
  lng: -8.46242,
  googleMapsUrl: buildGoogleMapsPinpointUrl(54.23857, -8.46242, "Seamus McDaniel Motorcycles Ltd RSA Driving Test Centre Carraroe Sligo"),
  appleMapsUrl: buildAppleMapsPinpointUrl(54.23857, -8.46242, "Seamus McDaniel Motorcycles Ltd RSA Driving Test Centre Carraroe Sligo")
};

const baseCentreWaypoint: Waypoint = {
  id: 'centre-start',
  name: 'Seamus McDaniel Motorcycles Ltd (Cuilbeg, Carraroe)',
  lat: 54.23857,
  lng: -8.46242,
  description: 'RSA Test Centre parking bays at Seamus McDaniel Motorcycles, Cuilbeg, Carraroe',
  type: 'start',
  speedLimit: 50
};

// ==========================================
// 6 OFFICIAL SLIGO TEST ROUTE FAMILIES
// ==========================================

const route1Waypoints: Waypoint[] = [
  baseCentreWaypoint,
  { id: 'r1-w1', name: 'Carraroe Roundabout', lat: 54.2492, lng: -8.4642, description: 'Take 2nd exit onto N4 Slip towards Sligo/Donegal', type: 'hazard', speedLimit: 60 },
  { id: 'r1-w2', name: 'Caltragh Interchange Exit', lat: 54.2520, lng: -8.4735, description: 'Take exit slip road towards Caltragh / Pearse Rd', type: 'turn', speedLimit: 50 },
  { id: 'r1-w3', name: 'Caltragh Road 30km/h Zone', lat: 54.2530, lng: -8.4760, description: 'Enter residential slow zone, watch 30km/h signs', type: 'speed_change', speedLimit: 30 },
  { id: 'r1-w4', name: 'Caltragh Crescent (Reverse Corner)', lat: 54.2542, lng: -8.4775, description: 'Examiner directs candidate to pull in on the left for reverse around corner maneuver', type: 'maneuver', speedLimit: 30 },
  { id: 'r1-w5', name: 'Caltragh Hill Incline', lat: 54.2532, lng: -8.4745, description: 'Hill start test on gradient exiting the estate', type: 'maneuver', speedLimit: 50 },
  { id: 'r1-w6', name: 'Pearse Road Junction', lat: 54.2575, lng: -8.4710, description: 'Turn right onto Pearse Road. Check mirrors and watch cycle lane.', type: 'hazard', speedLimit: 50 },
  { id: 'r1-w7', name: 'Carraroe Roundabout (Return)', lat: 54.2492, lng: -8.4642, description: 'Take 1st exit onto Old Dublin Road', type: 'turn', speedLimit: 50 },
  { ...baseCentreWaypoint, id: 'r1-end', type: 'finish', name: 'Seamus McDaniel Motorcycles (Return)' }
];

const route2Waypoints: Waypoint[] = [
  baseCentreWaypoint,
  { id: 'r2-w1', name: 'Carraroe Roundabout', lat: 54.2492, lng: -8.4642, description: 'Take 1st exit onto Pearse Road (R287)', type: 'turn', speedLimit: 50 },
  { id: 'r2-w2', name: 'Pearse Road / Cemetery Road', lat: 54.2605, lng: -8.4685, description: 'Turn right onto Cemetery Road. Watch blind junction & oncoming traffic', type: 'hazard', speedLimit: 50 },
  { id: 'r2-w3', name: 'Cleveragh Road', lat: 54.2635, lng: -8.4570, description: 'Proceed along Cleveragh Road past Regional Sports Centre', type: 'turn', speedLimit: 50 },
  { id: 'r2-w4', name: 'Devins Drive / Cranmore', lat: 54.2625, lng: -8.4630, description: 'Enter estate for Turnabout (3-point turn). Watch parked vehicles.', type: 'maneuver', speedLimit: 30 },
  { id: 'r2-w5', name: 'Cleveragh Roundabout', lat: 54.2618, lng: -8.4590, description: 'Navigate roundabout cleanly into Tonaphubble / Pearse Road link', type: 'hazard', speedLimit: 50 },
  { id: 'r2-w6', name: 'Pearse Road Southbound', lat: 54.2570, lng: -8.4695, description: 'Steady pace, maintain lane discipline across pedestrian crossings', type: 'turn', speedLimit: 50 },
  { id: 'r2-w7', name: 'Carraroe Roundabout', lat: 54.2492, lng: -8.4642, description: 'Take 1st exit to Old Dublin Road', type: 'turn', speedLimit: 50 },
  { ...baseCentreWaypoint, id: 'r2-end', type: 'finish', name: 'Seamus McDaniel Motorcycles (Return)' }
];

const route3Waypoints: Waypoint[] = [
  baseCentreWaypoint,
  { id: 'r3-w1', name: 'Old Dublin Road Northbound', lat: 54.2460, lng: -8.4635, description: 'Proceed north towards Carraroe junction', type: 'turn', speedLimit: 50 },
  { id: 'r3-w2', name: 'Crozon Park Estate Entrance', lat: 54.2525, lng: -8.4665, description: 'Turn left into Crozon Park residential estate', type: 'turn', speedLimit: 30 },
  { id: 'r3-w3', name: 'Crozon Downs (Reverse Corner)', lat: 54.2538, lng: -8.4678, description: 'Classic RSA reverse around corner spot on sharp left kerb', type: 'maneuver', speedLimit: 30 },
  { id: 'r3-w4', name: 'Crozon Cul-de-Sac (Turnabout)', lat: 54.2545, lng: -8.4688, description: 'Turnabout 3-point turn practice in quiet roadway', type: 'maneuver', speedLimit: 30 },
  { id: 'r3-w5', name: 'Tonaphubble Link', lat: 54.2570, lng: -8.4645, description: 'Exit estate onto Tonaphubble link road heading towards Pearse Road', type: 'turn', speedLimit: 50 },
  { id: 'r3-w6', name: 'Pearse Road Southbound', lat: 54.2530, lng: -8.4690, description: 'Careful observation at junction, filter smoothly', type: 'hazard', speedLimit: 50 },
  { id: 'r3-w7', name: 'Carraroe Roundabout', lat: 54.2492, lng: -8.4642, description: 'Take exit back to Old Dublin Road', type: 'turn', speedLimit: 50 },
  { ...baseCentreWaypoint, id: 'r3-end', type: 'finish', name: 'Seamus McDaniel Motorcycles (Return)' }
];

const route4Waypoints: Waypoint[] = [
  baseCentreWaypoint,
  { id: 'r4-w1', name: 'Carraroe Roundabout', lat: 54.2492, lng: -8.4642, description: 'Take 2nd exit onto N4 Northbound dual carriageway', type: 'hazard', speedLimit: 100 },
  { id: 'r4-w2', name: 'N4 Exit 2 (Pearse Rd / Town)', lat: 54.2610, lng: -8.4735, description: 'Decelerate smoothly on slip road, enter 50km/h zone', type: 'speed_change', speedLimit: 50 },
  { id: 'r4-w3', name: 'Mail Coach Road', lat: 54.2650, lng: -8.4750, description: 'Proceed along Mail Coach Road through residential street', type: 'turn', speedLimit: 50 },
  { id: 'r4-w4', name: 'High Street / Pound Street (Gallows Hill)', lat: 54.2688, lng: -8.4755, description: 'Steep hill start at Stop sign. Examiner tests handbrake control & 360 observation.', type: 'maneuver', speedLimit: 50 },
  { id: 'r4-w5', name: 'Maugheraboy Roundabout', lat: 54.2715, lng: -8.4870, description: 'Multi-exit roundabout. Correct lane position required for Maugheraboy Road.', type: 'hazard', speedLimit: 50 },
  { id: 'r4-w6', name: 'Meadow Park / Kevinsfort', lat: 54.2725, lng: -8.4940, description: 'Quiet estate for reverse around corner or turnabout', type: 'maneuver', speedLimit: 30 },
  { id: 'r4-w7', name: 'Church Hill / Pearse Road Return', lat: 54.2640, lng: -8.4720, description: 'Return via Pearse Road arterial corridor', type: 'turn', speedLimit: 50 },
  { id: 'r4-w8', name: 'Carraroe Roundabout', lat: 54.2492, lng: -8.4642, description: 'Take 1st exit to Old Dublin Road', type: 'turn', speedLimit: 50 },
  { ...baseCentreWaypoint, id: 'r4-end', type: 'finish', name: 'Seamus McDaniel Motorcycles (Return)' }
];

const route5Waypoints: Waypoint[] = [
  baseCentreWaypoint,
  { id: 'r5-w1', name: 'Carraroe Roundabout', lat: 54.2492, lng: -8.4642, description: 'Take 2nd exit onto N4 Dual Carriageway heading north', type: 'hazard', speedLimit: 100 },
  { id: 'r5-w2', name: 'Strandhill Road Exit (R292)', lat: 54.2680, lng: -8.4860, description: 'Take exit towards Strandhill Road, prepare for tight roundabout', type: 'turn', speedLimit: 50 },
  { id: 'r5-w3', name: 'Strandhill Road Approach', lat: 54.2690, lng: -8.4900, description: 'Follow R292 west, watch for oncoming traffic & cyclists', type: 'turn', speedLimit: 50 },
  { id: 'r5-w4', name: 'Oakfield Road', lat: 54.2660, lng: -8.4985, description: 'Turn into Oakfield residential district', type: 'speed_change', speedLimit: 30 },
  { id: 'r5-w5', name: 'Ballydoogan Estate (Maneuver)', lat: 54.2645, lng: -8.5020, description: 'Reverse around left corner into side road; quiet residential kerb', type: 'maneuver', speedLimit: 30 },
  { id: 'r5-w6', name: 'Larkhill Road Return', lat: 54.2625, lng: -8.4880, description: 'Navigate through Larkhill towards town arterial', type: 'turn', speedLimit: 50 },
  { id: 'r5-w7', name: 'N4 Southbound / Carraroe', lat: 54.2540, lng: -8.4720, description: 'Merge onto N4 southbound or via Pearse Road to Carraroe', type: 'turn', speedLimit: 80 },
  { id: 'r5-w8', name: 'Carraroe Roundabout', lat: 54.2492, lng: -8.4642, description: 'Take exit to Old Dublin Road', type: 'turn', speedLimit: 50 },
  { ...baseCentreWaypoint, id: 'r5-end', type: 'finish', name: 'Seamus McDaniel Motorcycles (Return)' }
];

const route6Waypoints: Waypoint[] = [
  baseCentreWaypoint,
  { id: 'r6-w1', name: 'Carraroe Roundabout', lat: 54.2492, lng: -8.4642, description: 'Take 1st exit towards Sligo Town (Pearse Road)', type: 'turn', speedLimit: 50 },
  { id: 'r6-w2', name: 'Pearse Road Corridor', lat: 54.2640, lng: -8.4700, description: 'Maintain lane position, watch traffic signals and pedestrian crossings', type: 'turn', speedLimit: 50 },
  { id: 'r6-w3', name: 'Connaughton Road / Riverside', lat: 54.2725, lng: -8.4670, description: 'Navigate town centre one-way and riverfront junction', type: 'hazard', speedLimit: 50 },
  { id: 'r6-w4', name: 'Doorly Park Entrance', lat: 54.2715, lng: -8.4560, description: 'Enter Doorly Park road, scenic 30km/h zone', type: 'speed_change', speedLimit: 30 },
  { id: 'r6-w5', name: 'Doorly Park Cul-de-Sac (Turnabout)', lat: 54.2705, lng: -8.4525, description: 'Perform Turnabout (3-point turn) with high observation for walkers and cyclists', type: 'maneuver', speedLimit: 30 },
  { id: 'r6-w6', name: 'Cleveragh Link Road', lat: 54.2635, lng: -8.4570, description: 'Proceed past sports pitches towards Cemetery Road', type: 'turn', speedLimit: 50 },
  { id: 'r6-w7', name: 'Pearse Road Southbound', lat: 54.2570, lng: -8.4695, description: 'Return south towards Carraroe', type: 'turn', speedLimit: 50 },
  { id: 'r6-w8', name: 'Carraroe Roundabout', lat: 54.2492, lng: -8.4642, description: 'Take exit to Old Dublin Road', type: 'turn', speedLimit: 50 },
  { ...baseCentreWaypoint, id: 'r6-end', type: 'finish', name: 'Seamus McDaniel Motorcycles (Return)' }
];

export const SLIGO_TEST_ROUTES: TestRoute[] = [
  {
    id: 'sligo-route-1',
    routeNumber: 1,
    title: 'Carraroe & Caltragh Loop',
    subtitle: 'Residential Maneuvers & 30km/h Zone Focus',
    difficulty: 'Moderate',
    distanceKm: 11.2,
    estimatedTimeMin: 32,
    color: '#3B82F6',
    badge: 'Popular Route',
    overview: 'One of the most frequently tested routes in Sligo. Leaves Carraroe via the N4 slip, loops into the Caltragh residential area for the Reverse Around a Corner in Caltragh Crescent, and tests a hill start upon departure.',
    areasCovered: ['Carraroe Roundabout', 'N4 Slip Road', 'Caltragh Interchange', 'Caltragh Crescent', 'Pearse Road'],
    maneuversTested: ['Reverse Around Corner', 'Hill Start'],
    speedZones: ['30 km/h (Caltragh Estate)', '50 km/h (Town/Pearse Rd)', '60-80 km/h (N4 Slips)'],
    startPoint: {
      name: SLIGO_TEST_CENTRE.name,
      eircode: SLIGO_TEST_CENTRE.eircode,
      lat: SLIGO_TEST_CENTRE.lat,
      lng: SLIGO_TEST_CENTRE.lng
    },
    waypoints: route1Waypoints,
    turnByTurn: [
      {
        step: 1,
        instruction: "Exit Seamus McDaniel Motorcycles test parking bays in Cuilbeg onto the road towards Carraroe Roundabout. Check right and left.",
        spokenAudioText: "When safe to do so, move off from the test bay at Seamus McDaniel Motorcycles and turn onto the road towards Carraroe Roundabout.",
        streetName: "Seamus McDaniel Motorcycles / Cuilbeg",
        speedLimit: 50,
        laneGuidance: "Position car centrally in lane, check mirrors and blind spots before moving off."
      },
      {
        step: 2,
        instruction: "Approach Carraroe Roundabout. Take the 2nd exit for N4 / Sligo.",
        spokenAudioText: "At the roundabout ahead, take the second exit for Sligo.",
        streetName: "Carraroe Roundabout",
        speedLimit: 50,
        laneGuidance: "Use left/middle lane. Do not indicate on approach; indicate left past the first exit.",
        hazardAlert: "Multi-lane layout. Watch for fast traffic coming off the N4 bypass."
      },
      {
        step: 3,
        instruction: "Take the exit slip road off the N4 towards Caltragh / Pearse Road.",
        spokenAudioText: "Take the next slip road on your left towards Caltragh.",
        streetName: "Caltragh Interchange Slip",
        speedLimit: 60,
        laneGuidance: "Indicate left early on deceleration lane; brake progressively before the sharp bend."
      },
      {
        step: 4,
        instruction: "Turn right at the junction into Caltragh Road. Observe immediate 30 km/h speed limit.",
        spokenAudioText: "Turn right onto Caltragh Road, and be aware of the 30 kilometer per hour speed limit.",
        streetName: "Caltragh Road",
        speedLimit: 30,
        hazardAlert: "30 km/h sign is often obscured by tree branches in summer. Critical Grade 2/3 trap."
      },
      {
        step: 5,
        instruction: "Turn left into Caltragh Crescent. Prepare for the Reverse Around Corner maneuver.",
        spokenAudioText: "Take the next turn on your left into Caltragh Crescent, and pull in safely on the left.",
        streetName: "Caltragh Crescent",
        speedLimit: 30,
        maneuverNotice: "Maneuver: Reverse Around Corner into Caltragh Crescent. Keep 0.5m from kerb, check all blind spots."
      },
      {
        step: 6,
        instruction: "Complete reverse maneuver, move off safely, and proceed towards the exit incline.",
        spokenAudioText: "Now continue forward and prepare to stop on the incline ahead for a hill start.",
        streetName: "Caltragh Road / Exit Slope",
        speedLimit: 50,
        maneuverNotice: "Maneuver: Hill Start on gentle incline. Apply handbrake, find bite point, check 360 before release."
      },
      {
        step: 7,
        instruction: "Turn right onto Pearse Road. Watch for cyclists and pedestrians.",
        spokenAudioText: "At the junction, turn right onto Pearse Road.",
        streetName: "Pearse Road (R287)",
        speedLimit: 50,
        laneGuidance: "Check right mirror and shoulder blindspot for cyclists before turning across the cycle track."
      },
      {
        step: 8,
        instruction: "Follow Pearse Road south towards Carraroe Roundabout. Take the 1st exit back to Test Centre.",
        spokenAudioText: "Follow the road south to Carraroe Roundabout, and take the first exit for the Test Centre.",
        streetName: "Carraroe Roundabout",
        speedLimit: 50,
        laneGuidance: "Left lane, indicate left on approach."
      },
      {
        step: 9,
        instruction: "Turn into Seamus McDaniel Motorcycles in Cuilbeg. Park in a designated RSA test bay, handbrake on, neutral.",
        spokenAudioText: "Turn into Seamus McDaniel Motorcycles and park in a designated test bay.",
        streetName: "Seamus McDaniel Motorcycles (Cuilbeg)",
        speedLimit: 15
      }
    ],
    examinerWarnings: [
      "Speed Trap: Caltragh residential area is strictly 30 km/h — brake early and don't coast at 40 km/h.",
      "Reverse Corner: In Caltragh Crescent, look over your left shoulder out the back window throughout; don't rely only on mirrors.",
      "Roundabout Lane: Use the left lane for the 1st/2nd exits at Carraroe roundabout and indicate off cleanly."
    ],
    googleMapsUrl: buildGoogleMapsRouteUrl(baseCentreWaypoint, route1Waypoints.slice(1, -1), baseCentreWaypoint),
    appleMapsUrl: buildAppleMapsRouteUrl(baseCentreWaypoint, route1Waypoints.slice(1, -1), baseCentreWaypoint)
  },
  {
    id: 'sligo-route-2',
    routeNumber: 2,
    title: 'Cleveragh & Cranmore Corridor',
    subtitle: 'Tight Residential Estates & Turnabout Maneuver',
    difficulty: 'Challenging',
    distanceKm: 10.8,
    estimatedTimeMin: 30,
    color: '#10B981',
    badge: 'Maneuver Heavy',
    overview: 'Features the busy Pearse Road arterial corridor, a tricky right turn into Cemetery Road, and precision maneuvering through narrow residential roads in Cranmore for the Turnabout (3-point turn).',
    areasCovered: ['Pearse Road', 'Cemetery Road', 'Cleveragh Road', 'Devins Drive', 'Cranmore Estate', 'Sports Complex'],
    maneuversTested: ['Turnabout (3-Point Turn)', 'Hill Start'],
    speedZones: ['30 km/h (Cranmore/Devins Dr)', '50 km/h (Pearse Rd / Cleveragh)'],
    startPoint: {
      name: SLIGO_TEST_CENTRE.name,
      eircode: SLIGO_TEST_CENTRE.eircode,
      lat: SLIGO_TEST_CENTRE.lat,
      lng: SLIGO_TEST_CENTRE.lng
    },
    waypoints: route2Waypoints,
    turnByTurn: [
      {
        step: 1,
        instruction: "Move off from test bay at Seamus McDaniel Motorcycles, Cuilbeg, heading north towards Carraroe Roundabout.",
        spokenAudioText: "Move off from the test bay and proceed north towards Carraroe Roundabout.",
        streetName: "Seamus McDaniel Motorcycles / Cuilbeg",
        speedLimit: 50
      },
      {
        step: 2,
        instruction: "At Carraroe Roundabout, take the 1st exit onto Pearse Road (R287).",
        spokenAudioText: "At the roundabout, take the first exit onto Pearse Road.",
        streetName: "Pearse Road",
        speedLimit: 50,
        laneGuidance: "Left lane approach, indicate left."
      },
      {
        step: 3,
        instruction: "Proceed along Pearse Road. Position for right turn into Cemetery Road.",
        spokenAudioText: "Take the next right turn onto Cemetery Road.",
        streetName: "Cemetery Road Junction",
        speedLimit: 50,
        laneGuidance: "Position car near center line, indicate right early, yield to oncoming traffic.",
        hazardAlert: "Blind brow and restricted visibility from opposite traffic."
      },
      {
        step: 4,
        instruction: "Follow Cemetery Road into Cleveragh Road past Regional Sports Centre.",
        spokenAudioText: "Continue straight onto Cleveragh Road.",
        streetName: "Cleveragh Road",
        speedLimit: 50,
        hazardAlert: "Pedestrians and sports traffic near complex entrance."
      },
      {
        step: 5,
        instruction: "Turn into Devins Drive / Cranmore. Pull in for Turnabout (3-point turn).",
        spokenAudioText: "Turn into Devins Drive and pull over on the left when safe for the turnabout.",
        streetName: "Devins Drive (Cranmore)",
        speedLimit: 30,
        maneuverNotice: "Maneuver: Turnabout (3-point turn). 360 checks before every movement. No dry steering."
      },
      {
        step: 6,
        instruction: "Exit Cranmore onto Cleveragh link road roundabout. Take 2nd exit.",
        spokenAudioText: "At the roundabout, take the second exit towards Tonaphubble.",
        streetName: "Cleveragh Roundabout",
        speedLimit: 50
      },
      {
        step: 7,
        instruction: "Rejoin Pearse Road southbound. Maintain 50 km/h speed limit.",
        spokenAudioText: "Turn left onto Pearse Road heading south.",
        streetName: "Pearse Road",
        speedLimit: 50
      },
      {
        step: 8,
        instruction: "Return to Carraroe Roundabout, take 1st exit back to Seamus McDaniel Motorcycles in Cuilbeg.",
        spokenAudioText: "At Carraroe Roundabout, take the first exit to return to Seamus McDaniel Motorcycles.",
        streetName: "Seamus McDaniel Motorcycles (Cuilbeg)",
        speedLimit: 50
      }
    ],
    examinerWarnings: [
      "Cemetery Road Turn: Watch oncoming speed on Pearse Road — wait patiently in position rather than cutting across.",
      "Cranmore Estates: Parked cars on both sides require 1-door clearance; yield if an oncoming car has right-of-way.",
      "Turnabout (3-Point Turn): Apply the handbrake every time you stop to change gear to avoid any rollback."
    ],
    googleMapsUrl: buildGoogleMapsRouteUrl(baseCentreWaypoint, route2Waypoints.slice(1, -1), baseCentreWaypoint),
    appleMapsUrl: buildAppleMapsRouteUrl(baseCentreWaypoint, route2Waypoints.slice(1, -1), baseCentreWaypoint)
  },
  {
    id: 'sligo-route-3',
    routeNumber: 3,
    title: 'Crozon Park & Tonaphubble',
    subtitle: 'Classic Precision Reverse Around Corner',
    difficulty: 'Moderate',
    distanceKm: 9.8,
    estimatedTimeMin: 28,
    color: '#8B5CF6',
    badge: 'High Frequency',
    overview: 'A favorite of Sligo examiners due to its proximity to Carraroe. Tests your ability to handle estate entrances, tight ninety-degree bends, and the infamous reverse around corner at Crozon Downs.',
    areasCovered: ['Old Dublin Road', 'Crozon Park Estate', 'Crozon Downs', 'Tonaphubble', 'Pearse Road'],
    maneuversTested: ['Reverse Around Corner', 'Turnabout (3-Point Turn)'],
    speedZones: ['30 km/h (Crozon Park)', '50 km/h (Town Roads)'],
    startPoint: {
      name: SLIGO_TEST_CENTRE.name,
      eircode: SLIGO_TEST_CENTRE.eircode,
      lat: SLIGO_TEST_CENTRE.lat,
      lng: SLIGO_TEST_CENTRE.lng
    },
    waypoints: route3Waypoints,
    turnByTurn: [
      {
        step: 1,
        instruction: "Depart Seamus McDaniel Motorcycles test bays in Cuilbeg towards Carraroe.",
        spokenAudioText: "Move off safely from the test bay and proceed towards Carraroe.",
        streetName: "Seamus McDaniel Motorcycles / Cuilbeg",
        speedLimit: 50
      },
      {
        step: 2,
        instruction: "Turn left into Crozon Park residential estate entrance.",
        spokenAudioText: "Take the next turn on the left into Crozon Park.",
        streetName: "Crozon Park Entrance",
        speedLimit: 30,
        hazardAlert: "Narrow entrance with speed bumps and parked cars."
      },
      {
        step: 3,
        instruction: "Drive past the corner of Crozon Downs, pull up parallel past the junction on the left.",
        spokenAudioText: "Drive past the corner on the left, pull up parallel to the kerb, and prepare to reverse around the corner.",
        streetName: "Crozon Downs",
        speedLimit: 30,
        maneuverNotice: "Maneuver: Reverse Around Corner into Crozon Downs. Maintain slow clutch control. Constant 360 observation."
      },
      {
        step: 4,
        instruction: "Proceed into the cul-de-sac for a Turnabout if requested by examiner.",
        spokenAudioText: "Proceed ahead and turn the car around to face the opposite direction.",
        streetName: "Crozon Cul-de-Sac",
        speedLimit: 30,
        maneuverNotice: "Maneuver: Turnabout using forward and reverse gears."
      },
      {
        step: 5,
        instruction: "Exit Crozon Park onto the Tonaphubble connector road.",
        spokenAudioText: "At the end of the road, turn right onto Tonaphubble link.",
        streetName: "Tonaphubble Link",
        speedLimit: 50
      },
      {
        step: 6,
        instruction: "Join Pearse Road heading south towards Carraroe Roundabout.",
        spokenAudioText: "Turn left onto Pearse Road.",
        streetName: "Pearse Road South",
        speedLimit: 50
      },
      {
        step: 7,
        instruction: "Enter Carraroe Roundabout, 1st exit back to Seamus McDaniel Motorcycles in Cuilbeg.",
        spokenAudioText: "Take the first exit at the roundabout back to Seamus McDaniel Motorcycles.",
        streetName: "Seamus McDaniel Motorcycles (Cuilbeg)",
        speedLimit: 50
      }
    ],
    examinerWarnings: [
      "Sharp Kerb: Crozon Downs has a sharp bend — turn slowly so you don't clip or mount the kerb (instant test fail).",
      "Observations: Turn your head 360° before starting the reverse and pause if any pedestrian or car appears.",
      "Estate Speed: Stay below 30 km/h in Crozon Park and anticipate children playing or delivery vehicles."
    ],
    googleMapsUrl: buildGoogleMapsRouteUrl(baseCentreWaypoint, route3Waypoints.slice(1, -1), baseCentreWaypoint),
    appleMapsUrl: buildAppleMapsRouteUrl(baseCentreWaypoint, route3Waypoints.slice(1, -1), baseCentreWaypoint)
  },
  {
    id: 'sligo-route-4',
    routeNumber: 4,
    title: 'Maugheraboy & Gallows Hill',
    subtitle: 'Steep Hill Start & Urban Multi-Lane Roundabouts',
    difficulty: 'Advanced',
    distanceKm: 13.2,
    estimatedTimeMin: 35,
    color: '#EF4444',
    badge: 'Toughest Route',
    overview: 'Known locally as the most demanding test route. Involves high-speed driving on the N4 bypass, negotiating Mail Coach Road, performing the famous steep hill start at Gallows Hill / Pound Street stop sign, and the Maugheraboy Roundabout spiral.',
    areasCovered: ['N4 Bypass', 'Exit 2', 'Mail Coach Road', 'Gallows Hill / Pound St', 'Maugheraboy Roundabout', 'Meadow Park'],
    maneuversTested: ['Hill Start', 'Reverse Around Corner'],
    speedZones: ['30 km/h (Meadow Park)', '50 km/h (Town/Pound St)', '100 km/h (N4 Bypass)'],
    startPoint: {
      name: SLIGO_TEST_CENTRE.name,
      eircode: SLIGO_TEST_CENTRE.eircode,
      lat: SLIGO_TEST_CENTRE.lat,
      lng: SLIGO_TEST_CENTRE.lng
    },
    waypoints: route4Waypoints,
    turnByTurn: [
      {
        step: 1,
        instruction: "Exit Seamus McDaniel Motorcycles, Cuilbeg, to Carraroe Roundabout. Take 2nd exit onto N4 Northbound.",
        spokenAudioText: "Proceed from the test bay towards Carraroe Roundabout, and take the second exit onto the N4 towards Donegal.",
        streetName: "Cuilbeg to Carraroe Roundabout",
        speedLimit: 100,
        laneGuidance: "Accelerate briskly on the slip road to match speed of dual carriageway traffic."
      },
      {
        step: 2,
        instruction: "Take Exit 2 off N4 towards Town Centre / Mail Coach Road.",
        spokenAudioText: "Take Exit 2 on your left towards Sligo Town.",
        streetName: "N4 Exit 2",
        speedLimit: 50,
        hazardAlert: "Sharp deceleration curve after 100km/h section."
      },
      {
        step: 3,
        instruction: "Proceed down Mail Coach Road. Watch for parked cars and oncoming traffic.",
        spokenAudioText: "Continue along Mail Coach Road.",
        streetName: "Mail Coach Road",
        speedLimit: 50
      },
      {
        step: 4,
        instruction: "Turn right onto High Street / Pound Street. Stop at the steep hill Stop sign.",
        spokenAudioText: "Turn right onto Pound Street and stop at the Stop sign ahead.",
        streetName: "Pound Street (Gallows Hill)",
        speedLimit: 50,
        hazardAlert: "Full stop mandatory. Incline is steep - roll back over 2 inches is a Grade 2 fault!",
        maneuverNotice: "Maneuver: Steep Hill Start. Handbrake firmly on, set revs, find bite point, shoulder check, release smoothly."
      },
      {
        step: 5,
        instruction: "Proceed to Maugheraboy Roundabout. Take 2nd exit for Maugheraboy Road.",
        spokenAudioText: "At Maugheraboy Roundabout, take the second exit.",
        streetName: "Maugheraboy Roundabout",
        speedLimit: 50,
        laneGuidance: "Follow roundabout markings carefully. Yield to traffic from your right."
      },
      {
        step: 6,
        instruction: "Turn into Meadow Park estate for reverse around corner maneuver.",
        spokenAudioText: "Turn into Meadow Park and pull over on the left.",
        streetName: "Meadow Park",
        speedLimit: 30,
        maneuverNotice: "Maneuver: Reverse around corner into side street."
      },
      {
        step: 7,
        instruction: "Return via Church Hill and Pearse Road back to Carraroe.",
        spokenAudioText: "Follow signs for Carraroe via Pearse Road.",
        streetName: "Pearse Road South",
        speedLimit: 50
      },
      {
        step: 8,
        instruction: "Carraroe Roundabout, take 1st exit back into Seamus McDaniel Motorcycles in Cuilbeg.",
        spokenAudioText: "Take the first exit to return to Seamus McDaniel Motorcycles in Cuilbeg.",
        streetName: "Seamus McDaniel Motorcycles (Cuilbeg)",
        speedLimit: 50
      }
    ],
    examinerWarnings: [
      "Steep Hill Start: Pound Street / Gallows Hill has a steep incline — find the bite point and hold the handbrake firmly to prevent roll-back.",
      "Complete Stop: You must come to a dead standstill behind the Pound Street STOP line before creeping forward.",
      "N4 Dual Carriageway Merge: Accelerate boldly on the slip road to match 100 km/h traffic speed; hesitating causes progress faults."
    ],
    googleMapsUrl: buildGoogleMapsRouteUrl(baseCentreWaypoint, route4Waypoints.slice(1, -1), baseCentreWaypoint),
    appleMapsUrl: buildAppleMapsRouteUrl(baseCentreWaypoint, route4Waypoints.slice(1, -1), baseCentreWaypoint)
  },
  {
    id: 'sligo-route-5',
    routeNumber: 5,
    title: 'Ballydoogan & Oakfield',
    subtitle: 'Strandhill Road Approach & Estate Driving',
    difficulty: 'Challenging',
    distanceKm: 14.5,
    estimatedTimeMin: 38,
    color: '#F59E0B',
    badge: 'Longest Route',
    overview: 'Covers the western approaches to Sligo. Features fast bypass driving, Strandhill Road (R292), and residential maneuvering through Oakfield and Ballydoogan estates with tight road widths.',
    areasCovered: ['N4 Northbound', 'Strandhill Road (R292)', 'Oakfield Road', 'Ballydoogan', 'Larkhill Road'],
    maneuversTested: ['Reverse Around Corner', 'Parallel Park'],
    speedZones: ['30 km/h (Oakfield/Ballydoogan)', '50 km/h (Strandhill Rd)', '100 km/h (N4)'],
    startPoint: {
      name: SLIGO_TEST_CENTRE.name,
      eircode: SLIGO_TEST_CENTRE.eircode,
      lat: SLIGO_TEST_CENTRE.lat,
      lng: SLIGO_TEST_CENTRE.lng
    },
    waypoints: route5Waypoints,
    turnByTurn: [
      {
        step: 1,
        instruction: "Depart Seamus McDaniel Motorcycles, Cuilbeg, onto Carraroe Roundabout. Take 2nd exit onto N4 Northbound.",
        spokenAudioText: "Move off towards Carraroe Roundabout, and take the second exit onto the N4 bypass towards Donegal.",
        streetName: "Cuilbeg to N4 Northbound",
        speedLimit: 100
      },
      {
        step: 2,
        instruction: "Take exit for Strandhill Road (R292). Decelerate smoothly on slip road.",
        spokenAudioText: "Take the exit slip road towards Strandhill.",
        streetName: "R292 Strandhill Road Slip",
        speedLimit: 50
      },
      {
        step: 3,
        instruction: "Turn left onto Strandhill Road heading towards Oakfield.",
        spokenAudioText: "Turn left onto Strandhill Road.",
        streetName: "Strandhill Road",
        speedLimit: 50
      },
      {
        step: 4,
        instruction: "Turn right into Oakfield Road, entering 30 km/h residential zone.",
        spokenAudioText: "Turn right into Oakfield Road. Observe 30 kilometer speed limit.",
        streetName: "Oakfield Road",
        speedLimit: 30
      },
      {
        step: 5,
        instruction: "Turn into Ballydoogan estate. Pull in for reverse around corner or parallel park.",
        spokenAudioText: "Turn into Ballydoogan and pull up on the left for the maneuver.",
        streetName: "Ballydoogan Estate",
        speedLimit: 30,
        maneuverNotice: "Maneuver: Reverse around corner into side street or parallel park behind target car."
      },
      {
        step: 6,
        instruction: "Exit estate via Larkhill Road heading towards Pearse Road.",
        spokenAudioText: "Exit the estate onto Larkhill Road.",
        streetName: "Larkhill Road",
        speedLimit: 50
      },
      {
        step: 7,
        instruction: "Return south via N4 or Pearse Road to Carraroe Roundabout.",
        spokenAudioText: "Continue south back towards Carraroe Roundabout.",
        streetName: "Pearse Road / N4 South",
        speedLimit: 80
      },
      {
        step: 8,
        instruction: "Take 1st exit at Carraroe Roundabout to return to Seamus McDaniel Motorcycles in Cuilbeg.",
        spokenAudioText: "Take the first exit to return to Seamus McDaniel Motorcycles.",
        streetName: "Seamus McDaniel Motorcycles (Cuilbeg)",
        speedLimit: 50
      }
    ],
    examinerWarnings: [
      "Dual Carriageway Deceleration: When exiting the N4, brake progressively before the slip curve down to 50 km/h.",
      "Concealed Driveways: Oakfield has blind driveways — keep speeds modest (30–40 km/h) and cover the brake.",
      "Ballydoogan Kerb Alignment: Finish the reverse parallel within 0.5m of the kerb without touching or scrubbing the tyre."
    ],
    googleMapsUrl: buildGoogleMapsRouteUrl(baseCentreWaypoint, route5Waypoints.slice(1, -1), baseCentreWaypoint),
    appleMapsUrl: buildAppleMapsRouteUrl(baseCentreWaypoint, route5Waypoints.slice(1, -1), baseCentreWaypoint)
  },
  {
    id: 'sligo-route-6',
    routeNumber: 6,
    title: 'Sligo Town Core & Doorly Park',
    subtitle: 'Riverfront Driving & Scenic Cul-de-Sac Turnabout',
    difficulty: 'Challenging',
    distanceKm: 12.0,
    estimatedTimeMin: 33,
    color: '#06B6D4',
    badge: 'Town & Park',
    overview: 'Navigates through the busy Pearse Road arterial, past Connaughton Road and the Garavogue River corridor into the scenic Doorly Park cul-de-sac for a Turnabout (3-point turn). Tests multi-phase traffic lights and pedestrian crossings.',
    areasCovered: ['Pearse Road', 'Connaughton Road', 'Garavogue River', 'Doorly Park', 'Cleveragh Link'],
    maneuversTested: ['Turnabout (3-Point Turn)', 'Bay Parking'],
    speedZones: ['30 km/h (Doorly Park)', '50 km/h (Town Core & Pearse Rd)'],
    startPoint: {
      name: SLIGO_TEST_CENTRE.name,
      eircode: SLIGO_TEST_CENTRE.eircode,
      lat: SLIGO_TEST_CENTRE.lat,
      lng: SLIGO_TEST_CENTRE.lng
    },
    waypoints: route6Waypoints,
    turnByTurn: [
      {
        step: 1,
        instruction: "Exit Seamus McDaniel Motorcycles, Cuilbeg, to Carraroe Roundabout, 1st exit onto Pearse Road.",
        spokenAudioText: "Move off from the test bay to the roundabout, taking the first exit onto Pearse Road.",
        streetName: "Cuilbeg / Pearse Road approach",
        speedLimit: 50
      },
      {
        step: 2,
        instruction: "Continue straight along Pearse Road through traffic light junctions.",
        spokenAudioText: "Continue straight along Pearse Road.",
        streetName: "Pearse Road North",
        speedLimit: 50,
        hazardAlert: "Multiple pedestrian crossings and cycle lanes. Check mirrors before slowing down."
      },
      {
        step: 3,
        instruction: "Turn right onto Connaughton Road towards Riverside corridor.",
        spokenAudioText: "Turn right onto Connaughton Road.",
        streetName: "Connaughton Road",
        speedLimit: 50
      },
      {
        step: 4,
        instruction: "Turn right into Doorly Park entrance road.",
        spokenAudioText: "Turn right into Doorly Park. Observe 30 kilometer speed limit.",
        streetName: "Doorly Park Road",
        speedLimit: 30
      },
      {
        step: 5,
        instruction: "Drive towards the cul-de-sac end of Doorly Park. Pull in on the left for Turnabout.",
        spokenAudioText: "Pull over on the left when safe, and turn the vehicle around in three movements.",
        streetName: "Doorly Park Cul-de-Sac",
        speedLimit: 30,
        maneuverNotice: "Maneuver: Turnabout (3-point turn). Watch for dog walkers and pedestrians along river path."
      },
      {
        step: 6,
        instruction: "Exit Doorly Park, connecting through Cleveragh link road.",
        spokenAudioText: "Exit Doorly Park and proceed along Cleveragh road.",
        streetName: "Cleveragh Link",
        speedLimit: 50
      },
      {
        step: 7,
        instruction: "Rejoin Pearse Road southbound, heading back to Carraroe.",
        spokenAudioText: "Turn left onto Pearse Road heading back towards Carraroe.",
        streetName: "Pearse Road South",
        speedLimit: 50
      },
      {
        step: 8,
        instruction: "Take 1st exit at Carraroe Roundabout back into Seamus McDaniel Motorcycles, Cuilbeg.",
        spokenAudioText: "Take the first exit back into Seamus McDaniel Motorcycles.",
        streetName: "Seamus McDaniel Motorcycles (Cuilbeg)",
        speedLimit: 50
      }
    ],
    examinerWarnings: [
      "Pedestrian Heavy: Doorly Park is a shared recreation zone — stay under 30 km/h and give right of way to walkers.",
      "Zebra Crossings: Check Connaughton Road crossings carefully — stopping late or accelerating across pedestrians is a Grade 3 fail.",
      "Traffic Light Lanes: On Pearse Road, observe road arrows early to ensure you don't change lanes late at the lights."
    ],
    googleMapsUrl: buildGoogleMapsRouteUrl(baseCentreWaypoint, route6Waypoints.slice(1, -1), baseCentreWaypoint),
    appleMapsUrl: buildAppleMapsRouteUrl(baseCentreWaypoint, route6Waypoints.slice(1, -1), baseCentreWaypoint)
  }
];

// ==========================================
// DEDICATED SLIGO MANEUVER SPOTS
// ==========================================

export const SLIGO_MANEUVER_SPOTS: ManeuverSpot[] = [
  {
    id: 'maneuver-crozon-reverse',
    name: 'Crozon Downs Reverse Corner',
    type: 'reverse_corner',
    title: 'Reverse Around Corner (Crozon Downs)',
    locationName: 'Crozon Park / Crozon Downs, Sligo',
    lat: 54.2538,
    lng: -8.4678,
    description: 'The premier reverse around corner location used by Sligo RSA testers. A clean 90-degree left curb with good visibility, but tight road width requires continuous blindspot observation.',
    examinerTips: [
      'Pull up parallel to the kerb roughly 0.5 meters away, about 2 car lengths past the corner.',
      'Check rear window and both blind spots before moving in reverse.',
      'Steer smoothly to follow the curve of the kerb without dry steering.',
      'Stop immediately if any other vehicle or pedestrian approaches.'
    ],
    commonFaults: [
      'Relying solely on wing mirrors instead of turning head to look out rear window (Grade 2 Observation).',
      'Touching or mounting the kerb (mounting is an automatic Grade 3 FAIL).',
      'Swinging out too wide into oncoming lane during the turn.'
    ],
    googleMapsUrl: buildGoogleMapsPinpointUrl(54.2538, -8.4678, 'Crozon Downs Reverse Around Corner Spot Sligo'),
    appleMapsUrl: buildAppleMapsPinpointUrl(54.2538, -8.4678, 'Crozon Downs Reverse Around Corner Spot Sligo')
  },
  {
    id: 'maneuver-caltragh-reverse',
    name: 'Caltragh Crescent Reverse Corner',
    type: 'reverse_corner',
    title: 'Reverse Around Corner (Caltragh Crescent)',
    locationName: 'Caltragh Road / Caltragh Crescent, Sligo',
    lat: 54.2542,
    lng: -8.4775,
    description: 'Located in the quiet Caltragh residential area. Moderate slope and gentle curve kerb. Speed limit in estate is strictly 30 km/h.',
    examinerTips: [
      'Watch for the slight downhill gradient which requires extra brake pedal control.',
      'Yield to residents entering or exiting their driveways.',
      'Keep your speed down to a slow walking pace using clutch bite control.'
    ],
    commonFaults: [
      'Speed too fast in reverse (loss of vehicle control).',
      'Forgetting left shoulder blind spot check before beginning the turn.'
    ],
    googleMapsUrl: buildGoogleMapsPinpointUrl(54.2542, -8.4775, 'Caltragh Crescent Reverse Spot Sligo'),
    appleMapsUrl: buildAppleMapsPinpointUrl(54.2542, -8.4775, 'Caltragh Crescent Reverse Spot Sligo')
  },
  {
    id: 'maneuver-pound-hill-start',
    name: 'Gallows Hill / Pound Street Hill Start',
    type: 'hill_start',
    title: 'Steep Hill Start (Pound Street / Gallows Hill)',
    locationName: 'Pound Street & High Street Junction, Sligo',
    lat: 54.2688,
    lng: -8.4755,
    description: 'Sligo’s most notorious hill start location. A steep incline stopping at a solid white Stop line. Requires flawless handbrake control and observation.',
    examinerTips: [
      'Bring the vehicle to a total stop behind the Stop line.',
      'Firmly apply the handbrake and select 1st gear.',
      'Set engine revs (around 1500 RPM) and find clutch bite point until the car body rises slightly.',
      'Check rear-view mirror, right mirror, and right blind spot before releasing handbrake.'
    ],
    commonFaults: [
      'Car rolling backward even a few inches (Grade 2 fault; rolling near vehicle behind is Grade 3 FAIL).',
      'Stalling the engine on the steep grade.',
      'Rolling past the Stop line without coming to a complete rest.'
    ],
    googleMapsUrl: buildGoogleMapsPinpointUrl(54.2688, -8.4755, 'Gallows Hill Pound Street Hill Start Sligo'),
    appleMapsUrl: buildAppleMapsPinpointUrl(54.2688, -8.4755, 'Gallows Hill Pound Street Hill Start Sligo')
  },
  {
    id: 'maneuver-cranmore-turnabout',
    name: 'Devins Drive Turnabout (3-Point Turn)',
    type: 'turnabout',
    title: 'Turnabout 3-Point Turn (Devins Drive, Cranmore)',
    locationName: 'Devins Drive, Cranmore, Sligo',
    lat: 54.2625,
    lng: -8.4630,
    description: 'Residential street with kerbs on both sides. Used for demonstrating turning the car around between two curbs in three movements.',
    examinerTips: [
      'Complete 360-degree observation before moving across the road.',
      'Do not touch or bump either kerb.',
      'Apply full steering lock quickly while the car is moving at crawling speed (avoid dry steering).'
    ],
    commonFaults: [
      'Dry steering (turning wheel while tires are completely stationary).',
      'Hitting the curb at speed.',
      'Failing to check left and right before reversing backward across the road.'
    ],
    googleMapsUrl: buildGoogleMapsPinpointUrl(54.2625, -8.4630, 'Devins Drive Cranmore Turnabout Spot Sligo'),
    appleMapsUrl: buildAppleMapsPinpointUrl(54.2625, -8.4630, 'Devins Drive Cranmore Turnabout Spot Sligo')
  },
  {
    id: 'maneuver-doorly-turnabout',
    name: 'Doorly Park Turnabout Spot',
    type: 'turnabout',
    title: 'Turnabout (Doorly Park River Cul-de-Sac)',
    locationName: 'Doorly Park Road, Sligo',
    lat: 54.2705,
    lng: -8.4525,
    description: 'Scenic cul-de-sac at the end of Doorly Park. Ideal road camber for the 3-point turn with generous space.',
    examinerTips: [
      'Watch for pedestrians and recreational cyclists coming off the riverside greenway.',
      'Check behind before engaging reverse gear.'
    ],
    commonFaults: [
      'Not yielding right of way to park pedestrians.',
      'Incomplete head checks.'
    ],
    googleMapsUrl: buildGoogleMapsPinpointUrl(54.2705, -8.4525, 'Doorly Park Cul-de-Sac Turnabout Sligo'),
    appleMapsUrl: buildAppleMapsPinpointUrl(54.2705, -8.4525, 'Doorly Park Cul-de-Sac Turnabout Sligo')
  },
  {
    id: 'maneuver-ballydoogan-reverse',
    name: 'Ballydoogan / Oakfield Reverse Spot',
    type: 'reverse_corner',
    title: 'Reverse Around Corner (Ballydoogan Estate)',
    locationName: 'Ballydoogan, Oakfield, Sligo',
    lat: 54.2645,
    lng: -8.5020,
    description: 'Quiet suburban corner off Oakfield Road. Generous radius kerb used when testing Route 5.',
    examinerTips: [
      'Keep constant distance from kerb without letting the car drift toward the center of the road.',
      'Look out rear window 80% of the time, checking front wing clearance periodically.'
    ],
    commonFaults: [
      'Drifting across the center line on entry.',
      'Jerky clutch work.'
    ],
    googleMapsUrl: buildGoogleMapsPinpointUrl(54.2645, -8.5020, 'Ballydoogan Reverse Spot Sligo'),
    appleMapsUrl: buildAppleMapsPinpointUrl(54.2645, -8.5020, 'Ballydoogan Reverse Spot Sligo')
  }
];

// ==========================================
// TRICKY JUNCTIONS & EXAMINER WATCHPOINTS
// ==========================================

export const SLIGO_TRICKY_JUNCTIONS: TrickyJunction[] = [
  {
    id: 'junction-carraroe-roundabout',
    name: 'Carraroe Multi-Lane Roundabout',
    locationName: 'Junction of N4 Bypass, R284 & Old Dublin Road',
    lat: 54.2492,
    lng: -8.4642,
    difficulty: 'Critical',
    summary: 'The main gateway to Sligo from the RSA Test Centre. Multiple approach lanes, spiral road markings, and heavy flow from Dublin/Collooney traffic.',
    recommendedLane: 'For 1st exit (Pearse Rd / Old Dublin Rd): Left lane, indicate left on approach. For 2nd exit (N4 North / Town): Middle or left lane depending on signs, do not indicate on approach, indicate left after 1st exit.',
    examinerWatchpoints: [
      'Crossing solid lane dividers on the roundabout approach.',
      'Failing to indicate left when passing the exit prior to your intended exit.',
      'Hesitating excessively when a safe gap in oncoming traffic appears.'
    ],
    googleMapsUrl: buildGoogleMapsPinpointUrl(54.2492, -8.4642, 'Carraroe Roundabout Sligo'),
    appleMapsUrl: buildAppleMapsPinpointUrl(54.2492, -8.4642, 'Carraroe Roundabout Sligo')
  },
  {
    id: 'junction-caltragh-slip',
    name: 'Caltragh N4 Interchange Merge & Slip',
    locationName: 'N4 Junction 1 / Caltragh Exit',
    lat: 54.2520,
    lng: -8.4735,
    difficulty: 'High',
    summary: 'Short slip road with rapid transition between 100 km/h dual carriageway and 50 km/h secondary roads, followed by an immediate 30 km/h estate zone.',
    recommendedLane: 'Decelerate only once fully inside the deceleration lane. Do not brake abruptly while still on the main carriageway.',
    examinerWatchpoints: [
      'Braking early on the live dual carriageway before entering the slip road.',
      'Missing the 30 km/h sign on Caltragh Road entrance (instant Grade 2 fault).',
      'Failure to yield to right-turning traffic at the slip terminus.'
    ],
    googleMapsUrl: buildGoogleMapsPinpointUrl(54.2520, -8.4735, 'Caltragh N4 Slip Road Sligo'),
    appleMapsUrl: buildAppleMapsPinpointUrl(54.2520, -8.4735, 'Caltragh N4 Slip Road Sligo')
  },
  {
    id: 'junction-cemetery-road',
    name: 'Pearse Road / Cemetery Road Right Turn',
    locationName: 'R287 Pearse Road into Cemetery Road',
    lat: 54.2605,
    lng: -8.4685,
    difficulty: 'High',
    summary: 'Challenging right turn across oncoming Pearse Road traffic, with sightlines partially obstructed by parked cars and crests.',
    recommendedLane: 'Position close to center line with wheels straight while waiting. Check right wing mirror for cyclists in cycle lane.',
    examinerWatchpoints: [
      'Cutting the corner when turning right into Cemetery Road.',
      'Turning across oncoming traffic when safe gap is not verified.',
      'Failing to check the cycle lane on Pearse Road before turning.'
    ],
    googleMapsUrl: buildGoogleMapsPinpointUrl(54.2605, -8.4685, 'Pearse Road Cemetery Road Junction Sligo'),
    appleMapsUrl: buildAppleMapsPinpointUrl(54.2605, -8.4685, 'Pearse Road Cemetery Road Junction Sligo')
  },
  {
    id: 'junction-maugheraboy-roundabout',
    name: 'Maugheraboy Roundabout',
    locationName: 'Maugheraboy Road & Church Hill Junction',
    lat: 54.2715,
    lng: -8.4870,
    difficulty: 'Medium',
    summary: 'Compact roundabout surrounded by schools and local shops. High pedestrian activity and zebra crossing right after the exit.',
    recommendedLane: 'Strict lane adherence. Left lane for 1st and 2nd exits, right lane for 3rd exit.',
    examinerWatchpoints: [
      'Failing to yield to pedestrians stepping onto the zebra crossing immediately after exiting.',
      'Indication errors on approach.'
    ],
    googleMapsUrl: buildGoogleMapsPinpointUrl(54.2715, -8.4870, 'Maugheraboy Roundabout Sligo'),
    appleMapsUrl: buildAppleMapsPinpointUrl(54.2715, -8.4870, 'Maugheraboy Roundabout Sligo')
  },
  {
    id: 'junction-pearse-road-lights',
    name: 'Pearse Road Multi-Phase Traffic Lights',
    locationName: 'Pearse Road / Markievicz Park corridor',
    lat: 54.2585,
    lng: -8.4705,
    difficulty: 'Medium',
    summary: 'Corridor with filter traffic lights, pedestrian walk phases, and dedicated bus/cycle lanes.',
    recommendedLane: 'Keep in primary driving lane. Do not drift into the red-colored cycle lane.',
    examinerWatchpoints: [
      'Stopping on pedestrian crossings or beyond the advanced stop line for cyclists.',
      'Creeping through amber lights when it was safe to bring the car to a controlled stop.'
    ],
    googleMapsUrl: buildGoogleMapsPinpointUrl(54.2585, -8.4705, 'Pearse Road Traffic Lights Sligo'),
    appleMapsUrl: buildAppleMapsPinpointUrl(54.2585, -8.4705, 'Pearse Road Traffic Lights Sligo')
  }
];
