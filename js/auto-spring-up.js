!function() {
    let view = document.querySelectorAll('[data-x]')
    let controller = {
        view: null,
        init: function (view) {
            this.view = view
            this.initView()
            this.bindEvents()
        },
        initView: function () {
            let view = this.view

            for (let i = 0; i < view.length; i++) {
                if (view[i].offsetTop > window.scrollY) {
                    view[i].classList.add('offset')
                }
            }
        },
        bindEvents: function () {

            setTimeout( ()=> {
                this.findCloestAndRemoveOffset()
            }, 300)
            window.addEventListener('scroll', ()=> {
                this.findCloestAndRemoveOffset()
            })
        },
        findCloestAndRemoveOffset: function(){
            let view = this.view
            //滚动时导航栏菜单高亮
            let minIndex = 0
            //遍历，找出3个中离窗口最近的。
            for (let i = 1; i < view.length; i++) {

                if (Math.abs(view[i].offsetTop - window.scrollY - 130) <
                    Math.abs(view[minIndex].offsetTop - window.scrollY - 130)) {
                    minIndex = i
                }
            }
            view[minIndex].classList.remove('offset')
            //找到导航栏相应目录高亮或取消
            let a = document.querySelector('a[href="#' + view[minIndex].id + '"]')
            let li = a.parentNode
            let brotherAndMe = li.parentNode.children
            for (let i = 0; i < brotherAndMe.length; i++) {
                brotherAndMe[i].classList.remove('highlight')
            }
            li.classList.add('highlight')
        }
    }
    controller.init(view)



}.call()
