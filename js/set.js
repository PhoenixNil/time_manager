var ipcRenderer = require('electron').ipcRenderer;
function toPage2() {
    worktime = document.getElementById("worktime").innerHTML
    resttime = document.getElementById("resttime").innerHTML
    passcolor = document.getElementById("hrefcolor").innerHTML
    window.location.href = encodeURI("counttime.html?work=" + worktime + "&" + "rest=" + resttime + '&' + "color=" + passcolor);
    ipcRenderer.send('exeDisable', vm.message)
    localStorage.setItem("disableExe", vm.message);
}
function dislike() {
    imgarray = ["img/bg11.jpg", "img/set2.jpg", "img/set3.jpg"]
    document.getElementById("setimg").src = imgarray[i++]
}
var vm = new Vue({
    el: '#app',
    data() {
        return {
            select: { work: '1hour' },
            worktimes: [
                { work: '30minutes' }, { work: '1hour' }, { work: '2hours' }, { work: '3hours' }, { work: '4hours' }, { work: '5hours' }, { work: '24hours' }
            ],
            select2: { rest: '15minutes' },
            resttimes: [
                { rest: '1minute' }, { rest: '3minutes' }, { rest: '10minutes' }, { rest: '15minutes' }, { rest: '30minutes' }, { rest: '45minutes' }, { rest: '1hour' }, { rest: '2hour' }, { rest: '3hour' }, { rest: '5hour' }
            ],
            bottomNav: 5,
            love: 'grey',
            i: Math.floor(Math.random() * 4),
            message: 'XXX.exe',
            imgs: ["img/bg11.jpg", "img/set2.jpg", "img/set3.jpg", "img/set4.jpg"]
        }
    },
    methods: {
        like: function () {
            this.love = 'pink'
        },
        dislike: function () {
            this.i++
            if (this.i > 3) {
                this.i = 0;
            }
            this.love = 'grey'

        }
    },
    computed: {
        color() {
            switch (this.bottomNav) {
                case 0: return 'deep-orange'
                case 1: return 'teal'
                case 2: return 'grey'
                case 3: return '#29B6F6'
                case 4: return '#EEDD82'
                case 5: return 'dark'
                case 6: return 'purple'
            }
        }
    }
})
