var ipcRenderer = require('electron').ipcRenderer;
songlist2 = ['IV. Molto allegro (第四乐章 很快的快板) - Berliner Philharmoniker&Herbert von Karajan&Wolfgang Amadeus Mozart.mp3', '尘世城.mp3', 'Clair De Lune.mp3', 'Flaming.mp3']
vm = new Vue({
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
                { title: 'IV. Molto allegro (第四乐章 很快的快板)' },
                { title: '尘世城' },
                { title: 'Clair de lune' },
                { title: 'flaming' }
            ],
            singers: ["Mozart", "LA TALE", "Claude Debussy", "郑成河"],
            dialog2: false
        }
    }, methods: {
        choose: function (index) {
            if (index == 0)
                document.getElementById("music").src = "IV. Molto allegro (第四乐章 很快的快板) - Berliner Philharmoniker&Herbert von Karajan&Wolfgang Amadeus Mozart.mp3"
            else
                document.getElementById("music").src = songlist2[index % 4]
            document.getElementById("song").innerHTML = vm.items[index % 4].title
            document.getElementById("singer").innerHTML = vm.singers[index]
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
    if (m == 0 && s == 1) {   //当时间为0分1秒时，暂停
        m = 0
        s = 0
        ipcRenderer.send("achieve")
        clearInterval(settime)
    }
}
// clearInterval(settime);
function stopCount() {
    clearInterval(settime);
    m = 0
    s = 0
    // showtime();
    document.getElementById('demo').innerHTML = 0 + "分" + 0 + "秒";


}
function backSetURL() {
    ipcRenderer.send('BackSet');

}
function NextSong() {
    songlist = ["尘世城.mp3", "Clair De Lune.mp3", "Flaming.mp3"]
    song = ["IV. Molto allegro (很快的快板)", "尘世城", "Clair de lune", "flaming"]
    singers = ["Mozart", "LA TALE", "Claude Debussy", "郑成河"]
    document.getElementById("music").src = songlist2[i++ % 4]
    document.getElementById("song").innerHTML = song[j++ % 4]
    document.getElementById("singer").innerHTML = singers[y++ % 4]

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