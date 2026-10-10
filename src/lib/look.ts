// Pal looks, matching the Pals app (src/lib/types.ts and src/lib/look.ts there).
export const SURFACES = ["rounded", "diagonal", "diamond", "octagon", "burst"] as const;
export type Surface = (typeof SURFACES)[number];
export type PalStatus = "idle" | "working" | "waiting" | "paused";

export type Look = {
  surface: Surface;
  color: string;
  eyeColor: string;
  seed: number;
};

/** The five pals of the desktop launch screen and onboarding. The centre one is the logo's blue octagon. */
export const LAUNCH_CAST: Look[] = [
  { surface: "diagonal", color: "#F49724", eyeColor: "#ffffff", seed: 3 },
  { surface: "rounded", color: "#008274", eyeColor: "#ffffff", seed: 7 },
  { surface: "octagon", color: "#00CFFB", eyeColor: "#000000", seed: 5 },
  { surface: "diamond", color: "#F29CC2", eyeColor: "#ffffff", seed: 9 },
  { surface: "burst", color: "#A959AB", eyeColor: "#ffffff", seed: 13 },
];
