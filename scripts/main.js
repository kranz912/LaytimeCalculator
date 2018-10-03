var date="";
SetupDateControls("#div_Laytime_OperationsCompleted_Date", date);

(function () {
    angular.module('app', [])
        .controller('main', mainCtrl);
        
    mainCtrl.$inject = ["$scope"];
    function mainCtrl($scope) {

        $scope.time = [{
            StartTime: {
                hours: '00',
                minutes:'00'
            },
            EndTime:{
                hours: '00',
                minutes: '00'
            }
        }];
        $scope.fields = [{
            date: new Date()
        }];


        $scope.calculate = calculate;
        $scope.total = 0;
        $scope.clock = GenerateTimeDropdown();
        $scope.day = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
        $scope.getTotal = function () {
            var total = 0;
            for (var i = 0; i < $scope.fields.length; i++) {

                total += ($scope.fields[i].time);

            }
            console.log(total);
            if (total > 0) {
                var seconds = total * 60 * 60;
                var days = Math.floor(seconds / (3600 * 24));
                seconds -= days * 3600 * 24;
                var hrs = Math.floor(seconds / 3600);
                seconds -= hrs * 3600;
                var mnts = Math.floor(seconds / 60);
                seconds -= mnts * 60;
                return {
                    days: days,
                    hrs: hrs,
                    mnts: mnts
                };
            }
            return {
                days: 0,
                hrs: 0,
                mnts: 0
            };
        }
        $scope.addfield = function (fields, time) {
            var currentday = fields[fields.length - 1].date
            if (fields[fields.length - 1].EndTime == "00:00") {
                currentday = currentday.addDays(1);
            }
            var field = {
                time: 0,
                date: currentday
            };

            fields.push(field);
            var t = {
                StartTime: {
                    hours: time[time.length-1].EndTime.hours,
                    minutes: time[time.length-1].EndTime.minutes
                },
                EndTime: {
                    hours: '00',
                    minutes: '00'
                }
            }
            time.push(t);
        }


        //helpers
        Date.prototype.addDays = function (days) {
            var date = new Date(this.valueOf());
            date.setDate(date.getDate() + days);
            return date;
        }
        function GenerateTimeDropdown() {
            hours = [];
            minutes = [];
            for (var i = 0; i < 24; i++) {
                if (i < 10) {
                    hours.push("0" + i)
                }
                else {
                    hours.push(i + "");
                }
            }
            for (var i = 0; i < 60; i++) {
                if (i < 10) {
                    minutes.push("0"+i);
                }
                else {
                    minutes.push(i + "");
                }
            }
            return { hours, minutes };
        }

    }
})();
var calculate = (function () {
    return {
        diffTime: diffTime
    };
    function diffTime(startTime, endTime) {
        var parsedStartTime = timeStringToFloat(startTime);
        var parsedEndTime = timeStringToFloat(endTime);
        if (parsedEndTime === 0) {
            return 24 + (parsedEndTime - parsedStartTime);
        }
        else if ((parsedEndTime - parsedStartTime)>0) {
            return (parsedEndTime - parsedStartTime);
        }
        return 0;
    }
    function timeStringToFloat(time) {

        if (time != "" && time != undefined) {
            var hoursMinutes = time.split(/[.:]/);
            var hours = parseInt(hoursMinutes[0], 10);
            var minutes = hoursMinutes[1] ? parseInt(hoursMinutes[1], 10) : 0;
            return hours + minutes / 60;
        }
        return 0;

    }

})();