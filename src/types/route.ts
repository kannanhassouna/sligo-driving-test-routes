export interface Waypoint {
  id: string;
  name: string;
  lat: number;
  lng: number;
  description?: string;
  type?: 'start' | 'finish' | 'maneuver' | 'hazard' | 'turn' | 'speed_change';
  speedLimit?: number; // in km/h
}

export interface ManeuverSpot {
  id: string;
  name: string;
  type: 'reverse_corner' | 'turnabout' | 'hill_start' | 'parallel_park' | 'bay_park';
  title: string;
  locationName: string;
  lat: number;
  lng: number;
  description: string;
  examinerTips: string[];
  commonFaults: string[];
  googleMapsUrl: string;
  appleMapsUrl: string;
}

export interface TrickyJunction {
  id: string;
  name: string;
  locationName: string;
  lat: number;
  lng: number;
  difficulty: 'High' | 'Medium' | 'Critical';
  summary: string;
  examinerWatchpoints: string[];
  recommendedLane: string;
  visualGuide?: string;
  googleMapsUrl: string;
  appleMapsUrl: string;
}

export interface TurnInstruction {
  step: number;
  instruction: string;
  spokenAudioText: string;
  streetName: string;
  distanceFromPrevious?: string;
  speedLimit: number;
  laneGuidance?: string;
  hazardAlert?: string;
  maneuverNotice?: string;
}

export interface TestRoute {
  id: string;
  routeNumber: number;
  title: string;
  subtitle: string;
  difficulty: 'Moderate' | 'Challenging' | 'Advanced';
  distanceKm: number;
  estimatedTimeMin: number;
  color: string;
  badge: string;
  overview: string;
  areasCovered: string[];
  maneuversTested: ('Reverse Around Corner' | 'Turnabout (3-Point Turn)' | 'Hill Start' | 'Parallel Park' | 'Bay Parking')[];
  speedZones: string[];
  startPoint: {
    name: string;
    eircode: string;
    lat: number;
    lng: number;
  };
  waypoints: Waypoint[];
  turnByTurn: TurnInstruction[];
  examinerWarnings: string[];
  googleMapsUrl: string;
  appleMapsUrl: string;
}
