// Generates the PWA icons as PNG files (no dependencies).
// Usage: node scripts/generate-icons.mjs
import { deflateSync } from "node:zlib";
import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const BG = [36, 90, 82]; // accent green
const WHITE = [255, 255, 255];

// --- tiny PNG encoder -------------------------------------------------
const crcTable = Array.from({ length: 256 }, (_, n) => {
  let c = n;
  for (let k = 0; k < 8; k++) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1;
  return c >>> 0;
});
function crc32(buf) {
  let c = 0xffffffff;
  for (const b of buf) c = crcTable[(c ^ b) & 0xff] ^ (c >>> 8);
  return (c ^ 0xffffffff) >>> 0;
}
function chunk(type, data) {
  const len = Buffer.alloc(4);
  len.writeUInt32BE(data.length);
  const body = Buffer.concat([Buffer.from(type), data]);
  const crc = Buffer.alloc(4);
  crc.writeUInt32BE(crc32(body));
  return Buffer.concat([len, body, crc]);
}
function encodePng(size, rgb) {
  const raw = Buffer.alloc((size * 3 + 1) * size);
  for (let y = 0; y < size; y++) {
    raw[y * (size * 3 + 1)] = 0;
    rgb.copy(raw, y * (size * 3 + 1) + 1, y * size * 3, (y + 1) * size * 3);
  }
  const ihdr = Buffer.alloc(13);
  ihdr.writeUInt32BE(size, 0);
  ihdr.writeUInt32BE(size, 4);
  ihdr[8] = 8; // bit depth
  ihdr[9] = 2; // RGB
  return Buffer.concat([
    Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]),
    chunk("IHDR", ihdr),
    chunk("IDAT", deflateSync(raw)),
    chunk("IEND", Buffer.alloc(0)),
  ]);
}

// --- shapes (coordinates are 0..1) ------------------------------------
function inRoundRect(x, y, x0, y0, x1, y1, r) {
  if (x < x0 || x > x1 || y < y0 || y > y1) return false;
  const cx = Math.min(Math.max(x, x0 + r), x1 - r);
  const cy = Math.min(Math.max(y, y0 + r), y1 - r);
  return (x - cx) ** 2 + (y - cy) ** 2 <= r * r;
}
function distToSegment(px, py, ax, ay, bx, by) {
  const dx = bx - ax, dy = by - ay;
  const t = Math.max(0, Math.min(1, ((px - ax) * dx + (py - ay) * dy) / (dx * dx + dy * dy)));
  return Math.hypot(px - (ax + t * dx), py - (ay + t * dy));
}
function colorAt(x, y) {
  // check mark (green, on the white clipboard)
  const w = 0.03;
  if (
    distToSegment(x, y, 0.39, 0.55, 0.47, 0.63) <= w ||
    distToSegment(x, y, 0.47, 0.63, 0.62, 0.45) <= w
  ) return BG;
  // clip on top of the clipboard
  if (inRoundRect(x, y, 0.41, 0.23, 0.59, 0.31, 0.03)) return WHITE;
  if (inRoundRect(x, y, 0.385, 0.205, 0.615, 0.335, 0.045)) return BG;
  // clipboard body
  if (inRoundRect(x, y, 0.3, 0.26, 0.7, 0.76, 0.05)) return WHITE;
  return BG;
}

function render(size) {
  const ss = 3; // supersampling for smooth edges
  const out = Buffer.alloc(size * size * 3);
  for (let py = 0; py < size; py++) {
    for (let px = 0; px < size; px++) {
      let r = 0, g = 0, b = 0;
      for (let sy = 0; sy < ss; sy++) {
        for (let sx = 0; sx < ss; sx++) {
          const c = colorAt((px + (sx + 0.5) / ss) / size, (py + (sy + 0.5) / ss) / size);
          r += c[0]; g += c[1]; b += c[2];
        }
      }
      const n = ss * ss, i = (py * size + px) * 3;
      out[i] = Math.round(r / n); out[i + 1] = Math.round(g / n); out[i + 2] = Math.round(b / n);
    }
  }
  return encodePng(size, out);
}

const dir = join(process.cwd(), "public", "icons");
mkdirSync(dir, { recursive: true });
for (const size of [192, 512]) {
  writeFileSync(join(dir, `icon-${size}.png`), render(size));
  console.log(`created public/icons/icon-${size}.png`);
}