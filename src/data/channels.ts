// Channel lineup: order here is the order the channel knob cycles through.
// `knob` is the rotation (deg) of the channel knob indicator on that channel.

export interface Channel {
  number: number;
  path: string;
  title: string;
  knob: number;
}

export const channels: Channel[] = [
  { number: 1, path: "/", title: "Home", knob: 45 },
  { number: 2, path: "/about", title: "About", knob: 90 },
  { number: 3, path: "/education", title: "Education", knob: 135 },
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
