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

    var timerCountdown = function() {
      timerHandle = setInterval(function () {
        currentTime--;
        $('#timer').text(currentTime);
        if (currentTime === 0) {
          clearInterval(timerHandle);
        }
      }, 1000);
    }

    var addButtons = function() {
      $('#info').remove();
      var finish = $('<button>Finish Burrito</button>').attr('id', 'finish');
      var startover = $('<button>Start Over</button>').attr('id', 'startover');
      $('#ingredients-list').css('height', '270px');
      $('body').append(finish);
      $('body').append(startover);
    }

    var randomNum = function(max) {
      var num = Math.floor(Math.random() * (max - 0 + 1)) + 0;
      return num;
    }

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

    var finishButton = function() {
      $('body').on('click', '#finish', (function() {
        clearInterval(timerHandle);
        console.log(checkOrder);
        var num = checkOrder.length;
        var burritoArr = [];
        for (var i = 0; i < num; i++) {
          burritoArr.push($('p.ingtext').eq(i).text());
        }
        console.log(burritoArr);
      }));
    }

    var startOver = function() {
      $('body').on('click', '#startover', (function() {
        location.reload(true);
      }));
    }

/////////////////////////PUBLIC FUNCTIONS/////////////////////////

    return {

      buttonStart : function() {
        $('button#start').click(function() {
          timerCountdown();
          addButtons();
          orderAlert();
        })
      },

      addIngredientClicks : function() {
        $('#ingredients-list').on('click', '.click', (function() {
          $(this).attr('class', 'inside');
          $(this).css('border', '4px solid black').css('border-radius', '5px').css('margin',
        '1px 0px 1px 3px');
          $('#burrito').append($(this));
        }))
      },

      finishButton : function() {
        finishButton();
      },

      startoverButton : function() {
        startOver();
      }
      
    }
})();
  BurritoChallenge.buttonStart();
  BurritoChallenge.addIngredientClicks();
  BurritoChallenge.finishButton();
  BurritoChallenge.startoverButton();
}
