'use strict';

describe('myApp.form1 module', function() {

  beforeEach(module('myApp.form1'));

  describe('view1 controller', function(){

    it('should ....', inject(function($controller) {
      //spec body
      var view1Ctrl = $controller('Form1Ctrl');
      expect(view1Ctrl).toBeDefined();
    }));

  });
});