# 官方文档

~~（存疑）部分缺少合理解释~~

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
- [Timeline](#timeline)(时间轴)：将多个实例同步执行
- [Playback controls](#playback-controls)(播放控制)：播放，暂停，重新启动，搜索动画或时间线
- [CSS transforms](#css-transforms)(css 变换)：CSS 动画独立变换
- [Function based values](#function-based-values)(函数通过值来控制)：多个动画目标可以具有单独的值
- [SVG Animations](#svg)(SVG 动画)：运动路径，线条图和变形动画
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


DOM 属性：
```
<input value="0">
anime({
  targets: input,
  value: 1000, // Animate the input value to 1000
  round: 1 // Remove decimals by rounding the value
});
```

SVG 属性：
```
<svg width="128" height="128" viewBox="0 0 128 128">
  <polygon points="64 68.73508918222262 8.574 99.9935923731656 63.35810017508558 67.62284396863708 64 3.993592373165592 64.64189982491442 67.62284396863708 119.426 99.9935923731656"></polygon>
</svg>

anime({
  targets: 'polygon',
  points: '64 128 8.574 96 8.574 32 64 0 119.426 32 119.426 96'
});
```

## 属性参数

定义每个属性动画的持续时间，延迟和缓动。
可以全局设置，也可以单独设置为每个属性：

| 名称 | 默认值 | 类型 | 说明
| --- | --- | --- | ---
| duration | `1000` | `number`, `function`  | millisecond
| delay | `0` | `number`, `function`   | millisecond
| easing | `'easeOutElastic'` | `function`  | [See Easing functions](#easing-functions)
| elasticity | `500` | `number`, `function` | Range [0 - 1000]
| round | `false` | `number`, `boolean`, `function` | Power of 10


直接设置：
```
anime({
  translateX: {
    value: 250,
    duration: 800
  },
  rotate: {
    value: 360,
    duration: 1800,
    easing: 'easeInOutSine'
  },
  scale: {
    value: 2,
    duration: 1600,
    delay: 800,
    easing: 'easeInOutQuart'
  },
  delay: 250 // All properties except 'scale' inherit 250ms delay
});
```

通过函数来设置：
```
anime({
  targets: 'div',
  translateX: 250,
  rotate: 180,
  duration: function(target) {
    // Duration based on every div 'data-duration' attribute
    return target.getAttribute('data-duration');
  },
  delay: function(target, index) {
    // 100ms delay multiplied by every div index, in ascending order
    return index * 100;
  },
  elasticity: function(target, index, totalTargets) {
    // Elasticity multiplied by every div index, in descending order
    return 200 + ((totalTargets - index) * 200);
  }
});
```

## 动画参数

设置动画的指定方向，循环次数或自动播放：
| 名称 | 默认值 | 类型
| --- | --- | ---
| loop | `false` | `number`, `boolean`
| direction | `'normal'` | `'normal'`, `'reverse'`, `'alternate'`
| autoplay | `true` | `boolean`

```
anime({
  targets: 'div',
  translateX: 100,
  duration: 2000,
  loop: 3, // Play the animation 3 times
  direction: 'reverse', // Play the animation in reverse
  autoplay: false // Animation paused by default
});
```

## 属性值

### 单个值
定义动画的结束值。
起始值是原始目标值，或默认转换值：
| 类型 | 例子 | 说明
| --- | --- | ---
| Number | `100` | Automatically add original or default unit if needed
| String | `'10em'`, `'1turn'`, `'M21 1v160'`, `'50%'` | Must contains at least one numerical value
| Relative values | `'+=100px'`, `'-=20em'`, `'*=4'` | Add, subtract or multiply the original property value
| Colors | `'#FFF'`, `'rgb(255,0,0)'`, `'hsl(100, 20%, 80%)'` | Accepts 3 or 6 hex digit, rgb, or hsl values


### 一个区间
```
anime({
  targets: 'div',
  translateX: [100, 200], // Translate X from 100 to 200
  rotate: ['.5turn', '1turn'], // Rotate from 180deg to 360deg
  scale: ['*=2', 1], // Scale from 2 times the original value to 1,
  backgroundColor: ['rgb(255,0,0)', '#FFF'], // Will transition the background color from red to white
  duration: 1500
});
```

## Function based values

为动画的每个目标和属性获取不同的值。
该函数接受3个参数：target，index，targetsLength。
```
anime({
  targets: 'div',
  translateX: function(el) {
    return el.getAttribute('data-x');
  },
  translateY: function(el, i) {
    return 50 + (-50 * i);
  },
  scale: function(el, i, l) {
    return (l - i) + .25;
  },
  rotate: function() { return anime.random(-360, 360); },
  duration: function() { return anime.random(800, 1600); },
  delay: function() { return anime.random(0, 1000); }
});
```

## Keyframes

使用属性对象数组定义关键帧。
如果未指定，则实例的持续时间除以每个属性的关键帧数。
```
anime({
  targets: 'div',
  translateX: [
    { value: 250, duration: 1000, delay: 500, elasticity: 0 },
    { value: 0, duration: 1000, delay: 500, elasticity: 0 }
  ],
  translateY: [
    { value: -40, duration: 500, elasticity: 100 },
    { value: 40, duration: 500, delay: 1000, elasticity: 100 },
    { value: 0, duration: 500, delay: 1000, elasticity: 100 }
  ],
  scaleX: [
    { value: 4, duration: 100, delay: 500, easing: 'easeOutExpo' },
    { value: 1, duration: 900, elasticity: 300 },
    { value: 4, duration: 100, delay: 500, easing: 'easeOutExpo' },
    { value: 1, duration: 900, elasticity: 300 }
  ],
  scaleY: [
    { value: [1.75, 1], duration: 500 },
    { value: 2, duration: 50, delay: 1000, easing: 'easeOutExpo' },
    { value: 1, duration: 450 },
    { value: 1.75, duration: 50, delay: 1000, easing: 'easeOutExpo' },
    { value: 1, duration: 450 }
  ]
});
```

## Timeline

### 基本时间轴

初始化：
```
var myTimeline = anime.timeline();
```

时间轴接受与动画相同的参数：方向，循环和自动播放：
```
var myTimeline = anime.timeline({
  direction: 'alternate',
  loop: 3,
  autoplay: false
});
```
在时间轴上添加动画通过`.add()`：
```
myTimeline
  .add({
    targets: '.square',
    translateX: 250
  })
  .add({
    targets: '.circle',
    translateX: 250
  })
  .add({
    targets: '.triangle',
    translateX: 250
  });
```

使用`myTimeline.children`访问时间轴子动画 ~~（存疑）时间轴子动画是什么~~

### 时间轴动画偏移

`offset`定义时间轴上动画的开始时间

#### 相对偏移

定义相对于上一个动画持续时间的开始时间。

| 类型 | 例子 | 说明
| --- | --- | ---
| `+=` | `'+=100'` | Starts 100ms after the previous animation ends
| `-=` | `'-=100'` | Starts 100ms before the previous animation ends
| `*=` | `'*=2'` | Starts at 2 times the previous animations duration

```
myTimeline
  .add({
    targets: '.square',
    translateX: 250
  })
  .add({
    targets: '.circle',
    translateX: 250,
    offset: '-=600' // Starts 600ms before the previous animation ends
  })
  .add({
    targets: '.triangle',
    translateX: 250,
    offset: '-=800' // Starts 800ms before the previous animation ends
  });
```

#### 绝对偏移

使用时间轴上的一个绝对开始时间。

```
myTimeline
  .add({
    targets: '.square',
    translateX: 250,
    offset: 1000 // Starts at 1000ms
  })
  .add({
    targets: '.circle',
    translateX: 250,
    offset: 500 // Starts at 500ms
  })
  .add({
    targets: '.triangle',
    translateX: 250,
    offset: 0 // Starts at 0ms
  });
```

## Playback controls

播放，暂停，重新启动，搜索动画或时间线。

Play / Pause：
```
var playPauseAnim = anime({
  targets: 'div',
  translateX: 250,
  direction: 'alternate',
  loop: true,
  autoplay: false // prevent the instance from playing
});

playPauseAnim.play(); //  Manually play
playPauseAnim.pause(); //  Manually pause
```

Restart:
```
var restartAnim = anime({
  targets: 'div',
  translateX: 250,
  direction: 'alternate',
  loop: true,
  autoplay: false
});

restartAnim.restart(); // Restart the animation and reset the loop count / current direction
```

Reverse:
```
var reverseAnim = anime({
  targets: 'div',
  translateX: 250,
  direction: 'alternate',
  loop: true
});

reverseAnim.reverse(); // Change the animation direction
```

Seek(在时间轴上移动)：
```
var seekAnim = anime({
  targets: 'div',
  translateX: 250,
  delay: function(el, i, l) { return i * 100; },
  elasticity: 200,
  autoplay: false
});

seekAnim.seek(500); // Set the animation current time to 500ms
```


## 回调函数

在动画或时间线开始，进行中或完成时执行函数：
| 名称 | 类型 | 参数 | 说明
| --- | --- | --- | ---
| update | `function`| animation `Object` | Called at time = 0
| begin | `function` | animation `Object` | Called after animation delay is over
| complete | `function` | animation `Object` | Called only after all the loops are completed

### Update

`update()` 在每一帧播放时调用：
```
var myAnimation = anime({
  targets: '#update .el',
  translateX: 250,
  delay: 1000,
  update: function(anim) {
    console.log(anim.currentTime + 'ms'); // Get current animation time with `myAnimation.currentTime`, return value in ms.
    console.log(anim.progress + '%'); // Get current animation progress with `myAnimation.progress`, return value in %
  }
});
```

### Begin

`begin()` 在 `delay` 结束之后调用一次：
```
var myAnimation = anime({
  targets: '#begin .el',
  translateX: 250,
  delay: 1000,
  begin: function(anim) {
    console.log(anim.began); // true after 1000ms
  }
});
```

可以通过 `myAnimation.began` 来判断动画是否开始

### Run

`run()` 在每一帧`delay`完成后调用：
```
var myAnimation = anime({
  targets: '#run .el',
  translateX: 250,
  delay: 1000,
  run: function(anim) {
    console.log(anim.currentTime);
  }
});
```

### Complete

`complete()` 在动画结束后调用一次：
```
var myAnimation = anime({
  targets: '#complete .el',
  translateX: 250,
  complete: function(anim) {
    console.log(anim.completed);
  }
});
```

可以通过 `myAnimation.completed` 来判断动画是否结束


## Promises

见`Promises` 对象具体说明
`myAnimation.finished` 返回一个`Promises` 对象

## SVG

运动轨迹
沿SVG路径转换和旋转DOM元素：
```
// Create a path `Object`
var path = anime.path('#motionPath path');

var motionPath = anime({
  targets: '#motionPath .el',
  translateX: path('x'), // Follow the x values from the path `Object`
  translateY: path('y'), // Follow the y values from the path `Object`
  rotate: path('angle')  // Follow the angle values from the path `Object`
});
```
  
