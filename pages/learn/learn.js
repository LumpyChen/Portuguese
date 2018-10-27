const audioContext = wx.createInnerAudioContext()
const globalData = getApp().globalData
let baseLevel

Page({
  data: {
    wordContent: {},
    index: 0,
  },
  onLoad: function () {
    this.requestContent(globalData.level)
    baseLevel = globalData.level
    // 请求单词
  },
  onShow: function () {
    if (
      (baseLevel != globalData.level) || 
      (globalData.index[globalData.level].learn != this.data.index)
    ) {
      this.requestContent(globalData.level)
      baseLevel = globalData.level
      // 如果切换难度或单词则需要再次请求
    }
  },
  requestContent: function (level) {
    let self = this
    wx.request({
      url: globalData.baseUrl + '/level' + level + '.json',
      method: 'GET',
      success: function (res) {
        console.log(res.data)
        if (res.data.length === globalData.index[globalData.level].learn) {
          globalData.index[globalData.level].learn = 0
        }
        console.log(globalData.index[globalData.level].learn)
        self.setData({
          wordContent: res.data[globalData.index[globalData.level].learn],
          index: globalData.index[globalData.level].learn
        })
      }
    })
  },
  playSound: function () {
    console.log(this.data.wordContent)
    audioContext.src = "http://fanyi.baidu.com/gettts?lan=pt&text=" + encodeURIComponent(this.data.wordContent["拼写"]) + "&source=web"
    audioContext.play()
  },
  goExample: function () {
    wx.redirectTo({
      url: "./example/example?word="
      + encodeURIComponent(this.data.wordContent["拼写"])
      + "&meaning="
      + encodeURIComponent(this.data.wordContent["释义"])
      + "&example="
      + encodeURIComponent(this.data.wordContent["例句"])
    })
  },
  newWord: function () {
    globalData.index[globalData.level].learn += 1
    this.requestContent(globalData.level)
  }
})