
var calculate = (function(){
    return{
        diffTime: diffTime
    };
     function diffTime(startTime,endTime){
        var parsedStartTime = timeStringToFloat(startTime);
        var parsedEndTime   = timeStringToFloat(endTime);
        return (parsedEndTime-parsedStartTime);
    }
    function timeStringToFloat(time) {

        if(time!="" && time!=undefined){
            var hoursMinutes = time.split(/[.:]/);
            var hours = parseInt(hoursMinutes[0], 10);
            var minutes = hoursMinutes[1] ? parseInt(hoursMinutes[1], 10) : 0;
            return hours + minutes / 60;
        }
        return 0;

      }

})();