
/* global afterEach, beforeEach */

function MochaTestContainer() {

  'use strict';

  var style =
    '.test-container {' +
    '  border: 1px solid black;' +
    '  height: 600px;' +
    '  margin-bottom: 10px;' +
    '  overflow: hidden;' +
    '}' +

    '.test-container.passed {' +
    '  border: 1px solid green;' +
    '}' +

    '.test-container.failed {' +
    '  border: 1px solid red;' +
    '}' +

    '.test-container.passed > div.title-row {' +
    '  background-color: green;' +
    '  border-color: green;' +
    '}' +

    '.test-container.failed > div.title-row {' +
    '  border-color: red;' +
    '  background-color: red;' +
    '}' +

    '.test-container > div.title-row {' +
    '  height: 24px;' +
    '  background-color: grey;' +
    '}' +

    '.test-container > div.title-row > a {' +
    '  text-decoration: none;' +
    '  display: inline-block;' +
    '}' +

    '.test-container > div.title-row > a > h3 {' +
    '  font-weight: normal;' +
    '  font-family: sans-serif;' +
    '  height: 16px;' +
    '  line-height: 16px;' +
    '  font-size: 14px;' +
    '  margin-top: 0;' +
    '  margin-bottom: 0;' +
    '  color: white;' +
    '  padding: 4px 10px 4px 10px;' +
    '}' +

    '.test-container > div.title-row > div.test-result {' +
    '  font-family: sans-serif;' +
    '  height: 16px;' +
    '  line-height: 16px;' +
    '  font-size: 14px;' +
    '  margin-top: 0;' +
    '  margin-bottom: 0;' +
    '  color: white;' +
    '  padding: 4px 10px 4px 10px;' +
    '}' +

    '.test-content-container {' +
      'height: 100%;' +
      'width: 100%;' +
    '}';

  var id = 0;

  var head = document.head;

  var styleElement = document.createElement('style');
  styleElement.type = 'text/css';
  styleElement.textContent = style;

  head.appendChild(styleElement);


  // Create container before test run.
  beforeEach(function() {

    // create container
    var container = document.createElement('div');
    container.classList.add('test-container');
    container.setAttribute('id', id);

    // title
    var titleRow = document.createElement('div');
    titleRow.classList.add('title-row');

    var titleWrapper = document.createElement('a');
    titleWrapper.setAttribute('href', '#' + id);

    var title = document.createElement('h3');
    title.classList.add('test-titel');
    title.textContent = this.currentTest.fullTitle();

    titleWrapper.appendChild(title);
    titleRow.appendChild(titleWrapper);

    var testContentContainer = document.createElement('div');
    testContentContainer.classList.add('test-content-container');

    // setup container content
    container.appendChild(titleRow);
    container.appendChild(testContentContainer);

    // add container to DOM
    document.querySelector('body').appendChild(container);

    // container reference
    var containerDefinition = {
      _container: container,
      _titleRow: titleRow,
      _id: id,
      testContentContainer: testContentContainer
    };

    this.currentTest.__test_container_support__ = containerDefinition;
  });

  // Add class to container to indicate result of the test:
  afterEach(function() {

    id++;
    var containerDefinition = this.currentTest.__test_container_support__;

    var result = this.currentTest.state;

    var status = document.createElement('div');
    status.style.float = 'right';
    status.classList.add('test-result');


    if (result === 'passed') {
      containerDefinition._container.classList.add('passed');
      status.textContent = 'passed';
    } else {
      containerDefinition._container.classList.add('failed');
      status.textContent = 'failed';
    }

    containerDefinition._titleRow.appendChild(status);

    // Scroll to test
    if (window.location.hash.endsWith &&
        window.location.hash.endsWith('#' + containerDefinition._id)) {

      containerDefinition._container.scrollIntoView();
    }
  });
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = MochaTestContainer;
} else {
  window.MochaTestContainer = MochaTestContainer;
}
