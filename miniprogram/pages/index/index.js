//index.js
const app = getApp()

Page({
  data: {
    dollar: '',
    rmb: '',
    up:'',
    eth:'',
    eos:'',
    upeth:'',
    upeos:'',
    high:'',
    low:''
  },
  onPullDownRefresh: function () {
    wx.showNavigationBarLoading()
    this.onLoad()
    setTimeout(() => {
      wx.hideNavigationBarLoading()
      wx.stopPullDownRefresh()
    }, 2000);
  },
  onLoad: function() {
    // 调用云函数
    wx.cloud.callFunction({
      name: 'getbtc',
      data: {},
      success: res => {
     //   console.log('[云函数] [login] user openid: ', res.result.openid)
        this.setData({
          dollar: res.result.dollar,
          rmb: res.result.rmb,
          up:res.result.up,
          high:res.result.high,
          low:res.result.low
        })
      },
      fail: err => {
        console.error('网络不好，多刷几次', err)

      }
    });
    wx.cloud.callFunction({
      name: 'geteth',
      data: {},
      success: res => {
        //   console.log('[云函数] [login] user openid: ', res.result.openid)
        this.setData({
          eth: res.result.eth,
          upeth: res.result.upeth
        })
      },
      fail: err => {
        console.error('网络不好，多刷几次', err)

      }
    });
    wx.cloud.callFunction({
      name: 'geteos',
      data: {},
      success: res => {
        //   console.log('[云函数] [login] user openid: ', res.result.openid)
        this.setData({
          eos: res.result.eos,
          upeos: res.result.upeos,
        })
      },
      fail: err => {
        console.error('网络不好，多刷几次', err)

      }
    })

  }
})
