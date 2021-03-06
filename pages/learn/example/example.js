const audioContext = wx.createInnerAudioContext()
const globalData = getApp().globalData

Page({
  data: {
    word: "",
    meaning: "",
    example: ""
  },
  onLoad: function (opt) {
    this.setData({ 
      word: decodeURIComponent(opt.word),
      meaning: decodeURIComponent(opt.meaning),
      example: decodeURIComponent(opt.example)
    })
  },
  playSound: function () {
    // console.log(this.data)
    audioContext.src = "http://fanyi.baidu.com/gettts?lan=pt&text=" + encodeURIComponent(this.data.word) + "&source=web"
    audioContext.play()
  },
  goInfo: function () {
    wx.redirectTo({
      url: "../info/info?word="
      + encodeURIComponent(this.data.word)
      + "&meaning="
      + encodeURIComponent(this.data.meaning)
      + "&example="
      + encodeURIComponent(this.data.example)
    })
  },
  newWord: function () {
    globalData.index[globalData.level].learn += 1
    wx.switchTab({
      url: "../../learn/learn"
    })
  }
})