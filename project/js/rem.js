//字体适配
var deviceWidth
setHtmlFontSize()

if (window.addEventListener) {
  window.addEventListener('resize', function () {
      setHtmlFontSize()
  }, false)
}
function setHtmlFontSize () {
  // 1366是设计稿的宽度，当大于1366时采用1366宽度，比例也是除以13.66
    deviceWidth = document.documentElement.clientWidth > 1366 ? document.documentElement.clientWidth:1366
    document.getElementsByTagName('html')[0].style.cssText = 'font-size:' + deviceWidth / 120 + 'px !important'
}