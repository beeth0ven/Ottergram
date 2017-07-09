var detailImageSelector = '[data-image-role="target"]';
var detailTitleSelector = '[data-image-role="title"]';
var thumbnailLinkSelector = '[data-image-role="trigger"]';
var detailFrameSelector = '[data-image-role="frame"]';
var hiddenDetailClass = 'hidden-detail';
var tinyEffectClass = 'is-tiny';
var escKey = 27;
var $ = window.jQuery;
var Rx = window.Rx;

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


function setupRx() {

  var thumbnails = getThumbnails();

  Rx.Observable.from(thumbnails)
    .flatMap(function (thumb) {
      return $(thumb).clickAsObservable()
        .map(function (value) {
          return thumb;
        });
    })
    .subscribe(function (thumb) {
      event.preventDefault();
      setDetailsFromThumb(thumb);
      showDetails();
      console.log('value: ' + thumb);
    });

  Rx.Observable.fromEvent($(document.body),'keyup')
    .subscribe(function (event) {
      event.preventDefault();
      console.log(event.keyCode);
      if (event.keyCode === escKey) {
        hideDetails();
      }
    })
}

setupRx();