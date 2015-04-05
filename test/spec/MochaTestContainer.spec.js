window.MochaTestContainer();

/* global describe, it, beforeEach, expect */
/* jshint expr:true */

var containerDef;

beforeEach(function() {
  containerDef = this.currentTest.__test_container_support__;
});

describe('mocha-test-container-support', function() {

  describe('#container', function() {

    it('should be defined', function() {

      expect(containerDef._container).to.be.defined;
    });
  });

  describe('#test-content-container', function() {

    it('should be defined', function() {

      expect(containerDef.testContentContainer).to.be.defined;
    });

    it('should be empty', function() {

      expect(containerDef.testContentContainer.childNodes.length).to.equal(0);
    });

    it('should contain childs', function() {

      // given
      var element1 = document.createElement('div');
      var element2 = document.createElement('div');

      // when
      containerDef.testContentContainer.appendChild(element1);
      containerDef.testContentContainer.appendChild(element2);

      // then
      expect(containerDef.testContentContainer.childNodes.length).to.equal(2);
      expect(containerDef.testContentContainer.children[1]).to.equal(element2);
    });
  });
});
