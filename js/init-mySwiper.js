!function(){
    let view = document.querySelector('#mySlides')
    let controller = {
        view: null,
        mySwiper: null,
        swiperOptions: {
            loop: true,
            pagination: {el: '.swiper-pagination',},
            navigation: {nextEl: '.swiper-button-next', prevEl: '.swiper-button-prev',},
        },
        init: function () {
            this.view = view
            this.initSwiper()
        },
        initSwiper: function () {
            this.mySwiper = new Swiper(this.view.querySelector('.swiper-container'), this.swiperOptions)
        }
    }
    controller.init.call(controller, view)
}.call()