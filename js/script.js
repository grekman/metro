$(document).ready(function () {

    $.getJSON('json/metro.json', function (data) {

        //compose select list
        $.each(data, function (key, value) {
            var temp = "<option value='" + value.name + "'>" + value.name + "</option>";
            $('#start').append(temp);
            $('#finish').append(temp);
        });

        var startId;
        var finishId;
        var startBranch;
        var finishBranch;
        var trans1;
        var trans2;


        $('#btn').on('click', function () {

            var startingPoint = $('#start').val();
            var finishingPoint = $('#finish').val();


            //get starting and finishing branches id
            $.each(data, function (key, value) {
                if (startingPoint == value.name) {
                    startId = parseInt(key, 10);
                    startBranch = parseInt(data[key]['branch'], 10);
                }
                if (finishingPoint == value.name) {
                    finishId = parseInt(key, 10);
                    finishBranch = parseInt(data[key]['branch'], 10);
                }
            });


            if (startBranch === finishBranch) {
                $('#out').text(stationNamesArray(startId, finishId));
            } else {
                //get transfer station id
                $.each(data, function (key, value) {
                    if (data[key]['transfer'] == finishBranch && data[key]['branch'] == startBranch ) {
                        trans1 = parseInt(key, 10);
                    }
                    if (data[key]['transfer'] == startBranch && data[key]['branch'] == finishBranch ) {
                        trans2 = parseInt(key, 10);
                    }
                });
                $('#out').text(stationNamesArray(startId, trans1));
                $('#out2').text(stationNamesArray(trans2, finishId));

            }
        });


        //get array of station
        function stationNamesArray (from, to) {
            var arr = [];
            if (from < to) {
                var start = from;
                var finish = to;
                var reverse = false;
            } else {
                var start = to;
                var finish = from;
                var reverse = true;
            }


            $.each(data, function (key, value) {
                if (key >= start && key <= finish) {
                    arr.push(value.name);
                }
            });

            if (reverse) { return arr.reverse(); }
            return arr;
        }
    });
});