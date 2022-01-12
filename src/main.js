
!function (e) { var t, n, o, c, i, l = '<svg><symbol id="icon-shanchu" viewBox="0 0 1024 1024"><path d="M720 447l-48 0 0 256c0 35.347-28.656 64-64 64L384 767c-35.347 0-64-28.653-64-64L320 447l-48 0c-8.838 0-16-7.162-16-16l0-32c0-8.835 7.162-16 16-16l112 0 0-64c0-35.347 28.653-64 64-64l96 0c35.347 0 64 28.653 64 64l0 64 112 0c8.835 0 16 7.165 16 16l0 32C736 439.838 728.835 447 720 447zM416 447l-32 0 0 256 32 0L416 447zM480 703l32 0L512 447l-32 0L480 703zM544 335c0-8.838-7.162-16-16-16l-64 0c-8.838 0-16 7.162-16 16l0 48 96 0L544 335zM608 447l-32 0 0 256 32 0L608 447z"  ></path></symbol><symbol id="icon-add" viewBox="0 0 1024 1024"><path d="M876.089 439.182h-291.271v-291.271c0-40.268-32.549-72.818-72.818-72.818s-72.818 32.549-72.818 72.818v291.271h-291.271c-40.268 0-72.818 32.549-72.818 72.818s32.549 72.818 72.818 72.818h291.271v291.271c0 40.268 32.549 72.818 72.818 72.818s72.818-32.549 72.818-72.818v-291.271h291.271c40.268 0 72.818-32.549 72.818-72.818s-32.549-72.818-72.818-72.818z"  ></path></symbol></svg>', d = (d = document.getElementsByTagName("script"))[d.length - 1].getAttribute("data-injectcss"), s = function (e, t) { t.parentNode.insertBefore(e, t) }; if (d && !e.__iconfont__svg__cssinject__) { e.__iconfont__svg__cssinject__ = !0; try { document.write("<style>.svgfont {display: inline-block;width: 1em;height: 1em;fill: currentColor;vertical-align: -0.1em;font-size:16px;}</style>") } catch (e) { console && console.log(e) } } function a() { i || (i = !0, o()) } function r() { try { c.documentElement.doScroll("left") } catch (e) { return void setTimeout(r, 50) } a() } t = function () { var e, t; (t = document.createElement("div")).innerHTML = l, l = null, (e = t.getElementsByTagName("svg")[0]) && (e.setAttribute("aria-hidden", "true"), e.style.position = "absolute", e.style.width = 0, e.style.height = 0, e.style.overflow = "hidden", t = e, (e = document.body).firstChild ? s(t, e.firstChild) : e.appendChild(t)) }, document.addEventListener ? ~["complete", "loaded", "interactive"].indexOf(document.readyState) ? setTimeout(t, 0) : (n = function () { document.removeEventListener("DOMContentLoaded", n, !1), t() }, document.addEventListener("DOMContentLoaded", n, !1)) : document.attachEvent && (o = t, c = e.document, i = !1, r(), c.onreadystatechange = function () { "complete" == c.readyState && (c.onreadystatechange = null, a()) }) }(window);

const $siteList = $(".siteList")
const $lastLi = $siteList.find(".last")

let hashMap
const value = localStorage.getItem("x")
if (value) {
    hashMap = JSON.parse(value)
} else {
    hashMap = [
        { logo: "M", url: "https://developer.mozilla.org/zh-CN/" },
        { logo: "J", url: "http://js.jirengu.com/" },
        { logo: "G", url: "https://github.com/" },
        { logo: "F", url: "https://www.figma.com/" }
    ]
}
const simplifyUrl = (url) => {
    return url.replace("https://", "")
        .replace("http://", "")
        .replace("www.", "")
        .replace(/\/.*/, "")
}
const rander = () => {
    $siteList.find('li:not(.last)').remove()
    hashMap.forEach((node, index) => {
        const $li = $(`<li>
        <div class="site">
            <div class="logo">${node.logo}</div>
            <div class="link">${simplifyUrl(node.url)}</div>
            <div class = "removeSite">
             <svg class="icon">
                <use xlink:href="#icon-shanchu"></use>
             </svg>
            </div>
        </div>
    </li>`).insertBefore($lastLi)
        $li.on("click", () => {
            window.open(node.url)
        })
        $li.on("click", ".removeSite", (e) => {
            e.stopPropagation()
            hashMap.splice(index, 1)
            rander()
        })
    })
}
rander()

$(".addButton").on("click", () => {
    let url = window.prompt("请问您需要添加的网址是什么？")
    if (url.indexOf("https") != 0) {
        url = "https://" + url
        hashMap.push({
            logo: simplifyUrl(url)[0], url: url
        })
    };
    rander()
})
window.onbeforeunload = () => {
    console.log("页面要关闭了")
    const string = JSON.stringify(hashMap)
    localStorage.setItem('x', string)
}


