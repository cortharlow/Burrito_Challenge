window.onload = function() {

  var BurritoChallenge = (function() {

  /////////////////////Declare global variables///////////////////

    //17 ingredients
    var ingredientsArr = ['White Rice', 'Brown Rice', 'Pinto Beans', 'Black Beans', 'Barbacoa', 'Carnitas', 'Chicken', 'Steak', 'Tomatoes', 'Corn', 'Green Salsa', 'Red Salsa', 'Sour Cream', 'Cheese', 'Fajitas', 'Lettuce', 'Guacamole'];
    var currentTime = Number($('#timer').text());
    var wins = 0;
    var checkOrder = [];
    var timerHandle;

//////////////////////////Private Functions///////////////////////

    //Begins the countdown process using setInterval;
    //if the currentTime reaches 0, the if statement
    //prevents the counter from going negative
    var timerCountdown = function() {
      timerHandle = setInterval(function () {
        currentTime--;
        $('#timer').text(currentTime);
        if (currentTime === 0) {
          clearInterval(timerHandle);
          loser();
        }
      }, 1000);
    }

    //Upon pressing Start, removes entire info section div,
    //expands ingredients list, and appends two buttons to the body:
    //Finish Burrito and Start Over
    var addButtons = function() {
      $('#info').remove();
      var finish = $('<button>Finish Burrito</button>').attr('id', 'finish');
      var startover = $('<button>Start Over</button>').attr('id', 'startover');
      $('#ingredients-list').css('height', '270px');
      $('body').append(finish);
      $('body').append(startover);
      finishButton();
    }

    //Upon Start, adds click events to each ingredient and,
    //when clicked, each ingredient moves into burrrito div
    //and black border styling is added
    var addIngredientClicks = function() {
      $('#ingredients-list').on('click', '.click', (function() {
        $(this).attr('class', 'inside');
        $(this).css('border', '4px solid black').css('border-radius', '5px').css('margin',
      '1px 0px 1px 3px');
        $('#burrito').append($(this));
      }))
    }

    //Calculates a random number with a maximum number parameter
    var randomNum = function(max) {
      var num = Math.floor(Math.random() * (max - 0 + 1)) + 0;
      return num;
    }


    //Creates a new order list by calling getOrder function;
    //number of ingredients increases with more wins.
    //After getting order, html alert shows user what ingredients
    //to remember and click
    var orderAlert = function() {
      var alert = '<h6>New Order:</h6>';
      if (wins > 5) {
        alert += getOrder(7);
      }
      else if (wins > 3) {
        alert += getOrder(5);
      }
      else if (wins > 1) {
        alert += getOrder(4);
      }
      else {
        alert += getOrder(3);
      }

      //Injects a div including the order then adds a click event
      //that removes the div, begins the countdown clock and adds
      //12click events to each
      var $orderText = $('<div></div>').attr('id', 'orderList').html(alert+'<br><span style="color:#b1393b;margin-left:25px">Click to Begin</span>');
      $('#burrito').prepend($orderText);
      $('#orderList').on('click', (function() {
        $('#orderList').remove();
        timerCountdown();
        addIngredientClicks();
      }));
      console.log(alert);
    }

    //Parameter determines the number of ingredients to be included in the burrito; generates random number and pushes ingredient at that index number into the alert form and checkOrder array, then removes that ingredient from the ingredientsArr; returns order to be injected in HTML alert
    var getOrder = function (numIng) {
      var currentArr = ingredientsArr;
      var max = 16
      var order = '';
      for (var i = 0; i <= numIng; i++) {
        var num = randomNum(max);
        order += '<br> • ' + currentArr[num];
        checkOrder.push(currentArr[num]);
        currentArr.splice(num, 1);
        max--;
      }
      return order;
    }

    //Adds click event to Finish Burrito button; stops timer at its current time, generates an array of the selected ingredients that have been appended to the burrito
    var finishButton = function() {
      $('#finish').on('click', (function() { //declare as variable, not removing click event
        clearInterval(timerHandle);
        var numBur = $('.inside').length;
        var burritoArr = [];
        for (var i = 0; i < numBur; i++) {
          burritoArr.push($('p.ingtext').eq(i).text());
        }
        checkWin(checkOrder, burritoArr, numBur);
      }));
    }

    /*
    Function that requires three parameters: an array containing the ingredients of the order, array containing the ingredients of the burrito created by the user, and the length of the burrito array. First checks that the two lengths are equal, if not then immediate loss, then moves through both arrays to check that all ingredients are matched in both. Calls winner or loser function then resets the ingredients
    */
    var checkWin = function(orderArray, burritoArray, burritoLength) {
      var orderLength = orderArray.length;
      var match = [];
      var matchNum = 0;
      if (orderLength !== burritoLength) {
        loser();
      }
      else {
        for (var i = 0; i < orderLength; i++) {
          for (var j = 0; j < burritoLength; j++) {
            if (orderArray[i] === burritoArray[j]) {
              match.push(true);
              matchNum++;
            }
          }
        }
        if (match.length === burritoLength) {
          winner();
        }
        else {
          loser();
        }
      }
      resetIngredients();
    }

    //When playing the game, this will add additional click
    //events to those ingredients that are in the burrito so
    //that they may be removed before user clicks Finish Burrito
    var resetIngredients = function() {
      var numOfIng = $('.inside').length;
      for (var i = 0; i < numOfIng; i++) {
        $('.inside').eq(0).removeAttr('style');
        $('#ingredients-list').append($('.inside').eq(0));
      }
      $('.inside').attr('class', 'click');
      ingredientsArr = ['White Rice', 'Brown Rice', 'Pinto Beans', 'Black Beans', 'Barbacoa', 'Carnitas', 'Chicken', 'Steak', 'Tomatoes', 'Corn', 'Green Salsa', 'Red Salsa', 'Sour Cream', 'Cheese', 'Fajitas', 'Lettuce', 'Guacamole'];
      checkOrder = [];
    }

    /*
    If win, increases count of wins, updates win text in HTML, changes text of finish button to 'Next Order,' adds a startRounds ID, removes finish id, and adds a click event for the "new" button that resets the game flow and removes the startRounds and startover buttons and replaces them with the original buttons
    */
    var winner = function() {
      wins++;
      var $notifyWin = $('<div></div>').attr('id', 'notifyWin').html('<h1 style="margin:60px">Winner!</h1>');
      $('#burrito').prepend($notifyWin);
      $('#wins').text(wins);
      var $finishBtn = $('#finish');
      $finishBtn.text('Next Order');
      $finishBtn.attr('id', 'startRounds');
      $finishBtn.removeAttr('#finish');
      $finishBtn.off();
      $('button#startRounds').click(function() {
        currentTime = 31;
        orderAlert();
        addButtons();
        $('#notifyWin').remove();
        $('#startover').remove();
        $('#startRounds').remove();
      });
    }

    /*
    Removes finish burrito button, therefore preventing user from continuing in the game and forcing her to startover, and moves the startover button to be centered on the page
    */
    var loser = function() {
      var $notifyLoss = $('<div></div>').attr('id', 'notifyLoss').html('<h1 style="font-size:40px;color:#b1393b;text-shadow: 1px 1px black;margin-top:200px">No Burrito for You!</h1>');
      $('#burrito').prepend($notifyLoss);
      $('#finish').remove();
      $('#startover').css('margin-left', '250px')
    }

/////////////////////////PUBLIC FUNCTIONS/////////////////////////

    return {

      buttonStart : function() {
        $('button#start').click(function() {
          addButtons();
          orderAlert();
        })
      },

      startoverButton : function() {
        //Adds click event to Start Over button; clicking forces a page refresh
        $('body').on('click', '#startover', (function() {
          location.reload(true);
        }));
      }
    }
})();
  BurritoChallenge.buttonStart();
  BurritoChallenge.startoverButton();
}
