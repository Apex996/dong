    var box = document.getElementById('box');
        var screen = box.children[0];
        var ul = screen.children[0];
        var ol = screen.children[1];
        var arr = document.getElementById('arr');
        var arrLeft = document.getElementById('left');
        var arrRight = document.getElementById('right');
        var imgWidth = screen.offsetWidth;
        //1. 动态生成li
        var count = ul.children.length;
        for (var i = 0; i < count; i++) {
            // 创建一个新的元素
            var li = document.createElement('li');
            // 往ol里面添加子元素li
            ol.appendChild(li);
            if (i === 0) {
                li.className = 'current';
            }
            // 2 点击序号 动画的方式 切换图片
            li.onclick = liClick;
            // 创建自定义属性记录索引
            li.setAttribute('index', i);
            // 因为在循环里面所以直接写函数影响内存性能
        }
        function liClick () {
            // 2.1 取消其它li的高亮显示，让当前li高亮显示
            for (var i = 0; i < ol.children.length; i++) {
                var li = ol.children[i];
                li.className = '';
            }
            this.className = 'current';
            // 2.2 点击序号，动画的方式切换到当前点击的图片位置
            // 图片的宽度
            
            // 获取自定义属性
            // 转换字符串成整数类型
            var liIndex = parseInt(this.getAttribute('index'));
            animate (ul, -liIndex*imgWidth);
            // 定义全局变量和li的index保持一致
            // 如果没有定义则会产生bug
            index = liIndex
        }
            // 4 实现上一张和下一张的功能
            // 下一张图片
        var index = 0;
        arrRight.onclick = function () {
            // 判断是否是克隆的第一张图片，如果是克隆的第一张图片，此时修改ul的坐标，显示真正的第一张图片
             index++;
            if (index === count) {
                ul.style.left = '0px';
                index = 0;
            }
            if (index < count) {
                ol.children[index].click();
            }else {
                animate (ul, -index*imgWidth);
                for (var i = 0; i < ol.children.length; i++) {
                    var li = ol.children[i];
                    li.className = '';
                }
                ol.children[0].className = 'current';
            }
        }
        // 上一张图片
        arrLeft.onclick = function () {
            if (index == 0) {
                index = count;
                ul.style.left = -index*imgWidth + 'px';
            }
            index--;
            ol.children[index].click();
        }
        // 无缝滚动
        // 首先克隆第一个图片
        var firstLi = ul.children[0];
        // 克隆li cloneNode 复制节点
        // 参数为true 复制内容
        // 参数为false 复制节点，不复制内容
        var cloneLi = firstLi.cloneNode(true);
        ul.appendChild(cloneLi);
        // 5 自动切换图片
        var timerId = setInterval (function () {
            arrRight.click();
        }, 2000);
        box.onmouseenter = function () {
            clearInterval(timerId);
        }
        box.onmouseleave = function () {
            timerId = setInterval (function () {
                arrRight.click();
            },2000)
        }
        // 获取元素
        var newsT = document.getElementById('newsT');
        var flag = document.getElementById('flag');
        var newsContainer = document.getElementById('newsContainer');
        // 获取到a标签注册事件
        for (var i = 0; i < 2; i++) {
            var link = newsT.children[i];
            link.onmouseover = linkMouseover;
            // 自定义索引
            link.setAttribute('index', i);
        }
        function linkMouseover() {
            var offsetLeft = this.offsetLeft;
            animate(flag, offsetLeft - 2);
             // 显示对应的详细内容
             // 让所有的详细内容隐藏
             for (var i = 0, len = newsContainer.children.length; i < len; i++) {
                var div = newsContainer.children[i];
                if (div.className.indexOf('hide') === -1) {
                    div.className = 'news-b hide';
                }
             }
             var index = parseInt(this.getAttribute('index'));
             newsContainer.children[index].className = 'news-b show';
        }
        window.onscroll = function() {
            var top = document.documentElement.scrollTop;
            var nav = document.getElementsByClassName('nav')[0];
            // console.log(top);
            if (top >= 200) {
                nav.style.position = 'fixed';
                nav.style.top = '0';
                nav.style.height = '48px';
                nav.style.display = 'block';
                nav.style.zIndex = '1000';
            } else {
                nav.style.display = 'none';
                nav.style.height = '0';
            }
        }