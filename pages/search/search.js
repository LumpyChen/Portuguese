const globalData = getApp().globalData

Page({
  data: {
    searchWord: '',
    empty: false,
    showAns: false,
    resWord: '',
    resTrans: '',
    resExam: '',
  },
  onReady: function () {
    // 使用 wx.createAudioContext 获取 audio 上下文 context
    this.audioCtx = wx.createAudioContext('speak')
  },
  playSound: function () {
    this.audioCtx.play()
  },
  requestContent: function (searchContent) {
    let self = this
    wx.request({
      url: globalData.baseUrl + '/level1.json',
      method: 'GET',
      success: function (res) {
        console.log(res.data)
        let getAns = false
        for(let i = 0; i < res.data.length; i++) {
          if (res.data[i]["拼写"] === searchContent) {
            getAns = true
            self.setData({
              resWord: res.data[i]["拼写"],
              resTrans: res.data[i]["释义"],
              resExam: res.data[i]["例句"],
              showAns: true,
              empty: false,
            })
            break
          }
        }
        if (getAns === false) {
          wx.request({
            url: globalData.baseUrl + '/level2.json',
            method: 'GET',
            success: function (res2) {
              for (let i = 0; i < res2.data.length; i++) {
                if (res2.data[i]["拼写"] === searchContent) {
                  getAns = true
                  self.setData({
                    resWord: res2.data[i]["拼写"],
                    resTrans: res2.data[i]["释义"],
                    resExam: res2.data[i]["例句"],
                    showAns: true,
                    empty: false,
                  })
                  break
                }
              }
              if (getAns === false) {
                self.setData({
                  showAns: false,
                  empty: true,
                })
              }
            }
          })
        }
      }
    })
  },
  bindSearch: function () {
    this.requestContent(this.data.searchWord)
  },
  bindKeyInput: function (e) {
    this.setData({
      searchWord: e.detail.value
    })
  }
})