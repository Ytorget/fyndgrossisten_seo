# Cloudinary Image Component Setup

## Overview

The landing app now supports loading images from Cloudinary with automatic fallback to local images when offline or if Cloudinary is unavailable. This makes it easy for editors to update images on the production server while still allowing developers to work offline.

## Configuration

### 1. Set up Cloudinary Cloud Name

The Cloudinary cloud name is configured via Phoenix environment variables, not in the landing app's .env files.

**For Development:**
Set the environment variable before starting Phoenix:
```bash
export CLOUDINARY_CLOUD_NAME=your-actual-cloud-name
mix phx.server
```

Or add it to your shell profile (~/.bashrc, ~/.zshrc, etc.).

**For Production:**
Set the `CLOUDINARY_CLOUD_NAME` environment variable on your production server.

The configuration is defined in:
- `config/dev.exs` - Development environment
- `config/runtime.exs` - Production environment

### 2. Upload Images to Cloudinary

Upload your images to Cloudinary with the appropriate public IDs. For example:
- `hero_home` for the home page hero image
- `hero_sortiment` for the sortiment page hero
- etc.

## Usage

### For Background Images (Hero Sections)

Use `CloudinaryBackgroundImage` for hero sections and other background images:

```tsx
import { CloudinaryBackgroundImage } from "@/components/CloudinaryImage";

<section className="hero-section relative overflow-hidden">
  <CloudinaryBackgroundImage
    publicId="hero_home"
    fallbackPath="/landing/hero/home.png"
    className="absolute inset-0 bg-cover bg-center"
  />
  {/* Your content here */}
</section>
```

### For Regular Images

Use `CloudinaryImage` for regular `<img>` tags:

```tsx
import { CloudinaryImage } from "@/components/CloudinaryImage";

<CloudinaryImage
  publicId="logo"
  fallbackPath="/landing/logo.png"
  alt="Company Logo"
  className="h-16 w-auto"
/>
```

### With Transformations

You can apply Cloudinary transformations for optimized delivery:

```tsx
<CloudinaryImage
  publicId="hero_home"
  fallbackPath="/landing/hero/home.png"
  alt="Hero Image"
  transformation="w_1200,h_800,c_fill,q_auto,f_auto"
  className="w-full h-auto"
/>
```

Common transformations:
- `w_1200,h_800` - Resize to 1200x800
- `c_fill` - Fill mode (crop to fit)
- `q_auto` - Automatic quality optimization
- `f_auto` - Automatic format selection (WebP, AVIF, etc.)

## How It Works

The Cloudinary cloud name is injected from Phoenix into the landing page via a `<script>` tag in the HTML template. The components read from `window.__ENV__.VITE_CLOUDINARY_CLOUD_NAME` (set by Phoenix) with a fallback to `import.meta.env.VITE_CLOUDINARY_CLOUD_NAME` (for local development if needed).

1. **Online Mode**: When the browser is online, the component attempts to load the image from Cloudinary
2. **Offline Mode**: When offline, it automatically falls back to the local image path
3. **Error Handling**: If Cloudinary fails to load (network issues, missing image, etc.), it falls back to the local image

## Benefits

- **Editors**: Can update images on production without code deployment
- **Developers**: Can work offline with local fallback images
- **Performance**: Cloudinary provides optimized image delivery with CDN
- **Resilience**: Automatic fallback ensures images always display

## Example Migration

### Before:
```tsx
<div 
  className="absolute inset-0 bg-cover bg-center" 
  style={{ backgroundImage: "url('/landing/hero/home.png')" }}
></div>
```

### After:
```tsx
<CloudinaryBackgroundImage
  publicId="hero_home"
  fallbackPath="/landing/hero/home.png"
  className="absolute inset-0 bg-cover bg-center"
/>
```

## Current Implementation

The home page hero image (`home.png`) has been migrated to use Cloudinary with public ID `hero_home`.

## Next Steps

Once you confirm the `hero_home` image is working correctly, provide a complete list of images to migrate and we'll update all of them to use the Cloudinary component.
