//location.js
var app = getApp()
Page( {
    data: {
        location: {
            longitude: 0,
            latitude: 0
        },
        markers : []
    },
    onLoad: function () {
        let that = this
        wx.getLocation({
          type: 'wgs84', // 默认为 wgs84 返回 gps 坐标，gcj02 返回可用于 wx.openLocation 的坐标
          success: function(res){
            // success
            let latitude = res.latitude
            let longitude = res.longitude
            let speed = res.speed
            let accuracy = res.accuracy
            let location = {
                longitude: longitude,
                latitude: latitude
            }
            let markers = [{
                latitude: latitude,
                longitude: longitude,
                name: '地图定位',
                desc: '我现在的位置'
            }]
            that.setData(markers)
            that.setData(location)
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