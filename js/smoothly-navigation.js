!function() {
    let view = document.querySelector('nav.menu')
    let controller = {
        view: null,
        init: function (view) {
            this.view = view
            this.initAnimation()
            this.bindEvents()
        },
        initAnimation: function(){
            function animate(time) {
                requestAnimationFrame(animate);
                TWEEN.update(time);
            }
            requestAnimationFrame(animate);
        },
        scrollToElement: function(element){
            let top = element.offsetTop

            let currentTop = window.scrollY   //注意：这里的currentTop为最近的上一次点击对象的offsetop

            let targetTop = top - 100
            let s = targetTop - currentTop
            let coords = {y: currentTop}
            let t = Math.abs((s / 100) * 300)
            if (t > 500) {
                t = 500
            }
            let tween = new TWEEN.Tween(coords)//开始位置
                .to({y: targetTop}, t)//结束位置和时间
                .easing(TWEEN.Easing.Quadratic.InOut)//缓动类型
                .onUpdate(function () {//coords.y已经变了
                    window.scrollTo(0, coords.y)//如何更新页面
                })
                .start();//开始缓动
        },
        bindEvents: function(){
            let aTags = this.view.querySelectorAll('nav.menu> ul > li  a')
            for (let i = 0; i < aTags.length; i++) {
                aTags[i].onclick =  (msg)=> {
                    let a = msg.currentTarget
                    let href = a.getAttribute('href')
                    let element = document.querySelector(href)
                    if (element === undefined) {
                        return
                    }
                    msg.preventDefault()
                    this.scrollToElement(element)
                }
            }
        }
    }
    controller.init.call(controller,view)
}.call()
