# Image Optimization Service

This project provides a Node.js-based image optimization service that allows users to upload images and receive optimized versions in different formats and sizes.

## Features

- Image Optimization: Automatically resizes and converts images based on specified parameters.
- Caching: Utilizes caching to improve performance by storing optimized images temporarily.
- Supported Formats: Supports JPEG, PNG, and WebP formats for optimized images.

## Installation

To run this project locally, follow these steps:

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/image-optimization-service.git
   cd image-optimization-service
   
2. Install dependencies:
   npm install

3.Start the server:
   node server.js

## Usage
*Uploading an Image*
Use tools like curl or Postman to upload an image and receive an optimized version:
curl -F "image=@/path/to/your/image.jpg" "http://localhost:3000/optimize?format=webp&width=800&quality=80" --output optimized_image.webp

Parameters
format: Desired image format (jpeg, png, webp).
width: Desired width of the optimized image (default: 800).
quality: Desired quality of the optimized image (default: 80).






