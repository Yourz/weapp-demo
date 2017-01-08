let app = getApp()
Page( {
    data: {
        logs: []
    },
    onLoad: function () {
        let logs = wx.getStorageSync('calclog')
        this.setData({'logs':logs})
    }
})