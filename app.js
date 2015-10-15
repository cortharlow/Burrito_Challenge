window.onload = function() {
  var BurritoChallenge = (function() {

    //17 ingredients
    var ingredientsArr = ['White Rice', 'Brown Rice', 'Pinto Beans', 'Black Beans', 'Barbacoa', 'Carnitas', 'Chicken', 'Steak', 'Tomatoes', 'Corn', 'Green Salsa', 'Red Salsa', 'Sour Cream', 'Cheese', 'Fajitas', 'Lettuce', 'Guacamole'];
    var wins = 3;

    var timerCountdown = function() {
      timerHandle = setInterval(function () {
        var currentTime = Number($('#timer').text());
        currentTime--;
        $('#timer').text(currentTime);
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

    var randomNum = function() {
      var num = Math.floor(Math.random() * (16 - 0 + 1)) + 0;
      return num;
    }

    var orderAlert = function() {
      var alert = 'New Order!';
      if (wins > 6) {
        alert += '\n'+getOrder(9);
      }

      else if (wins > 4) {
        alert += '\n'+getOrder(7);
      }

      else if (wins > 2) {
        alert += '\n'+getOrder(5);
      }

      else {
        alert += '\n'+getOrder(3);
      }
      window.alert(alert);
    }

    var getOrder = function (numIng) {
      var order = '';
      for (var i = 0; i <= numIng; i++) {
        order += '\n'+ingredientsArr[randomNum()];
      }
      return order;
    }

    return {

      buttonStart : function() {
        $('button#start').click(function () {
          timerCountdown();
          addButtons();
          orderAlert();
        })
      },




    }
})();
  BurritoChallenge.buttonStart();
}
