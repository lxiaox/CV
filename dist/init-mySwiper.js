'use strict';

!function () {
    var view = document.querySelector('#mySlides');
    var controller = {
        view: null,
        mySwiper: null,
        swiperOptions: {
            loop: true,
            pagination: { el: '.swiper-pagination' },
            navigation: { nextEl: '.swiper-button-next', prevEl: '.swiper-button-prev' }
        },
        init: function init() {
            this.view = view;
            this.initSwiper();
        },
        initSwiper: function initSwiper() {
            this.mySwiper = new Swiper(this.view.querySelector('.swiper-container'), this.swiperOptions);
        }
    };
    controller.init.call(controller, view);
}.call();