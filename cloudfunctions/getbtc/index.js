// 云函数入口文件
const cloud = require('wx-server-sdk')
var rp = require('request-promise');
cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
  let url1 = 'http://price.btcfans.com/';
  //let url2 = 'https://www.btcmoney.cc/coin_detail/5.html';
  //let url3 = 'https://www.btcmoney.cc/coin_detail/2.html';
  //console.log(rp(url).then());
  var dollar;
  var rmb;
  var up;
  var high;
  var low
 // var eos;
 // var eth
  await rp(url1)
    .then(function (res) {
      console.log(res)
      var startdo = res.indexOf("1lastPrice")
      var enddo = res.indexOf("<", startdo)
      dollar = res.substr(startdo + 12, enddo - startdo - 12)
      var startrmb = res.indexOf("1lastPriceCNY")
      var endrmb = res.indexOf("<", startrmb)
      rmb = res.substr(startrmb + 15, endrmb - startrmb - 15)
      var startup = res.indexOf("1prate")
      var endup = res.indexOf("<", startup)
      up = res.substr(startup + 8, endup - startup - 8)
      var startup = res.indexOf("1highPrice")
      var endup = res.indexOf("<", startup)
      high = res.substr(startup + 12, endup - startup - 12)
      var startup = res.indexOf("1lowPrice")
      var endup = res.indexOf("<", startup)
      low = res.substr(startup + 11, endup - startup - 11)
    });
  
  return {
    dollar: dollar,
    rmb: rmb,
    up: up,
    high:high,
    low:low
  }

}