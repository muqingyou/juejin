/**
 * ctime时间换算
 * @param {*} ctime 秒时间
 */
 export function getDuration(ctime) {
     if(!ctime){
         return ""
     }
    // 发布时间Date实例化
    var startTime = new Date(ctime*1000);
    //当前时间
    let endTime = new Date()
    //计算相差月份
    var dateToMonth = 0
    var startDate=startTime.getDate() + startTime.getHours()/24 + startTime.getMinutes()/24/60;
    var endDate=endTime.getDate()  +endTime.getHours()/24 + endTime.getMinutes()/24/60;
    if(endDate >= startDate){
        dateToMonth = 0
    }else{
        dateToMonth = -1
    }
    let yearToMonth = (endTime.getYear() - startTime.getYear()) * 12
    let monthToMonth = endTime.getMonth() - startTime.getMonth()
    let monthDuration = yearToMonth + monthToMonth + dateToMonth
    var duration = monthDuration + "月前";
    if(monthDuration>=12){
        duration = Math.floor(monthDuration/12) + "年前"
    }else if(monthDuration===0){
        //计算日、时、分
        var now = parseInt(new Date().getTime()/1000);
        var durationSeconds = now - ctime;
        var days = Math.floor(durationSeconds / 86400);
        duration = days + "天前"
        if(days===0){
            var hours = Math.floor((durationSeconds % 86400) / 3600);
            duration = hours + "小时前";
            if(hours===0){
                var minutes = Math.floor(((durationSeconds % 86400) % 3600) / 60);
                duration = minutes + "分前"
                if(minutes===0){
                    var seconds = Math.floor(((durationSeconds % 86400) % 3600) % 60);
                    duration = seconds + "秒前"
                } 
            }
        }

    }  
    return duration;
  }