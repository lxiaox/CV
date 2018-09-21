'use strict';

!function () {
    var view = document.querySelector('section.message');
    var model = {
        initAV: function initAV() {
            var APP_ID = 'Ocf3z2EnHKS6Im2Gjubpjqei-gzGzoHsz';
            var APP_KEY = 'K6hRPUJlhxzByskgdAfFbSVg';
            AV.init({ appId: APP_ID, appKey: APP_KEY });
        },
        fetch: function fetch() {
            var query = new AV.Query('Message');
            return query.find();
        },
        save: function save(name, content) {
            var Message = AV.Object.extend('Message');
            var message = new Message();
            return message.save({
                name: name,
                content: content
            });
        }
    };
    var controller = {
        view: null,
        model: null,
        messageList: null,
        form: null,
        init: function init() {
            this.view = view;
            this.model = model;
            this.messageList = this.view.querySelector('#messageList');
            this.form = view.querySelector('form');
            this.model.initAV();
            this.loadingMessages();
            this.bindEvents();
        },
        loadingMessages: function loadingMessages() {
            var _this = this;

            this.model.fetch().then(function (messages) {
                var array = messages.map(function (item) {
                    return item.attributes;
                });
                array.forEach(function (item) {
                    var li = document.createElement('li');
                    li.innerText = item.name + ': ' + item.content;
                    _this.messageList.appendChild(li);
                });
            });
        },
        bindEvents: function bindEvents() {
            var _this2 = this;

            this.form.addEventListener('submit', function (e) {
                e.preventDefault();
                _this2.saveMessage();
            });
        },
        saveMessage: function saveMessage() {
            var myForm = this.form;

            var content = myForm.querySelector('textarea[name=content]').value;
            var name = myForm.querySelector('input[name=name]').value;

            if (name && content) {
                console.log(1);
                this.model.save(name, content).then(function (message) {
                    var li = document.createElement('li');
                    li.innerText = message.attributes.name + ': ' + message.attributes.content;
                    var messageList = document.getElementById('messageList');
                    messageList.appendChild(li);
                    myForm.querySelector('textarea[name=content]').value = '';
                }, function () {
                    window.alert('提交失败，改天再来吧');
                });
            } else {
                alert('姓名和内容不能为空');
            }
        }
    };
    controller.init.call(controller, view, model);
}.call();