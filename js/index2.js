var ipcRenderer = require('electron').ipcRenderer;
vm = new Vue({
    el: '#app',
    data() {
        return {
            imgs: [
                {
                    src: 'img/1.jpg'
                },
                {
                    src: 'img/2.jpg'
                },
                {
                    src: 'img/3.jpg'
                },
                {
                    src: 'img/4.jpg'
                },
                {
                    src: 'img/5.jpg'
                },
                {
                    src: 'img/6.jpg'
                },

            ],
            items: [
                { title: 'Menuet D major' },
                { title: '尘世城' },
                { title: 'Clair de lune' },
                { title: 'flaming' }
            ],
            singers: ["Mozart", "LA TALE", "Claude Debussy", "郑成河"],
            dialog2: false,
            dialog: false
        }
    }, methods: {
        choose: function (index) {
            document.getElementById("song").innerHTML = vm.items[index].title
            document.getElementById("singer").innerHTML = vm.singers[index]
            document.getElementById("music").src = songlist1[index]

        }
    },
    computed: {
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
songlist1 = ["audio/Menuet D Major.mp3", "audio/尘世城.mp3", "audio/Clair De Lune.mp3", "audio/Flaming.mp3"]
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
        s = s - 1;
    if (m == 0 && s == -1) {   //当时间为0分1秒时，暂停
        m = 0
        s = 0
        if (flag == 0)
            ipcRenderer.send("achieve")
        clearTimeout(settime)
    }
}
// clearInterval(settime);
function stopCount() {
    clearInterval(settime);
    m = 0
    s = 0
    flag = 1;
    // showtime();
    document.getElementById('demo').innerHTML = 0 + "分" + 0 + "秒";


}
function backSetURL() {
    ipcRenderer.send('BackSet');

}
function NextSong() {
    songlist = ["audio/尘世城.mp3", "audio/Clair De Lune.mp3", "audio/Flaming.mp3"]
    song = ["尘世城", "Clair de lune", "flaming"]
    singers = ["LA TALE", "Claude Debussy", "郑成河"]
    document.getElementById("music").src = songlist[i++ % 3]
    document.getElementById("song").innerHTML = song[j++ % 3]
    document.getElementById("singer").innerHTML = singers[y++ % 3]

}
document.getElementById('rest').innerHTML = "休息时间:" + K + "分钟"
const shell = require('electron').shell

const exLinksBtn = document.getElementById('issue')
const exLinksBtn2 = document.getElementById('about')

exLinksBtn.addEventListener('click', function (event) {
    shell.openExternal('https://github.com/PhoenixNil/time_manager/issues')
})
exLinksBtn2.addEventListener('click', function (event) {
    shell.openExternal('https://www.glasstower.top/')
})