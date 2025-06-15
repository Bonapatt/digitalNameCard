# VCF Digital Name Card

This is a frontend-only **Next.js** application for creating and sharing a digital business card. Users can enter their details, preview the card, download a `.vcf` file and get a QR code that encodes the vCard text for quick import on mobile devices.

The interface supports a light/dark theme toggle powered by Tailwind CSS and uses the forms plugin for polished inputs. The Inter font is loaded for a modern look.

## Development

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

The app can be deployed on services such as Vercel since it contains no backend code.

### Sharing via URL

Card information can be encoded with `btoa` and placed in a `data` query parameter. Both `/` and `/card` pages will decode this value. For example:

```
https://yourdomain.vercel.app/card?data=eyJuYW1lIjoiSm9obiBEb2UifQ==
```
