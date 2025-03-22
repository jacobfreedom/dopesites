# Images Directory

This directory contains all the images used in the project.

## Usage Guidelines

### Importing Images in React Components

```jsx
// Import an image directly
import backgroundImage from '../assets/images/ratio.png';

// Then use it in your component
function MyComponent() {
  return <img src={backgroundImage} alt="Background Image" />;
}
```

### Background Images in SCSS

```scss
.my-element {
  background-image: url('../assets/images/background.jpg');
}
```

## Organization

Consider organizing images into subdirectories if you have many images:

- `/icons` - For small icon images
- `/backgrounds` - For background images
- `/logos` - For logo variations
- `/photos` - For photographic content

## Best Practices

1. Use SVG for icons and logos when possible
2. Optimize image sizes before adding them to the project
3. Use descriptive filenames
4. Include appropriate alt text when using images in components