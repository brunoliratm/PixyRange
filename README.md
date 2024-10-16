 <div align="center" text-align="center">
    <img src="https://capsule-render.vercel.app/api?type=waving&height=200&color=gradient&text=Pixy%20Range&reversal=false">
</div>

# Pixy Range

## 📃 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Installation](#installation)
  - [Prerequisites](#prerequisites)
  - [Step by Step](#step-by-step)
- [Usage](#usage)
  - [Calculation Example](#calculation-example)
- [Contributing](#contributing)
- [License](#license)


## Overview

Pixy Range is a web tool developed to calculate the distance between the camera and an object in an image. The application allows the user to input three essential data points:

- Real size of the object.
- Size of the object in the image (in pixels or another relative unit).
- Focal length of the camera.

With this information, the application quickly and accurately calculates the distance to the object. This project is aimed at both students and researchers in computer vision, as well as photographers and digital image enthusiasts who need an intuitive tool to estimate distances.

## Features

- User-friendly and intuitive interface developed with Angular.
- Accurate calculation of object distances in an image based on proportion formulas.
- Easy data input via input fields.
- Support for various units (pixels, centimeters, meters).
- Responsive and optimized for different devices.

## Installation

### Prerequisites

To run this project locally, you will need:

- Node.js (version 12.x or higher)
- npm (Node.js package manager)
- Angular CLI (latest version)

### Step by Step

1. Clone the repository:
  ```bash
  git clone https://github.com/brunoliratm/PixyRange.git
  cd PixyRange/project
  ```

2. Install the dependencies:
  ```bash
  npm install
  ```

3. Run the development server:
```bash
ng serve
```

4. Open your browser and go to: `http://localhost:4200/`


## Usage

1. Enter the real size of the object (in meters, centimeters, or another desired unit).
2. Enter the size of the object in the image (measured in pixels or another unit proportional to the image).
3. Enter the focal length of the camera.
4. The distance result will be displayed immediately based on the provided information.

### Calculation Example

If the real size of the object is 2 meters, the size of the object in the image is 100 pixels, and the focal length of the camera is 50mm, Pixy Range will automatically calculate the approximate distance between the camera and the object using the focal length proportion formula.

## Contributing

Contributions are welcome! Follow the steps below to collaborate on the project:

1. Fork the repository.
2. Create a branch for your feature or fix: `git checkout -b my-feature`
3. Commit your changes: `git commit -m 'Add new feature'`
4. Push your branch: `git push origin my-feature`
5. Open a Pull Request.

## License

This project is licensed under the MIT License. For more details, see the [LICENSE](LICENSE) file.

<img src="https://capsule-render.vercel.app/api?type=waving&height=200&color=gradient&reversal=false&section=footer">