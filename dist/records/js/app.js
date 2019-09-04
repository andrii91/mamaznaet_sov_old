(function ($) {

  // Количество секунд в каждом временном отрезке
  var days = 24 * 60 * 60,
    hours = 60 * 60,
    minutes = 60;

  // Создаем плагин
  $.fn.countdown = function (prop) {

    var options = $.extend({
      callback: function () {},
      timestamp: 0
    }, prop);

    var left, d, h, m, s, positions;

    // инициализируем плагин
    init(this, options);

    positions = this.find('.position');

    (function tick() {

      // Осталось времени
      left = Math.floor((options.timestamp - (new Date())) / 1000);

      if (left < 0) {
        left = 0;
      }

      // Осталось дней
      d = Math.floor(left / days);
      updateDuo(0, 1, d);
      left -= d * days;

      // Осталось часов
      h = Math.floor(left / hours);
      updateDuo(2, 3, h);
      left -= h * hours;

      // Осталось минут
      m = Math.floor(left / minutes);
      updateDuo(4, 5, m);
      left -= m * minutes;

      // Осталось секунд
      s = left;
      updateDuo(6, 7, s);

      // Вызываем возвратную функцию пользователя
      options.callback(d, h, m, s);

      // Планируем следующий вызов данной функции через 1 секунду
      setTimeout(tick, 1000);
    })();

    // Данная функция обновляет две цифоровые позиции за один раз
    function updateDuo(minor, major, value) {
      switchDigit(positions.eq(minor), Math.floor(value / 10) % 10);
      switchDigit(positions.eq(major), value % 10);
    }

    return this;
  };


  function init(elem, options) {
    elem.addClass('countdownHolder');

    // Создаем разметку внутри контейнера
    $.each(['Days', 'Hours', 'Minutes', 'Seconds'], function (i) {
      $('<span class="count' + this + '">').html(
        '<span class="position">\
					<span class="digit static">0</span>\
				</span>\
				<span class="position">\
					<span class="digit static">0</span>\
				</span>'
      ).appendTo(elem);

      if (this != "Seconds") {
        elem.append('<span class="countDiv countDiv' + i + '"></span>');
      }
    });

  }

  // Создаем анимированный переход между двумя цифрами
  function switchDigit(position, number) {

    var digit = position.find('.digit')

    if (digit.is(':animated')) {
      return false;
    }

    if (position.data('digit') == number) {
      // Мы уже вывели данную цифру
      return false;
    }

    position.data('digit', number);

    var replacement = $('<span>', {
      'class': 'digit',
      css: {
        top: '-2.1em',
        opacity: 0
      },
      html: number
    });

    // Класс .static добавляется, когда завершается анимация.
    // Выполнение идет более плавно.

    digit
      .before(replacement)
      .removeClass('static')
      .animate({
        top: '2.5em',
        opacity: 0
      }, 'fast', function () {
        digit.remove();
      })

    replacement
      .delay(100)
      .animate({
        top: 0,
        opacity: 1
      }, 'fast', function () {
        replacement.addClass('static');
      });
  }
})(jQuery);

$(function () {

//Таймер выставить отсчет до 17.06.2018 23:00 дня текущий месяц -1(6-1=5)
  var note = $('#note'),
   ts = new Date(2019, 02, 03, 23, 00),//new Date(year, month, date, hours, minutes, seconds, ms)
    // ts =dateEnd,
//    ts = new Date(2018, 02, 11),
    newYear = true;

/*  if ((new Date()) > ts) {
    // Задаем точку отсчета для примера. Пусть будет очередной Новый год или дата через 10 дней.
    // Обратите внимание на *1000 в конце - время должно задаваться в миллисекундах
    ts = (new Date()).getTime() + 10 * 24 * 60 * 60 * 1000;
    newYear = false;
  }*/

  $('#countdown').countdown({
    timestamp: ts,
    callback: function (days, hours, minutes, seconds) {

    }
  });
  $('.countDays').append('<span class="title">дней</span>');
  $('.countHours').append('<span class="title">часов</span>');
  $('.countMinutes').append('<span class="title">минут</span>');
  $('.countSeconds').append('<span class="title">секунд</span>');


// var player = new Plyr('#video_1');
// var player_1 = new Plyr('#video_2');

});
/*
$(document).ready(function() {

    $('.video-item').each(function() {
    	if(!$(this).data('id')){
		 $(this).find('img').attr('src', 'http://i.ytimg.com/vi/' + $(this).data('id') + '/mqdefault.jpg');
		 $(this).append('<div class="lock"></div>');
         $(this).addClass('nohover');
    	}else{
	        $(this).find('img').attr('src', 'http://i.ytimg.com/vi/' + $(this).data('id') + '/mqdefault.jpg');
    	}
    });
    $("#video").attr('src', "https://www.youtube.com/embed/" + $('.video-item.active').data('id') + "?autoplay=0&autohide=1&rel=0&amp;showinfo=0")
    $("#video-title").text($('.video-item.active').data('title'))

    $('.video-item img').click(function() {
        var iframe_url = "https://www.youtube.com/embed/" + $(this).parent().data('id') + "?autoplay=1&autohide=1&rel=0&amp;showinfo=0";
        $("#video").attr('src', iframe_url)
    });

    $('.video-item').click(function(){
    	if ($(this).data('id')) {
	    	$('.video-item').removeClass('active');
	    	$(this).addClass('active');
			$("#video-title").text($(this).data('title'));
		    var id = $('#video'),
		      top = $(id).offset().top;

		    $('body,html').animate({
		      scrollTop: top - 100
		    }, 1500);
    	}
    })
});*/