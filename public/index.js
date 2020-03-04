
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
    
    $.ajax({
        type: 'get',
        dataType: 'json',
        url: '/uploadedFiles',
        data: { 
            fileName: "rects.svg",
            fileSize: "0KB",
            numRect: "0",
            numCirc: "0",
            numPath: "0",
            numGroups: "0"
        },
        success: function (data) {
           
           for(let i = 0; i < data.length; i++){
               console.log("The file name received is :");
               console.log(data[i].fileName); 
               
               let imgLoc = "./uploads/" + data[i].fileName;
               
               var fileLog = document.getElementById("fileLogTable");
               let row = fileLog.insertRow(fileLog.rows.length);
               
               /* Adds the cells */
               let imgCell = row.insertCell(0);
               let hrefCell = row.insertCell(1);
               let fsCell = row.insertCell(2);
               let numRCell = row.insertCell(3);
               let numCCell = row.insertCell(4);
               let numPCell = row.insertCell(5);
               let numGCell = row.insertCell(6);

               /* Creates and adds an image */
               var img = document.createElement('img');
               img.src = imgLoc;
               img.height = 100;
               img.width = 100;
               imgCell.appendChild(img);
               
               /* Adds the file name href */
               let link = document.createElement('a');
               let linkText = document.createTextNode(data[i].fileName);
               link.appendChild(linkText);
               link.href = data[i].fileName;
               hrefCell.appendChild(link);

               /* Adds the file size -- currently hard coded -- */
               let fsElement = document.createElement('p');
               let fsText = document.createTextNode(data[i].fileSize);
               fsElement.appendChild(fsText);
               fsCell.appendChild(fsElement);

               /* Adds the number of rectangles */
               let numRElement = document.createElement('p');
               let numRText = document.createTextNode(data[i].numRect);
               numRElement.appendChild(numRText);
               numRCell.appendChild(numRElement);

               /* Adds the number of circles */
               let numCElement = document.createElement('p');
               let numCText = document.createTextNode(data[i].numCirc);
               numCElement.appendChild(numCText);
               numCCell.appendChild(numCElement);
                
               /* Adds the number of paths */
               let numPElement = document.createElement('p');
               let numPText = document.createTextNode(data[i].numPath);
               numPElement.appendChild(numPText);
               numPCell.appendChild(numPElement);

               /* Adds the number of paths */
               let numGElement = document.createElement('p');
               let numGText = document.createTextNode(data[i].numGroups);
               numGElement.appendChild(numGText);
               numGCell.appendChild(numGElement);

            } 

        },
        fail: function(error) {
            console.log("Error with uploading file names. ");
            console.log(error);
        }
    });

    $.ajax({
        type: 'get',
        dataType: 'json',
        url: '/getSVGfiles',
        data: { 
            fileName: "rects.svg",
            desc: "desc-query",
	        title: "title-query"
        },
        success: function (data) {
            let fileNames = [];
            
            data.forEach(element => {
                fileNames.push(element.fileName);
            });
            
            addDropdownContent(fileNames);
            listenDropDown(data);

        },
        fail: function(error) {
            console.log("Error with uploading file names. ");
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
    
    let f;
    document.getElementById('real-file-button').onchange = function () {
        f = this.value;
        f = f.replace(/.*[\/\\]/, '');
        console.log("Selected File " + f);
    };

});

function addDropdownContent(fileNames) {
    var myParent = document.getElementById("dropdownList");

    //Create and append select list
    var selectList = document.getElementById("mySelect");

    //Create and append the options
    for (var i = 0; i < fileNames.length; i++) {
        var option = document.createElement("option");
        //option.value = fileNames[i];
        option.text = fileNames[i];
        option.id = "option-" + fileNames[i];
        selectList.appendChild(option);
    }
}

function listenDropDown(data) {
    document.getElementById('mySelect').addEventListener('change', warn, true);
    let anakinSkywalker;
    function warn(dropDown) {
        dropDown.preventDefault();
        dropDown.stopPropagation();
        
        anakinSkywalker = dropDown.currentTarget.value;
        for (let i = 0; i < data.length; i++) {
            if( data[i].fileName == anakinSkywalker) {
                console.log("The chosen one is " + data[i].fileName);
                populateSVGtable(data[i]);
            }
        }
    }
}

function populateSVGtable(data) {
    let imgLoc = "./uploads/" + data.fileName;
    
    /* Get the main table. */
    var mainTable = document.getElementById("mainSVGtable");

    /* Creates a new dynamic table */
    let table = document.createElement('table');
    table.id = 'svgViewerTable';
    table.className = 'svgViewer';
    
    let tableHead = document.createElement('thead');
    
    let tr1 = document.createElement('tr');
    let tr2 = document.createElement('tr');

    let tdTitle = document.createElement('td');
    let tdDescription = document.createElement('td');
    let tdImageTitle = document.createElement('td');
    tdImageTitle.setAttribute("align", "right");
    
    let titleHead = document.createTextNode('Title');
    let descriptionHead = document.createTextNode('Description');
    let imageHead = document.createTextNode('Image View');

    tdTitle.appendChild(titleHead);
    tdDescription.appendChild(descriptionHead);
    tdImageTitle.appendChild(imageHead);
    
    tr1.appendChild(tdImageTitle);
    tr2.appendChild(tdTitle);
    tr2.appendChild(tdDescription);

    tableHead.appendChild(tr1);
    tableHead.appendChild(tr2);
    table.appendChild(tableHead);
    
    /* Hides the default table */
    let defaultTable = document.getElementById("defaultTable")
    defaultTable.style.visibility = "hidden"
    
    /* Replaces the child of the main table with the new dynamic table created. Adds it if none exist. */
    mainTable.replaceChild(table, mainTable.childNodes[0]);
    
    /* Populates the table added with the json data provided */     
    let row = table.insertRow(table.rows.length);
    let row2 = table.insertRow(table.rows.length-2);  //might be different with different browsers
    
    let titleCell = row.insertCell(0);
    let descCell = row.insertCell(1);

    let imgCell = row2.insertCell(0);

    var img = document.createElement('img');
    img.src = imgLoc;
    img.height = 200;
    img.width = 200;
    imgCell.appendChild(img);


    let titleElement = document.createElement('p');
    let titleText = document.createTextNode(data.title);
    titleElement.appendChild(titleText);
    titleCell.appendChild(titleElement);

    let descElement = document.createElement('p');
    let descText = document.createTextNode(data.desc);
    descElement.appendChild(descText);
    descCell.appendChild(descElement);


}

function customizeButton(){
    const realUploadBtn = document.getElementById("real-upload-button");
    const customUploadBtn = document.getElementById("upload-button");

    customUploadBtn.addEventListener("click", function() {
        realUploadBtn.click();
    });
    
    const realFileBtn = document.getElementById("real-file-button");
    const customFileBtn = document.getElementById("file-button");

    customFileBtn.addEventListener("click", function() {
        realFileBtn.click();
    });

}


