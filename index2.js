var ipcRenderer = require('electron').ipcRenderer;
new Vue({
    el: '#app',
    data() {
        return {
            imgs: [
                {
                    src: '1.jpg'
                },
                {
                    src: '2.jpg'
                },
                {
                    src: '3.jpg'
                },
                {
                    src: '4.jpg'
                },
                {
                    src: '5.jpg'
                },
                {
                    src: '6.jpg'
                },

            ],
            items: [
                { title: 'Menuet D major' },
                { title: '尘世城' },
                { title: 'Clair de lune' },
                { title: 'flaming' }
            ],
        }
    }, computed: {
        color() {
            return (decodeURI(document.URL).split('&')[2]).split('=')[1];
        }
    }
})
Vue.use(Vuetify, {
    iconfont: 'fa',
})
document.getElementById('ban').innerHTML = localStorage.getItem("disableExe")
var thisURL = decodeURI(document.URL); // 获取当前页面的 url, 用decodeURI() 解码
time = thisURL.split('?')[1];
work = time.split('&')[0]
work = work.split('=')[1]
work = parseInt(work)
if (work < 30)
    work = work * 60
rest = parseInt(thisURL.split('&')[1].replace(/[^0-9]/ig, ""))
var m = work
var s = 0
var K = rest
var i = 0
var j = 0
var y = 0
var z = 0
var flag = 0;
var settime = setInterval(function () {
    showtime();
}, 1000);
function showtime() {
    document.getElementById('demo').innerHTML = m + "分" + s + "秒";
    if (s == 0 && m != 0) {
        m = m - 1;
        s = 59
    }
    else
        if (m != 0)
            s = s - 1;
    if (m == 0) {
    }

    if (m == 0 && s >= 0) {   //当时间为0分1秒时，暂停
        m = 0
        s = 0
        if (flag == 0) {
            ipcRenderer.send("achieve")
            flag = 1
        }
        clearTimeout(t);
    }
}
// clearInterval(settime);

function stopCount() {
    m = 0
    s = 0
    clearTimeout(t);
    showtime();
}
function startCount() {
    m = work
    s = 0
    showtime()
}
function backSetURL() {
    ipcRenderer.send('BackSet');

}
function NextSong() {
    songlist = ["尘世城.mp3", "Clair De Lune.mp3", "Flaming.mp3"]
    song = ["尘世城", "Clair de lune", "flaming"]
    singers = ["LA TALE", "Claude Debussy", "郑成河"]
    document.getElementById("music").src = songlist[i++ % 3]
    document.getElementById("song").innerHTML = song[j++ % 3]
    document.getElementById("singer").innerHTML = singers[y++ % 3]

}
document.getElementById('rest').innerHTML = "休息时间" + K + "分钟"
const shell = require('electron').shell

const exLinksBtn = document.getElementById('issue')
const exLinksBtn2 = document.getElementById('about')

exLinksBtn.addEventListener('click', function (event) {
    shell.openExternal('https://github.com/PhoenixNil/simple-time-tooler/issues')
})
exLinksBtn2.addEventListener('click', function (event) {
    shell.openExternal('https://www.glasstower.top/')
})