// 云函数入口文件
const cloud = require('wx-server-sdk')
var rp = require('request-promise');
cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
  let url1 = 'http://price.btcfans.com/';
  let url2 = 'https://www.btcmoney.cc/coin_detail/5.html';
  let url3 = 'https://www.btcmoney.cc/coin_detail/2.html';
  //console.log(rp(url).then());
  var dollar;
  var rmb;
  var up;
  var eos;
  var eth
  await rp(url1)
    .then(function (res) {
      //console.log(res)
      var startdo = res.indexOf("1lastPrice")
      var enddo = res.indexOf("<",startdo)
       dollar = res.substr(startdo + 12,enddo-startdo-12)
      var startrmb = res.indexOf("1lastPriceCNY")
      var endrmb = res.indexOf("<", startrmb)
       rmb = res.substr(startrmb + 15, endrmb - startrmb - 15)
      var startup = res.indexOf("1prate")
      var endup = res.indexOf("<", startup)
       up = res.substr(startup + 8, endup - startup - 8) 
    });
    await rp(url2)
    .then(function (res) {
     // console.log(res)
      var startdo = res.indexOf(">$<")
      var enddo = res.indexOf("<", startdo+4)
      eos = res.substr(startdo + 7, enddo - startdo - 7)
      var startup = res.indexOf("(24H)")
      res = res.substr(0,startup-12)
     // console.log(res)
      var b = res.split("").reverse().join("")
      //console.log(b)
      var endup = b.indexOf(">'")
      var c = b.substr(0,endup)
      upeos = c.split("").reverse().join("")
    });
    await rp(url3)
    .then(function (res) {
      //console.log(res)
      var startdo = res.indexOf(">$<")
      var enddo = res.indexOf("<", startdo + 4)
      eth = res.substr(startdo + 7, enddo - startdo - 7)
      var startup = res.indexOf("(24H)")
      res = res.substr(0, startup - 12)
      // console.log(res)
      var b = res.split("").reverse().join("")
      //console.log(b)
      var endup = b.indexOf(">'")
      var c = b.substr(0, endup)
      upeth = c.split("").reverse().join("")
    })

  return {
    dollar: dollar,
    rmb: rmb,
    up: up,
    eos:eos,
    upeos:upeos,
    eth:eth,
    upeth:upeth
  }
   
}