// Generated by CoffeeScript 1.12.7
(function() {
  var openComment, styles, time, writeStyleChar, writeStyles;

  styles =
    "/* \n * 实验\n * 版本 1.0\n * --------\n */\n\n\nbody {\n  background-color: #1a1c24; color: #fff;\n  font-size: 13px; line-height: 1.4;\n  -webkit-font-smoothing: subpixel-antialiased;\n}\n\npre { \n  position: fixed; width: 48%;\n  top: 30px; bottom: 30px; left: 26%;\n  transition: left 50ms;\n  overflow: auto;\n  background-color: #313744; color: #a6c3d4;\n  border: 1px solid rgba(0,0,0,0.2);\n  padding: 24px 12px;\n  box-sizing: border-box;\n  border-radius: 3px;\n  box-shadow: 0px 4px 0px 2px rgba(0,0,0,0.1);\n}\n\n\n/* \n * Syntax highlighting \n * Colors based on Base16 Ocean Dark\n */\n\npre em:not(.comment) { font-style: normal; }\n\n.comment       { color: #707e84; }\n.selector      { color: #c66c75; }\n.selector .key { color: #c66c75; }\n.key           { color: #c7ccd4; }\n.value         { color: #d5927b; }\n\n\n/* \n * Let's build my little pen heart.\n */ \n\n\n/* First, we'll move this s*** over */\n\npre { left: 50%; }\n\npre { left: 0%; }\n\n.show{\n  width:50%;\n  right:0%;\n  position: fixed;\n  border: dashed;\n  display:block !important;\n}\n\n\n/*\n圣杯布局\n*/\n.head {\n  width: 100%;\n  height: 30px;\n  background: red;\n}\n\n.content {\n  padding: 0 100px;\n  \n}\n\n.foot {\n  width: 100%;\n  height: 30px;\n  background: red;\n  clear: both;\n}\n\n.center {\n  width: 100%;\n  float: left;\n  background: green;   \n  min-height: 500px;\n}\n\n.left {\n  position: relative;\n  width: 100px;\n  float: left;\n  right: 100px;\n  margin-left: -100%;\n  background: yellow;\n  min-height: 500px;\n}\n\n.right {\n  width: 100px;\n  float: left;\n  margin-right: -100px;\n  background: pink;\n  min-height: 500px;\n}\n\n/* 水平居中 */\n.center{\n  text-align: center;\n}\n\n/* 垂直居中 */\n.center{\n  line-height: 500px;\n}\n\n/* 隐 藏 */\n.show{ \n  display:none !important;\n}\n\n\n/* 双飞翼 */\n.show1{\n  display:block !important;\n  width:50%;\n  right:0%;\n  position: fixed;\n  border: dashed;\n}\n\n.head1 {\n  height:30px;\n  width:100%;\n  background-color:red;\n}\n\n.foot1{\n  height:30px;\n  width:100%;\n  background-color:red;\n  clear: both;\n}\n\n.content1{\n  float: left;\n  width:100%;\n}\n\n.center1{\n  min-height:500px;\n  background: green;    \n  margin: 0 100px;\n}\n\n.left1{\n  width: 100px;\n  float: left;\n  margin-left: -100%;\n  background: yellow;\n  min-height: 500px;\n}\n\n.right1{\n  width: 100px;\n  float: left;\n  margin-left: -100px;\n  background: pink;\n  min-height: 500px;\n}\n";

  openComment = false;

  writeStyleChar = function(which) {
    if (which === "/" && openComment === false) {
      openComment = true;
      styles = $("#style-text").html() + which;
    } else if (which === "/" && openComment === true) {
      openComment = false;
      styles = $("#style-text")
        .html()
        .replace(/(\/[^\/]*\*)$/, '<em class="comment">$1/</em>');
    } else if (which === ":") {
      styles = $("#style-text")
        .html()
        .replace(/([a-zA-Z- ^\n]*)$/, '<em class="key">$1</em>:');
    } else if (which === ";") {
      styles = $("#style-text")
        .html()
        .replace(/([^:]*)$/, '<em class="value">$1</em>;');
    } else if (which === "{") {
      styles = $("#style-text")
        .html()
        .replace(/(.*)$/, '<em class="selector">$1</em>{');
    } else {
      styles = $("#style-text").html() + which;
    }
    $("#style-text").html(styles);
    return $("#style-tag").append(which);
  };

  writeStyles = function(message, index, interval) {
    var pre;
    if (index < message.length) {
      pre = document.getElementById("style-text");
      pre.scrollTop = pre.scrollHeight;
      writeStyleChar(message[index++]);
      return setTimeout(function() {
        return writeStyles(message, index, interval);
      }, interval);
    }
  };

  $("body").append(
    '  <style id="style-tag"></style>\n<pre id="style-text"></pre>\n  <div class=\'show\' style="display:none">\n    <div class=\'head\'></div>\n    <div class=\'content\'>\n      <div class=\'center\'>\n        <span class=\'test\'>测试</span>\n      </div>\n      <div class=\'left\'></div>\n      <div class=\'right\'></div>\n    </div>\n    <div class=\'foot\'></div>\n  </div>\n\n  <div class="show1" style="display:none">\n    <div class="head1"></div>\n    <div class="content1">\n      <div class="center1"></div>\n    </div>\n    <div class="left1"></div>\n    <div class="right1"></div>\n    <div class="foot1"></div>\n  </div>'
  );

  time = window.innerWidth <= 578 ? 4 : 16;

  writeStyles(styles, 0, time);

  /*
  Changelog:
  1.0.0: i exist!
  1.0.1: heart instead of circle
  1.0.2: including standard CSS3 transforms and animations
  	was only using `-webkit` to be less verbose (standard transforms dont work in safari)
  	now works in FF
  1.0.3: crossbrowser echo 
  	nested `scale()` styles (scaled in scaled) only worked in chrome
  	moved echo out of heart to fix
  1.0.4: more efficient animations
  	`0%, 100% {}` instead of duplicated keyframes
  1.0.5: overflwo fix
    `overflow: auto` on the `pre`
   */
}.call(this));
