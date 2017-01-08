//calc.js
var app = getApp()
Page ( {
    data: {
        screenData: "0",
        is_calculated : false,
    },
    clickBtn: function (event) {
        let logs = wx.getStorageSync('calclog')
        let id = event.target.id
        let data = this.data
        let is_calculated = data.is_calculated
        let screenData = (is_calculated && id !=='=')?"":((data.screenData === "0")?"":data.screenData)
        is_calculated = (id === '=')?is_calculated:false
        if (id === 'b') {
            screenData = screenData.substring(0,screenData.length-1)
            screenData = (screenData === '')?"0":screenData
        } else if (id === 'c') {
            screenData = "0"
        } else if (id === '=') {
            let len = screenData.length
            let lastWord = screenData[len-1]
            if (!isNaN(lastWord)) {
                let log = screenData
                let st = 0, num = [], opt = [], nlen = 0, olen = 0
                for (let i=0;i<len;i++) {
                    if (isNaN(screenData[i])&&(screenData[i]!=='.')) {
                        let tmp = screenData
                        num[nlen] = parseFloat(screenData.substring(st,i))
                        num[nlen] = (num[nlen])?num[nlen]:0
                        screenData = tmp
                        opt[olen] = screenData[i]
                        nlen++
                        olen++
                        st = i+1
                    }
                }
                num[nlen] = parseFloat(screenData.substring(st,len))
                nlen++
                let ans = num[0]
                for (let i=0;i<olen;i++) {
                    let operator = opt[i]
                    if (operator === '+') {
                        ans += num[i+1]
                    } else if (operator === '-') {
                        ans -= num[i+1]
                    } else if (operator === '×') {
                        ans *= num[i+1]
                    } else if (operator === '÷') {
                        if (num[i+1] !== 0) {
                            ans /= num[i+1]
                        }
                    }
                }
                let anstr = ans.toString()
                let dotpos = anstr.indexOf('.')
                if (anstr.length - dotpos > 8) {
                    ans = ans.toFixed(9)
                }
                screenData = ans
                log = log + ' = ' + ans
                logs.push(log)
                is_calculated = true
            }
        } else {
            screenData += id
        }
        wx.setStorageSync('calclog', logs)
        this.setData({"screenData":screenData,"is_calculated":is_calculated})
    },
    history: function () {
        wx.navigateTo({
          url: '../history/history',
          success: function(res){
            // success
          },
          fail: function() {
            // fail
          },
          complete: function() {
            // complete
          }
        })
    }
})