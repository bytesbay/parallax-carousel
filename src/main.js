import ParallaxCarousel from './lib';

const init = () => {
  const inst = new ParallaxCarousel({
    el: '#app',

    // padding from right side of carousel
    user_padding: 100,

    // custom mobile detection function
    isMobileCustom() {
      return false;
    },
  });
}

init();