// 云函数入口文件
const cloud = require('wx-server-sdk')
var rp = require('request-promise');
cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
  //let url1 = 'http://price.btcfans.com/';
  //let url2 = 'https://www.btcmoney.cc/coin_detail/5.html';
  let url3 = 'http://www.btcmoney.cc/coin_detail/2.html';
  //console.log(rp(url).then());
 
  var eth;
  var upeth;
 
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
    });

  return {
    
    eth: eth,
    upeth: upeth
  }

}