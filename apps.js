console.log('connected');

class DomManipulation {

    jsonRadioHandler() {

        if (jsonRadio.checked == true) {
            paramDiv.style.display = 'none';
            textAreaDiv.style.display = 'block';

        }

    }

    customRadioHanler() {

        if (customRadio.checked == true) {
            paramDiv.style.display = 'block';
            textAreaDiv.style.display = 'none';
        }
    }

    addparamHandler() {

        let paramDivHtml = paramDiv.innerHTML;
        let paramCount = document.getElementsByClassName('paramCount').length;
        let str = `<div class="form-row my-2 paramCount">
                        <div class="col-2">
                            <label for="exampleFormControlTextarea1">Parameter ${paramCount + 1}</label>
                        </div>
                        <div class="col">
                            <input id="key${paramCount + 1}"type="text" class="form-control" placeholder="Enter key ${paramCount + 1}">
                        </div>
                        <div class="col">
                            <input id="value${paramCount + 1}" type="text" class="form-control" placeholder="Enter value ${paramCount + 1}">
                        </div>
                        <div class="col">
                            <button id="${paramCount + 1}" type="button" onclick="deleteParam(this.id)" class="btn btn-primary deleteParam"> - </button>
                        </div>
                    </div>`;
        // console.log('string',str);
        let a = getElementFromString(str);
        // console.log("getElementFromString",a);
        paramDiv.appendChild(a);
        // console.log(paramDiv );

    }

    submitBtn(e) {
        e.preventDefault();
        console.log('you clicked on submit button');
        let responceTxtArea = document.getElementById('responceTxtArea').value = 'please wait.. fatching data..';
        let urlTxt = document.getElementById('urlTxt');

        //Grab the method
        let method;
        let getRadio = document.getElementById('getRadio');
        let postRadio = document.getElementById('postRadio');

        if (getRadio.checked) {
            method = getRadio.value;
        }
        else {
            method = postRadio.value;
        }

        //Grab the content type
        let contentType;
        let jsonRadio = document.getElementById('jsonRadio');
        let customRadio = document.getElementById('customRadio');
        if (jsonRadio.checked) {
            contentType = jsonRadio.value;
        }
        else {
            contentType = customRadio.value;
        }


        if (contentType == 'customParameter') {
            var data = {};
            let objKey;
            let objValue;
            for (let i = 0; i < document.getElementsByClassName('paramCount').length; i++) {
                if (document.getElementById('key' + (i + 1)).value != '' && document.getElementById('value' + (i + 1)).value != '') {
                    objKey = document.getElementById('key' + (i + 1)).value;
                    objValue = document.getElementById('value' + (i + 1)).value;
                    data[objKey] = objValue;
                }
            }
            data = JSON.stringify(data);

        }
        else {
            data = document.getElementById('objTextArea').value;

        }
        //logs for debuging
        console.log('url:', urlTxt.value);
        console.log('method:', method);
        console.log('content Type:', contentType);
        console.log('object:', data);

        if (method == 'GET') {
            const xhr = new XMLHttpRequest();

            xhr.open(method, urlTxt.value, true);


            xhr.onload = function () {

                if (this.status === 200) {
                    // let jsonData = JSON.parse();
                    document.getElementById('responceTxtArea').value = this.responseText;
                }

                else {
                    document.getElementById('responceTxtArea').value = 'Error';
                }
            }

            xhr.send();
        }

        else {

            fetch(urlTxt.value, {
                method: 'POST', 
                body: data,
                headers: {
                    'Content-type': 'application/json; charset=UTF-8'
                  }  
            })
            .then(response => response.json())
            .then((text) =>{
                // document.getElementById('responseJsonText').value = text;
                document.getElementById('responceTxtArea').value = text;
                console.log(text);
                // Prism.highlightAll();
            }).catch(() => alert('some error occured'));
        }

    }

}

//getting Element from string
function getElementFromString(string) {
    let div = document.createElement('div');
    div.innerHTML = string;
    return div.firstElementChild;
}

let obj = new DomManipulation();
let textAreaDiv = document.getElementById('textAreaDiv');
let paramDiv = document.getElementById('paramDiv');



//hiding the paramDiv initially
paramDiv.style.display = 'none';

//if the user clicks on json radio
let jsonRadio = document.getElementById('jsonRadio');
jsonRadio.addEventListener('click', obj.jsonRadioHandler);

//if the user clicks on custom parameter radio radio
let customRadio = document.getElementById('customRadio');
customRadio.addEventListener('click', obj.customRadioHanler);

//adding more parameters
let addparam = document.getElementById('addparam');
addparam.addEventListener('click', obj.addparamHandler);

//delete parameters
function deleteParam(id) {
    let deletedElement = document.getElementById(id);
    deletedElement.parentElement.parentElement.remove();
}

// if the user clicks on sunmit button
let submitBtn = document.getElementById('submitBtn');
submitBtn.addEventListener('click', obj.submitBtn);





