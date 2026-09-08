export interface RouteDetailedTips {
  routeId: string;
  routeNumber: number;
  summaryQuote: string;
  examinerFocus: string[];
  speedTraps: {
    location: string;
    speedLimit: string;
    warning: string;
  }[];
  maneuverGuide: {
    maneuverName: string;
    location: string;
    stepByStepInstructions: string[];
    commonFailReasons: string[];
  };
  criticalJunctions: {
    name: string;
    approachLane: string;
    examinerCheck: string;
  }[];
  studentPassChecklist: string[];
}

export const SLIGO_ROUTE_STUDENT_TIPS: Record<string, RouteDetailedTips> = {
  'sligo-route-1': {
    routeId: 'sligo-route-1',
    routeNumber: 1,
    summaryQuote: "Focus on staying strictly under 30 km/h in Caltragh, checking blind spots over your shoulder during the reverse corner, and clean roundabout lanes.",
    examinerFocus: [
      "Speed compliance when transitioning from N4 slip road (100 km/h) into the Caltragh 30 km/h residential zone",
      "Full 360° observation throughout the Caltragh Crescent reverse corner, looking out the back window rather than just mirrors",
      "Clean lane positioning and signaling entering and exiting Carraroe Roundabout"
    ],
    speedTraps: [
      {
        location: "Caltragh Road Residential Entrance",
        speedLimit: "30 km/h Zone",
        warning: "The #1 fail point on Route 1. After exiting the N4 slip road, drivers frequently coast into Caltragh at 40-45 km/h. Brake early before the sign."
      },
      {
        location: "Pearse Road Southbound",
        speedLimit: "50 km/h Limit",
        warning: "Long straight road with gentle downhill slope heading towards Carraroe. Keep an eye on your speedometer so you don't creep above 50 km/h."
      }
    ],
    maneuverGuide: {
      maneuverName: "Reverse Around a Corner",
      location: "Caltragh Crescent",
      stepByStepInstructions: [
        "Pull in parallel to the kerb 2 to 3 car lengths past the junction, about 0.5 metres from the edge.",
        "Apply handbrake, select neutral, and prepare to reverse.",
        "Select reverse gear. Do a complete 360° observation (all mirrors, front road, left blind spot, and right over-shoulder blind spot).",
        "Release handbrake and reverse in a straight line at walking pace using clutch control.",
        "When the corner curve appears in your rear left quarter window, apply left lock smoothly.",
        "Look primarily through the rear window while the vehicle is moving backwards. Only glance at side mirrors for kerb distance.",
        "If ANY vehicle, cyclist, or pedestrian enters the street, STOP immediately and wait.",
        "Once parallel with the new kerb, straighten the wheels and reverse 2 to 3 car lengths back in a straight line before stopping."
      ],
      commonFailReasons: [
        "Looking only in door mirrors instead of looking through the rear window (Grade 2 fault)",
        "Mounting or scraping the kerb with tyres (Grade 3 instant fail)",
        "Not stopping immediately when an approaching car or walker enters the road",
        "Swinging out too wide into the opposing traffic lane"
      ]
    },
    criticalJunctions: [
      {
        name: "Carraroe Roundabout (Outbound to N4 Slip)",
        approachLane: "Left lane for 2nd exit towards N4 Donegal/Sligo",
        examinerCheck: "Check mirrors, indicate left only after passing the 1st exit, and maintain lane discipline without cutting across the inner lane."
      },
      {
        name: "Pearse Road Right Turn (Exiting Caltragh)",
        approachLane: "Position car at centre line with right indicator",
        examinerCheck: "Watch out for oncoming cars and cyclists in the cycle lane. Turn smoothly into the nearest driving lane without cutting the corner."
      }
    ],
    studentPassChecklist: [
      "Brake before crossing the 30 km/h Caltragh sign and keep in 2nd gear",
      "Always look behind through the back window when moving in reverse",
      "Check your right blind spot before moving off from every stationary stop",
      "Indicate left after passing the exit before yours on Carraroe Roundabout",
      "Park neatly inside the RSA bays at Seamus McDaniel Motorcycles upon return"
    ]
  },

  'sligo-route-2': {
    routeId: 'sligo-route-2',
    routeNumber: 2,
    summaryQuote: "Master the right turn into Cemetery Road from Pearse Road, and practice smooth handbrake control during the Cranmore Turnabout.",
    examinerFocus: [
      "Judging oncoming traffic speeds on Pearse Road before turning right into Cemetery Road",
      "Safe clearance (1 car door width) past vehicles parked on both sides in Cranmore",
      "Proper 3-point Turnabout technique without dry steering or touching kerbs"
    ],
    speedTraps: [
      {
        location: "Devins Drive & Cranmore Estate",
        speedLimit: "30 km/h Zone",
        warning: "Narrow residential roads with blind driveways and parked vans. Maintain 2nd gear and keep under 30 km/h."
      },
      {
        location: "Cleveragh Road past Sports Complex",
        speedLimit: "50 km/h Limit",
        warning: "Pedestrians and gym users frequently cross here. Cover your brake when approaching pedestrian crossings."
      }
    ],
    maneuverGuide: {
      maneuverName: "Turnabout (3-Point Turn)",
      location: "Devins Drive / Cranmore",
      stepByStepInstructions: [
        "Pull in on the left when requested by examiner. Handbrake on, neutral.",
        "Check all mirrors and blind spots. Signal right.",
        "Select 1st gear, release handbrake, and move forward turning the steering wheel briskly to full right lock.",
        "Stop about 0.5 to 1 metre before the opposite kerb. Apply handbrake firmly.",
        "Select reverse gear. Look left, right, and through rear window. Release handbrake and steer briskly to full left lock.",
        "Stop before the rear kerb. Apply handbrake firmly.",
        "Select 1st gear. Check both directions of the street. Release handbrake and drive forward into your left lane."
      ],
      commonFailReasons: [
        "Touching or mounting the kerb on any of the 3 points (Grade 2 or 3)",
        "Dry steering (turning wheels while stationary)",
        "Failing to look both ways before each movement",
        "Car rolling backward or forward when stopped on gradient"
      ]
    },
    criticalJunctions: [
      {
        name: "Pearse Road / Cemetery Road Right Turn",
        approachLane: "Position close to white centre line",
        examinerCheck: "Wait in position with right signal. Do not cut the corner. Only turn when you have a generous safe gap in oncoming traffic."
      },
      {
        name: "Cleveragh Roundabout",
        approachLane: "Left lane for straight ahead (2nd exit)",
        examinerCheck: "Yield to traffic from the right. Indicate left after passing exit 1."
      }
    ],
    studentPassChecklist: [
      "Never rush the right turn across Pearse Road into Cemetery Road",
      "Apply the handbrake every time you pause during the 3-point turn",
      "Yield to oncoming vehicles when parked cars block your lane in Cranmore",
      "Maintain 50 km/h on Cleveragh Road where clear and safe",
      "Check rearview mirror before every brake application"
    ]
  },

  'sligo-route-3': {
    routeId: 'sligo-route-3',
    routeNumber: 3,
    summaryQuote: "Beware the sharp kerb at Crozon Downs during the reverse corner, and ensure continuous 360° observations throughout the estate.",
    examinerFocus: [
      "Precision reverse around corner on the sharp kerb radius in Crozon Downs",
      "Cautious driving through housing estates with children and pets",
      "Smooth negotiation of the Carraroe Roundabout upon returning"
    ],
    speedTraps: [
      {
        location: "Crozon Park Residential Estate",
        speedLimit: "30 km/h Zone",
        warning: "Speed bumps and residential entrances. Keep speed low and drive in 2nd gear."
      },
      {
        location: "Old Dublin Road Northbound",
        speedLimit: "50 km/h Limit",
        warning: "Watch for traffic joining from commercial premises and driveways."
      }
    ],
    maneuverGuide: {
      maneuverName: "Reverse Around a Corner",
      location: "Crozon Downs (Corner with Crozon Park)",
      stepByStepInstructions: [
        "Pull in on the left 2 to 3 car lengths past Crozon Downs corner. Align parallel to kerb.",
        "Secure the vehicle (handbrake, neutral). Select reverse gear.",
        "Check 360° observations around the vehicle before moving.",
        "Crawl backwards at walking pace using the clutch bite point.",
        "CRITICAL: The kerb here is sharp! Begin steering smoothly as the bend starts, but do not turn too aggressively.",
        "Look mainly through the rear window. Glance at left door mirror to maintain 0.5m distance.",
        "Pause immediately if any pedestrian, dog, or car appears.",
        "Straighten the wheels once straight on Crozon Downs and reverse back 3 car lengths."
      ],
      commonFailReasons: [
        "Mounting the kerb due to turning the wheel too early or too sharp (Grade 3 instant fail)",
        "Failing to look out rear window while reversing",
        "Hesitation or stalling on the slight gradient in Crozon"
      ]
    },
    criticalJunctions: [
      {
        name: "Crozon Park Exit onto Tonaphubble Link",
        approachLane: "Stop line on blind corner",
        examinerCheck: "Stop completely behind line, check right and left, and creep forward for visibility before joining Tonaphubble road."
      },
      {
        name: "Pearse Road Junction",
        approachLane: "Turn left towards Carraroe",
        examinerCheck: "Mirror check, signal left, check cycle lane for bicycles before turning."
      }
    ],
    studentPassChecklist: [
      "Take the Crozon Downs reverse at half-walking speed for maximum steering control",
      "Keep 0.5m from the kerb throughout the maneuver",
      "Look over left shoulder and out the back window continuously while reversing",
      "Watch for pedestrians at all times in the housing estate",
      "Ensure proper handbrake application when parking back at the test centre"
    ]
  },

  'sligo-route-4': {
    routeId: 'sligo-route-4',
    routeNumber: 4,
    summaryQuote: "The most challenging route: master the steep Pound Street hill start, come to a dead stop at the Stop sign, and merge confidently onto the N4.",
    examinerFocus: [
      "Clutch and handbrake balance on the steep hill start at Pound Street / Gallows Hill",
      "Mandatory complete stop at the Pound Street STOP line (no rolling stops)",
      "High-speed slip road acceleration and merge onto the 100 km/h N4 dual carriageway"
    ],
    speedTraps: [
      {
        location: "Maugheraboy Road & School Area",
        speedLimit: "50 km/h Limit",
        warning: "Watch for school flashing lights and pedestrian crossings. Expect sudden stops from traffic."
      },
      {
        location: "N4 Dual Carriageway (Carraroe to Maugheraboy)",
        speedLimit: "100 km/h Limit",
        warning: "Do not drive overly slow on the N4. Driving at 60 km/h in clear 100 km/h conditions will be marked as a Progress Grade 2 fault."
      }
    ],
    maneuverGuide: {
      maneuverName: "Steep Hill Start",
      location: "Gallows Hill / Pound Street Incline",
      stepByStepInstructions: [
        "Examiner will ask you to pull in on the left on the steep incline.",
        "Apply handbrake firmly (pull up 4-5 clicks). Select neutral.",
        "When instructed to move off: Select 1st gear.",
        "Press accelerator slightly (around 1,500 - 2,000 RPM) to provide sufficient power for the hill.",
        "Raise clutch slowly to bite point. You will feel the back of the car squat and the engine tone deepen.",
        "Hold your feet completely still! Check all mirrors and over your right shoulder blind spot.",
        "Signal right if necessary. Release handbrake smoothly.",
        "Car moves forward with ZERO roll-back. Smoothly release remaining clutch as you gain momentum."
      ],
      commonFailReasons: [
        "Rolling backwards even a few inches (Grade 2 or Grade 3 fault)",
        "Stalling the engine due to not setting enough accelerator gas",
        "Forgetting blind spot check over right shoulder before releasing handbrake"
      ]
    },
    criticalJunctions: [
      {
        name: "Pound Street / Temple Street STOP Junction",
        approachLane: "Stop behind solid white STOP line",
        examinerCheck: "MANDATORY complete stop. Wheels must stop turning. Rolling yields are an automatic Grade 3 failure."
      },
      {
        name: "N4 Dual Carriageway Slip Road Merge",
        approachLane: "Acceleration lane",
        examinerCheck: "Check mirrors, signal right, accelerate briskly to match 100 km/h traffic, and merge smoothly without stopping on slip road."
      }
    ],
    studentPassChecklist: [
      "Set plenty of gas on the Pound Street hill start before releasing handbrake",
      "Wheels must be completely stationary at the Pound Street STOP sign",
      "Check right blind spot over shoulder when merging onto the N4 dual carriageway",
      "Maintain good progress at 90-100 km/h on the N4 when road is clear",
      "Brake early when approaching Carraroe roundabout on your return"
    ]
  },

  'sligo-route-5': {
    routeId: 'sligo-route-5',
    routeNumber: 5,
    summaryQuote: "Focus on progressive braking when leaving the N4 dual carriageway, scanning blind driveways in Oakfield, and wide kerb alignment in Ballydoogan.",
    examinerFocus: [
      "Progressive deceleration from 100 km/h down to 50 km/h on the N4 exit slip road",
      "Hazard anticipation on narrow bends in Oakfield estate",
      "Reverse around corner maneuver on Ballydoogan's wider kerb"
    ],
    speedTraps: [
      {
        location: "N4 Exit Slip Road to Strandhill Road",
        speedLimit: "Deceleration from 100 to 50 km/h",
        warning: "Brake firmly in the deceleration lane. Entering the roundabout approach too fast will result in harsh braking and loss of control marks."
      },
      {
        location: "Oakfield Road / Residential Streets",
        speedLimit: "30-50 km/h",
        warning: "Blind driveways with hedges. Maintain 30-35 km/h to give yourself stopping distance."
      }
    ],
    maneuverGuide: {
      maneuverName: "Reverse Around a Corner",
      location: "Ballydoogan Estate Road",
      stepByStepInstructions: [
        "Pull up on the left 2 to 3 car lengths past the corner. Stay parallel and 0.5m from kerb.",
        "Secure the vehicle with handbrake and neutral.",
        "Select reverse gear and perform full 360° observations.",
        "Reverse slowly. This corner is wider than Crozon, so turn the steering wheel gradually.",
        "Keep the vehicle around 0.3m to 0.5m from the kerb throughout the sweep.",
        "Look mainly out the back window. If any vehicle or pedestrian appears, pause immediately.",
        "Straighten the wheels and reverse back 2 car lengths once parallel."
      ],
      commonFailReasons: [
        "Over-steering into the middle or wrong side of the road",
        "Looking only in wing mirrors instead of out the rear window",
        "Touching the kerb or scuffing tyres"
      ]
    },
    criticalJunctions: [
      {
        name: "Maugheraboy Roundabout",
        approachLane: "Left lane for 1st/2nd exits, right lane for 3rd exit",
        examinerCheck: "Yield to traffic from the right, signal left after passing preceding exit."
      },
      {
        name: "Strandhill Road Junction",
        approachLane: "Keep to left driving position",
        examinerCheck: "Check mirrors before braking, observe traffic light sequence and pedestrian crossings."
      }
    ],
    studentPassChecklist: [
      "Check rearview mirror before braking firmly on the N4 slip road exit",
      "Do not swing wide into oncoming traffic during the Ballydoogan reverse",
      "Cover the brake pedal on blind bends in Oakfield",
      "Stay in left lane on roundabouts unless directed otherwise by the examiner",
      "Check blind spots before moving off from every stop"
    ]
  },

  'sligo-route-6': {
    routeId: 'sligo-route-6',
    routeNumber: 6,
    summaryQuote: "Navigate town centre pedestrian crossings with high vigilance, drive cautiously under 30 km/h in Doorly Park, and obey Pearse Road traffic lanes.",
    examinerFocus: [
      "Observing pedestrians and runners in the shared Doorly Park recreation zone",
      "Stopping safely and appropriately at town zebra crossings on Connaughton Road",
      "Lane discipline and observation through Pearse Road traffic light junctions"
    ],
    speedTraps: [
      {
        location: "Doorly Park Recreational Road",
        speedLimit: "30 km/h Limit",
        warning: "Shared area with joggers, cyclists, and dog walkers. Keep strictly under 30 km/h in 2nd gear."
      },
      {
        location: "Connaughton Road & Town Centre",
        speedLimit: "50 km/h Limit",
        warning: "Frequent zebra crossings and pedestrian activity. Be prepared to stop smoothly."
      }
    ],
    maneuverGuide: {
      maneuverName: "Turnabout (3-Point Turn)",
      location: "Doorly Park Riverfront Cul-de-Sac",
      stepByStepInstructions: [
        "Pull in on the left at the quiet area indicated by examiner. Handbrake, neutral.",
        "Check all mirrors, blind spots, and signal right.",
        "Select 1st gear, move across road turning full right lock. Stop before opposite kerb. Handbrake on.",
        "Select reverse gear. Look left, right, and through back window. Turn full left lock while reversing. Stop before rear kerb. Handbrake on.",
        "Select 1st gear. Check both directions. Drive forward into your left lane."
      ],
      commonFailReasons: [
        "Not noticing pedestrians or cyclists on the pathway (Grade 3 fail if someone has to stop)",
        "Touching or mounting the kerb",
        "Dry steering or forgetting handbrake application when stopping"
      ]
    },
    criticalJunctions: [
      {
        name: "Connaughton Road Zebra Crossings",
        approachLane: "Normal driving position",
        examinerCheck: "Scan approach paths. If a pedestrian has placed a foot on the crossing, you MUST stop smoothly. Accelerating through is an automatic fail."
      },
      {
        name: "Pearse Road Traffic Light Junctions",
        approachLane: "Follow road arrow markings early",
        examinerCheck: "Check mirrors, maintain proper distance behind vehicle in front (tyres and tarmac visible)."
      }
    ],
    studentPassChecklist: [
      "Stay under 30 km/h in Doorly Park and watch for walkers and dogs",
      "Check zebra crossings on both sides of the street in town",
      "Apply the handbrake every time you pause during the 3-point turn in Doorly Park",
      "Read traffic light lane arrows well in advance on Pearse Road",
      "Maintain safe following distance behind other cars in town traffic"
    ]
  }
};
