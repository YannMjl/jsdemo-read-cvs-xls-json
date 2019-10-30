// *********************************************************************************************************************
// Global variables                                                                                                    *
// difine global variables that will be use throughout the code                                                        *
// *********************************************************************************************************************
var csv_file_API_1 = "./UsersSample.csv";
var csv_file_API_2 = "./team2.csv";
var APIs_array = [csv_file_API_1, csv_file_API_2];


// Flatten our data down to 1 array
Object.defineProperty(Array.prototype, 'flat',
    {
        value: function (depth) {
            depth = 1;
            return this.reduce(
                function (flat, toFlatten) {
                    return flat.concat((Array.isArray(toFlatten) && (depth > 1)) ? toFlatten.flat(depth - 1) : toFlatten);
                }, []
            );
        },
        configurable: true
});


// Do some stuff when page hmtl page is launched
$(document).ready(function () {

    $("#headerTitle").hide(300).show(1500);

    makeAPICalls();

}); // end: document.ready()

function makeAPICalls() {

    // The array to contain our api calls
    var calls = [];

    // Passing csv files APIs to callback functions
    APIs_array.forEach(function (csv_file_API) {

        // Append the promise onto our array of api calls
        calls.push(new Promise(function (resolve, reject) {

            // make the API call using AJAX
            $.ajax({

                type: "GET",

                url: csv_file_API,

                dataType: "text",

                cache: false,

                error: function (e) {
                    alert("An error occurred while processing API calls");
                    console.log("API call Failed: ", e);
                    reject(e);
                },

                success: function (data) {

                    var jsonData = $.csv.toObjects(data);

                    console.log(jsonData);

                    resolve(jsonData);
                } // end: data process on success API call

            }); // end: AJAX call

        })); // end: adding data on promise calls

    }); // end: loop APIs array


    // Once all api calls are completed
    Promise.all(calls).then(function (data) {

        // flat the data into one
        var flatData = data.map(function (item) {
            return item;
        }).flat();

        console.log(flatData);

        dislayData(flatData);
    });

}

function dislayData(data) {
    
    $.each(data, function (index, value) {

        $('#showCSV').append(

            '<li class="list-group-item d-flex justify-content-between align-items-center">' +

                '<span style="width: 15%; font-size: 1rem; font-weight: bold; color: #37474F">' +
                    value['FIRST NAME'] +
                '</span>' +

                '<span style="width: 15%; font-size: 1rem;  color: #37474F">' +
                    value['LAST NAME'] +
                '</span>' +

                '<span class="badge warning-color-dark badge-pill">' +
                    value['PHONE NUMBER'] +
                '</span>' +

                '<span class="badge success-color-dark badge-pill">' +
                    value['EMAIL ADDRESS'] +
                '</span>' +

                '<span class="badge badge-primary badge-pill">' +
                    value.CITY +
                '</span>' +

                '<span class="badge badge-primary badge-pill">' +
                    value.STATE +
                '</span>' +

            '</li>'
        );

    });

}