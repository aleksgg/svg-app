
// Put all onload AJAX calls here, and event listeners
$(document).ready(function() {
    
    // On page-load AJAX Example
    $.ajax({
        type: 'get',            //Request type
        dataType: 'json',       //Data type - we will use JSON for almost everything 
        url: '/someendpoint',   //The server endpoint we are connecting to
        data: {
            name1: "Value 1",
            name2: "Value 2"
        },
        success: function (data) {
            /*  Do something with returned object
                Note that what we get is an object, not a string, 
                so we do not need to parse it on the server.
                JavaScript really does handle JSONs seamlessly
            */
            $('#blah').html("On page load, received string '"+data.foo+"' from server");
            //We write the object to the console to show that the request was successful
            console.log(data); 

        },
        fail: function(error) {
            // Non-200 return, do something with error
            $('#blah').html("On page load, received error from server");
            console.log(error); 
        }
    });
    
    customizeButton();

    // Event listener form example , we can use this instead explicitly listening for events
    // No redirects if possible
    $('#someform').submit(function(e){
        $('#blah').html("Form has data: "+$('#entryBox').val());
        e.preventDefault();
        //Pass data to the Ajax call, so it gets passed to the server
        $.ajax({
            //Create an object for connecting to another waypoint
        });
    });
    
    // Could be an error with different browsers since it returns a different string sometimes !
    document.getElementById('real-file-button').onchange = function () {
        let f = this.value;
        f = f.replace(/.*[\/\\]/, '');
        console.log("Selected File " + f);
        
    };


});


function customizeButton(){
    const realUploadBtn = document.getElementById("real-upload-button");
    const customUploadBtn = document.getElementById("upload-button");
    //const customTxt1 = document.getElementById("custom-text");

    customUploadBtn.addEventListener("click", function() {
        realUploadBtn.click();
    });
    /*
    realUploadBtn.addEventListener("change", function(){
        if (realUploadBtn.value) {
            customTxt1.innerHTML = realUploadBtn.value.match(/[\/\\]([\w\d\s\.\-\(\)]+)$/)[1];
        } else {
            customTxt1.innerHTML = "No file choosen yet.";
        }
    });
    */
    const realFileBtn = document.getElementById("real-file-button");
    const customFileBtn = document.getElementById("file-button");
    //const customTxt2 = document.getElementById("custom-text");

    customFileBtn.addEventListener("click", function() {
        realFileBtn.click();
    });
    /*
    realFileBtn.addEventListener("change", function(){
        if (realUploadBtn.value) {
            customTxt2.innerHTML = realFileBtn.value.match(/[\/\\]([\w\d\s\.\-\(\)]+)$/)[1];
        } else {
            customTxt2.innerHTML = "No file choosen yet.";
        }
    });
    */


}



