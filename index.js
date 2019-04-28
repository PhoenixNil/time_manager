var ipcRenderer = require('electron').ipcRenderer;
var vm = new Vue({
    el: '#app',
    data() {
        return {
            i: Math.floor(Math.random() * 6),
            imgs: ["bg1.jpg", "bg2.jpg", "bg3.jpg", "bg5.jpg", "bg6.jpg", "bg7.jpg"],
            agreement: false,
            dialog: false,
            dialog2: false,
            email: undefined,
            form: false,
            isLoading: false,
            password: undefined,
            show1: false,
            custom: true,
            alert: true,
            dialog3: false,
            dialog4: false,
            alert: false,
            snackbar: false,
            fade: true,
            timeout: 6000,
            static: false,
            rules: {
                email: v => (v || '').match(/@/) || '请输入有效的邮箱',
                length: len => v => (v || '').length >= len || `无效的字符长度, 至少需要${len}位`,
                required: v => !!v || 'This field is required'
            }
        }
    },
    computed: {
        progress() {
            return Math.min(100, this.value.length * 10)
        },
        color() {
            return ['error', 'warning', 'success'][Math.floor(this.progress / 40)]
        }
    },
    methods: {
        submit: function () {       //账号创建
            ipcRenderer.send('create', this.email, this.password);
        },
        land: function () {
            ipcRenderer.send('find', this.email, this.password);
            ipcRenderer.on('fail', function () {
                vm.dialog3 = true;
            })
            ipcRenderer.on('success', (event, arg) => {
                alert("登陆成功")
                vm.dialog2 = false;
                document.getElementById("EleId").style.visibility = "visible";
                document.getElementById("successcnt").innerHTML = arg
                vm.fade = false;
                if (alart("登陆成功")) {

                    return;
                }
            })
        }
    }
})
document.getElementById("EleId").style.visibility = "hidden";
var randombgs = [];
randombgs[0] = "bg1.jpg"
randombgs[1] = "bg2.jpg"
randombgs[2] = "bg3.jpg"
randombgs[3] = "bg5.jpg"
randombgs[4] = "bg6.jpg"
randombgs[5] = "bg7.jpg"
var randomBgIndex = Math.round(Math.random() * 5);
document.write('<style>body{background-image:url(' + randombgs[randomBgIndex] + ')}</style>');
//关闭窗口
document.getElementById('closebt').addEventListener('click', () => {
    ipcRenderer.send('window-all-closed');
});
//最小化
document.getElementById('minbt').addEventListener('click', () => {
    ipcRenderer.send('hide-window');
});
//向主进程发送
document.getElementById('mainbt').addEventListener('click', () => {
    ipcRenderer.send('two-show');
});
document.getElementById('Create').addEventListener('click', () => {
    ipcRenderer.on('error', function () {
        alert("账号已注册")
        if (alart("账号已注册")) {

            return;
        }
    })
    ipcRenderer.on('OK', function () {
        alert("注册成功");
        if (alart("注册成功")) {
            return;
        }
    })
})
