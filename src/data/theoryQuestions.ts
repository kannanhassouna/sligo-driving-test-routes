export interface TheoryQuestion {
  id: string;
  category: 'rules' | 'signs' | 'markings' | 'speed_limits';
  question: string;
  answer: string;
  keyTakeaway: string;
  signSymbol?: string;
  signColor?: string;
  signType?: 'regulatory' | 'warning' | 'info';
}

export const IRISH_THEORY_QUESTIONS: TheoryQuestion[] = [
  // ----------------------------------------------------
  // 1. TOP ORAL QUESTIONS ASKED BY RSA EXAMINERS IN OFFICE
  // ----------------------------------------------------
  {
    id: 'overtake-on-left',
    category: 'rules',
    question: 'When is it permissible to overtake on the left in Ireland?',
    answer: 'You may overtake on the left in 3 situations only:\n1. When the driver ahead has signaled their intention to turn right and you have room to pass safely on the left.\n2. When you intend to turn left and have signaled accordingly.\n3. In slow-moving traffic queues where your lane is moving faster than the lane to your right.',
    keyTakeaway: 'Never undertake on the left on normal flowing multi-lane roads or motorways.'
  },
  {
    id: 'broken-yellow-line',
    category: 'markings',
    question: 'What does a single broken yellow line along the edge of the road mean?',
    answer: 'It marks the edge of the roadway or the hard shoulder. The hard shoulder is primarily for pedestrians, cyclists, and breakdowns. A driver may briefly pull in if safe to let faster following traffic overtake, but must not use it as an ordinary driving lane.',
    keyTakeaway: 'Do not drive continuously in the hard shoulder.'
  },
  {
    id: 'continuous-white-line',
    category: 'markings',
    question: 'What does a continuous (solid) white line down the centre of the road mean?',
    answer: 'All traffic must keep to the left of the solid line. You must NOT cross or straddle it, except in an emergency or to safely pass an immovable obstruction (or to enter a property if safe and road is clear).',
    keyTakeaway: 'Crossing a continuous white line on your driving test is an automatic Grade 3 fail.'
  },
  {
    id: 'two-second-rule',
    category: 'rules',
    question: 'What is the "2-Second Rule" and when should it be doubled?',
    answer: 'It is a technique to ensure a safe following distance in dry road conditions. Pick a stationary landmark (like a road sign or bridge). When the vehicle in front passes it, count: "Only a fool breaks the two-second rule." If you reach the landmark before finishing, you are too close. In wet conditions, DOUBLE it to 4 seconds; on ice, increase to up to 20 seconds.',
    keyTakeaway: 'Count 2 seconds in dry weather, 4 seconds in wet weather.'
  },
  {
    id: 'yellow-box-junction',
    category: 'markings',
    question: 'What is the rule for driving into a Yellow Box Junction?',
    answer: 'You must NOT enter a yellow box junction unless your exit lane is completely clear. The ONLY exception is when you are turning right: you may enter and wait in the box as long as you do not block oncoming traffic.',
    keyTakeaway: 'Only enter a yellow box when your exit is clear, or when waiting to turn right.'
  },
  {
    id: 'flashing-amber-light',
    category: 'rules',
    question: 'What does a flashing amber traffic light mean?',
    answer: 'Proceed with caution only if the way is clear, yielding right of way to any pedestrians who are crossing or waiting to cross (as at a Pelican crossing) or other vehicles entitled to proceed.',
    keyTakeaway: 'Flashing amber means proceed with caution and yield to pedestrians.'
  },
  {
    id: 'flashing-amber-arrow',
    category: 'rules',
    question: 'What does a flashing amber arrow at a traffic light mean?',
    answer: 'You may proceed in the direction of the arrow, but you must yield right of way to any oncoming traffic and pedestrians crossing.',
    keyTakeaway: 'You can turn, but you do NOT have absolute priority.'
  },
  {
    id: 'parking-pedestrian-crossing',
    category: 'rules',
    question: 'At what distance from a pedestrian crossing or zebra crossing are you forbidden to park?',
    answer: 'You must not park within 15 metres before the crossing (on the approach side) or within 5 metres after it. You must also never park on the zig-zag road markings preceding a zebra crossing.',
    keyTakeaway: 'No parking within 15m before or 5m after a pedestrian crossing.'
  },
  {
    id: 'zig-zag-lines',
    category: 'markings',
    question: 'What do zig-zag white lines approaching a pedestrian crossing mean?',
    answer: 'They indicate that you are approaching a pedestrian crossing. In this zone, you must NOT overtake another moving vehicle, and you must NOT stop or park at any time.',
    keyTakeaway: 'No overtaking, no stopping, no parking on zig-zag lines.'
  },
  {
    id: 'dazzled-at-night',
    category: 'rules',
    question: 'What should you do if dazzled by the headlights of an oncoming car at night?',
    answer: 'Slow down and, if necessary, stop. Do not stare directly into the oncoming headlights; instead, focus your vision towards the near-side verge (left-hand edge of the road) until the vehicle has passed.',
    keyTakeaway: 'Slow down and look towards the left edge of the road.'
  },
  {
    id: 'yellow-curb-lines',
    category: 'markings',
    question: 'What is the difference between a single yellow line and double yellow lines along a kerb?',
    answer: 'A single yellow line means no parking during business/working hours (usually 8am–6pm, Monday to Saturday, unless an accompanying sign indicates otherwise). Double yellow lines mean NO PARKING at any time, 24/7.',
    keyTakeaway: 'Single = restricted parking times; Double = strictly no parking at any time.'
  },
  {
    id: 'clearway-sign',
    category: 'rules',
    question: 'What does a Clearway road sign mean?',
    answer: 'Stopping or parking on the roadway is strictly prohibited during the times shown on the accompanying plate (or at all times if no plate is shown), except for buses picking up/dropping off passengers.',
    keyTakeaway: 'No stopping or parking on a clearway.'
  },

  // ----------------------------------------------------
  // 2. SPEED LIMITS
  // ----------------------------------------------------
  {
    id: 'national-speed-limits',
    category: 'speed_limits',
    question: 'What are the default national speed limits in Ireland?',
    answer: '1. Motorways: 120 km/h\n2. National Roads (Primary & Secondary, e.g. N4): 100 km/h\n3. Regional & Local Roads (e.g. R287): 80 km/h\n4. Built-up / Urban Areas: 50 km/h\n5. Designated Residential & School Zones: 30 km/h (slow zone)',
    keyTakeaway: 'Motorway (120), National (100), Regional/Local (80), Town (50), Residential (30).'
  },
  {
    id: 'motorway-learner-rule',
    category: 'rules',
    question: 'Who is prohibited from driving on a motorway in Ireland?',
    answer: 'Learner permit drivers, vehicles under 50cc engine capacity, vehicles unable to maintain 50 km/h, pedestrians, cyclists, animals, and invalid carriages.',
    keyTakeaway: 'Learner drivers are NEVER permitted on motorways.'
  },

  // ----------------------------------------------------
  // 3. ESSENTIAL ROAD SIGNS
  // ----------------------------------------------------
  {
    id: 'sign-stop',
    category: 'signs',
    signSymbol: 'STOP',
    signColor: 'red',
    signType: 'regulatory',
    question: 'STOP Sign (Red Octagon)',
    answer: 'You MUST bring your vehicle to a complete, dead standstill behind the solid white stop line. Even if the road is completely empty, rolling yields are illegal and an instant Grade 3 test fail.',
    keyTakeaway: 'Wheels must stop moving completely.'
  },
  {
    id: 'sign-yield',
    category: 'signs',
    signSymbol: 'YIELD',
    signColor: 'red',
    signType: 'regulatory',
    question: 'YIELD Sign (Inverted Triangle)',
    answer: 'You must give right-of-way to all traffic on the major road you are approaching. You do not need to come to a full stop if the road is completely clear, but you must be prepared to stop.',
    keyTakeaway: 'Yield right of way; stop only if traffic is approaching.'
  },
  {
    id: 'sign-no-entry',
    category: 'signs',
    signSymbol: '⛔',
    signColor: 'red',
    signType: 'regulatory',
    question: 'No Entry Sign (Red circle with white horizontal bar)',
    answer: 'Vehicular traffic is completely prohibited from entering this road or junction. It typically marks the exit of a one-way street.',
    keyTakeaway: 'Never drive past a No Entry sign.'
  },
  {
    id: 'sign-roundabout-ahead',
    category: 'signs',
    signSymbol: '🔄',
    signColor: 'amber',
    signType: 'warning',
    question: 'Roundabout Ahead (Yellow diamond with rotating arrows)',
    answer: 'Warns you of an approaching roundabout. Slow down, check mirrors, decide which lane you need early, and be prepared to yield to traffic on the roundabout from your right.',
    keyTakeaway: 'Choose lane early; yield to traffic from the right.'
  },
  {
    id: 'sign-pedestrian-crossing',
    category: 'signs',
    signSymbol: '🚶',
    signColor: 'amber',
    signType: 'warning',
    question: 'Pedestrian Crossing Ahead (Yellow diamond with walking person)',
    answer: 'Warns that a pedestrian crossing or zebra crossing is ahead. Reduce speed, scan both footpaths, and prepare to yield to any pedestrian waiting or stepping onto the road.',
    keyTakeaway: 'Scan both footpaths and cover the brake.'
  },
  {
    id: 'sign-school-ahead',
    category: 'signs',
    signSymbol: '🚸',
    signColor: 'amber',
    signType: 'warning',
    question: 'School Children Crossing Ahead (Yellow diamond with children crossing)',
    answer: 'Warns of school children in the area. Expect children crossing unexpectedly, school buses stopping, and strict 30 km/h or 50 km/h speed limits during school hours.',
    keyTakeaway: 'Drive with extreme caution and watch for small children.'
  },
  {
    id: 'sign-crossroads',
    category: 'signs',
    signSymbol: '➕',
    signColor: 'amber',
    signType: 'warning',
    question: 'Crossroads Ahead (Yellow diamond with black cross)',
    answer: 'Warns of a 4-way intersection ahead where roads cross at right angles. Look out for vehicles pulling out or turning across your path.',
    keyTakeaway: 'Anticipate emerging traffic from both left and right.'
  },
  {
    id: 'sign-slippery-road',
    category: 'signs',
    signSymbol: '🚗〰️',
    signColor: 'amber',
    signType: 'warning',
    question: 'Slippery Road Ahead (Yellow diamond with skidding vehicle)',
    answer: 'Warns of road surface with reduced tyre grip (e.g. polished tarmac, loose chippings, or surface water). Avoid sudden harsh braking, acceleration, or sharp steering movements.',
    keyTakeaway: 'Slow down smoothly and increase following distance.'
  },
  {
    id: 'sign-steep-hill',
    category: 'signs',
    signSymbol: '📐',
    signColor: 'amber',
    signType: 'warning',
    question: 'Steep Hill Downwards / Upwards (Yellow diamond with percentage slope)',
    answer: 'Warns of a steep incline or descent. Downhill: select a lower gear to use engine braking rather than riding the brakes. Uphill: be prepared for hill starts and drop down a gear to maintain momentum.',
    keyTakeaway: 'Use lower gear for steep descents to prevent brake fade.'
  }
];

export interface TheoryQuizQuestion {
  id: number;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export const THEORY_PRACTICE_QUIZ: TheoryQuizQuestion[] = [
  {
    id: 1,
    question: "When is it permissible to overtake on the left in Ireland?",
    options: [
      "Whenever you want on any dual carriageway",
      "When the vehicle ahead is signaling to turn right and there is space on the left",
      "On motorways during light traffic",
      "Whenever the vehicle in front is driving under 40 km/h"
    ],
    correctIndex: 1,
    explanation: "You can overtake on the left when the vehicle ahead has signaled to turn right and there is clear space, when turning left, or in slow-moving traffic queues."
  },
  {
    id: 2,
    question: "What is the legal minimum tyre tread depth for passenger cars in Ireland?",
    options: [
      "1.0 mm",
      "1.6 mm",
      "2.0 mm",
      "3.0 mm"
    ],
    correctIndex: 1,
    explanation: "1.6 mm across the central three-quarters of the breadth of the tyre around the entire circumference."
  },
  {
    id: 3,
    question: "What does a single continuous solid white line down the centre of the road mean?",
    options: [
      "Overtake with caution",
      "Traffic must keep to the left; do not cross or straddle it",
      "Parking is allowed for up to 30 minutes",
      "Speed limit is 80 km/h"
    ],
    correctIndex: 1,
    explanation: "You must never cross or straddle a continuous white line except in an emergency or to avoid an immovable obstacle."
  },
  {
    id: 4,
    question: "What is the default speed limit on National Roads (e.g. N4) unless signed otherwise?",
    options: [
      "80 km/h",
      "100 km/h",
      "120 km/h",
      "50 km/h"
    ],
    correctIndex: 1,
    explanation: "National Primary and Secondary roads have a default speed limit of 100 km/h."
  },
  {
    id: 5,
    question: "What must you do at a STOP sign, even if the road appears completely clear?",
    options: [
      "Slow down to 10 km/h and glance both ways",
      "Come to a complete standstill behind the stop line",
      "Sound horn and proceed cautiously",
      "Stop only if traffic is approaching"
    ],
    correctIndex: 1,
    explanation: "A STOP sign legally mandates a complete stop with wheels stationary behind the line. Rolling stops result in an immediate test failure."
  },
  {
    id: 6,
    question: "What does a flashing amber traffic light indicate?",
    options: [
      "Speed up before the light turns red",
      "Proceed with caution and yield right of way to pedestrians",
      "Stop immediately and wait for green",
      "The traffic lights are out of service"
    ],
    correctIndex: 1,
    explanation: "Flashing amber means proceed with caution, yielding right of way to pedestrians crossing or waiting to cross."
  },
  {
    id: 7,
    question: "What is the rule regarding Yellow Box Junctions?",
    options: [
      "You can enter anytime as long as your speed is under 30 km/h",
      "Do not enter unless your exit is clear, except when turning right and not blocking oncoming traffic",
      "Always stop inside the box before proceeding",
      "Only commercial vehicles and buses can use yellow boxes"
    ],
    correctIndex: 1,
    explanation: "You must only enter a yellow box if your exit is clear, with the sole exception of waiting to complete a right turn."
  },
  {
    id: 8,
    question: "What is the minimum safe following distance behind a vehicle in wet weather?",
    options: [
      "1 second",
      "2 seconds",
      "4 seconds",
      "10 seconds"
    ],
    correctIndex: 2,
    explanation: "The 2-second rule applies in dry conditions. In wet weather, braking distances double, requiring at least a 4-second gap."
  },
  {
    id: 9,
    question: "What do double yellow lines along the edge of a kerb mean?",
    options: [
      "No parking during business hours",
      "No parking at any time (24 hours a day, 7 days a week)",
      "Parking permitted for up to 1 hour",
      "Loading zone only"
    ],
    correctIndex: 1,
    explanation: "Double yellow lines mean no parking at any time."
  },
  {
    id: 10,
    question: "Are Learner drivers permitted to drive on an Irish motorway?",
    options: [
      "Yes, if accompanied by a fully licensed driver of 2 years",
      "Yes, during daylight hours only",
      "No, learner drivers are strictly forbidden on motorways under all circumstances",
      "Yes, if driving below 80 km/h"
    ],
    correctIndex: 2,
    explanation: "In Ireland, learner permit holders are strictly prohibited from driving on motorways under any circumstances."
  }
];
