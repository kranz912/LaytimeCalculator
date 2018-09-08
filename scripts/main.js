
Date.prototype.toDateInputValue = (function() {
    var local = new Date(this);
    local.setMinutes(this.getMinutes() - this.getTimezoneOffset());
    return local.toJSON().slice(0,10);
});


Date.prototype.addDays = function(days) {
    var date = new Date(this.valueOf());
    date.setDate(date.getDate() + days);
    return date;
}

  $(document).ready(function(){
        $('.clockpicker').clockpicker(
            {
                donetext: 'Done'
            }
        );
  });


//angular
(function(){
    angular.module('app',[])
        .controller('main',mainCtrl);
    
    mainCtrl.$inject =["$scope"];
    function mainCtrl($scope){
        $scope.fields = [{
            date: new Date()
        }];
        $scope.calculate = calculate;
        $scope.total =0
        $scope.day=["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
        $scope.getTotal= function(){
            var total= 0;
            for(var i= 0; i<$scope.fields.length;i++){
                
                total+=($scope.fields[i].time);
            
            }
            console.log(total);
            if(total>0){
                var seconds= total*60*60;
                var days= Math.floor(seconds /(3600*24));
                seconds  -= days*3600*24;
                var hrs   = Math.floor(seconds / 3600);
                seconds  -= hrs*3600;
                var mnts = Math.floor(seconds / 60);
                seconds  -= mnts*60;
                return{
                    days:days,
                    hrs:hrs,
                    mnts:mnts
                };
            }
            return{
                days:0,
                hrs:0,
                mnts:0
            };


        }
    
    }
})();