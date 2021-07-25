# Parallax carousel

This library brings a new experience of using carousels just by moving cursor

## Example
![Project Presentation](resources/example.gif "Example GIF")

## Install
`npm install parallax-carousel`

## Example usage
``
const inst = new ParallaxCarousel({
  el: '#app',
});
``

## Options
``
const inst = new ParallaxCarousel({
  el: '#app',

  // padding from right side of carousel
  user_padding: 100,

  // custom mobile detection function
  isMobileCustom() {
    return false;
  },
});
``
