# mocha-test-container-support

This [Mocha](https://github.com/mochajs/mocha) plugin provides test
hooks for Mocha that add a container for every test case.
The plugin is inspired by [jasmine-test-container-support](https://github.com/bpmn-io/jasmine-test-container-support) by [Nico Rehwaldt](https://github.com/nikku).


## Install

```bash  
npm install --save-dev mocha-test-container-support
```


## Features

* Add one test container for every test to the DOM
* Allows checking the result of your test code visually while TDD
* Full title (suite + test) is displayed for every test case
* Test result is indicated by color and text
* Tests are marked with an anchor element for navigation purposes

### Limits of the plugin

* __No__ 'real' encapsulation of your tests
  * CSS / JS / DOM changes can still break other tests
  * Make sure tests use the test container as DOM root otherwise your DOM is not rendered in the container
  * Test is only rendered into a `<div>`, no `<iframe>` or shadow DOM


## Usage

To get container support for all tests just add a test file to the test root containing the following:

```js
require('mocha-test-container-support/lib/MochaTestContainer')();
```

The global `beforeEach()` hook will create a html container structure for the test.

```html
<div class="test-container passed" id="254">
  <div class="title-row">
    <a href="#254">
      <h3 class="test-titel">testsuite - feature should do</h3>
    </a>
    <div class="test-result">passed</div>
  </div>
  <div class="test-content-container">
    Your content will be added here.
  </div>
</div>
```

The container can be accessed over the Mocha `currentTest` property. That's how custom test related DOM content should be added to the container.

```js
var container = this.currentTest.__test_container_support__.testContentContainer;

container.appendChild(yourDomContent);
```


## License

MIT


## History

* v0.0.1 - Initial release, test container
