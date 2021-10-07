import isMobile from 'is-mobile';

const map = function(val, in_min, in_max, out_min, out_max) {
  return ((val - in_min) * (out_max - out_min)) / (in_max - in_min) + out_min;
};

class ParallaxCarousel {

  el = null
  slider_el = null

  constructor(opts) {

    if(typeof opts.el === 'string') {
      this.el = document.querySelector(opts.el)
    } else {
      this.el = opts.el;
    }

    this.right_padding = typeof opts.right_padding === 'undefined' ? 50 : opts.right_padding;
    this.isMobileCustom = opts.isMobile;
    
    this.wrapper_el = document.createElement('div')
    this.wrapper_el.classList.add('parallax-carousel-wrapper')
    this.wrapper_el.style.width = '100%';
    this.wrapper_el.style.height = '100%';

    this.slider_el = document.createElement('div')
    this.slider_el.classList.add('parallax-carousel-slider')
    this.slider_el.style.minWidth = '100%';
    this.slider_el.style.height = '100%';
    this.slider_el.style.display = 'inline-block';

    let content = null;
    this.el.childNodes.forEach(n => {
      if(n.nodeName !== '#text') {
        content = n;
        return false;
      }
    })

    this.el.removeChild(content);
    this.slider_el.append(content);
    this.el.childNodes.forEach(n => n.remove())
    this.wrapper_el.append(this.slider_el)
    this.el.append(this.wrapper_el)

    this.onResize()

    if(!this.isMobile()) {
      this.onMouseAnimate()
    } else {
      // ...
    }

    window.addEventListener('resize', this.onResize.bind(this))
  }

  isMobile() {
    return typeof this.isMobileCustom === 'undefined' 
      ? isMobile()
      : this.isMobileCustom()
  }

  onResize() {
    this.el.removeEventListener('mousemove', this.onMouseMove.bind(this))
    if(!this.isMobile()) {
      this.wrapper_el.scrollTo(0, 0)
      this.wrapper_el.style.overflow = 'hidden';
      this.slider_el.style.willChange = 'transform';
      this.el.addEventListener('mousemove', this.onMouseMove.bind(this))
    } else {
      this.wrapper_el.style.overflow = 'auto';
      this.slider_el.style.willChange = 'unset';
      this._mouse_offset = 0;
    }
  }

  onMouseMove(e) {

    // mapping 
    const width = this.el.offsetWidth
    const half = (this.el.offsetWidth / 2);

    const k = map(half + (half - e.clientX), half, width, 0, 1)

    const bb = this.slider_el.getBoundingClientRect()
    const wrapper_bb = this.wrapper_el.getBoundingClientRect()
    let offset = -(k * (bb.width - (wrapper_bb.width - this.right_padding)));

    if(offset < 0) {
      offset = 0
    }

    this._mouse_offset = offset;
  }

  onMouseAnimate() {

    const prev_offset = this.slider_el._offset 
      ? this.slider_el._offset 
      : 0;

    const offset = prev_offset + ((this._mouse_offset - prev_offset) * 0.1)

    // to save some fps and energy while AFK
    if(Math.abs(prev_offset - offset) < 0.01) {
      this._mouse_raf = null;
      this._mouse_timeout = setTimeout(this.onMouseAnimate.bind(this), 10)
    } else {
      this.slider_el._offset = offset;
      this.slider_el.style.transform = `translateX(${-offset}px)`

      this._mouse_timeout = null;
      this._mouse_raf = requestAnimationFrame(this.onMouseAnimate.bind(this))
    }
  }



  destroy() {
    this.el.removeEventListener('mousemove', this.onMouseMove)
    window.removeEventListener('resize', this.onResize)

    if(this._mouse_raf) {
      cancelAnimationFrame(this._mouse_raf);
    } else {
      clearTimeout(this._mouse_timeout)
    }
  }
};

export default ParallaxCarousel;