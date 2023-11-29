$(function(){
    const topSlider = $('.topRow');
    const bottomSlider = $('.bottomRow');

    let topImages = $('.imageTop').toArray();
    let bottomImages = $('.imageBottom').toArray();

    let topMoveCloneToLeft = 0;
    let bottomMoveCloneToLeft = 0;

    let topMoveCloneToRight = 1050;
    let bottomMoveCloneToRight = 860;

    topTranslationX = 0;
    bottomTranslationX = 0;

    $('.rectangleRightArrow').click(function(){
        const topLastImage = topImages[4];
        const bottomLastImage = bottomImages[3];
        const topLastImageWidth = topLastImage.offsetWidth + 10;
        const bottomLastImageWidth = bottomLastImage.offsetWidth + 10;

        // transition by the width of the last image
        topTranslationX += topLastImageWidth;
        bottomTranslationX += bottomLastImageWidth;
        topSlider.animate({ 'left': topTranslationX }, 1000);
        bottomSlider.animate({ 'left': bottomTranslationX }, 1000);

        // moving the last image to put it in the first place so we can track widths later
        const topRemovedImage = topImages.pop();
        const bottomRemovedImage = bottomImages.pop();
        topImages.unshift(topRemovedImage);
        bottomImages.unshift(bottomRemovedImage);

        // we create a clone of the image so that it does not disappear before the animation and place in on the left side
        const topClone = topLastImage.cloneNode();
        const bottomClone = bottomLastImage.cloneNode();
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

    $('.rectangleLeftArrow').click(function(){
        const topFirstImage = topImages[0];
        const bottomFirstImage = bottomImages[0];
        const topFirstImageWidth = topFirstImage.offsetWidth + 10;
        const bottomFirstImageWidth = bottomFirstImage.offsetWidth + 10;

        topTranslationX -= topFirstImageWidth;
        bottomTranslationX -= bottomFirstImageWidth;
        topSlider.animate({ 'left': topTranslationX }, 1000);
        bottomSlider.animate({ 'left': bottomTranslationX }, 1000);

        const topRemovedImage = topImages.shift();
        const bottomRemovedImage = bottomImages.shift();
        topImages.push(topRemovedImage);
        bottomImages.push(bottomRemovedImage);

        const topClone = topFirstImage.cloneNode();
        const bottomClone = bottomFirstImage.cloneNode();
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