import ParallaxCarousel from './lib';

const init = () => {
  const inst = new ParallaxCarousel({
    el: '#app',

    // padding from right side of carousel
    // default: 50
    right_padding: 100,

    // custom mobile detection function
    // default: 'is-mobile' module https://www.npmjs.com/package/is-mobile
    isMobileCustom() {
      return false; 
    },
  });
}

init();