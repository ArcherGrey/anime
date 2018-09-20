# 官方文档

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
可以使用的类型：
- css 选择器: `div` | `.item` | `#el`
- DOM 元素
- NodeList（DOM元素数组）
- 对象
- 数组（由上面的类型组成）

## 动画属性

可用类型：
- css
- Transforms(css3 中定义的属性)
- 对象属性
- DOM 属性
- SVG 属性
