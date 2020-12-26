let dataArray = JSON.parse(localStorage.getItem("ITEM")) || [];
const btn_check = document.querySelector('#get_result')
const btn_delete = document.querySelector('#delete_result')


btn_check.addEventListener('click', addItemToLocalStorage, false);
btn_delete.addEventListener('click', deleteRecord, false);


function checkRecord() {
    if (dataArray.length === 0) {
        $('#delete_result').text('暫無資料').addClass('disabled');
    }
    else{
        update();
        $('#delete_result').removeClass('disabled').text('刪除紀錄');
    }
}
checkRecord();

function addItemToLocalStorage() {

    /*set data*/
    let title = '';
    let height = document.querySelector('#height').value; //cm
    let weight = document.querySelector('#weight').value;

    if(validation(height,weight) === false){return }

    let BMI = (weight / ((height / 100) * (height / 100))).toFixed(2);
    let d = new Date();
    let date = d.getFullYear() + '-' + (d.getMonth()+1) + '-' + d.getDate();
    title = rangeCheckerTitle(BMI);
    let item = {
        Title: title,
        Bmi: BMI,
        height: height, //cm
        weight: weight,
        date: date,
    };
    dataArray.push({ITEM: item});
    localStorage.setItem('ITEM', JSON.stringify(dataArray));

    setResultArea(BMI);

    /*clean output*/
    document.querySelector('#height').value = null;
    document.querySelector('#weight').value = null


    update();
    checkRecord();
    toggleClass();
}

function toggleClass(){
    $('#get_result').click(function (){
        $('.getResultArea').addClass('d-none');
        $('.resultArea').removeClass('d-none');
    });
    $('.restart').click(function (){
        $('.resultArea').addClass('d-none');
        $('.getResultArea').removeClass('d-none');
    });
}

function update(){
    const tr = document.querySelector('#data_table');
    let str = '';
    for(let i =0; i<dataArray.length;i++){
        str += `<tr class="row mb-3 bg-white">
            <td class="${rangeCheckerColor(dataArray[i].ITEM.Bmi)}" width="10"></td>
            <td class="pl-2 py-3 " width="140">${dataArray[i].ITEM.Title}</td>
            <td class="py-3" width="135"><span>BMI<wbr></span>${dataArray[i].ITEM.Bmi}</td>
            <td class="py-3 text-center text-md-left" width="140"><span>Height<wbr></span>${dataArray[i].ITEM.height} <span>cm</span></td>
            <td class="py-3 " width="140"><span>Weight<wbr></span>${dataArray[i].ITEM.weight} <span>kg</span></td>
            <td class="py-3 text-right pr-3 " width="135"><span>${dataArray[i].ITEM.date}</span></td>
        </tr>`;
    }
    tr.innerHTML = str;
};

function deleteRecord(){
    localStorage.removeItem('ITEM');
    dataArray = [];
    update();
    checkRecord();
}

function rangeCheckerTitle(bmi){
    if (bmi < 18.5) {
        return '過輕';
    } else if (18.5 <= bmi && bmi < 24) {
        return '理想';
    } else if (24 <= bmi && bmi < 25) {
        return '輕度肥胖';
    } else if (25 <= bmi && bmi < 26) {
        return '中度肥胖';
    } else if (26 <= bmi && bmi < 27) {
        return '重度肥胖';
    } else if (27 <= bmi) {
        return '過重';
    }
}

function rangeCheckerColor(bmi){
    if (bmi < 18.5) {
        return 'green';
    } else if (18.5 <= bmi && bmi < 24) {
        return 'blue';
    } else if (24 <= bmi && bmi < 25) {
        return 'lightorange';
    } else if (25 <= bmi && bmi < 26) {
        return 'orange';
    } else if (26 <= bmi && bmi < 27) {
        return 'red';
    } else if (27 <= bmi) {
        return 'orange';
    }
}

function setResultArea(bmi){
    $('#resultBMI').text(`BMI \n ${bmi}`).addClass(`text-${rangeCheckerColor(bmi)}`);
    $('#resultTitle').text(`${rangeCheckerTitle(bmi)}`).addClass(`text-${rangeCheckerColor(bmi)}`);
    $('.restart').addClass(`text-${rangeCheckerColor(bmi)}`);
    $('.circleDisplay').addClass(`border-${rangeCheckerColor(bmi)}`);
}

function validation(height, weight){
    if(height <= 0 || weight <= 0 || weight === undefined || height === undefined || isNaN(weight) || isNaN(height)){
        alert('請輸入有效資料');
        return false;
    }
}
