const globalData = getApp().globalData
let baseLevel

Page({
  data: {
    ans: "",
    meaning: "",
    correct: false,
    wrong: false,
    inputValue: '',
    index: 0
  },
  onLoad: function () {
    this.requestContent(globalData.level)
    baseLevel = globalData.level
    // 请求单词
  },
  onShow: function () {
    if (
      (baseLevel != globalData.level) ||
      (globalData.index[globalData.level].spell != this.data.index)
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
        if (res.data.length === globalData.index[globalData.level].spell) {
          globalData.index[globalData.level].spell = 0
        }
        console.log(globalData.index[globalData.level].spell)
        self.setData({
          ans: res.data[globalData.index[globalData.level].spell]["拼写"],
          meaning: res.data[globalData.index[globalData.level].spell]["释义"],
          index: globalData.index[globalData.level].spell
        })
      }
    })
  },
  showAns: function () {
    if (this.data.inputValue === this.data.ans) {
      this.setData({
        correct: true,
        wrong: false,
      })
    } else {
      this.setData({
        correct: false,
        wrong: true,
      })
    }
  },
  bindKeyInput: function (e) {
    this.setData({
      inputValue: e.detail.value
    })
  },
  newWord: function () {
    globalData.index[globalData.level].spell += 1
    this.requestContent(globalData.level)
    this.setData({
      correct: false,
      wrong: false,
      inputValue: ""
    })
  }
})