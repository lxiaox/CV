'use strict';

!function () {
    var view = document.querySelector('nav.menu');
    var controller = {
        view: null,
        init: function init(view) {
            this.view = view;
            this.initAnimation();
            this.bindEvents();
        },
        initAnimation: function initAnimation() {
            function animate(time) {
                requestAnimationFrame(animate);
                TWEEN.update(time);
            }
            requestAnimationFrame(animate);
        },
        scrollToElement: function scrollToElement(element) {
            var top = element.offsetTop;

            var currentTop = window.scrollY; //注意：这里的currentTop为最近的上一次点击对象的offsetop

            var targetTop = top - 100;
            var s = targetTop - currentTop;
            var coords = { y: currentTop };
            var t = Math.abs(s / 100 * 300);
            if (t > 500) {
                t = 500;
            }
            var tween = new TWEEN.Tween(coords) //开始位置
            .to({ y: targetTop }, t) //结束位置和时间
            .easing(TWEEN.Easing.Quadratic.InOut) //缓动类型
            .onUpdate(function () {
                //coords.y已经变了
                window.scrollTo(0, coords.y); //如何更新页面
            }).start(); //开始缓动
        },
        bindEvents: function bindEvents() {
            var _this = this;

            var aTags = this.view.querySelectorAll('nav.menu> ul > li  a');
            for (var i = 0; i < aTags.length; i++) {
                aTags[i].onclick = function (msg) {
                    var a = msg.currentTarget;
                    var href = a.getAttribute('href');
                    var element = document.querySelector(href);
                    if (element === undefined) {
                        return;
                    }
                    msg.preventDefault();
                    _this.scrollToElement(element);
                };
            }
        }
    };
    controller.init.call(controller, view);
}.call();