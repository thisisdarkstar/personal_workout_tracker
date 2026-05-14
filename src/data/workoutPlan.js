import { getCustomPlan } from '../components/PlanEditor'
import { getSettings } from '../components/PlanEditor'

const CUSTOM = typeof window !== 'undefined' ? getCustomPlan() : null
const SETTINGS = typeof window !== 'undefined' ? getSettings() : {}

export const PHASES = (CUSTOM && CUSTOM.phases) ?? {
  1: { name: 'Phase 1', weeks: 'Weeks 1-4', color: '#00ff88', focus: 'Foundation + Fat Loss' },
  2: { name: 'Phase 2', weeks: 'Weeks 5-8', color: '#ffaa00', focus: 'Work Capacity' },
  3: { name: 'Phase 3', weeks: 'Weeks 9-12', color: '#ff3366', focus: 'Strength + Conditioning' },
  4: { name: 'Phase 4', weeks: 'Weeks 13-16', color: '#00ccff', focus: 'Athletic Peak' },
}

export const DAYS = [
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
  'Sunday',
]

export const DAY_TYPES = CUSTOM?.dayTypes ?? [
  { type: 'upper', label: 'Upper Strength', icon: '💪' },
  { type: 'boxing', label: 'Boxing Conditioning', icon: '🥊' },
  { type: 'lower', label: 'Lower Body + Core', icon: '🦵' },
  { type: 'boxingHiit', label: 'Boxing Skills + HIIT', icon: '⚡' },
  { type: 'fullbody', label: 'Full Body Calisthenics', icon: '🔥' },
  { type: 'cardio', label: 'Zone 2 + Mobility', icon: '🚶' },
  { type: 'fullRest', label: 'Full Rest', icon: '😴' },
]

// ------------------------------------------------------
// HELPERS
// ------------------------------------------------------

function s(name, p1, p2, p3, p4) {
  return {
    name,
    progression: [p1, p2, p3, p4],
  }
}

function d(name, d1, d2, d3, d4) {
  return {
    name,
    durationProgression: [d1, d2, d3, d4],
  }
}

function ft(name, duration) {
  return {
    name,
    duration,
  }
}

// ------------------------------------------------------
// WORKOUT PLANS
// ------------------------------------------------------

export const WORKOUT_PLANS = CUSTOM?.workouts ?? {

  // ======================================================
  // PHASE 1 - FOUNDATION FAT LOSS
  // ======================================================

  1: {

    upper: {
      title: 'Upper Body Strength',
      exercises: [
        ft('Warm-Up - Jump Rope 3 min + Arm Circles Forward 20 reps + Arm Circles Backward 20 reps + Shoulder Rolls 20 reps + Scapular Push-ups 15 reps', '5 min'),

        s('Push-ups',
          { sets: 3, reps: '8-12' },
          { sets: 3, reps: '10-12' },
          { sets: 4, reps: '10-14' },
          { sets: 4, reps: '12-15' },
        ),

        s('Incline Push-ups',
          { sets: 2, reps: '12' },
          { sets: 2, reps: '14' },
          { sets: 3, reps: '12' },
          { sets: 3, reps: '15' },
        ),

        s('Table Rows / Towel Rows',
          { sets: 4, reps: '8-10' },
          { sets: 4, reps: '10-12' },
          { sets: 4, reps: '12' },
          { sets: 4, reps: '12-14' },
        ),

        s('Pike Push-ups',
          { sets: 3, reps: '6-8' },
          { sets: 3, reps: '8-10' },
          { sets: 3, reps: '10' },
          { sets: 4, reps: '8-10' },
        ),

        d('Dead Hang', '20 sec', '25 sec', '30 sec', '35 sec'),

        d('Plank', '45 sec', '50 sec', '60 sec', '60 sec'),

        d('Hollow Body Hold', '20 sec', '25 sec', '30 sec', '35 sec'),

        ft('Cool-Down - Doorway Chest Stretch 45 sec + Cross-Body Shoulder Stretch each side 30 sec + Overhead Tricep Stretch each side 30 sec + Child\'s Pose 60 sec', '5 min'),
      ],
    },

    boxing: {
      title: 'Boxing Conditioning',
      exercises: [
        d('Warm-Up - Jump Rope', '5 min', '6 min', '7 min', '8 min'),
        ft('Shoulder Rolls', '20 reps'),
        ft('Hip Rotations - stand feet shoulder-width apart, hands on hips, make slow large circles with your hips clockwise 10 reps then counterclockwise 10 reps', '20 reps'),

        d('Shadowboxing - Jab left fist straight forward + Cross right fist across + Step forward + Step backward, keep hands up by chin at all times, flow continuously', '10 min', '12 min', '14 min', '15 min'),

        d('Heavy Bag or Air Punch Intervals - throw non-stop Jab-Cross combinations for full round, rest 1 min between rounds', '6 rounds x 2 min', '6 rounds x 2 min', '7 rounds x 2 min', '8 rounds x 2 min'),

        d('High Knees - run in place driving each knee up to hip height as fast as possible, arms pumping, rest 30 sec between rounds', '30 sec x 3', '30 sec x 4', '40 sec x 4', '40 sec x 5'),

        d('Burpees - stand upright, squat and place hands on floor, jump feet back to plank, do 1 push-up, jump feet to hands, explode up with arms overhead', '8 reps x 3', '10 reps x 3', '10 reps x 4', '12 reps x 4'),

        ft('Cool-Down - Cross-Body Shoulder Stretch each side 30 sec + Wrist Flexor Stretch each side 30 sec + Standing Quad Stretch each side 30 sec + Child\'s Pose 60 sec', '5 min'),
      ],
    },

    lower: {
      title: 'Lower Body + Core',
      exercises: [
        ft('Warm-Up - Leg Swings Front/Back Left 15 reps + Leg Swings Front/Back Right 15 reps + Hip Circles 15 reps each direction + Bodyweight Squats 15 reps + Ankle Mobility Rocks 15 reps', '5 min'),

        s('Bodyweight Squats',
          { sets: 4, reps: '15' },
          { sets: 4, reps: '18' },
          { sets: 4, reps: '20' },
          { sets: 4, reps: '22' },
        ),

        s('Reverse Lunges',
          { sets: 3, reps: '10/leg' },
          { sets: 3, reps: '12/leg' },
          { sets: 4, reps: '10/leg' },
          { sets: 4, reps: '12/leg' },
        ),

        s('Bulgarian Split Squats',
          { sets: 3, reps: '8/leg' },
          { sets: 3, reps: '10/leg' },
          { sets: 4, reps: '10/leg' },
          { sets: 4, reps: '12/leg' },
        ),

        s('Hip Thrusts',
          { sets: 4, reps: '12' },
          { sets: 4, reps: '15' },
          { sets: 4, reps: '18' },
          { sets: 4, reps: '20' },
        ),

        s('Calf Raises',
          { sets: 4, reps: '20' },
          { sets: 4, reps: '22' },
          { sets: 4, reps: '25' },
          { sets: 4, reps: '30' },
        ),

        s('Leg Raises',
          { sets: 3, reps: '10' },
          { sets: 3, reps: '12' },
          { sets: 3, reps: '14' },
          { sets: 4, reps: '12' },
        ),

        d('Side Plank', '25 sec', '30 sec', '35 sec', '40 sec'),

        ft('Cool-Down - Standing Quad Stretch each side 45 sec + Hamstring Toe Reach Stretch 60 sec + Hip Flexor Stretch each side 30 sec + Butterfly Groin Stretch 60 sec', '5 min'),
      ],
    },

    boxingHiit: {
      title: 'Boxing Skills + HIIT',
      exercises: [
        ft('Warm-Up - Jump Rope 3 min + Shoulder Rolls 20 reps + Hip Rotations 20 reps + Head Movement Slips 20 reps', '5 min'),

        d('Footwork - Step Forward + Step Backward + Step Left + Step Right, bounce lightly on balls of feet between steps, hands up by chin at all times', '8 min', '10 min', '10 min', '12 min'),

        d('Shadowboxing - Jab + Cross + bend knees to slip head left + reset + Jab + Cross + bend knees to slip head right + reset, flow continuously', '10 min', '12 min', '14 min', '15 min'),

        d('Sprint in Place - Drive Knees to Hip Height as Fast as Possible 20 sec + Walk Slowly Breathing Through Nose 40 sec', '8 rounds', '10 rounds', '12 rounds', '12 rounds'),

        ft('Continuous Jab-Cross Punches - both arms alternating as fast as possible without stopping', '3 min'),

        ft('Cool-Down - Cross-Body Shoulder Stretch each side 30 sec + Wrist Flexor Stretch each side 30 sec + Calf Stretch each side 30 sec + Child\'s Pose 60 sec', '5 min'),
      ],
    },

    fullbody: {
      title: 'Full Body Calisthenics',
      exercises: [
        ft('Warm-Up - Jump Rope 2 min + Arm Circles Forward 20 reps + Hip Circles 20 reps + Bodyweight Squats 15 reps + Scapular Push-ups 15 reps', '5 min'),

        s('Push-ups',
          { sets: 3, reps: '10' },
          { sets: 3, reps: '12' },
          { sets: 4, reps: '12' },
          { sets: 4, reps: '15' },
        ),

        s('Table Rows - lie under a sturdy table, grip the edge overhead, hang with body straight, pull chest up to the table edge',
          { sets: 3, reps: '10' },
          { sets: 3, reps: '12' },
          { sets: 4, reps: '12' },
          { sets: 4, reps: '14' },
        ),

        s('Squats',
          { sets: 3, reps: '20' },
          { sets: 3, reps: '22' },
          { sets: 4, reps: '22' },
          { sets: 4, reps: '25' },
        ),

        s('Pike Push-ups',
          { sets: 3, reps: '8' },
          { sets: 3, reps: '10' },
          { sets: 4, reps: '10' },
          { sets: 4, reps: '12' },
        ),

        s('Reverse Lunges',
          { sets: 3, reps: '10/leg' },
          { sets: 3, reps: '12/leg' },
          { sets: 4, reps: '12/leg' },
          { sets: 4, reps: '14/leg' },
        ),

        s('Leg Raises',
          { sets: 3, reps: '10' },
          { sets: 3, reps: '12' },
          { sets: 3, reps: '14' },
          { sets: 4, reps: '15' },
        ),

        ft('Cool-Down - Hamstring Toe Reach Stretch 60 sec + Standing Quad Stretch each side 30 sec + Butterfly Groin Stretch 60 sec + Child\'s Pose 30 sec', '5 min'),
      ],
    },

    cardio: {
      title: 'Zone 2 Cardio + Mobility',
      exercises: [
        d('Brisk Walk or Light Jog - pace where you can speak in full sentences; if too breathless to talk, slow to a walk', '35 min', '40 min', '45 min', '45 min'),
        ft('Mobility - Cat-Cow Stretch 10 reps + Hip Flexor Stretch each side 45 sec + Hamstring Toe Reach 60 sec + Butterfly Groin Stretch 60 sec + Child\'s Pose 60 sec + Slow Nasal Breathing Inhale 4 sec Exhale 6 sec for 90 sec', '15 min'),
      ],
    },

    fullRest: {
      title: 'Full Rest',
      exercises: [
        ft('Full Rest - No training today. Drink 3L water, eat enough protein, sleep 8+ hrs to support muscle recovery', ''),
      ],
    },
  },

  // ======================================================
  // PHASE 2 - WORK CAPACITY (Weeks 5-8)
  // Week 1=Volume Build, Week 2=Intensity, Week 3=Peak, Week 4=Deload
  // ======================================================

  2: {

    upper: {
      title: 'Upper Strength Progression',
      exercises: [
        ft('Warm-Up - Jump Rope', '3 min'),
        ft('Arm Circles Forward', '20 reps'),
        ft('Arm Circles Backward', '20 reps'),
        ft('Shoulder Rolls', '20 reps'),
        ft('Scapular Push-ups - hold push-up position with arms straight, push shoulder blades apart rounding upper back, then squeeze them together; arms stay straight throughout', '15 reps'),
        ft('Push-up Position Shoulder Taps - hold push-up position, lift right hand to tap left shoulder then return, alternate sides; keep hips level and still throughout', '20 reps'),

        s('Push-ups',
          { sets: 4, reps: '12-15', rest: '75 sec' },
          { sets: 4, reps: '14-16', rest: '75 sec' },
          { sets: 4, reps: '15-18', rest: '90 sec' },
          { sets: 3, reps: '12-14', rest: '75 sec' },
        ),

        s('Decline Push-ups',
          { sets: 3, reps: '8-10', rest: '75 sec' },
          { sets: 3, reps: '10-12', rest: '75 sec' },
          { sets: 4, reps: '10-12', rest: '90 sec' },
          { sets: 3, reps: '8-10', rest: '75 sec' },
        ),

        s('Table Rows / Towel Rows',
          { sets: 4, reps: '12', rest: '75 sec', note: 'Pull elbows back, squeeze shoulder blades' },
          { sets: 4, reps: '14', rest: '75 sec' },
          { sets: 5, reps: '12', rest: '90 sec' },
          { sets: 3, reps: '12', rest: '75 sec' },
        ),

        s('Pike Push-ups',
          { sets: 4, reps: '8-10', rest: '75 sec', note: 'Head moves forward, lower until crown nearly touches floor' },
          { sets: 4, reps: '10', rest: '75 sec' },
          { sets: 4, reps: '12', rest: '90 sec' },
          { sets: 3, reps: '8-10', rest: '75 sec' },
        ),

        d('Dead Hang', '30 sec', '35 sec', '40 sec', '30 sec'),
        d('Plank', '60 sec', '70 sec', '75 sec', '60 sec'),
        d('Hollow Body Hold', '25 sec', '30 sec', '35 sec', '25 sec'),

        ft('Doorway Chest Stretch', '45 sec'),
        ft('Cross-Body Shoulder Stretch (Left)', '30 sec'),
        ft('Cross-Body Shoulder Stretch (Right)', '30 sec'),
        ft('Child\'s Pose', '60 sec'),
        ft('Slow Nasal Breathing - Inhale through nose 4 sec, Exhale through nose 6 sec, repeat for full duration', '90 sec'),
      ],
    },

    boxing: {
      title: 'Boxing Conditioning',
      exercises: [
        ft('Warm-Up - Jump Rope', '5 min'),
        ft('Shadowboxing Easy Pace - throw slow relaxed Jab-Cross punches at 50% speed, step side to side lightly; goal is to warm up shoulders and loosen up, not to go hard', '2 min'),
        ft('Shoulder Rolls', '20 reps'),
        ft('Hip Rotations - stand feet shoulder-width apart, hands on hips, make slow large circles with your hips clockwise 10 reps then counterclockwise 10 reps', '20 reps'),
        ft('Head Movement Slips - stand in boxing stance, bend knees to shift head left under an imaginary punch, reset upright, then bend knees to shift head right, alternate', '20 reps'),

        d('Shadowboxing - Jab left + Cross right + Hook (arc left fist to imaginary chin) + Step left and pivot right to exit angle + reset, flow smoothly for full duration', '14 min', '16 min', '18 min', '12 min'),
        d('Heavy Bag - 1-2-3 Combos + Body Shots', '8 rounds x 2 min', '8 rounds x 2 min', '9 rounds x 2 min', '6 rounds x 2 min'),
        d('Boxing HIIT - Fast Jab-Cross Punches at Maximum Speed 20 sec + Step Forward Backward Left Right Recovery 40 sec', '10 rounds', '12 rounds', '14 rounds', '8 rounds'),

        ft('Shoulder Rolls', '20 reps'),
        ft('Thoracic Twist Stretch - sit cross-legged, place right hand behind head, rotate upper body to the right as far as comfortable, hold, then repeat on left side', '45 sec'),
        ft('Wrist Flexor Stretch (Left)', '30 sec'),
        ft('Wrist Flexor Stretch (Right)', '30 sec'),
        ft('Slow Nasal Breathing - Inhale through nose 4 sec, Exhale through nose 6 sec, repeat for full duration', '90 sec'),
      ],
    },

    lower: {
      title: 'Lower Body Strength',
      exercises: [
        ft('Warm-Up - Jump Rope', '2 min'),
        ft('Leg Swings Front/Back (Left)', '15 reps'),
        ft('Leg Swings Front/Back (Right)', '15 reps'),
        ft('Hip Circles - stand feet shoulder-width apart, hands on hips, draw large slow circles with hips clockwise then counterclockwise', '15 reps'),
        ft('Bodyweight Squats', '15 reps'),
        ft('Ankle Mobility Rocks - stand near wall for balance, slowly rock up onto toes then back onto heels, pause at each end to feel the stretch', '15 reps'),

        s('Squats',
          { sets: 4, reps: '20', rest: '60 sec' },
          { sets: 4, reps: '22', rest: '60 sec' },
          { sets: 5, reps: '20', rest: '75 sec' },
          { sets: 3, reps: '18', rest: '60 sec' },
        ),

        s('Bulgarian Split Squats',
          { sets: 4, reps: '10/leg', rest: '90 sec', note: 'Knee tracks over toes, keep torso upright' },
          { sets: 4, reps: '12/leg', rest: '90 sec' },
          { sets: 4, reps: '14/leg', rest: '90 sec' },
          { sets: 3, reps: '10/leg', rest: '90 sec' },
        ),

        s('Jump Squats',
          { sets: 3, reps: '10', rest: '75 sec', note: 'Land softly and keep knees aligned' },
          { sets: 3, reps: '12', rest: '75 sec' },
          { sets: 4, reps: '12', rest: '90 sec' },
          { sets: 2, reps: '10', rest: '75 sec' },
        ),

        s('Hip Thrusts',
          { sets: 4, reps: '15', rest: '60 sec', note: 'Squeeze glutes hard at the top' },
          { sets: 4, reps: '18', rest: '60 sec' },
          { sets: 4, reps: '20', rest: '75 sec' },
          { sets: 3, reps: '15', rest: '60 sec' },
        ),

        s('Hamstring Walkouts - stand feet hip-width, hinge forward placing hands on floor, walk hands out to push-up position, then walk hands back to feet and stand up',
          { sets: 3, reps: '10', rest: '60 sec' },
          { sets: 3, reps: '12', rest: '60 sec' },
          { sets: 3, reps: '12', rest: '60 sec' },
          { sets: 2, reps: '10', rest: '60 sec' },
        ),

        s('Leg Raises',
          { sets: 4, reps: '12', rest: '60 sec' },
          { sets: 4, reps: '14', rest: '60 sec' },
          { sets: 4, reps: '15', rest: '75 sec' },
          { sets: 3, reps: '12', rest: '60 sec' },
        ),

        ft('Standing Quad Stretch (Left)', '45 sec'),
        ft('Standing Quad Stretch (Right)', '45 sec'),
        ft('Hamstring Toe Reach Stretch', '60 sec'),
        ft('Hip Flexor Stretch (Left)', '45 sec'),
        ft('Hip Flexor Stretch (Right)', '45 sec'),
        ft('Butterfly Groin Stretch', '60 sec'),
        ft('Slow Nasal Breathing - Inhale through nose 4 sec, Exhale through nose 6 sec, repeat for full duration', '90 sec'),
      ],
    },

    boxingHiit: {
      title: 'Boxing Skills + HIIT',
      exercises: [
        ft('Warm-Up - Jump Rope', '5 min'),
        ft('Shoulder Warm-Up - Shoulder Circles Forward 20 reps + Shoulder Circles Backward 20 reps + Arm Swings Across Chest 20 reps + Wrist Circles 20 reps', '2 min'),

        d('Footwork - Step In toward target + Step Out away from target + Pivot Right (spin on right foot swinging left foot around) + Pivot Left, stay on balls of feet, hands up', '12 min', '14 min', '15 min', '10 min'),
        d('Shadowboxing - Jab + Cross + Hook + Cross + bend knees to slip head left or right to dodge, reset and repeat flow', '14 min', '16 min', '18 min', '12 min'),
        d('Sprint in Place - Maximum Knee Drive 20 sec + Walk Slowly Breathing Through Nose 40 sec', '12 rounds', '14 rounds', '16 rounds', '10 rounds'),
        ft('Continuous Jab-Cross Punches - both arms alternating as fast as possible without stopping', '2 min'),

        ft('Shoulder Rolls', '20 reps'),
        ft('Thoracic Twist Stretch - sit cross-legged, place right hand behind head, rotate upper body to the right as far as comfortable, hold, then repeat on left side', '45 sec'),
        ft('Calf Stretch - stand an arm\'s length from wall, step right foot back with heel flat on floor, lean forward until calf stretches, hold, then switch legs', '45 sec'),
        ft('Slow Nasal Breathing - Inhale through nose 4 sec, Exhale through nose 6 sec, repeat for full duration', '90 sec'),
      ],
    },

    fullbody: {
      title: 'Full Body Conditioning',
      exercises: [
        ft('Warm-Up - Jump Rope', '3 min'),
        ft('Arm Circles', '20 reps'),
        ft('Hip Circles - stand feet shoulder-width apart, hands on hips, draw large slow circles with hips clockwise then counterclockwise', '20 reps'),
        ft('Bodyweight Squats', '15 reps'),
        ft('Scapular Push-ups - hold push-up position with arms straight, push shoulder blades apart rounding upper back, then squeeze them together; arms stay straight throughout', '15 reps'),

        s('Push-ups',
          { sets: 3, reps: '12', rest: '75 sec' },
          { sets: 4, reps: '12', rest: '75 sec' },
          { sets: 4, reps: '14', rest: '90 sec' },
          { sets: 3, reps: '10', rest: '75 sec' },
        ),

        s('Table Rows / Towel Rows',
          { sets: 3, reps: '12', rest: '75 sec' },
          { sets: 4, reps: '12', rest: '75 sec' },
          { sets: 4, reps: '14', rest: '90 sec' },
          { sets: 3, reps: '10', rest: '75 sec' },
        ),

        s('Squats',
          { sets: 3, reps: '20', rest: '60 sec' },
          { sets: 3, reps: '22', rest: '60 sec' },
          { sets: 4, reps: '22', rest: '75 sec' },
          { sets: 3, reps: '18', rest: '60 sec' },
        ),

        d('Circuit - 10 Push-ups + 15 Squats + 10 Table Rows (lie under table grip edge pull chest up) + 20 Mountain Climbers (from plank drive right knee toward left elbow alternate sides fast)', '4 rounds', '5 rounds', '5 rounds', '3 rounds'),

        ft('Hamstring Stretch - sit on floor with legs straight, reach both hands toward feet and hold; or stand and hinge forward reaching toward feet; keep legs as straight as comfortable', '60 sec'),
        ft('Butterfly Stretch - sit on floor, press soles of feet together close to your body, hold feet with both hands, gently press knees toward floor and hold', '60 sec'),
        ft('Shoulder Pass-Through - hold a towel wide overhead with both hands, slowly arc arms backward until towel reaches lower back, then return overhead; keep arms straight throughout', '15 reps'),
        ft('Deep Squat Hold - squat down as deep as possible with heels flat on floor, press palms together at chest to help balance, hold position', '60 sec'),
        ft('Child\'s Pose', '60 sec'),
      ],
    },

    cardio: {
      title: 'Zone 2 Cardio + Mobility',
      exercises: [
        d('Brisk Walk or Light Jog - pace where you can speak full sentences without gasping; if breathing too hard to talk, slow to a walk', '40 min', '45 min', '45 min', '35 min'),
        ft('Cat-Cow Stretch - on hands and knees, arch back upward rounding spine and tucking chin (Cat), then dip belly downward lifting head (Cow), alternate slowly', '10 reps'),
        ft('Hip Flexor Stretch (Left)', '45 sec'),
        ft('Hip Flexor Stretch (Right)', '45 sec'),
        ft('Hamstring Stretch - sit on floor with legs straight, reach both hands toward feet and hold; or stand and hinge forward reaching toward feet; keep legs as straight as comfortable', '60 sec'),
        ft('Thoracic Spine Rotations - sit cross-legged or on chair, place hands behind head, rotate upper body left as far as comfortable then right; keep hips still, only the upper back rotates', '10 reps/side'),
        ft('Ankle Mobility Rocks - stand near wall for balance, slowly rock up onto toes then back onto heels, pause at each end to feel the stretch', '15 reps/side'),
        ft('Slow Nasal Breathing - Inhale through nose 4 sec, Exhale through nose 6 sec, repeat for full duration', '2 min'),
      ],
    },

    fullRest: {
      title: 'Full Rest',
      exercises: [
        ft('Rest & Recovery - Hydration Goal 3+ liters', ''),
        ft('Easy Walk (optional)', '15-20 min'),
        ft('Light Stretching - Hamstring Toe Reach Stretch + Standing Quad Stretch each side + Butterfly Groin Stretch + Child\'s Pose (optional)', '10 min'),
        ft('Sleep Target', '7.5-9 hrs'),
      ],
    },
  },

  // ======================================================
  // PHASE 3 - STRENGTH + CONDITIONING (Weeks 9-12)
  // Week 1=Volume Build, Week 2=Intensity, Week 3=Peak, Week 4=Deload
  // ======================================================

  3: {
    upper: {
      title: 'Advanced Upper Strength',
      exercises: [
        ft('Warm-Up - Jump Rope', '3 min'),
        ft('Arm Circles Forward', '20 reps'),
        ft('Arm Circles Backward', '20 reps'),
        ft('Shoulder Rolls', '20 reps'),
        ft('Scapular Push-ups - hold push-up position with arms straight, push shoulder blades apart rounding upper back, then squeeze them together; arms stay straight throughout', '20 reps'),
        ft('Push-up Position Shoulder Taps - hold push-up position, lift right hand to tap left shoulder then return, alternate sides; keep hips level and still throughout', '24 reps'),
        ft('Chest Opener Arm Swings - extend both arms wide to sides then swing across chest crossing over, alternating which arm is on top, repeat continuously', '30 sec'),

        s('Explosive Push-ups',
          { sets: 4, reps: '8', rest: '90 sec', note: 'Absorb landing softly, maintain plank body line' },
          { sets: 4, reps: '10', rest: '90 sec' },
          { sets: 5, reps: '10', rest: '90 sec' },
          { sets: 3, reps: '8', rest: '90 sec' },
        ),

        s('Decline Push-ups',
          { sets: 4, reps: '12', rest: '75 sec' },
          { sets: 4, reps: '14', rest: '75 sec' },
          { sets: 5, reps: '12', rest: '90 sec' },
          { sets: 3, reps: '10', rest: '75 sec' },
        ),

        s('Table Rows / Towel Rows',
          { sets: 5, reps: '12', rest: '75 sec', note: 'Pull elbows toward hips, full range of motion' },
          { sets: 5, reps: '14', rest: '75 sec' },
          { sets: 5, reps: '15', rest: '90 sec' },
          { sets: 4, reps: '12', rest: '75 sec' },
        ),

        s('Pike Push-ups',
          { sets: 4, reps: '12', rest: '75 sec' },
          { sets: 4, reps: '14', rest: '75 sec' },
          { sets: 5, reps: '12', rest: '90 sec' },
          { sets: 3, reps: '10', rest: '75 sec' },
        ),

        d('Dead Hang', '35 sec', '40 sec', '45 sec', '30 sec'),
        d('Plank', '75 sec', '90 sec', '90 sec', '60 sec'),
        d('Hollow Body Hold', '30 sec', '35 sec', '40 sec', '25 sec'),

        ft('Doorway Chest Stretch', '45 sec'),
        ft('Cross-Body Shoulder Stretch (Left)', '30 sec'),
        ft('Cross-Body Shoulder Stretch (Right)', '30 sec'),
        ft('Overhead Tricep Stretch (Left)', '30 sec'),
        ft('Overhead Tricep Stretch (Right)', '30 sec'),
        ft('Child\'s Pose', '60 sec'),
        ft('Slow Nasal Breathing - Inhale through nose 4 sec, Exhale through nose 6 sec, repeat for full duration', '90 sec'),
      ],
    },

    boxing: {
      title: 'Boxing Power + Conditioning',
      exercises: [
        ft('Warm-Up - Jump Rope', '5 min'),
        ft('Shadowboxing Easy Pace - throw slow relaxed Jab-Cross punches at 50% speed, step side to side lightly; goal is to warm up shoulders and loosen up, not to go hard', '2 min'),
        ft('Shoulder Rolls', '20 reps'),
        ft('Hip Rotations - stand feet shoulder-width apart, hands on hips, make slow large circles with your hips clockwise 10 reps then counterclockwise 10 reps', '20 reps'),
        ft('Head Movement Slips - stand in boxing stance, bend knees to shift head left under an imaginary punch, reset upright, then bend knees to shift head right, alternate', '30 reps'),
        ft('Light Jab-Cross Flow - throw slow Jab-Cross combinations at 50% effort, step side to side lightly; focus on loosening shoulders and establishing rhythm', '2 min'),

        d('Shadowboxing - Jab + Cross + Hook + pivot right foot swinging left foot around to exit angle + bend knees to slip imaginary counter punch, flow continuously', '18 min', '20 min', '22 min', '15 min'),
        d('Heavy Bag - Power Combos + Body Shots + Head Movement', '10 rounds x 3 min', '10 rounds x 3 min', '12 rounds x 3 min', '8 rounds x 2 min'),
        d('Boxing HIIT - Fast Jab-Cross Punches at Maximum Speed 20 sec + Step Forward Backward Left Right Recovery 40 sec', '12 rounds', '14 rounds', '14 rounds', '10 rounds'),

        ft('Shoulder Rolls', '20 reps'),
        ft('Arm Swings - extend both arms wide to sides then swing across chest crossing over, alternate which arm is on top, repeat continuously', '30 sec'),
        ft('Thoracic Twist Stretch - sit cross-legged, place right hand behind head, rotate upper body to the right as far as comfortable, hold, then repeat on left side', '45 sec'),
        ft('Doorway Chest Stretch', '45 sec'),
        ft('Wrist Flexor Stretch (Left)', '30 sec'),
        ft('Wrist Flexor Stretch (Right)', '30 sec'),
        ft('Slow Nasal Breathing - Inhale through nose 4 sec, Exhale through nose 6 sec, repeat for full duration', '90 sec'),
      ],
    },

    lower: {
      title: 'Explosive Lower Body + Core',
      exercises: [
        ft('Warm-Up - Jump Rope', '3 min'),
        ft('Leg Swings Front/Back (Left)', '15 reps'),
        ft('Leg Swings Front/Back (Right)', '15 reps'),
        ft('Hip Circles - stand feet shoulder-width apart, hands on hips, draw large slow circles with hips clockwise then counterclockwise', '15 reps'),
        ft('Walking Lunges - step forward with right foot, lower left knee toward floor without touching, push back up, step forward with left foot, alternate legs', '10 reps/leg'),
        ft('Ankle Mobility Rocks - stand near wall for balance, slowly rock up onto toes then back onto heels, pause at each end to feel the stretch', '15 reps'),

        s('Jump Squats',
          { sets: 4, reps: '12', rest: '90 sec', note: 'Land softly, absorb impact through hips and knees' },
          { sets: 4, reps: '15', rest: '90 sec' },
          { sets: 5, reps: '15', rest: '90 sec' },
          { sets: 3, reps: '10', rest: '90 sec' },
        ),

        s('Bulgarian Split Squats',
          { sets: 4, reps: '12/leg', rest: '90 sec', note: 'Knee tracks over toes, keep front shin vertical' },
          { sets: 4, reps: '14/leg', rest: '90 sec' },
          { sets: 5, reps: '12/leg', rest: '90 sec' },
          { sets: 3, reps: '10/leg', rest: '90 sec' },
        ),

        s('Hip Thrusts',
          { sets: 5, reps: '18', rest: '60 sec', note: 'Squeeze glutes at top, hold 1 second' },
          { sets: 5, reps: '20', rest: '60 sec' },
          { sets: 5, reps: '22', rest: '75 sec' },
          { sets: 4, reps: '16', rest: '60 sec' },
        ),

        s('Hamstring Walkouts - stand feet hip-width, hinge forward placing hands on floor, walk hands out to push-up position, then walk hands back to feet and stand up',
          { sets: 3, reps: '12', rest: '60 sec' },
          { sets: 4, reps: '12', rest: '60 sec' },
          { sets: 4, reps: '14', rest: '60 sec' },
          { sets: 3, reps: '10', rest: '60 sec' },
        ),

        s('Calf Raises',
          { sets: 4, reps: '25', rest: '45 sec' },
          { sets: 4, reps: '28', rest: '45 sec' },
          { sets: 4, reps: '30', rest: '60 sec' },
          { sets: 3, reps: '20', rest: '45 sec' },
        ),

        s('Leg Raises',
          { sets: 4, reps: '14', rest: '60 sec' },
          { sets: 4, reps: '15', rest: '60 sec' },
          { sets: 5, reps: '15', rest: '75 sec' },
          { sets: 3, reps: '12', rest: '60 sec' },
        ),

        ft('Standing Quad Stretch (Left)', '45 sec'),
        ft('Standing Quad Stretch (Right)', '45 sec'),
        ft('Hamstring Toe Reach Stretch', '60 sec'),
        ft('Hip Flexor Stretch (Left)', '45 sec'),
        ft('Hip Flexor Stretch (Right)', '45 sec'),
        ft('Butterfly Groin Stretch', '60 sec'),
        ft('Deep Squat Hold - squat down as deep as possible with heels flat on floor, press palms together at chest to help balance, hold position', '45 sec'),
        ft('Slow Nasal Breathing - Inhale through nose 4 sec, Exhale through nose 6 sec, repeat for full duration', '90 sec'),
      ],
    },

    boxingHiit: {
      title: 'Advanced Boxing HIIT',
      exercises: [
        ft('Warm-Up - Jump Rope', '6 min'),
        ft('Shoulder Warm-Up - Shoulder Circles Forward 20 reps + Shoulder Circles Backward 20 reps + Arm Swings Across Chest 20 reps + Wrist Circles 20 reps', '2 min'),

        d('Footwork - Step In + Step Out + Lateral Step Left + Lateral Step Right + Pivot Right + Pivot Left, bounce on balls of feet between steps, hands up at all times', '14 min', '16 min', '18 min', '12 min'),
        d('Shadowboxing - Jab + Cross + Hook + Cross + slip left or right + throw counter Jab on return, flow as one continuous sequence', '18 min', '20 min', '22 min', '15 min'),
        d('Sprint in Place - Maximum Knee Drive 20 sec + Walk Slowly Breathing Through Nose 40 sec', '14 rounds', '16 rounds', '16 rounds', '10 rounds'),
        d('Jump Rope Finisher', '6 min', '7 min', '8 min', '5 min'),

        ft('Thoracic Twist Stretch - sit cross-legged, place right hand behind head, rotate upper body to the right as far as comfortable, hold, then repeat on left side', '45 sec'),
        ft('Calf Stretch Against Wall (Left)', '45 sec'),
        ft('Calf Stretch Against Wall (Right)', '45 sec'),
        ft('Hip Rotation Stretch - lie on back, cross right ankle over left knee, hold back of left thigh and gently pull both legs toward chest, hold, then switch sides', '45 sec'),
        ft('Slow Nasal Breathing - Inhale through nose 4 sec, Exhale through nose 6 sec, repeat for full duration', '90 sec'),
      ],
    },

    fullbody: {
      title: 'Athletic Full Body',
      exercises: [
        ft('Warm-Up - Jump Rope', '3 min'),
        ft('Arm Circles', '20 reps'),
        ft('Hip Circles - stand feet shoulder-width apart, hands on hips, draw large slow circles with hips clockwise then counterclockwise', '20 reps'),
        ft('Bodyweight Squats', '15 reps'),
        ft('Scapular Push-ups - hold push-up position with arms straight, push shoulder blades apart rounding upper back, then squeeze them together; arms stay straight throughout', '20 reps'),

        s('Push-ups',
          { sets: 4, reps: '14', rest: '75 sec' },
          { sets: 4, reps: '16', rest: '90 sec' },
          { sets: 4, reps: '18', rest: '90 sec' },
          { sets: 3, reps: '12', rest: '75 sec' },
        ),

        s('Table Rows / Towel Rows',
          { sets: 4, reps: '14', rest: '75 sec' },
          { sets: 4, reps: '16', rest: '90 sec' },
          { sets: 4, reps: '18', rest: '90 sec' },
          { sets: 3, reps: '12', rest: '75 sec' },
        ),

        s('Squats',
          { sets: 4, reps: '22', rest: '60 sec' },
          { sets: 4, reps: '25', rest: '75 sec' },
          { sets: 4, reps: '25', rest: '75 sec' },
          { sets: 3, reps: '18', rest: '60 sec' },
        ),

        s('Reverse Lunges',
          { sets: 3, reps: '12/leg', rest: '75 sec' },
          { sets: 4, reps: '12/leg', rest: '90 sec' },
          { sets: 4, reps: '14/leg', rest: '90 sec' },
          { sets: 3, reps: '10/leg', rest: '75 sec' },
        ),

        d('Circuit - 10 Push-ups + 15 Squats + 10 Table Rows (lie under table grip edge pull chest up) + 20 Mountain Climbers (from plank drive right knee toward left elbow alternate sides fast)', '5 rounds', '6 rounds', '6 rounds', '4 rounds'),

        ft('World\'s Greatest Stretch Left - lunge forward left foot, drop right knee toward floor, place left hand outside left foot, twist upper body left reaching right arm overhead, hold', '45 sec'),
        ft('World\'s Greatest Stretch Right - lunge forward right foot, drop left knee toward floor, place right hand outside right foot, twist upper body right reaching left arm overhead, hold', '45 sec'),
        ft('Hamstring Stretch - sit on floor with legs straight, reach both hands toward feet and hold; or stand and hinge forward reaching toward feet; keep legs as straight as comfortable', '60 sec'),
        ft('Thoracic Spine Rotations - sit cross-legged or on chair, place hands behind head, rotate upper body left as far as comfortable then right; keep hips still, only the upper back rotates', '10 reps/side'),
        ft('Deep Squat Hold - squat down as deep as possible with heels flat on floor, press palms together at chest to help balance, hold position', '60 sec'),
        ft('Child\'s Pose', '60 sec'),
      ],
    },

    cardio: {
      title: 'Zone 2 Cardio + Mobility',
      exercises: [
        d('Brisk Walk or Light Jog - pace where you can speak full sentences without gasping; if breathing too hard to talk, slow to a walk', '45 min', '50 min', '50 min', '40 min'),
        ft('Cat-Cow Stretch - on hands and knees, arch back upward rounding spine and tucking chin (Cat), then dip belly downward lifting head (Cow), alternate slowly', '10 reps'),
        ft('Hip Flexor Stretch (Left)', '45 sec'),
        ft('Hip Flexor Stretch (Right)', '45 sec'),
        ft('Hamstring Stretch - sit on floor with legs straight, reach both hands toward feet and hold; or stand and hinge forward reaching toward feet; keep legs as straight as comfortable', '60 sec'),
        ft('Butterfly Stretch - sit on floor, press soles of feet together close to your body, hold feet with both hands, gently press knees toward floor and hold', '60 sec'),
        ft('Thoracic Spine Rotations - sit cross-legged or on chair, place hands behind head, rotate upper body left as far as comfortable then right; keep hips still, only the upper back rotates', '10 reps/side'),
        ft('Hip Opener Circles - stand on one leg, raise opposite knee to hip height and draw large outward circles with the knee then inward circles, switch legs', '10 reps/side'),
        ft('Slow Nasal Breathing - Inhale through nose 4 sec, Exhale through nose 6 sec, repeat for full duration', '2 min'),
      ],
    },

    fullRest: {
      title: 'Full Rest',
      exercises: [
        ft('Rest & Recovery - Hydration Goal 3+ liters', ''),
        ft('Easy Walk (optional)', '15-20 min'),
        ft('Light Stretching - Hamstring Toe Reach Stretch + Standing Quad Stretch each side + Butterfly Groin Stretch + Child\'s Pose (optional)', '10 min'),
        ft('Sleep Target', '7.5-9 hrs'),
      ],
    },
  },

  // ======================================================
  // PHASE 4 - PEAK CONDITIONING (Weeks 13-16)
  // Week 1=Volume Build, Week 2=Intensity, Week 3=Peak, Week 4=Deload
  // ======================================================

  4: {
    upper: {
      title: 'Peak Upper Strength',
      exercises: [
        ft('Warm-Up - Jump Rope', '3 min'),
        ft('Arm Circles Forward', '20 reps'),
        ft('Arm Circles Backward', '20 reps'),
        ft('Shoulder Rolls', '20 reps'),
        ft('Scapular Push-ups - hold push-up position with arms straight, push shoulder blades apart rounding upper back, then squeeze them together; arms stay straight throughout', '20 reps'),
        ft('Push-up Position Shoulder Taps - hold push-up position, lift right hand to tap left shoulder then return, alternate sides; keep hips level and still throughout', '28 reps'),
        ft('Chest Opener Arm Swings - extend both arms wide to sides then swing across chest crossing over, alternating which arm is on top, repeat continuously', '30 sec'),

        s('Explosive Push-ups',
          { sets: 4, reps: '10', rest: '90 sec', note: 'Absorb landing softly, maintain full body tension' },
          { sets: 5, reps: '10', rest: '90 sec' },
          { sets: 5, reps: '12', rest: '90 sec' },
          { sets: 3, reps: '8', rest: '90 sec' },
        ),

        s('Decline Push-ups',
          { sets: 4, reps: '14', rest: '90 sec' },
          { sets: 5, reps: '14', rest: '90 sec' },
          { sets: 5, reps: '16', rest: '90 sec' },
          { sets: 3, reps: '12', rest: '75 sec' },
        ),

        s('Table Rows / Towel Rows',
          { sets: 5, reps: '14', rest: '75 sec', note: 'Pull elbows toward hips, full squeeze at top' },
          { sets: 5, reps: '16', rest: '90 sec' },
          { sets: 5, reps: '18', rest: '90 sec' },
          { sets: 4, reps: '12', rest: '75 sec' },
        ),

        s('Pike Push-ups',
          { sets: 4, reps: '14', rest: '90 sec' },
          { sets: 5, reps: '14', rest: '90 sec' },
          { sets: 5, reps: '16', rest: '90 sec' },
          { sets: 3, reps: '12', rest: '75 sec' },
        ),

        d('Dead Hang', '40 sec', '45 sec', '50 sec', '35 sec'),
        d('Plank', '90 sec', '100 sec', '120 sec', '75 sec'),
        d('Hollow Body Hold', '35 sec', '40 sec', '45 sec', '30 sec'),

        ft('Doorway Chest Stretch', '45 sec'),
        ft('Cross-Body Shoulder Stretch (Left)', '30 sec'),
        ft('Cross-Body Shoulder Stretch (Right)', '30 sec'),
        ft('Overhead Tricep Stretch (Left)', '30 sec'),
        ft('Overhead Tricep Stretch (Right)', '30 sec'),
        ft('Child\'s Pose', '60 sec'),
        ft('Cat-Cow Stretch - on hands and knees, arch back upward rounding spine and tucking chin (Cat), then dip belly downward lifting head (Cow), alternate slowly', '10 reps'),
        ft('Slow Nasal Breathing - Inhale through nose 4 sec, Exhale through nose 6 sec, repeat for full duration', '90 sec'),
      ],
    },

    boxing: {
      title: 'Peak Boxing Conditioning',
      exercises: [
        ft('Warm-Up - Jump Rope', '6 min'),
        ft('Shadowboxing Easy Pace - throw slow relaxed Jab-Cross punches at 50% speed, step side to side lightly; goal is to warm up shoulders and loosen up, not to go hard', '2 min'),
        ft('Shoulder Rolls', '20 reps'),
        ft('Hip Rotations - stand feet shoulder-width apart, hands on hips, make slow large circles with your hips clockwise 10 reps then counterclockwise 10 reps', '20 reps'),
        ft('Head Movement Slips - stand in boxing stance, bend knees to shift head left under an imaginary punch, reset upright, then bend knees to shift head right, alternate', '30 reps'),
        ft('Fast Feet - shuffle feet on the spot as fast as possible staying light on toes, keep arms relaxed and hands up by chin', '30 sec'),

        d('Shadowboxing - Jab + Cross + Hook + Cross + bend knees slip head left + counter Jab + pivot right foot to exit angle, flow continuously', '20 min', '22 min', '25 min', '15 min'),
        d('Heavy Bag - Full Power Combos + Head Movement', '10 rounds x 3 min', '12 rounds x 3 min', '12 rounds x 3 min', '8 rounds x 2 min'),
        d('Boxing HIIT - Fast Jab-Cross Punches at Maximum Speed 20 sec + Step Forward Backward Left Right Recovery 40 sec', '12 rounds', '14 rounds', '16 rounds', '10 rounds'),

        ft('Shoulder Rolls', '20 reps'),
        ft('Arm Swings - extend both arms wide to sides then swing across chest crossing over, alternate which arm is on top, repeat continuously', '30 sec'),
        ft('Thoracic Twist Stretch - sit cross-legged, place right hand behind head, rotate upper body to the right as far as comfortable, hold, then repeat on left side', '45 sec'),
        ft('Doorway Chest Stretch', '45 sec'),
        ft('Wrist Flexor Stretch (Left)', '30 sec'),
        ft('Wrist Flexor Stretch (Right)', '30 sec'),
        ft('Hip Rotation Stretch - lie on back, cross right ankle over left knee, hold back of left thigh and gently pull both legs toward chest, hold, then switch sides', '45 sec'),
        ft('Slow Nasal Breathing - Inhale through nose 4 sec, Exhale through nose 6 sec, repeat for full duration', '90 sec'),
      ],
    },

    lower: {
      title: 'Peak Lower Body + Core',
      exercises: [
        ft('Warm-Up - Jump Rope', '3 min'),
        ft('Leg Swings Front/Back (Left)', '15 reps'),
        ft('Leg Swings Front/Back (Right)', '15 reps'),
        ft('Hip Circles - stand feet shoulder-width apart, hands on hips, draw large slow circles with hips clockwise then counterclockwise', '20 reps'),
        ft('Walking Lunges - step forward with right foot, lower left knee toward floor without touching, push back up, step forward with left foot, alternate legs', '10 reps/leg'),
        ft('Ankle Mobility Rocks - stand near wall for balance, slowly rock up onto toes then back onto heels, pause at each end to feel the stretch', '15 reps'),

        s('Jump Squats',
          { sets: 4, reps: '15', rest: '90 sec', note: 'Land softly, knees aligned with toes' },
          { sets: 5, reps: '15', rest: '90 sec' },
          { sets: 5, reps: '18', rest: '90 sec' },
          { sets: 3, reps: '12', rest: '90 sec' },
        ),

        s('Bulgarian Split Squats',
          { sets: 4, reps: '14/leg', rest: '90 sec', note: 'Knee tracks over toes, control the descent' },
          { sets: 5, reps: '14/leg', rest: '90 sec' },
          { sets: 5, reps: '15/leg', rest: '90 sec' },
          { sets: 3, reps: '10/leg', rest: '90 sec' },
        ),

        s('Hip Thrusts',
          { sets: 5, reps: '20', rest: '60 sec', note: 'Squeeze glutes at top for 2 seconds' },
          { sets: 5, reps: '22', rest: '75 sec' },
          { sets: 5, reps: '25', rest: '75 sec' },
          { sets: 4, reps: '18', rest: '60 sec' },
        ),

        s('Hamstring Walkouts - stand feet hip-width, hinge forward placing hands on floor, walk hands out to push-up position, then walk hands back to feet and stand up',
          { sets: 3, reps: '14', rest: '60 sec' },
          { sets: 4, reps: '14', rest: '60 sec' },
          { sets: 4, reps: '15', rest: '60 sec' },
          { sets: 3, reps: '10', rest: '60 sec' },
        ),

        s('Calf Raises',
          { sets: 4, reps: '30', rest: '45 sec' },
          { sets: 4, reps: '32', rest: '45 sec' },
          { sets: 5, reps: '30', rest: '60 sec' },
          { sets: 3, reps: '25', rest: '45 sec' },
        ),

        s('Leg Raises',
          { sets: 4, reps: '15', rest: '60 sec' },
          { sets: 4, reps: '18', rest: '75 sec' },
          { sets: 5, reps: '18', rest: '75 sec' },
          { sets: 3, reps: '12', rest: '60 sec' },
        ),

        ft('Standing Quad Stretch (Left)', '45 sec'),
        ft('Standing Quad Stretch (Right)', '45 sec'),
        ft('Hamstring Toe Reach Stretch', '60 sec'),
        ft('Hip Flexor Stretch (Left)', '45 sec'),
        ft('Hip Flexor Stretch (Right)', '45 sec'),
        ft('Butterfly Groin Stretch', '60 sec'),
        ft('Deep Squat Hold - squat down as deep as possible with heels flat on floor, press palms together at chest to help balance, hold position', '60 sec'),
        ft('Slow Nasal Breathing - Inhale through nose 4 sec, Exhale through nose 6 sec, repeat for full duration', '90 sec'),
      ],
    },

    boxingHiit: {
      title: 'Peak HIIT + Boxing',
      exercises: [
        ft('Warm-Up - Jump Rope', '8 min'),
        ft('Shoulder Warm-Up - Shoulder Circles Forward 20 reps + Shoulder Circles Backward 20 reps + Arm Swings Across Chest 20 reps + Wrist Circles 20 reps', '2 min'),

        d('Footwork - Step In + Step Out + Lateral Left + Lateral Right + Pivot Right + Pivot Left + Switch Stance (swap feet quickly), bounce on balls of feet, hands up', '16 min', '18 min', '20 min', '12 min'),
        d('Shadowboxing - Jab + Cross + Hook + Cross + Uppercut right + slip head left + counter Jab + pivot right foot to exit angle, link combinations smoothly for full duration', '20 min', '22 min', '25 min', '15 min'),
        d('Sprint in Place - Maximum Knee Drive 20 sec + Walk Slowly Breathing Through Nose 40 sec', '12 rounds', '14 rounds', '16 rounds', '10 rounds'),
        d('Jump Rope Finisher', '8 min', '8 min', '10 min', '5 min'),

        ft('Thoracic Twist Stretch - sit cross-legged, place right hand behind head, rotate upper body to the right as far as comfortable, hold, then repeat on left side', '45 sec'),
        ft('Hip Rotation Stretch - lie on back, cross right ankle over left knee, hold back of left thigh and gently pull both legs toward chest, hold, then switch sides', '45 sec'),
        ft('Calf Stretch Against Wall (Left)', '45 sec'),
        ft('Calf Stretch Against Wall (Right)', '45 sec'),
        ft('Slow Nasal Breathing - Inhale through nose 4 sec, Exhale through nose 6 sec, repeat for full duration', '90 sec'),
      ],
    },

    fullbody: {
      title: 'Peak Full Body Conditioning',
      exercises: [
        ft('Warm-Up - Jump Rope', '3 min'),
        ft('Arm Circles', '20 reps'),
        ft('Hip Circles - stand feet shoulder-width apart, hands on hips, draw large slow circles with hips clockwise then counterclockwise', '20 reps'),
        ft('Bodyweight Squats', '15 reps'),
        ft('Scapular Push-ups - hold push-up position with arms straight, push shoulder blades apart rounding upper back, then squeeze them together; arms stay straight throughout', '20 reps'),

        s('Push-ups',
          { sets: 4, reps: '16', rest: '90 sec' },
          { sets: 5, reps: '16', rest: '90 sec' },
          { sets: 5, reps: '18', rest: '90 sec' },
          { sets: 3, reps: '12', rest: '75 sec' },
        ),

        s('Table Rows / Towel Rows',
          { sets: 4, reps: '16', rest: '90 sec' },
          { sets: 5, reps: '16', rest: '90 sec' },
          { sets: 5, reps: '18', rest: '90 sec' },
          { sets: 3, reps: '12', rest: '75 sec' },
        ),

        s('Squats',
          { sets: 4, reps: '25', rest: '75 sec' },
          { sets: 5, reps: '25', rest: '90 sec' },
          { sets: 5, reps: '28', rest: '90 sec' },
          { sets: 3, reps: '20', rest: '60 sec' },
        ),

        s('Reverse Lunges',
          { sets: 4, reps: '14/leg', rest: '90 sec' },
          { sets: 4, reps: '14/leg', rest: '90 sec' },
          { sets: 5, reps: '14/leg', rest: '90 sec' },
          { sets: 3, reps: '10/leg', rest: '75 sec' },
        ),

        d('Circuit - 12 Push-ups + 20 Squats + 12 Table Rows (lie under table grip edge pull chest up) + 25 Mountain Climbers (from plank drive right knee toward left elbow alternate sides fast)', '5 rounds', '6 rounds', '7 rounds', '4 rounds'),

        ft('World\'s Greatest Stretch Left - lunge forward left foot, drop right knee toward floor, place left hand outside left foot, twist upper body left reaching right arm overhead, hold', '45 sec'),
        ft('World\'s Greatest Stretch Right - lunge forward right foot, drop left knee toward floor, place right hand outside right foot, twist upper body right reaching left arm overhead, hold', '45 sec'),
        ft('Hamstring Stretch - sit on floor with legs straight, reach both hands toward feet and hold; or stand and hinge forward reaching toward feet; keep legs as straight as comfortable', '60 sec'),
        ft('Butterfly Stretch - sit on floor, press soles of feet together close to your body, hold feet with both hands, gently press knees toward floor and hold', '60 sec'),
        ft('Thoracic Spine Rotations - sit cross-legged or on chair, place hands behind head, rotate upper body left as far as comfortable then right; keep hips still, only the upper back rotates', '10 reps/side'),
        ft('Deep Squat Hold - squat down as deep as possible with heels flat on floor, press palms together at chest to help balance, hold position', '60 sec'),
        ft('Child\'s Pose', '60 sec'),
      ],
    },

    cardio: {
      title: 'Zone 2 Cardio + Mobility',
      exercises: [
        d('Brisk Walk or Light Jog - pace where you can speak full sentences without gasping; if breathing too hard to talk, slow to a walk', '50 min', '55 min', '60 min', '40 min'),
        ft('Cat-Cow Stretch - on hands and knees, arch back upward rounding spine and tucking chin (Cat), then dip belly downward lifting head (Cow), alternate slowly', '10 reps'),
        ft('Hip Flexor Stretch (Left)', '45 sec'),
        ft('Hip Flexor Stretch (Right)', '45 sec'),
        ft('Hamstring Stretch - sit on floor with legs straight, reach both hands toward feet and hold; or stand and hinge forward reaching toward feet; keep legs as straight as comfortable', '60 sec'),
        ft('Butterfly Stretch - sit on floor, press soles of feet together close to your body, hold feet with both hands, gently press knees toward floor and hold', '60 sec'),
        ft('Thoracic Spine Rotations - sit cross-legged or on chair, place hands behind head, rotate upper body left as far as comfortable then right; keep hips still, only the upper back rotates', '10 reps/side'),
        ft('Hip Opener Circles - stand on one leg, raise opposite knee to hip height and draw large outward circles with the knee then inward circles, switch legs', '10 reps/side'),
        ft('Ankle Mobility Rocks - stand near wall for balance, slowly rock up onto toes then back onto heels, pause at each end to feel the stretch', '15 reps/side'),
        ft('Slow Nasal Breathing - Inhale through nose 4 sec, Exhale through nose 6 sec, repeat for full duration', '2 min'),
      ],
    },

    fullRest: {
      title: 'Full Rest',
      exercises: [
        ft('Rest & Recovery - Hydration Goal 3+ liters', ''),
        ft('Easy Walk (optional)', '20 min'),
        ft('Light Stretching - Hamstring Toe Reach Stretch + Standing Quad Stretch each side + Butterfly Groin Stretch + Hip Flexor Stretch each side + Child\'s Pose (optional)', '15 min'),
        ft('Sleep Target', '8-9 hrs'),
      ],
    },
  },
}

// ------------------------------------------------------
// DIET PLANS
// ------------------------------------------------------

export const DIET_PLANS = CUSTOM?.diet ?? {

  training: {
    label: 'Training Day',

    meals: [
      {
        id: 'breakfast',
        label: 'Breakfast',
        icon: '🍳',
        items: [
          'Oats + Milk',
          'Sprouts / Paneer',
          '1 Banana',
        ],
      },

      {
        id: 'lunch',
        label: 'Lunch',
        icon: '🍛',
        items: [
          '2 Roti or Rice',
          'Dal',
          'Chicken / Paneer / Soya',
          'Vegetables',
          'Salad',
        ],
      },

      {
        id: 'snack',
        label: 'Snack',
        icon: '🍎',
        items: [
          'Fruit',
          'Roasted Chana',
          'Buttermilk / Curd',
        ],
      },

      {
        id: 'preworkout',
        label: 'Pre-Workout',
        icon: '⚡',
        items: [
          'Banana',
          'Black Coffee (optional)',
        ],
      },

      {
        id: 'dinner',
        label: 'Dinner',
        icon: '🌙',
        items: [
          '2 Roti',
          'Protein Source',
          'Vegetables',
          'Curd',
        ],
      },
    ],

    targets: {
      calories: { min: 1700, max: 1900, unit: 'kcal/day' },
      protein: { min: 110, max: 130, unit: 'g/day' },
      water: { min: 3, max: 4, unit: 'L/day' },
      sleep: { min: 7.5, unit: 'hrs/night' },
      steps: { min: 8000, max: 12000, unit: 'steps/day' },
    },
  },

  rest: {
    label: 'Rest Day',

    meals: [
      {
        id: 'breakfast',
        label: 'Breakfast',
        icon: '🍳',
        items: [
          'Oats / Poha',
          'Sprouts',
        ],
      },

      {
        id: 'lunch',
        label: 'Lunch',
        icon: '🍛',
        items: [
          '2 Roti',
          'Dal',
          'Vegetables',
          'Protein Source',
        ],
      },

      {
        id: 'snack',
        label: 'Snack',
        icon: '🍎',
        items: [
          'Fruit',
          'Curd / Buttermilk',
        ],
      },

      {
        id: 'dinner',
        label: 'Dinner',
        icon: '🌙',
        items: [
          'Light Dinner',
          'Protein Source',
          'Vegetables',
        ],
      },
    ],

    targets: {
      calories: { min: 1600, max: 1800, unit: 'kcal/day' },
      protein: { min: 100, max: 120, unit: 'g/day' },
      water: { min: 3, max: 4, unit: 'L/day' },
      sleep: { min: 8, unit: 'hrs/night' },
      steps: { min: 8000, max: 12000, unit: 'steps/day' },
    },
  },
}

// ------------------------------------------------------
// UTILS
// ------------------------------------------------------

export function getPhase(week) {
  if (week <= 4) return 1
  if (week <= 8) return 2
  if (week <= 12) return 3
  return 4
}

export function getDayType(dayIndex) {
  return DAY_TYPES[dayIndex].type
}

export function getWeekInPhase(week) {
  return (week - 1) % 4
}

export function isRestDayIndex(dayIndex) {
  return DAY_TYPES[dayIndex].type === 'fullRest'
}

export function getDietForDay(dayIndex) {
  return isRestDayIndex(dayIndex)
    ? DIET_PLANS.rest
    : DIET_PLANS.training
}

export function getTotalWeeks() {
  return SETTINGS?.totalWeeks || 16
}

export function getWaterTarget() {
  return SETTINGS?.waterTarget || 12
}

export function getWorkoutForDay(week, dayIndex) {
  const phase = getPhase(week)
  const weekInPhase = getWeekInPhase(week)
  const dayType = getDayType(dayIndex)

  const phasePlan = WORKOUT_PLANS[phase]
  if (!phasePlan) return { title: 'Rest', exercises: [], phase, weekInPhase: weekInPhase + 1, dayType: DAY_TYPES[dayIndex]?.label }

  const template = phasePlan[dayType]
  if (!template) return { title: 'Rest', exercises: [], phase, weekInPhase: weekInPhase + 1, dayType: DAY_TYPES[dayIndex]?.label }

  const exercises = template.exercises.map(ex => {
    if (ex.progression) {
      const prog = ex.progression[weekInPhase]
      return { name: ex.name, sets: prog.sets, reps: prog.reps }
    }
    if (ex.durationProgression) {
      return { name: ex.name, duration: ex.durationProgression[weekInPhase] }
    }
    return { name: ex.name, duration: ex.duration, sets: ex.sets, reps: ex.reps }
  })

  return {
    title: template.title || DAY_TYPES[dayIndex]?.label || 'Workout',
    exercises,
    phase,
    weekInPhase: weekInPhase + 1,
    dayType: DAY_TYPES[dayIndex].label,
  }
}

export function getExerciseCountForDay(week, dayIndex) {
  return getWorkoutForDay(week, dayIndex).exercises.length
}

export function getPhaseExerciseTotal(phaseNum) {
  let total = 0

  for (
    let w = (phaseNum - 1) * 4 + 1;
    w <= phaseNum * 4;
    w++
  ) {
    for (let dayIdx = 0; dayIdx < 7; dayIdx++) {
      total += getExerciseCountForDay(w, dayIdx)
    }
  }

  return total
}