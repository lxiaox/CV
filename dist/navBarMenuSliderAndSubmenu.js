'use strict';

!function () {
    var view = document.querySelectorAll('nav.menu > ul > li');
    var controller = {
        view: null,
        init: function init(view) {
            this.view = view;
            this.bindEvents();
        },
        bindEvents: function bindEvents() {
            var view = this.view;
            for (var i = 0; i < view.length; i++) {
                view[i].onmouseenter = function (msg) {
                    msg.currentTarget.classList.add('active');
                };
                view[i].onmouseleave = function (msg) {
                    msg.currentTarget.classList.remove('active');
                };
            }
        }
    };
    controller.init.call(controller, view);
}.call();