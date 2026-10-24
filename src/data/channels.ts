// Channel lineup: order here is the order the channel knob cycles through.
// `knob` is the rotation (deg, 0 = pointing up) of the channel knob pointer on that
// channel; the channel number is printed at that angle around the knob.
// `glow` tints the light the screen casts on the wallpaper.

export interface Channel {
  number: number;
  path: string;
  title: string;
  knob: number;
  // RGB triplet of the light the screen casts on the wall
  glow: string;
}

export const channels: Channel[] = [
  { number: 1, path: "/", title: "Home", knob: -50, glow: "124 92 255" },
  { number: 2, path: "/about", title: "About", knob: 0, glow: "255 179 71" },
  { number: 3, path: "/education", title: "Education", knob: 50, glow: "63 184 175" },
];

const normalize = (path: string) => (path.length > 1 ? path.replace(/\/$/, "") : path);

export function getChannel(path: string): Channel | undefined {
  return channels.find((c) => c.path === normalize(path));
}

export function getNextChannel(path: string): Channel {
  const current = getChannel(path);
  if (!current) return channels[0];
  return channels[(channels.indexOf(current) + 1) % channels.length];
}

export function getPrevChannel(path: string): Channel {
  const current = getChannel(path);
  if (!current) return channels[channels.length - 1];
  return channels[(channels.indexOf(current) - 1 + channels.length) % channels.length];
}
