
var detailImageSelector = '[data-image-role="target"]';
var detailTitleSelector = '[data-image-role="title"]';
var thumbnailLinkSelector = '[data-image-role="trigger"]';

function setDetails(imageUrl, title) {
  'use strict';
  var detailImage = document.querySelector(detailImageSelector);
  detailImage.src = imageUrl;

  var detailTitle = document.querySelector(detailTitleSelector);
  detailTitle.textContent = title;
}

function imageFromThumb(thumbnail) {
  "use strict";
  return thumbnail.getAttribute('data-image-url');
}

function titleFromThumb(thumbnail) {
  "use strict";
  return thumbnail.getAttribute('data-image-title');
}

function setDetailsFromThumb(thumbnail) {
  "use strict";
  setDetails(imageFromThumb(thumbnail), titleFromThumb(thumbnail));
}

function setRandomImageUrl(thumb) {
  "use strict";
  var randomImageUrl = 'img/otter4.jpg';
  thumb.setAttribute('data-image-url', randomImageUrl);
}

function addThumbClickHandler(thumb) {
  "use strict";
  thumb.addEventListener('click', function (event) {
    event.preventDefault();
    setDetailsFromThumb(thumb);
  })
}

function getThumbnails() {
  "use strict";
  var thumbnails = document.querySelectorAll(thumbnailLinkSelector);
  return [].slice.call(thumbnails);
}

function initializeEvents() {
  "use strict";
  var thumbnails = getThumbnails();
  thumbnails.forEach(setRandomImageUrl);
  thumbnails.forEach(addThumbClickHandler);
}

initializeEvents();