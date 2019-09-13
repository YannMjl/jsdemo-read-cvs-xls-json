// *********************************************************************************************************************
// Global variables                                                                                                    *
// difine global variables that will be use throughout the code                                                        *
// *********************************************************************************************************************
var csv_file_API = './UsersSample.csv';
var excel_file_API = './soccer_players.xlsx';

// Do some stuff when page hmtl page is launched
$(document).ready(function () {

    $("#headerTitle").hide(300).show(1500);

    // read Excel file and convert to json format using fetch
    fetch('./soccer_players.xlsx').then(function (res) {
        /* get the data as a Blob */
        if (!res.ok) throw new Error("fetch failed");
        return res.arrayBuffer();
    })
    .then(function (ab) {
        /* parse the data when it is received */
        var data = new Uint8Array(ab);
        var workbook = XLSX.read(data, {
            type: "array"
        });

        /* *****************************************************************
        * DO SOMETHING WITH workbook: Converting Excel value to Json       *
        ********************************************************************/
        var first_sheet_name = workbook.SheetNames[0];
        /* Get worksheet */
        var worksheet = workbook.Sheets[first_sheet_name];

        var _JsonData = XLSX.utils.sheet_to_json(worksheet, { raw: true });
        /************************ End of conversion ************************/

        console.log(_JsonData);

        $.each(_JsonData, function (index, value) {

            $('#showExcel').append(

                '<tr>' +
                    '<th scope="row">' +
                        value['FIRST NAME'] +
                    '</th>' + 
                    '<td>' +
                        value['LAST NAME'] +
                    '</td>' +  
                    '<td>' +
                        '<span class="badge badge-primary badge-pill p-2">' +
                            value.AGE +
                        '</span>' +
                    '</td>' +
                    '<td>' +
                        value.CLUB +
                    '</td>' +
                    '<td>' +
                        value.CITY +
                    '</td>' +
                '</tr>'

            );

        });

    });

    // read csv file and convert to json format using ajax
    $.ajax({

        type: 'GET',

        url: csv_file_API,

        dataType: 'text',

        error: function (e) {
            alert('An error occurred while processing API calls');
            console.log("API call Failed: ", e);
        },

        success: function (data) {

            var jsonData = $.csv.toObjects(data);

            console.log(jsonData);

            $.each(jsonData, function (index, value) {

                $('#showCSV').append(

                    '<li class="list-group-item d-flex justify-content-between align-items-center">' + 
                        
                        '<span style="width: 15%; margin-right: 1.5rem; font-size: 1rem; font-weight: bold; color: #37474F">' +
                            value['FIRST NAME'] +
                        '</span>' +

                        '<span style="width: 15%; margin-right: 2rem; font-size: 1rem;  color: #37474F">' +
                            value['LAST NAME'] +
                        '</span>' +

                        '<span class="badge badge-primary badge-pill">' +
                            value.CITY +
                        '</span>' +

                        '<span class="badge warning-color-dark badge-pill">' +
                            value['PHONE NUMBER'] +
                        '</span>' +

                        '<span class="badge success-color-dark badge-pill">' +
                            value['EMAIL ADDRESS'] +
                        '</span>' +

                    '</li>'
                );

            });

        } // end: Ajax success API call

    }); // end: of Ajax call

}); // end: document.ready()