window.onload = function () {
  
  var slider = document.getElementsByClassName('slider')[0],
      images = slider.getElementsByTagName('img'),
      counter = 0,
      nextBtn = slider.getElementsByClassName('next')[0],
      prevBtn = slider.getElementsByClassName('prev')[0];
  
  
  function showImage (index) {
    // Remove all classnames on the images (so hide them)
    for (var i = 0; i < images.length; i += 1) {
      images[i].className = 'hideImage';
    }
    
    // Add the showImage classname to the img-element you want
    images[index].className = 'showImage';
  }
  
  
  function nextImg () {
    // counter variable gets the current img selected
    // if we have the last img, we switch back to the first one again
    
    if (counter < images.length -1) {
      counter += 1;
    } else {
      counter = 0;
    }

    showImage(counter);
  }
  
  function prevImg () {
    // counter variable gets the current img selected
    // if we have the first img, we switch back to the last one again
    
    if (counter > 0) {
      counter -= 1;
    } else {
      counter = images.length - 1;
    }

    showImage(counter);
  }
  
//  If you want to have an auto-slider, uncomment this: 
//  window.setInterval(prevImg, 2000);
  
  // give the buttons an onclick event
  nextBtn.onclick = nextImg;
  prevBtn.onclick = prevImg;
  
  
  // start it
  showImage(counter);
  
};