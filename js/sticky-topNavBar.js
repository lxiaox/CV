


!function() {
    let view = document.querySelector('#topNavBar')
    let controller = {
        view: null,
        init: function (view) {
            this.view = view
            this.bindEvents()
        },
        bindEvents: function () {
            let view = this.view
            console.log(view)
            window.addEventListener('scroll', ()=> {
                if (window.scrollY > 0) {
                    view.classList.add('sticky')
                } else {
                    view.classList.remove('sticky')
                }
            })
        }
    }
    controller.init.call(controller, view)
}.call()
