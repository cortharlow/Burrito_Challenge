window.onload = function() {

  var BurritoChallenge = (function() {

    //17 ingredients
    var ingredientsArr = ['White Rice', 'Brown Rice', 'Pinto Beans', 'Black Beans', 'Barbacoa', 'Carnitas', 'Chicken', 'Steak', 'Tomatoes', 'Corn', 'Green Salsa', 'Red Salsa', 'Sour Cream', 'Cheese', 'Fajitas', 'Lettuce', 'Guacamole'];
    var wins = 0;

    var timerCountdown = function() {
      timerHandle = setInterval(function () {
        var currentTime = Number($('#timer').text());
        console.log(currentTime);
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
      var alert = 'New Order!\n';
      var numIng = 0;
      if (wins < 2) {
        numIng = 5;
        for (var i = 0; i <= numIng; i++) {
          alert += '\n'+ingredientsArr[num];
        }
      }

      else if (wins > 2) {

      }

      else if (wins > 4) {

      }

      else if (wins > 6) {

      }
      alert(alert);
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
