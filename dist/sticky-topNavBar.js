'use strict';

!function () {
    var view = document.querySelector('#topNavBar');
    var controller = {
        view: null,
        init: function init(view) {
            this.view = view;
            this.bindEvents();
        },
        bindEvents: function bindEvents() {
            var view = this.view;
            window.addEventListener('scroll', function () {
                if (window.scrollY > 0) {
                    view.classList.add('sticky');
                } else {
                    view.classList.remove('sticky');
                }
            });
        }
    };
    controller.init.call(controller, view);
}.call();