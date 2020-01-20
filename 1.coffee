styles = """
/* 
 * 实验
 * 版本 1.0
 * --------
 */


body {
  background-color: #1a1c24; color: #fff;
  font-size: 13px; line-height: 1.4;
  -webkit-font-smoothing: subpixel-antialiased;
}

pre { 
  position: fixed; width: 48%;
  top: 30px; bottom: 30px; left: 26%;
  transition: left 50ms;
  overflow: auto;
  background-color: #313744; color: #a6c3d4;
  border: 1px solid rgba(0,0,0,0.2);
  padding: 24px 12px;
  box-sizing: border-box;
  border-radius: 3px;
  box-shadow: 0px 4px 0px 2px rgba(0,0,0,0.1);
}


/* 
 * Syntax highlighting 
 * Colors based on Base16 Ocean Dark
 */

pre em:not(.comment) { font-style: normal; }

.comment       { color: #707e84; }
.selector      { color: #c66c75; }
.selector .key { color: #c66c75; }
.key           { color: #c7ccd4; }
.value         { color: #d5927b; }


/* 
 * Let's build my little pen heart.
 */ 


/* First, we'll move this s*** over */

pre { left: 50%; }

pre { left: 0%; }

.show{
  width:50%;
  right:0%;
  position: fixed;
  border: dashed;
  display:block !important;
}


/*
圣杯布局
*/
.head {
  width: 100%;
  height: 30px;
  background: red;
}

.content {
  padding: 0 100px;
  
}

.foot {
  width: 100%;
  height: 30px;
  background: red;
  clear: both;
}

.center {
  width: 100%;
  float: left;
  background: green;   
  min-height: 500px;
}

.left {
  position: relative;
  width: 100px;
  float: left;
  right: 100px;
  margin-left: -100%;
  background: yellow;
  min-height: 500px;
}

.right {
  width: 100px;
  float: left;
  margin-right: -100px;
  background: pink;
  min-height: 500px;
}

/* 水平居中 */
.center{
  text-align: center;
}

/* 垂直居中 */
.center{
  line-height: 500px;
}

/* 隐 藏 */
.show{ 
  display:none !important;
}


/* 双飞翼 */
.show1{
  display:block !important;
  width:50%;
  right:0%;
  position: fixed;
  border: dashed;
}

.head1 {
  height:30px;
  width:100%;
  background-color:red;
}

.foot1{
  height:30px;
  width:100%;
  background-color:red;
  clear: both;
}

.content1{
  float: left;
  width:100%;
}

.center1{
  min-height:500px;
  background: green;    
  margin: 0 100px;
}

.left1{
  width: 100px;
  float: left;
  margin-left: -100%;
  background: yellow;
  min-height: 500px;
}

.right1{
  width: 100px;
  float: left;
  margin-left: -100px;
  background: pink;
  min-height: 500px;
}


/* 隐 藏 */
.show1{ 
  display:none !important;
}

"""

openComment = false

writeStyleChar = (which) ->
	# begin wrapping open comments
  if which == '/' && openComment == false
    openComment = true
    styles = $('#style-text').html() + which
  else if which == '/' && openComment == true
    openComment = false
    styles = $('#style-text').html().replace(/(\/[^\/]*\*)$/, '<em class="comment">$1/</em>')
  # wrap style declaration
  else if which == ':'
    styles = $('#style-text').html().replace(/([a-zA-Z- ^\n]*)$/, '<em class="key">$1</em>:')
  # wrap style value 
  else if which == ';'
    styles = $('#style-text').html().replace(/([^:]*)$/, '<em class="value">$1</em>;')
  # wrap selector
  else if which == '{'
    styles = $('#style-text').html().replace(/(.*)$/, '<em class="selector">$1</em>{')
  else
    styles = $('#style-text').html() + which
  $('#style-text').html styles
  $('#style-tag').append which

writeStyles = (message, index, interval) ->
  if index < message.length
    pre = document.getElementById 'style-text'
    pre.scrollTop = pre.scrollHeight # 跟随光标下拉
    writeStyleChar message[index++]
    setTimeout (->
      writeStyles message, index, interval
    ), interval
    

# appending the tags I'll need.
$('body').append """
  <style id="style-tag"></style>
	<pre id="style-text"></pre>
  <div class='show' style="display:none">
    <div class='head'></div>
    <div class='content'>
      <div class='center'>
        <span class='test'>测试</span>
      </div>
      <div class='left'></div>
      <div class='right'></div>
    </div>
    <div class='foot'></div>
  </div>

  <div class="show1" style="display:none">
    <div class="head1"></div>
    <div class="content1">
      <div class="center1"></div>
    </div>
    <div class="left1"></div>
    <div class="right1"></div>
    <div class="foot1"></div>
  </div>
"""

# faster typing in small iframe on codepen homepage
time = if window.innerWidth <= 578 then 4 else 16
  
# starting it off
writeStyles(styles, 0, time)

###
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
###
