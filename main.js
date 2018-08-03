

//loading等待动画
siteWelcome.classList.remove('active')

//添加 offset 类
let specialTags = document.querySelectorAll('[data-x]')
for(let i=0;i<specialTags.length;i++){
    //进入页面时就在中间，在页面上的元素不便移，以免遮住当前元素
    if(specialTags[i].offsetTop  > window.scrollY) {
        specialTags[i].classList.add('offset')
    }
}
setTimeout(function () {
    findCloest()
},300)

window.onscroll = function () {
    //往下滚动导航栏变白变矮样式
    if (window.scrollY > 0) {
        topNavBar.classList.add('sticky')
    } else {
        topNavBar.classList.remove('sticky')
    }
    findCloest()
}

function findCloest() {
    //滚动时导航栏菜单高亮
    let minIndex = 0
    //遍历，找出3个中离窗口最近的。
    for(let i=1;i<specialTags.length;i++){

        if(Math.abs(specialTags[i].offsetTop - window.scrollY -130) <
            Math.abs(specialTags[minIndex].offsetTop - window.scrollY -130) ){
            minIndex = i
        }
    }
    specialTags[minIndex].classList.remove('offset')
    //找到导航栏相应目录高亮或取消
    let a = document.querySelector('a[href="#'+ specialTags[minIndex].id +'"]')
    let li = a.parentNode
    let brotherAndMe = li.parentNode.children
    for(let i=0;i<brotherAndMe.length;i++){
        brotherAndMe[i].classList.remove('highlight')
    }
    li.classList.add('highlight')
}

//导航栏子菜单滑动,及菜单底部滑块
let liTags=document.querySelectorAll('nav.menu > ul > li')
for(let i=0;i<liTags.length;i++) {
    liTags[i].onmouseenter = function (msg) {
        msg.currentTarget.classList.add('active')
    }
    liTags[i].onmouseleave = function (msg) {
        msg.currentTarget.classList.remove('active')
    }
}

//点击导航栏菜单时的滚动动画（以及作品的子菜单）
let aTags= document.querySelectorAll('nav.menu > ul > li  a')

function animate(time) {
    requestAnimationFrame(animate);
    TWEEN.update(time);
}
requestAnimationFrame(animate);

for(let i=0; i<aTags.length; i++){
    aTags[i].onclick=function(msg) {
        let a = msg.currentTarget
        let href = a.getAttribute('href')
        let element = document.querySelector(href)
        if(element === undefined){return}
        msg.preventDefault()

        let top = element.offsetTop

        let currentTop = window.scrollY   //注意：这里的currentTop为最近的上一次点击对象的offsetop

        let targetTop =  top - 100
        let s = targetTop - currentTop
        var coords = {y:currentTop}
        var t = Math.abs( (s/100) * 300)
        if(t>500){t = 500}
        var tween = new TWEEN.Tween(coords)
            .to({ y: targetTop }, t)
            .easing(TWEEN.Easing.Quadratic.InOut)
            .onUpdate(function() {
                window.scrollTo(0,coords.y)
            })
            .start();
    }
}


