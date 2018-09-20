# 官方文档

~~（存疑）部分待补充~~

# 安装和使用

npm 方式：
```
$ npm install animejs
# OR
$ bower install animejs
```
其他方式:
```
import anime from 'animejs'
# OR
// 下载到本地
<script src="anime.min.js"></script>
```

使用：
```
anime({
  targets: 'div',
  translateX: [
    { value: 100, duration: 1200 },
    { value: 0, duration: 800 }
  ],
  rotate: '1turn',
  backgroundColor: '#FFF',
  duration: 2000,
  loop: true
});
```

# 主要特性

- [Keyframes](#keyframes)(关键帧)：将多个动画属性链接起来
- [Timeline](#timeline)(时间线)：将多个实例同步执行
- [Playback controls](#playback-controls)(播放控制)：播放，暂停，重新启动，搜索动画或时间线
- [CSS transforms](#css-transforms)(css 变换)：CSS 动画独立变换
- [Function based values](#function-based-values)(函数通过值来控制)：多个动画目标可以具有单独的值
- [SVG Animations](#svg-animations)(SVG 动画)：运动路径，线条图和变形动画
- [Easing functions](#easing-functions)(渐变函数)：使用内置函数或者自己创建的函数来实现贝尔萨曲线



# API

## targets

定义了需要绑定动画的元素或者js对象

| 类型 | 例子
| --- | ---
| CSS Selectors | `'div'`, `'.item'`, `'path'`, `'#el path'` ...
| DOM Element | `document.querySelector('.item')`
| NodeList | `document.querySelectorAll('.item')`
| `Object` | `{prop1: 100, prop2: 200}`
| `Array` | `['div', '.item', domNode]`

## 动画属性

| 类型 | 例子
| --- | ---
| CSS | `opacity`, `backgroundColor`, `fontSize` ...
| Transforms | `translateX`, `rotate`, `scale` ...
| Object properties | Any `Object` property containing numerical values
| DOM attributes | Any DOM attributes containing numerical values
| SVG attributes | Any SVG attributes containing numerical values

普通css:
```
anime({
  targets: 'div',
  left: '80%', // Animate all divs left position to 80%
  opacity: .8, // Animate all divs opacity to .8
  backgroundColor: '#FFF' // Animate all divs background color to #FFF
});
```

独立的css变换：
```
anime({
  targets: 'div',
  translateX: 250, // Animate all divs translateX property to 250px
  scale: 2, // Animate all divs scale to 2
  rotate: '1turn' // Animate all divs rotation to 1 turn
});
```


~~（存疑）不清楚两者之间有什么区别~~

`javascript` 对象属性：
```
var myObject = {
  prop1: 0,
  prop2: '0%'
}

anime({
  targets: myObject,
  prop1: 50, // Animate the 'prop1' property from myObject to 50
  prop2: '100%' // Animate the 'prop2' property from myObject to 100%
});
```

~~（存疑）如何直接将`javascript 对象属性`显示到页面中（使用vue可以实现似乎原生操作难以实现）~~
