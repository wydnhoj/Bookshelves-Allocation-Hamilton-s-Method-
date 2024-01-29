bookCount = 0;
var bookNameArray = new Array();
var bookNumArray = new Array();
var length;
var divisor;
var surplus;                        //global variables
var TBooks;
var shelvesNum;
var final = new Array();

document.getElementById('submit').onclick = function(){_store()};           //submit button
document.getElementById('calculate').onclick = function() {_calculate()};   //calculate button
document.getElementById('answerButton').onclick = function(){_answer()};    //display result

function _store(){
    
    var books = document.getElementById('bookName').value;
    var booknum = document.getElementById('bookValue').value;
    parseInt(booknum);

    //for logic
    bookNameArray.push(books);
    bookNumArray.push(booknum);

    document.getElementById('bookName').value = "";
    document.getElementById('bookValue').value = "";
    bookCount++;

    var bks = books.concat(": ", booknum);

    //save data to local storage for display on screen
    if(localStorage.getItem('book') == null){
        localStorage.setItem('book', '[]');
    }

    //for display on screen of what is inputted
    var tempbooks = JSON.parse(localStorage.getItem('book'));
    tempbooks = "<br>" + bks;
    localStorage.setItem('book', JSON.stringify(tempbooks));

    document.getElementById('output').insertAdjacentHTML("beforeend", tempbooks);
}


function _calculate(){

    var a = document.getElementById('calculate');
    var b = document.getElementById('answerButton');
    a.style.display = 'none';
    b.style.display = 'block';

    TBooks = document.getElementById('totalBooks').value;
    shelvesNum = document.getElementById('availShelves').value;
    var quota = new Array();
    var initial = new Array();
    var dportion = new Array();
    var _arr1 = new Array();
    var integer;
    var decimal;
    var isum=0;
    var x;
    var y;


    divisor = TBooks/shelvesNum;
    

    for(let i=0;i<bookCount; i++){

        x = bookNumArray[i]/divisor;
        quota[i] = x;  //quota store
        integer = Math.trunc(x);    //cutoff decimal then store to integer then store to array initial
        decimal = x % 1;            //store decimal to var decimal
        initial[i] = integer;
        isum = isum + integer;                 //sum initial
        
        let n = quota[i];
        if (Number.isInteger(n)){
            dportion[i] = 0;                //if quota have a exact integer without decimal, set it's decimal to 0
        }
        else{
            dportion[i] = decimal;  //store decimal in dportion
        }
    }

    _arr1 = [...dportion];
    parseFloat(_arr1)                     //copy decimal to _arr1
    _arr1.sort(function(a,b){return b - a});      //sort _arr1 from highest to lowest
    surplus = shelvesNum - isum;            //compute surplus

    //loop depending on the number of surplus
    for (let j=0; j<surplus;j++){
        for (p=0; p<bookCount;p++){
            if(_arr1[j] == dportion[p]){        //highest decimal compare to every element in dportion
                let num = initial[p];           // if true add 1 to the initial corresponding the highest decimal
                num +=1;
                initial[p] = num;
            }
        }
    }

    final = [...initial];

    console.log(TBooks);
    console.log(shelvesNum);
    console.log(divisor);
    console.log(surplus);
    console.log(quota);
    console.log(initial);
    console.log(_arr1);
    console.log(dportion);
    console.log(bookCount);
    console.log(bookNumArray);
    console.log(isum);
}

function _answer(){

    window.localStorage.setItem('total_books', TBooks);
    window.localStorage.setItem('shelves_num', shelvesNum);
    window.localStorage.setItem('surp', surplus);
    window.localStorage.setItem('book_name', JSON.stringify(bookNameArray));
    window.localStorage.setItem('final_alloc', JSON.stringify(final));
    window.localStorage.setItem('book_count', bookCount);

    window.location.href = "results_Group3.html";

}