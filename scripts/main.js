
var detailImageSelector = '[data-image-role="target"]';
var detailTitleSelector = '[data-image-role="title"]';
var thumbnailLinkSelector = '[data-image-role="trigger"]';
var detailFrameSelector = '[data-image-role="frame"]';
var hiddenDetailClass = 'hidden-detail';
var tinyEffectClass = 'is-tiny';
var escKey = 27;

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

function addThumbClickHandler(thumb) {
  "use strict";
  thumb.addEventListener('click', function (event) {
    event.preventDefault();
    setDetailsFromThumb(thumb);
    showDetails()
  })
}

function getThumbnails() {
  "use strict";
  var thumbnails = document.querySelectorAll(thumbnailLinkSelector);
  return [].slice.call(thumbnails);
}

function showDetails() {
  "use strict";
  var frame = document.querySelector(detailFrameSelector);
  document.body.classList.remove(hiddenDetailClass);
  frame.classList.add(tinyEffectClass);
  setTimeout(function () {
    frame.classList.remove(tinyEffectClass);
  }, 50);
}

function hideDetails() {
  "use strict";
  document.body.classList.add(hiddenDetailClass);
}

function initializeEvents() {
  "use strict";
  var thumbnails = getThumbnails();
  thumbnails.forEach(addThumbClickHandler);
  addKeyPressHandler()
}

function addKeyPressHandler() {
  "use strict";
  document.body.addEventListener('keyup', function (event) {
    event.preventDefault();
    console.log(event.keyCode);
    if (event.keyCode === escKey) {
      hideDetails();
    }
  })
}

initializeEvents();