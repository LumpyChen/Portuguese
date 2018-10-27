const app = getApp()

Page({
  data: {
    userInfo: {},
    hideModal: true,
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  //事件处理函数
  onLoad: function () {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        if (res.userInfo) {
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        } else {
          this.setData({
            userInfo: {},
            hasUserInfo: false
          })
        }
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: this.userInfo,
            hasUserInfo: true
          })
        },
        fail: () => {
          app.globalData.userInfo = {
            avatarUrl: '',
            nickname: ''
          }
          this.setData({
            userInfo: {
              avatarUrl: '',
              nickname: ''
            },
            hasUserInfo: true
          })
        }
      })
    }
  },
  getUserInfo: function (e) {
    if (e && e.detail && e.detail.userInfo) {
      app.globalData.userInfo = e.detail.userInfo
      this.setData({
        userInfo: e.detail.userInfo,
        hasUserInfo: true
      })
    } else {
      app.globalData.userInfo = {}
      this.setData({
        userInfo: {},
        hasUserInfo: false
      })
    }
  },
  contactService: function () {
    wx.makePhoneCall({
      phoneNumber: '18515065296'
    })
  },
  adjLevel: function () {
    wx.showActionSheet({
      itemList: ['初级', '高级'],
      success: function (res) {
        if (res.tapIndex === 0) {
          app.globalData.level = 1
        } else {
          app.globalData.level = 2
        }
      }
    })
  },
  // addWord: function () {
  //   this.setData({
  //     userInfo: {},
  //     hasUserInfo: false
  //   })
  // },
  aboutUsTap: function () {
    wx.navigateTo({
      url: "./aboutus/aboutus"
    })
  },
  cleanStorage: function () {
    wx.showModal({
      title: '提示',
      content: '您确定要清除缓存吗？',
      success: (res) => {
        if (res.confirm) {
          wx.clearStorageSync();
          wx.hideLoading()
          this.setData({
            userInfo: {},
            hasUserInfo: false
          })
        } else if (res.cancel) {
          
        }
      }
    })
  }
})
