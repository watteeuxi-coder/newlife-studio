/**
 * Génère les icônes du site dans public/ à partir du symbole NEWLIFE (piste A, viewBox 0 0 84 84).
 * Usage : node scripts/generate-icons.mjs
 * Rendu PNG via le moteur SVG fourni avec Next (@vercel/og → resvg), aucune dépendance à installer.
 */
import { writeFileSync } from 'node:fs'
import { createElement } from 'react'
import { ImageResponse } from 'next/dist/compiled/@vercel/og/index.node.js'

const BG = '#0b1220'
const CYAN = '#06b6d4'
const SYMBOL = `<path d="M24 62V24l36 38V30" fill="none" stroke="#fff" stroke-width="8" stroke-linecap="round" stroke-linejoin="round"/><path d="M52 30l8-8 8 8" fill="none" stroke="${CYAN}" stroke-width="7" stroke-linecap="round" stroke-linejoin="round"/>`

const svg = (inner) => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 84 84">${inner}</svg>`
/** Carré arrondi (favicon, icônes 192/512) */
const rounded = svg(`<rect width="84" height="84" rx="22" fill="${BG}"/>${SYMBOL}`)
/** Fond plein, sans coins arrondis (iOS arrondit lui-même) */
const full = svg(`<rect width="84" height="84" fill="${BG}"/>${SYMBOL}`)
// Maskable : symbole (boîte englobante x 20→71.5, y 18.5→66, trait compris) ramené à ~55 % de la largeur, centré
const bbox = { x: 20, y: 18.5, w: 51.5, h: 47.5 }
const k = (84 * 0.55) / bbox.w
const tx = 42 - (bbox.x + bbox.w / 2) * k
const ty = 42 - (bbox.y + bbox.h / 2) * k
const maskable = svg(`<rect width="84" height="84" fill="${BG}"/><g transform="translate(${tx.toFixed(3)} ${ty.toFixed(3)}) scale(${k.toFixed(4)})">${SYMBOL}</g>`)

async function png(svgText, size) {
  const src = `data:image/svg+xml;base64,${Buffer.from(svgText).toString('base64')}`
  const res = new ImageResponse(createElement('img', { src, width: size, height: size }), { width: size, height: size })
  return Buffer.from(await res.arrayBuffer())
}

/** .ico contenant des PNG (format accepté par tous les navigateurs actuels) */
function ico(images) {
  const header = Buffer.alloc(6)
  header.writeUInt16LE(0, 0)
  header.writeUInt16LE(1, 2)
  header.writeUInt16LE(images.length, 4)
  let offset = 6 + 16 * images.length
  const entries = images.map(({ size, data }) => {
    const e = Buffer.alloc(16)
    e.writeUInt8(size >= 256 ? 0 : size, 0)
    e.writeUInt8(size >= 256 ? 0 : size, 1)
    e.writeUInt16LE(1, 4) // plans
    e.writeUInt16LE(32, 6) // bits par pixel
    e.writeUInt32LE(data.length, 8)
    e.writeUInt32LE(offset, 12)
    offset += data.length
    return e
  })
  return Buffer.concat([header, ...entries, ...images.map((i) => i.data)])
}

const out = (f, data) => {
  writeFileSync(new URL(`../public/${f}`, import.meta.url), data)
  console.log(f, data.length, 'octets')
}

out('favicon.svg', rounded)
out('favicon.ico', ico(await Promise.all([16, 32, 48].map(async (size) => ({ size, data: await png(rounded, size) })))))
out('apple-touch-icon.png', await png(full, 180))
out('icon-192.png', await png(rounded, 192))
out('icon-512.png', await png(rounded, 512))
out('icon-maskable-512.png', await png(maskable, 512))
