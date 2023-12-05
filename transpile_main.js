"use strict";

$(function () {
  var topSlider = $('.topRow');
  var bottomSlider = $('.bottomRow');
  var topImages = $('.imageTop').toArray();
  var bottomImages = $('.imageBottom').toArray();
  var topMoveCloneToLeft = 0;
  var bottomMoveCloneToLeft = 0;
  var topMoveCloneToRight = 1050;
  var bottomMoveCloneToRight = 860;
  topTranslationX = 0;
  bottomTranslationX = 0;
  $('.rectangleRightArrow').click(function () {
    var topLastImage = topImages[topImages.length - 1];
    var bottomLastImage = bottomImages[bottomImages.length - 1];
    var topLastImageWidth = topLastImage.offsetWidth + 10;
    var bottomLastImageWidth = bottomLastImage.offsetWidth + 10;

    // transition by the width of the last image
    topTranslationX += topLastImageWidth;
    bottomTranslationX += bottomLastImageWidth;
    topSlider.animate({
      'left': topTranslationX
    }, 1000);
    bottomSlider.animate({
      'left': bottomTranslationX
    }, 1000);

    // moving the last image to put it in the first place so we can track widths later
    var topRemovedImage = topImages.pop();
    var bottomRemovedImage = bottomImages.pop();
    topImages.unshift(topRemovedImage);
    bottomImages.unshift(bottomRemovedImage);

    // we create a clone of the image so that it does not disappear before the animation and place in on the left side
    var topClone = topLastImage.cloneNode();
    var bottomClone = bottomLastImage.cloneNode();
    topSlider.prepend(topClone);
    bottomSlider.prepend(bottomClone);

    // setting where the clone will be placed
    topMoveCloneToLeft -= topLastImageWidth;
    bottomMoveCloneToLeft -= bottomLastImageWidth;
    topClone.style.left = topMoveCloneToLeft + 'px';
    bottomClone.style.left = bottomMoveCloneToLeft + 'px';

    // we also change these values so that the clone is placed in a right place when left button is clicked
    topMoveCloneToRight -= topLastImageWidth;
    bottomMoveCloneToRight -= bottomLastImageWidth;
  });
  $('.rectangleLeftArrow').click(function () {
    var topFirstImage = topImages[0];
    var bottomFirstImage = bottomImages[0];
    var topFirstImageWidth = topFirstImage.offsetWidth + 10;
    var bottomFirstImageWidth = bottomFirstImage.offsetWidth + 10;
    topTranslationX -= topFirstImageWidth;
    bottomTranslationX -= bottomFirstImageWidth;
    topSlider.animate({
      'left': topTranslationX
    }, 1000);
    bottomSlider.animate({
      'left': bottomTranslationX
    }, 1000);
    var topRemovedImage = topImages.shift();
    var bottomRemovedImage = bottomImages.shift();
    topImages.push(topRemovedImage);
    bottomImages.push(bottomRemovedImage);
    var topClone = topFirstImage.cloneNode();
    var bottomClone = bottomFirstImage.cloneNode();
    topSlider.prepend(topClone);
    bottomSlider.prepend(bottomClone);
    topClone.style.left = topMoveCloneToRight + 'px';
    topMoveCloneToRight += topFirstImageWidth;
    bottomClone.style.left = bottomMoveCloneToRight + 'px';
    bottomMoveCloneToRight += bottomFirstImageWidth;
    topMoveCloneToLeft += topFirstImageWidth;
    bottomMoveCloneToLeft += bottomFirstImageWidth;
  });
});
