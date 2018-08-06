!function(){
    let view = document.querySelector('section.message')
    let model = {
        initAV: function(){
            var APP_ID = 'Ocf3z2EnHKS6Im2Gjubpjqei-gzGzoHsz'
            var APP_KEY = 'K6hRPUJlhxzByskgdAfFbSVg'
            AV.init({appId: APP_ID, appKey: APP_KEY})
        },
        fetch: function(){
            var query = new AV.Query('Message');
            return query.find()
        },
        save: function (name, content) {
            var Message = AV.Object.extend('Message');
            var message = new Message()
            return message.save({
                name: name,
                content: content
            })
        }
    }
    let controller = {
        view: null,
        model: null,
        messageList: null,
        form: null,
        init: function(){
            this.view = view
            this.model = model
            this.messageList = this.view.querySelector('#messageList')
            this.form = view.querySelector('form')
            this.model.initAV()
            this.loadingMessages()
            this.bindEvents()
        },
        loadingMessages: function(){
            this.model.fetch().then( (messages)=> {
                let array = messages.map((item)=> item.attributes)
                array.forEach((item)=>{
                    let li = document.createElement('li')
                    li.innerText = item.name + ': ' + item.content
                    this.messageList.appendChild(li)
                })
            })
        },
        bindEvents: function() {
            this.form.addEventListener('submit', (e)=> {
                e.preventDefault()
                this.saveMessage()
            })
        },
        saveMessage: function(){
            let myForm = this.form

            let content = myForm.querySelector('textarea[name=content]').value
            let name = myForm.querySelector('input[name=name]').value

            if(name && content) {
                console.log(1)
                this.model.save(name,content).then(function (message) {
                    let li = document.createElement('li')
                    li.innerText = `${message.attributes.name}: ${message.attributes.content}`
                    let messageList = document.getElementById('messageList')
                    messageList.appendChild(li)
                    myForm.querySelector('textarea[name=content]').value = ''
                },function(){
                    window.alert('提交失败，改天再来吧')
                })
            }else{
                alert('姓名和内容不能为空')
            }
        }
    }
    controller.init.call(controller,view,model)
}.call()
