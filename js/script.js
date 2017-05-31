$(document).ready(function () {

    $.getJSON('json/metro.json', function (data) {
        $.each(data, function (key, value) {
            var temp = "<option value='" + value.name + "'>" + value.name + "</option>";
            $('#start').append(temp);
            $('#finish').append(temp);
        });



        $('#btn').on('click', function () {
            var start = $('#start').val();
            var finish = $('#finish').val();
            var startId = 0;
            var finishId = 0;
            var startBranch = 0;
            var finishBranch = 0;
            var trans1 = 0;
            var trans2 = 0;
            var output1 = [];
            var output2 = [];


            $.each(data, function (key, value) {
                if (start == value.name) {
                    startId = parseInt(key, 10);
                    startBranch = parseInt(data[key]['branch'], 10);
                }
                if (finish == value.name) {
                    finishId = parseInt(key, 10);
                    finishBranch = parseInt(data[key]['branch'], 10);
                }
            });
             console.log(startBranch);
             console.log(finishBranch);



            if (startBranch === finishBranch) {
                $.each(data, function (key, value) {
                    if (key >= startId && key <= finishId || key <= startId && key >= finishId ) {
                        output1.push(value.name);
                    }
                });

                if (startId > finishId) {
                    output1.reverse();
                    $('#out').text(output1);
                } else {
                    $('#out').text(output1);
                }
            } else {

                $.each(data, function (key, value) {
                    if (data[key]['transfer'] == finishBranch && data[key]['branch'] == startBranch ) {
                        trans1 = parseInt(key, 10);
                    }
                    if (data[key]['transfer'] == startBranch && data[key]['branch'] == finishBranch ) {
                        trans2 = parseInt(key, 10);
                    }
                });

                $.each(data, function (key, value) {
                    if (key >= startId && key <= trans1 || key <= startId && key >= trans1 ) {
                        output1.push(value.name);
                    }
                    if (key >= trans2 && key <= finishId || key <= trans2 && key >= finishId ) {
                        output2.push(value.name);
                    }

                    if (startId > trans1) {
                        output1.reverse();
                        $('#out').text(output1);
                    } else {
                        $('#out').text(output1);
                    }

                    if (trans2 > finishId) {
                        output2.reverse();
                        $('#out2').text(output2);
                    } else {
                        $('#out2').text(output2);
                    }




                });



                console.log(trans1);
                console.log(trans2);



            }



        });





    });
});
