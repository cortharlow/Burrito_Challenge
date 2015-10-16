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
      var alert = 'New Order!';
      if (wins > 6) {
        alert += '\n'+getOrder(7);
      }
      else if (wins > 4) {
        alert += '\n'+getOrder(5);
      }
      else if (wins > 2) {
        alert += '\n'+getOrder(4);
      }
      else {
        alert += '\n'+getOrder(3);
      }
      window.alert(alert);
      console.log(alert);
    }

    //Parameter determines the number of ingredients to be included in the burrito; generates random number and pushes ingredient at that index number into the alert form and checkOrder array, then removes that ingredient from the ingredientsArr; returns order to be injected in HTML alert
    var getOrder = function (numIng) {
      var currentArr = ingredientsArr;
      var max = 16
      var order = '';
      for (var i = 0; i <= numIng; i++) {
        var num = randomNum(max);
        order += '\n'+currentArr[num];
        checkOrder.push(currentArr[num]);
        currentArr.splice(num, 1);
        max--;
      }
      return order;
    }

    //Adds click event to Finish Burrito button; stops timer at its current time, generates an array of the selected ingredients that have been appended to the burrito
    var finishButton = function() {
      $('body').on('click', '#finish', (function() {
        clearInterval(timerHandle);
        var numBur = $('.inside').length;
        var burritoArr = [];
        for (var i = 0; i < numBur; i++) {
          burritoArr.push($('p.ingtext').eq(i).text());
        }
        checkWin(checkOrder, burritoArr, numBur);
      }));
    }

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
        console.log(match);
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
    }

    var winner = function() {
      wins++;
      $('#wins').text(wins);
      $('#finish').text('Next Order');
      $('#finish').attr('id', 'startRounds');
      $('#finish').removeAttr('#finish');
      $('button#startRounds').click(function() {
        currentTime = 31;
        timerCountdown();
        orderAlert();
        addIngredientClicks();
        addButtons();
        $('#startover').remove();
        $('#startRounds').remove();
      })
      console.log('WINNER');
    }

    var loser = function() {
      $('#finish').remove();
      $('#startover').css('margin-left', '250px')
      console.log('LOSER');
    }

/////////////////////////PUBLIC FUNCTIONS/////////////////////////

    return {

      buttonStart : function() {
        $('button#start').click(function() {
          timerCountdown();
          addButtons();
          orderAlert();
          addIngredientClicks();
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
