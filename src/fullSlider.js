(function() {
  
  function Slideshow( element ) {
    this.el = document.querySelector( element );
    this.init();
  }
  
  Slideshow.prototype = {
    init: function() {
      this.wrapper = this.el.querySelector( ".slider__wrapper" );
      this.slides = this.el.querySelectorAll( ".slide" );
      this.previous = this.el.querySelector( ".slider__nav--prev" );
      this.next = this.el.querySelector( ".slider__nav--next" );
      this.navigationLinks = this.el.querySelectorAll( ".slider__pagination a" );
      this.index = 0;
      this.total = this.slides.length;
      this.timer = null;
      
      this.setup();
      this.actions();
    },

    _slideTo: function( slide ) {
      var currentSlide = this.slides[slide];
      currentSlide.style.opacity = 1;
      
      for( var i = 0; i < this.slides.length; i++ ) {
        var slide = this.slides[i];
        if( slide !== currentSlide ) {
          slide.style.opacity = 0;
        }
      }
    },

    _highlightCurrentLink: function( link ) {
      var self = this;
      for( var i = 0; i < self.navigationLinks.length; ++i ) {
        var a = self.navigationLinks[i];
        a.className = "";           
      }
      link.className = "is-current"; 
    },

    setup: function() {
      var self = this;
      
      for( var l = 0; l < self.slides.length; ++l ) {
        var elSlide = self.slides[l];
        var image = elSlide.getAttribute( "data-image" );
        elSlide.style.backgroundImage = "url(" + image + ")";
      }
      
      for( var k = 0; k < self.navigationLinks.length; ++k ) {
        var pagLink = self.navigationLinks[k];
        pagLink.setAttribute( "data-index", k );
      } 
    },

    actions: function() {
      var self = this;
      
      self.next.addEventListener( "click", function() {
        self.index++;
        
        if( self.index == self.total ) {
          self.index = 0;
        }
        
        self._slideTo( self.index );
        self._highlightCurrentLink( self.navigationLinks[self.index] );
      }, false);
      
      self.previous.addEventListener( "click", function() {
        self.index--;
        
        if( self.index == -1 ) {
          self.index = self.total - 1;
        }
        
        self._slideTo( self.index );
        self._highlightCurrentLink( self.navigationLinks[self.index] );
      }, false);
      
      for( var i = 0; i < self.navigationLinks.length; ++i ) {
        var a = self.navigationLinks[i];
        a.addEventListener( "click", function( e ) {
          e.preventDefault();
          var n = parseInt( this.getAttribute( "data-index" ), 10 );
          self.index = n; 
          
          if( self.index == 0 ) {
            self.index = 0;
          }
          
          if( self.index == self.total - 1 ) {
            self.index = self.total - 1;
          }
                  
          self._slideTo( self.index );
          self._highlightCurrentLink( this );
        }, false);
      }
    },

    autoplay: function( time ) {
      if( time === undefined ) {
        time = 4000;
      }
      var self = this;
      self.timer = setInterval(function() {
        self.index++;
        if( self.index == self.slides.length ) {
          self.index = 0;
        }
        self._slideTo( self.index );
      }, time);
    },

    stopStart: function() {
      var self = this;
      self.el.addEventListener( "mouseover", function() {
        clearInterval( self.timer );
        self.timer = null;
      }, false);

      self.el.addEventListener( "mouseout", function() {
        self.action();
      }, false);
    }
  };
  
  document.addEventListener( "DOMContentLoaded", function() {
    var sliderA = new Slideshow( "#main-slider" );
  });
  
  
})();