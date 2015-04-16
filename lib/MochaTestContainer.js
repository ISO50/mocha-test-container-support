
/* global afterEach, beforeEach */

function MochaTestContainer() {
}



MochaTestContainer.prototype._init = function() {
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

  this._initilized = true;
  this.setupAfterEach();
};


/**
 * Return the test-container for the current test.
 * The container will be created if not already exists.
 *
 * @param context - provide the context of the test i.e. this
 */
 MochaTestContainer.prototype.get = function(context) {
  'use strict';

  if (!this._initilized) {
    this._init();
  }

  var currentTest = context.currentTest,
      containerDefinition = currentTest.__test_container_support__;

  if (containerDefinition) {
    return containerDefinition._container;
  }


  // create container
  var container = document.createElement('div');
  container.classList.add('test-container');
  container.setAttribute('id', currentTest.fullTitle());

  // title
  var titleRow = document.createElement('div');
  titleRow.classList.add('title-row');

  var titleWrapper = document.createElement('a');
  titleWrapper.setAttribute('href', '#' + encodeURIComponent(currentTest.fullTitle()));

  var title = document.createElement('h3');
  title.classList.add('test-titel');
  title.textContent = currentTest.fullTitle();

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
  containerDefinition = {
    _container: container,
    _titleRow: titleRow,
    _id: currentTest.fullTitle(),
    testContentContainer: testContentContainer
  };

  currentTest.__test_container_support__ = containerDefinition;

  return containerDefinition.testContentContainer;
};


MochaTestContainer.prototype.getContainerDefinition = function(context) {
  'use strict';

  var currentTest = context.currentTest,
      containerDefinition = currentTest.__test_container_support__;

  if (containerDefinition) {
    return containerDefinition;
  } else {
    this.get(context);
    return currentTest.__test_container_support__;
  }
};


MochaTestContainer.prototype.setupAfterEach = function() {
  'use strict';

  var self = this;

  afterEach(function() {

    var containerDefinition = self.getContainerDefinition(this);

    if (!containerDefinition) {
      return;
    }

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
        window.location.hash.endsWith('#' + encodeURIComponent(containerDefinition._id))) {

      containerDefinition._container.scrollIntoView();
    }
  });
};

if (typeof module !== 'undefined' && module.exports) {
  module.exports = new MochaTestContainer();
} else {
  window.MochaTestContainer = new MochaTestContainer();
}
