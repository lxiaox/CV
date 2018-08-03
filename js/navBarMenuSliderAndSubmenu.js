!function() {
    let view = document.querySelectorAll('nav.menu > ul > li')
    let controller = {
        view: null,
        init: function (view) {
            this.view = view
            this.bindEvents()
        },
        bindEvents: function () {
            let view = this.view
            for (let i = 0; i < view.length; i++) {
                view[i].onmouseenter = function (msg) {
                    msg.currentTarget.classList.add('active')
                }
                view[i].onmouseleave = function (msg) {
                    msg.currentTarget.classList.remove('active')
                }
            }
        }
    }
    controller.init.call(controller, view)
}.call()



