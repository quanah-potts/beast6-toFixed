

// √ 1. Get successes to show green 
// √ 2. Show one error per failure in the console.
// √ 3. Make failures red.
// √ 4. Show stack traces for failures. 
// √ 5. Only show stack traces if you expand an error message. 
// √ 6. Output summary statistics to the DOM. 

// for greater complexity...7. provide console logged test results to the page

var TinyTestHelper = { 

  displayStatistics: function(tests, failures){
    var numberOfTests = Object.keys(tests).length; 
    var summaryString = ('Ran ' + numberOfTests + " tests. " 
    + 'Successes: ' + (numberOfTests-failures) 
    + ' Failures: ' + failures);  

    console.log(summaryString); 

    var summaryElement = document.createElement('h1'); 
    summaryElement.textContent=summaryString;
    document.body.appendChild(summaryElement); 
  }, 
};

var TinyTest = {

  run: function(tests) {
      var failures = 0;
      for (var testName in tests) {
          var testAction = tests[testName];
          try {
              testAction.apply(this);
              console.log('%c' + testName, 'color:green;');
          } catch (e) {
              failures++;
              console.groupCollapsed('%c' + testName, 'color:red;');
              console.error(e.stack);
              console.groupEnd();
          }
      }
      
      setTimeout(function() { // Give document a chance to complete
          if (window.document && document.body) {
              document.body.style.backgroundColor = (failures === 0 ? '#99ff99' : '#ff9999');
              TinyTestHelper.displayStatistics(tests, failures);
          }
      }, 0);
  },

  fail: function(msg) {
      throw new Error('fail(): ' + msg);
  },

  assert: function(value, msg) {
      if (!value) {
          throw new Error('assert(): ' + msg);
      }
  },

  assertEquals: function(expected, actual) {
      if (expected != actual) {
          throw new Error('assertEquals() "' + expected + '" != "' + actual + '"');
      }
  },

  assertStrictEquals: function(expected, actual) {
      if (expected !== actual) {
          throw new Error('assertStrictEquals() "' + expected + '" !== "' + actual + '"');
      }
  },

};

var fail             = TinyTest.fail.bind(TinyTest),
  assert             = TinyTest.assert.bind(TinyTest),
  assertEquals       = TinyTest.assertEquals.bind(TinyTest),
  eq                 = TinyTest.assertEquals.bind(TinyTest), // alias for assertEquals
  assertStrictEquals = TinyTest.assertStrictEquals.bind(TinyTest),
  tests              = TinyTest.run.bind(TinyTest);
