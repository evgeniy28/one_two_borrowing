$(function() {
  function scrollToSection(classLink, classSection) {
    $(classLink).on('click', function(e) {
      e.preventDefault();
      $('html,body').stop().animate({
        scrollTop: $(classSection).offset().top
      }, 1500);
    });
  };

  // Go section recomendation
  scrollToSection('.go-info', '.recomendation');

  // Go section about-company
  scrollToSection('.go-about', '.about-company');

  // Go section header
  scrollToSection('.go-top-btn', '.header');

  // Go section offices
  scrollToSection('.go-offices', '.offices');
});

$(function() {
  // Mask for number phone
  $('[name=tel]').mask('+7(999) 999-99-99');

  // Open Modal Form
  function openModalForm(classButton, classForm) {
    $(classButton).on('click', function(e) {
      e.preventDefault();
      $('.modal').addClass('is-active');
      $(classForm).addClass('is-form-show');
    });
  };
  openModalForm('.header-callback__btn', '.form-for-me');
  openModalForm('.call-me', '.form-for-me');
  openModalForm('.about-company__btn', '.form-for-me');
  openModalForm('.footer__btn', '.form-for-me');
  openModalForm('.call-friend', '.form-for-friend');

  // Close Modal Form
  function hideModalForm(classForm) {
    if ($('.modal').hasClass('is-active')) {
      $('.modal').removeClass('is-active');
      $(classForm).removeClass('is-form-show');
      $(classForm + ' input').removeClass('is-danger');
    }
  };

  function closeModalFormBtn(classForm) {
    $(classForm + ' .modal-close').on('click', function(e) {
      e.preventDefault();
      hideModalForm(classForm);
    });
  };
  closeModalFormBtn('.form-for-me form');
  closeModalFormBtn('.form-for-friend form');

  function closeModalFormEsc(classForm) {
    $(window).on('keydown', function(e) {
      if (e.keyCode === 27) {
        hideModalForm(classForm);
      }
    });
  };
  closeModalFormEsc('.form-for-me form');
  closeModalFormEsc('.form-for-friend form');

  /// SEND AJAX FORMS ///
  function addFormAnimationError(classForm) {
    $(classForm).addClass('modal-error');
    setTimeout(function() {
      $(classForm).removeClass('modal-error');
    }, 1500);
  };

  // Form for me
  $('.form-for-me .modal-form').submit(function(e) {
    var name = document.querySelector('.form-for-me [name=name]');
    var phone = document.querySelector('.form-for-me [name=tel]');
    var checkbox = document.querySelector('.form-for-me [name=checkbox]');
    var checkboxText = document.querySelector('.form-for-me .modal-form__checkbox-text');
    e.preventDefault();

    if (!name.value) {
      addFormAnimationError('.form-for-me');
      name.classList.add('is-danger');
    } else if (!phone.value) {
      addFormAnimationError('.form-for-me');
      name.classList.remove('is-danger');
      phone.classList.add('is-danger');
    } else if (!checkbox.checked) {
      addFormAnimationError('.form-for-me');
      name.classList.remove('is-danger');
      phone.classList.remove('is-danger');
      checkboxText.classList.add('errors-text');
    } else {
      console.log('ajax');
      console.log($(name).val());
      console.log($(phone).val());

      var postForm = {
        'name' : $(name).val(),
        'tel'  : $(phone).val()
      }

      $.ajax({
        type     : 'POST',
        url      : 'form.php',
        data     : postForm,
        dataType : 'json',
        success  : function(data) {
          if (!data.success) {
            if (data.errors.name) {
              console.log('errors', data.errors.name);
              addFormAnimationError('.form-for-me');
              $('.form-for-me .form-errors').fadeIn(1000).html(data.errors.name);
            }
          } else {
            $('.form-for-me .modal-form__title').fadeIn(1000).html("<p class=\"modal-form__title success-text\">" + data.posted + "</p>");
          }
        }
      });
    }
  });

  // Form for friend
  $('.form-for-friend .modal-form').submit(function(e) {
    var name = document.querySelector('.form-for-friend [name=name]');
    var phone = document.querySelector('.form-for-friend [name=tel]');
    var yourName = document.querySelector('.form-for-friend [name=your_name]');
    var checkbox = document.querySelector('.form-for-friend [name=checkbox]');
    var checkboxText = document.querySelector('.form-for-friend .modal-form__checkbox-text');
    e.preventDefault();

    if (!name.value) {
      addFormAnimationError('.form-for-friend');
      name.classList.add('is-danger');
    } else if (!phone.value) {
      addFormAnimationError('.form-for-friend');
      name.classList.remove('is-danger');
      phone.classList.add('is-danger');
    } else if (!yourName.value) {
      addFormAnimationError('.form-for-friend');
      name.classList.remove('is-danger');
      phone.classList.remove('is-danger');
      yourName.classList.add('is-danger');
    } else if (!checkbox.checked) {
      addFormAnimationError('.form-for-friend');
      name.classList.remove('is-danger');
      phone.classList.remove('is-danger');
      yourName.classList.remove('is-danger');
      checkboxText.classList.add('errors-text');
    } else {
      console.log('ajax');
      console.log($(name).val());
      console.log($(phone).val());
      console.log($(yourName).val());

      var postForm = {
        'name'      : $(name).val(),
        'tel'       : $(phone).val(),
        'your_name' : $(yourName).val()
      }

      $.ajax({
        type     : 'POST',
        url      : 'form_for_friend.php',
        data     : postForm,
        dataType : 'json',
        success  : function(data) {
          if (!data.success) {
            if (data.errors.name) {
              console.log('errors', data.errors.name);
              addFormAnimationError('.form-for-friend');
              $('.form-for-friend .form-errors').fadeIn(1000).html(data.errors.name);
            }
          } else {
            $('.form-for-friend .modal-form__title').fadeIn(1000).html("<p class=\"modal-form__title success-text\">" + data.posted + "</p>");
          }
        }
      });
    }
  });

  // Customer form
  $('.customer-form').submit(function(e) {
    var name = document.querySelector('.customer-form [name=name]');
    var phone = document.querySelector('.customer-form [name=tel]');
    var checkbox = document.querySelector('.customer-form [name=checkbox]');
    var checkboxText = document.querySelector('.customer-form .customer-form__checkbox-text');
    e.preventDefault();

    if (!name.value) {
      addFormAnimationError('.customer-form');
      name.classList.add('is-danger');
    } else if (!phone.value) {
      addFormAnimationError('.customer-form');
      name.classList.remove('is-danger');
      phone.classList.add('is-danger');
    } else if (!checkbox.checked) {
      addFormAnimationError('.customer-form');
      name.classList.remove('is-danger');
      phone.classList.remove('is-danger');
      checkboxText.classList.add('errors-text');
    } else {
      console.log('ajax');
      console.log($(name).val());
      console.log($(phone).val());

      var postForm = {
        'name' : $(name).val(),
        'tel'  : $(phone).val()
      }

      $.ajax({
        type     : 'POST',
        url      : 'form.php',
        data     : postForm,
        dataType : 'json',
        success  : function(data) {
          if (!data.success) {
            if (data.errors.name) {
              $('.customer-form .form-errors').fadeIn(1000).html(data.errors.name);
            }
          } else {
            $('.customer-form').fadeIn(1000).html('<p>' + data.posted + '</p>');
          }
        }
      });
    }
  });
});

/// Scroll Reveal ///
$(function() {
  var bottom, bottomFast, top;
  window.sr = ScrollReveal();

  top = {
    origin: 'top',
    distance: '24px',
    duration: 1500,
    scale: 1.05
  };

  bottom = {
    origin: 'bottom',
    distance: '64px',
    duration: 900,
    delay: 1500,
    scale: 1
  };

  bottomFast = {
    origin: 'bottom',
    distance: '32px',
    duration: 600,
    delay: 800,
    scale: 0.9
  };

  // Header
  sr.reveal('.header__title', top);
  sr.reveal('.header__btn', top);

  // Information
  sr.reveal('.passport-icon', bottomFast);
  sr.reveal('.time-icon', bottomFast);
  sr.reveal('.percent-icon', bottomFast);
  sr.reveal('.call-icon', bottomFast);

  // Form
  sr.reveal('.customer-form', bottomFast);

  // Recomendation
  sr.reveal('.recomendation__title', top);
  sr.reveal('.recomendation__text', bottomFast);
  sr.reveal('.slider', bottomFast);
  sr.reveal('.button-wrapper', bottomFast);

  // About company
  sr.reveal('.about-company__title', top);
  sr.reveal('.about-company__info', bottomFast);
  sr.reveal('.about-company__btn', bottomFast);
});

/// Swipe slider ///
$(function() {
  var element = document.getElementById('slider');
  window.mySwipe = new Swipe(element, {
    startSlide: 0,
    auto: 3000,
    draggable: true,
    autoRestart: true,
    continuous: true,
    disableScroll: true,
    stopPropagation: true,
    callback: function(index, element) {

      function isActive(indexElement) {
        var paginationList = document.querySelector('.slider-pagination .slider-pagination__list');
        if (indexElement == 0) {
          paginationList.children[indexElement].classList.add('is-active-slide');
          paginationList.children[3].classList.remove('is-active-slide');
        } else {
          paginationList.children[indexElement].classList.add('is-active-slide');
          paginationList.children[indexElement - 1].classList.remove('is-active-slide');
        }
      };
      isActive(index);

    },
    transitionEnd: function(index, element) {}
  });
});

/// MAPS SECTION ///
$(function() {
  function watchOfficeMap(currentButton, currentOfficeId, currentMap, otherButton, otherOfficeId, otherMap) {
    $(currentButton).on('click', function(e) {
      e.preventDefault();

      $('.offices__links ' + currentButton).addClass('is-active-office');
      $('.offices__links ' + otherButton).removeClass('is-active-office');

      $(currentOfficeId).removeClass('none-js');
      $(otherOfficeId).addClass('none-js');

      $(currentMap).removeClass('none-js');
      $(otherMap).addClass('none-js');
    });
  };
  watchOfficeMap('.lenina-squire', '#office1', '#yandex-map1','.october', '#office2', '#yandex-map2');
  watchOfficeMap('.october', '#office2', '#yandex-map2','.lenina-squire', '#office1', '#yandex-map1');

  ymaps.ready(function () {
    var map1 = new ymaps.Map('yandex-map1', {
      center: [43.355302, 132.179872],
      zoom: 18
    }, {
      searchControlProvider: 'yandex#search'
    });

    var map2 = new ymaps.Map('yandex-map2', {
      center: [43.354305, 132.186286],
      zoom: 18
    }, {
      searchControlProvider: 'yandex#search'
    });

    // Создание макета содержимого балуна.
    BalloonContentLayout = ymaps.templateLayoutFactory.createClass(
      '<div class="map-mark">' +
        '<div class="map-mark__wrapper">' +
          '<p class="map-mark__adress">{{ properties.address }}</p>' +
          '<p class="map-mark__description">{{ properties.description }}</p>' +
          '<p class="map-mark__phone">{{ properties.phone }}</p>' +
          '<button class="button map-mark__button call-me-office" type="button">Перезвоните мне</button>' +
        '</div>' +
      '</div>',
      {
        // Переопределяем функцию build, чтобы при создании макета начинать
        // слушать событие click на кнопке.
        build: function () {
          // Сначала вызываем метод build родительского класса.
          BalloonContentLayout.superclass.build.call(this);
          // А затем выполняем дополнительные действия.
          $('.call-me-office').bind('click', this.openModalFromMap);
        },

        // Аналогично переопределяем функцию clear, чтобы снять
        // прослушивание клика при удалении макета с карты.
        clear: function () {
          // Выполняем действия в обратном порядке - сначала снимаем слушателя,
          // а потом вызываем метод clear родительского класса.
          $('.call-me-office').unbind('click', this.openModalFromMap);
          BalloonContentLayout.superclass.clear.call(this);
        },

        openModalFromMap: function (e) {
          e.preventDefault();
          $('.modal').addClass('is-active');
          $('.form-for-me').addClass('is-form-show');
        }
      }
    );

    var placemark1 = new ymaps.Placemark(map1.getCenter(),
      {
        address: 'г. Артём, площадь Ленина, 2',
        description: 'ГУМ, вход с торца, напротив "Кошелки"!',
        phone: '8-904-627-3974'
      }, {
        balloonContentLayout: BalloonContentLayout,
        balloonPanelMaxMapArea: 0,
        preset: 'islands#blueDotIcon',
        iconColor: '#28aa3a'
    });

    var placemark2 = new ymaps.Placemark(map2.getCenter(),
      {
        address: 'г. Артём, ул. Октябрьская, д. 4а',
        description: 'Центральная автобусная остановка, "Садильник", в одном здании с салоном Yota!',
        phone: '8-904-627-3974'
      }, {
        balloonContentLayout: BalloonContentLayout,
        balloonPanelMaxMapArea: 0,
        preset: 'islands#blueDotIcon',
        iconColor: '#28aa3a'
    });

    map1.geoObjects.add(placemark1);
    map2.geoObjects.add(placemark2);
  });
});
