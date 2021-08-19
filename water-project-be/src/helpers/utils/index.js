const getBodyData=(ctx)=>{
  return ctx.request.body || {};
}
const tsPadStart = (str)=>{
  str = String(str)
  return str.padStart(2,'0')
}

const formatDate = (ts)=>{
  const date = new Date(Number(ts));
 
  const YYYY = tsPadStart(date.getFullYear());
  const MM = tsPadStart(date.getMonth() + 1)
  const DD = tsPadStart(date.getDate())


  const hh = tsPadStart(date.getHours())
  const mm =tsPadStart( date.getMinutes())
  const ss = tsPadStart(date.getSeconds())

  return `${YYYY}-${MM}-${DD} ${hh}:${mm}:${ss}`
}
 const formatTimeStamp = (ts) => {
  const date = new Date(Number(ts));

  const YYYY = date.getFullYear();
  const MM = date.getMonth() + 1
  const DD = date.getDate()


  const hh = date.getHours()
  const mm = date.getMinutes()
  const ss = date.getSeconds()

  //return `${YYYY}/${MM}/${DD} ${hh}:${mm}:${ss}`

  return {
      year: YYYY,
      md:`${MM}/${DD}`,
      hour:hh,
      min:mm,
      second:ss
  }
}

function getEleNums(data) {
  var map = {}
  let res= [];
  for (i = 0; i < data.length; i++) {
      var key = data[i]
      if (map[key]) {
          map[key] += 1
      } else {
          map[key] = 1
      }
  }   

      for(let i=0;i<=23;i++){
        if(Object.keys(map).includes(i+'',0)){
          res.push(map[i])
        }else{
          
          res.push(0)
        }
      }
     
    

  

 
  return res
 }

 function getMonthElems(data,thirtyDays){
  var map = {}
  let res= [];
  for (i = 0; i < data.length; i++) {
      var key = data[i]
      if (map[key]) {
          map[key] += 1
      } else {
          map[key] = 1
      }
  }
 //console.log(Object.entries(map))
  thirtyDays.map((item,index)=>{
    let idx = Object.keys(map).indexOf(item);
     if(idx!==-1){
    
       res.push(Object.values(map)[idx])
     }else{
      res.push(0)
     }
  })
  //console.log(res)
  return res;

 }
 function getThrityDays(){
  var startDate = new Date();
  var endDate = new Date();
  endDate.setDate(startDate.getDate() - 30);
  var dataArr = [];
  var weeks = ['日', '一', '二', '三', '四', '五', '六'];
  while((startDate.getTime() - endDate.getTime()) >= 0) {
      var month = (endDate.getMonth() + 1);
      var day =endDate.getDate();
      var week = weeks[endDate.getDay()];
      dataArr.push(month + "/" + day);
      endDate.setDate(endDate.getDate() + 1);

  }

  return dataArr;
  // dataArr[0] = '今天' + dataArr[0].slice(6, 10);
  // dataArr[1] = '明天' + dataArr[1].slice(6, 10);
  // dataArr[2] = '后天' + dataArr[2].slice(6, 10);
 // console.log(dataArr);
 }
module.exports = {
  getBodyData, 
  formatTimeStamp,
  getEleNums,
  getThrityDays,
  getMonthElems,
  formatDate
  
    
}