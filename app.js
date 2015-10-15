window.onload = function() {

  var BurritoChallenge = (function() {

    var ingredientsArr = ['White Rice', 'Brown Rice', 'Pinto Beans', 'Black Beans', 'Barbacoa', 'Carnitas', 'Chicken', 'Steak', 'Tomatoes', 'Corn', 'Green Salsa', 'Red Salsa', 'Sour Cream', 'Cheese', 'Fajitas', 'Lettuce', 'Guacamole'];

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

    return {

      buttonStart : function() {
        $('button#start').click(function () {
          timerCountdown();
          addButtons();


        })
      },




    }
  })();
  BurritoChallenge.buttonStart();
}
