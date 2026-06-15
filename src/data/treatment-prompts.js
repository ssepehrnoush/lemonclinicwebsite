// Treatment prompts — copied from Lemon AI.
// A = doll lip filler, B = natural lip filler, C = under-eye filler, D = full-face contour.

const HEADER = `You are simulating a real, conservative in-clinic aesthetic procedure on the SAME person in the input photo.
This is a clinical before/after preview, NOT a beauty filter and NOT a stylization.
Return a single photo-realistic image that is identical to the input EXCEPT for the specific micro-changes listed under TASKS.
The amount of change must be subtle and medically realistic — what one session of filler can actually achieve. Do not exaggerate.`;

const IDENTITY = `IDENTITY (must be preserved exactly — this must clearly look like the SAME person):
- Same face. Same gender, age, ethnicity.
- Same eye color, eye shape, eyelid crease, lash line, eyebrow shape and thickness.
- Same nose (bridge, tip, nostrils, width).
- Same hairstyle, hairline, hair color, baby hairs.
- Same skin tone, skin texture, pores, freckles, moles, beauty marks, scars, blemishes, fine lines.
- Same facial expression, mouth opening, teeth visibility, gaze direction.
- Same head tilt, head rotation, camera angle, focal length, depth of field.
- Same background, clothing, jewelry, makeup style, lighting, shadows, white balance.
- No smoothing, no skin retouching, no whitening, no slimming, no make-up changes, no Instagram filter look.
- Resolution, framing and crop of the output must match the input exactly.`;

const LIP_DOLL = `Slightly reshape lips into a soft Russian supermodel style. Add volume and definition, focus on clean lip border and slightly more lifted Cupid's bow. Keep it very subtle, not exaggerated or overfilled. Maintain natural proportions and identity.`;
const LIP_NATURAL = `Enhance lips with a natural proportional correction. Adjust upper and lower lip balance based on face harmony, increase volume in a soft and realistic way. Keep lips natural-looking, not overfilled, just more defined and proportionate.`;
const UNDER_EYE = `Gently rejuvenate the under-eye area for a fresher, healthier, slightly more beautiful look. If there is a tear-trough hollow or sunken area under the eye, softly fill it so the transition from lower eyelid to cheek becomes smooth and even. Reduce dark circles and pigmentation under the eye, brighten the area subtly. Soften fine crepey lines and puffiness very lightly. Keep skin texture, pores, lashes, eye shape, eye color, eyelid crease and eye size completely unchanged.`;
const CONTOUR = `Photo-realistic aesthetic procedure simulation.
Apply subtle filler-based contouring with three specific goals:
1. APPLE CHEEKS: Add soft rounded volume to the upper cheek area.
2. JAWLINE: Define and slightly slim the jawline for a cleaner facial frame.
3. HEART DIRECTION: The overall result should gently move the face toward a Heart shape.
Keep all changes realistic and natural — filler result, not surgical.
LOCK — do NOT change skin color, texture, pores, moles, blemishes, background, clothing, accessories, pose, head angle, camera perspective, lighting. Maintain single portrait frame.`;

const TASKS_HEADER = `TASKS (apply ALL of the following in a single edit, in order):`;
const FINAL = `OUTPUT:
- One photo, same dimensions and framing as the input.
- Indistinguishable from a real clinic after-photo of the same person 2 weeks post-treatment.
- If any conflict arises between IDENTITY and TASKS, IDENTITY wins.`;

function build(steps) {
  const tasks = steps.map((s, i) => `STEP ${i + 1} — ${s}`).join('\n\n');
  return [HEADER, IDENTITY, `${TASKS_HEADER}\n\n${tasks}`, FINAL].join('\n\n');
}

export const TREATMENT_PROMPTS = {
  "A":     build([LIP_DOLL]),
  "B":     build([LIP_NATURAL]),
  "C":     build([UNDER_EYE]),
  "D":     build([CONTOUR]),
  "A+C":   build([LIP_DOLL, UNDER_EYE]),
  "A+D":   build([LIP_DOLL, CONTOUR]),
  "B+C":   build([LIP_NATURAL, UNDER_EYE]),
  "B+D":   build([LIP_NATURAL, CONTOUR]),
  "C+D":   build([UNDER_EYE, CONTOUR]),
  "A+C+D": build([LIP_DOLL, UNDER_EYE, CONTOUR]),
  "B+C+D": build([LIP_NATURAL, UNDER_EYE, CONTOUR]),
};

export function getPromptForSelection(selectedCodes) {
  if (!selectedCodes || selectedCodes.length === 0) return null;
  if (selectedCodes.includes('A') && selectedCodes.includes('B')) return null;
  const key = [...selectedCodes].sort().join('+');
  return TREATMENT_PROMPTS[key] ?? null;
}