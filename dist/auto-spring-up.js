'use strict';

!function () {
    var view = document.querySelectorAll('[data-x]');
    var controller = {
        view: null,
        init: function init(view) {
            this.view = view;
            this.initView();
            this.bindEvents();
        },
        initView: function initView() {
            var view = this.view;

            for (var i = 0; i < view.length; i++) {
                if (view[i].offsetTop > window.scrollY) {
                    view[i].classList.add('offset');
                }
            }
        },
        bindEvents: function bindEvents() {
            var _this = this;

            setTimeout(function () {
                _this.findCloestAndRemoveOffset();
            }, 300);
            window.addEventListener('scroll', function () {
                _this.findCloestAndRemoveOffset();
            });
        },
        findCloestAndRemoveOffset: function findCloestAndRemoveOffset() {
            var view = this.view;
            //滚动时导航栏菜单高亮
            var minIndex = 0;
            //遍历，找出3个中离窗口最近的。
            for (var i = 1; i < view.length; i++) {

                if (Math.abs(view[i].offsetTop - window.scrollY - 130) < Math.abs(view[minIndex].offsetTop - window.scrollY - 130)) {
                    minIndex = i;
                }
            }
            view[minIndex].classList.remove('offset');
            //找到导航栏相应目录高亮或取消
            var a = document.querySelector('a[href="#' + view[minIndex].id + '"]');
            var li = a.parentNode;
            var brotherAndMe = li.parentNode.children;
            for (var _i = 0; _i < brotherAndMe.length; _i++) {
                brotherAndMe[_i].classList.remove('highlight');
            }
            li.classList.add('highlight');
        }
    };
    controller.init(view);
}.call();