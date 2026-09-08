export interface BonnetQuestion {
  id: string;
  question: string;
  category: 'bonnet' | 'controls' | 'tires' | 'rules';
  answer: string;
  tip: string;
  iconName: string;
}

export const RSA_BONNET_QUESTIONS: BonnetQuestion[] = [
  {
    id: 'oil-level',
    question: 'How would you check the engine oil level?',
    category: 'bonnet',
    answer: 'Ensure the engine is cool and the car is parked on level ground. Remove the dipstick, wipe it clean with a cloth or tissue, reinsert it fully, pull it out again, and verify that the oil level sits between the MIN and MAX indicators. If low, top up through the oil filler cap.',
    tip: 'Point to the oil dipstick with bright yellow/orange ring and the oil cap marked with an oil can symbol.',
    iconName: 'Droplet'
  },
  {
    id: 'coolant-level',
    question: 'How would you check that the engine coolant level is safe?',
    category: 'bonnet',
    answer: 'Locate the translucent engine coolant expansion tank. Visually check that the coolant liquid is between the MIN and MAX markings on the side of the tank without opening the cap when hot.',
    tip: 'Never open the coolant cap when the engine is hot due to scalding pressure.',
    iconName: 'Thermometer'
  },
  {
    id: 'brake-fluid',
    question: 'How would you check that you have a safe level of hydraulic brake fluid?',
    category: 'bonnet',
    answer: 'Locate the brake fluid reservoir (usually on the driver side near the bulkhead). Visually inspect that the fluid level is between the MIN and MAX markings on the translucent plastic tank.',
    tip: 'Brake fluid should be clear amber, not dark brown.',
    iconName: 'ShieldAlert'
  },
  {
    id: 'washer-fluid',
    question: 'How would you check and top up the windscreen washer reservoir?',
    category: 'bonnet',
    answer: 'Locate the windscreen washer fluid cap (identifiable by a windscreen with water spray symbol). Open the cap and visually inspect the level, topping up with water and screenwash mixture until full.',
    tip: 'Always use screenwash additive to prevent freezing and smearing.',
    iconName: 'Sparkles'
  },
  {
    id: 'tire-tread',
    question: 'What is the legal minimum tire tread depth in Ireland, and how do you check it?',
    category: 'tires',
    answer: 'The legal minimum tread depth is 1.6 millimeters across the central three-quarters of the tire breadth around the entire circumference. Check using a tread depth gauge or by inspecting the raised tread wear indicator bars (TWIs) built into the tire grooves.',
    tip: 'Also inspect sidewalls for any bulges, cuts, or tears.',
    iconName: 'Disc'
  },
  {
    id: 'tire-pressure',
    question: 'How do you know the correct tire pressure for this vehicle and how is it checked?',
    category: 'tires',
    answer: 'Check the manufacturer specifications in the vehicle handbook, inside the driver door pillar sticker, or behind the fuel filler flap. Check pressure using a reliable tire pressure gauge when the tires are cold. Do not forget the spare tire.',
    tip: 'Pressure increases when tires are warm after driving, so always test cold.',
    iconName: 'Gauge'
  },
  {
    id: 'demister-controls',
    question: 'How would you demist the front and rear windscreens?',
    category: 'controls',
    answer: 'For the front: Turn the ventilation dial to the windscreen defrost symbol, set fan to high, switch on Air Conditioning (A/C to dry the air), and ensure air recirculation is OFF. For the rear: Press the heated rear window button (rectangular icon with wavy arrows).',
    tip: 'Keep your microfibre cloth handy in case of heavy misting before starting.',
    iconName: 'Wind'
  },
  {
    id: 'fog-lights',
    question: 'When should you turn on your rear fog lights and how are they operated?',
    category: 'controls',
    answer: 'Fog lights must ONLY be used when visibility is severely reduced to less than 100 meters (e.g. dense fog, heavy snow/spray). Switch headlights on dipped beam first, then twist the fog light switch or press the fog light button. Remember to switch them off as soon as visibility improves.',
    tip: 'Leaving fog lights on in clear conditions dazzles drivers behind and is an offense.',
    iconName: 'CloudFog'
  }
];

export interface MarkingCriterion {
  grade: 'Grade 1' | 'Grade 2' | 'Grade 3';
  title: string;
  definition: string;
  consequence: string;
  color: string;
  examples: string[];
}

export const RSA_MARKING_GUIDE: MarkingCriterion[] = [
  {
    grade: 'Grade 1',
    title: 'Minor Fault',
    definition: 'A minor error or deviation that is not serious or dangerous.',
    consequence: 'Recorded on marking sheet. Does not cause failure on its own.',
    color: 'emerald',
    examples: [
      'Hesitating slightly longer than necessary at a clear roundabout entry.',
      'Checking rear mirror a second after indicating rather than before.',
      'Slight engine over-revving when pulling away.'
    ]
  },
  {
    grade: 'Grade 2',
    title: 'More Serious Fault',
    definition: 'A significant fault that could affect road safety or other road users if repeated.',
    consequence: 'You FAIL if you receive 4 of the same Grade 2 fault for a single aspect, 6 or more for the same category, or 9 or more Grade 2s in total across the entire test.',
    color: 'amber',
    examples: [
      'Exceeding the 30 km/h speed limit in Caltragh or Cranmore estate.',
      'Failing to look over left shoulder while reversing around the corner.',
      'Vehicle rolling backward slightly on a hill start before pulling away.',
      'Failing to indicate when taking an exit off Carraroe roundabout.'
    ]
  },
  {
    grade: 'Grade 3',
    title: 'Dangerous / Serious Fault',
    definition: 'A dangerous action or gross disregard for road safety where an accident was caused or narrowly avoided, or examiner intervention was needed.',
    consequence: 'INSTANT AUTOMATIC FAIL. Test is terminated or candidate fails immediately.',
    color: 'red',
    examples: [
      'Mounting the kerb with a wheel while reversing or turning.',
      'Failing to stop completely at a STOP sign (e.g. Pound Street).',
      'Pulling out in front of oncoming traffic on Pearse Road causing them to brake.',
      'Examiner having to dual-brake or grab steering wheel.'
    ]
  }
];
