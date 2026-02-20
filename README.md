# Pixy Range

![License](https://img.shields.io/github/license/brunoliratm/PixyRange)
![Repo Size](https://img.shields.io/github/repo-size/brunoliratm/PixyRange)
![Issues](https://img.shields.io/github/issues/brunoliratm/PixyRange)
![Angular](https://img.shields.io/badge/Angular-19-DD0031?logo=angular&logoColor=white)
![Node](https://img.shields.io/badge/Node.js-18%2B-339933?logo=nodedotjs&logoColor=white)

A web application to estimate the distance between a camera and an object in an image using:

- real object size (cm),
- object width in the image (px),
- camera focal length (mm).

## Overview

Pixy Range is built with Angular (standalone components) and allows you to:

- select a local image,
- read EXIF data to auto-fill focal length (when available),
- measure object width directly on the canvas,
- calculate the estimated distance in meters in real time.

## How the calculation works

The app uses the following model:

$$
D_{mm} = \frac{(R_{cm} \cdot 10) \cdot F_{mm}}{I_{px} \cdot \left(\frac{SensorWidth_{mm}}{ImageWidth_{px}}\right)}
$$

Where:

- $R_{cm}$: real object size in centimeters,
- $F_{mm}$: focal length in millimeters,
- $I_{px}$: measured object width in image pixels,
- sensor width is currently fixed at `6.4mm`.

> Note: `6.4mm` is a general approximation and may vary by device/camera.

Equivalent form used internally:

$$
D = \frac{(R_{cm} \cdot 10) \cdot F_{mm}}{I_{px} \cdot \left(\frac{SensorWidth_{mm}}{ImageWidth_{px}}\right)}
$$

## Technologies

- Angular 19
- TypeScript
- RxJS
- exif-js
- SCSS

## Requirements

- Node.js 18+ (recommended for Angular 19)
- npm

## Installation

```bash
git clone https://github.com/brunoliratm/PixyRange.git
cd PixyRange
npm install
```

## Run locally

```bash
npm start
```

Open `http://localhost:4200`.

## Available scripts

- `npm start` — development server
- `npm run build` — production build
- `npm run watch` — development watch build
- `npm run serve:ssr:pixyrange` — serve SSR build

## Usage

1. Click **Select Image (EXIF)** and choose an image.
2. If EXIF data exists, focal length is auto-filled.
3. Enter the real object size (cm).
4. On the canvas, select the object's horizontal width.
5. Check the calculated distance in meters in the result panel.

## Current limitations

- Uses a fixed sensor width (`6.4mm`).
- Accuracy depends on pixel selection quality.
- EXIF data may be missing in images edited/compressed by some apps.

## Contributing

Contributions are welcome.

1. Fork the repository
2. Create a branch: `git checkout -b my-feature`
3. Commit your changes: `git commit -m "feat: describe your change"`
4. Push your branch: `git push origin my-feature`
5. Open a Pull Request

## License

Distributed under the MIT License. See [LICENSE](LICENSE).
