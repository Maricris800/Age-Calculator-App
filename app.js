
const imageArrow = document.getElementById("image-arrow");

const inputDay = document.getElementById("Day");
const inputMonth = document.getElementById("Month");
const inputYear = document.getElementById("Year");

const labelDay = document.getElementById("label-day");
const labelMonth = document.getElementById("label-month");
const labelYear = document.getElementById("label-year");

const validDay = document.getElementById("labelValidDay");
const validMonth = document.getElementById("labelValidMonth");
const validYear = document.getElementById("labelValidYear");

const displayYears = document.querySelector("#displayYears");
const displayMonths = document.querySelector("#displayMonths");
const displayDays = document.querySelector("#displayDays");

const validarDatos = (valueInput,minimo,maximo) => {
    if (validarSiEsEntero(valueInput) && (valueInput >= minimo) && (valueInput <= maximo)) return true;
    
}

function validarSiEsEntero(value) {  
    
    return Number.isInteger(value) // true - false
}

const emptyValue = (input) => {
    if (input.value === "") return true;
        
    return false;    
}


const emptyValues = () => { //emptyValues: lista que contiene 3 valores booleanos
    
    let empty = [];
    let count = 0;

    empty.push(emptyValue(inputDay));
    empty.push(emptyValue(inputMonth));
    empty.push(emptyValue(inputYear));

    if (emptyValue(inputDay) === true){
        
        validDay.innerHTML = "This field is required";
        labelDay.style.color = "red";
        displayDays.innerText = "--";
    }

    if (emptyValue(inputMonth) === true){
        
        validMonth.innerHTML = "This field is required";
        labelMonth.style.color = "red";
        displayMonths.innerText = "--";
    }

    if (emptyValue(inputYear) === true){
        
        validYear.innerHTML = "This field is required";
        labelYear.style.color = "red";
        displayYears.innerText = "--";
    }

    empty.forEach(element => {

        if (element === true){
            console.log("this field is required");
            count++;
        }        
    });
   return (count > 0) ? false : true; 
}

const validData = () => {
    //Parseando
    let valueDay = parseInt(inputDay.value);
    let valueMonth = parseInt(inputMonth.value);
    let valueYear = parseInt(inputYear.value);
        
    let noValidDay = false;
    let noValidMonth = false;
    let noValidYear = false;
    
    let currentDate = new Date();
        
    if (validarDatos(valueMonth, 1, 12)) {
        noValidMonth = true;
        noValidYear = (validarDatos(valueYear, 1900, currentDate.getFullYear())) ? true : false;
                    
    } else {
        noValidMonth = false;
        validMonth.innerHTML = "Must be a valid Month";
        //noValidYear = (validarDatos(valueYear, 1900, 2024)) ? true : false;
        if (validarDatos(valueYear, 1900, currentDate.getFullYear())){
            noValidYear = true;
       } else{
            noValidYear = false;
            validYear.innerHTML = "Must be in the past";
       }                    
    }

    if ((valueMonth === 1) || (valueMonth === 3) || (valueMonth === 5) || (valueMonth === 7) || (valueMonth === 8) || (valueMonth === 10) || (valueMonth === 12)){
       //noValidDay = (validarDatos(valueDay, 1, 31)) ? true : false;
       if (validarDatos(valueDay, 1, 31)){
            noValidDay = true;
       } else{
            noValidDay = false;
            validDay.innerHTML = "Must be a valid day";
       }             
    } else if ((valueMonth === 4) || (valueMonth === 6) || (valueMonth === 9) || (valueMonth === 11)){
        //noValidDay = (validarDatos(valueDay, 1, 30)) ? true : false;
        if (validarDatos(valueDay, 1, 30)){
            noValidDay = true;
       } else{
            noValidDay = false;
            validDay.innerHTML = "Must be a valid day";
       }                    
    } else {
        if (valueYear%4 === 0){
            //noValidDay = (validarDatos(valueDay, 1, 29)) ? true : false;                
            if (validarDatos(valueDay, 1, 29)){
                noValidDay = true;
           } else{
                noValidDay = false;
                validDay.innerHTML = "Must be a valid day";
           }                    
        } else {
            //noValidDay = (validarDatos(valueDay, 1, 28)) ? true : false;                
            if (validarDatos(valueDay, 1, 28)){
                noValidDay = true;
           } else{
                noValidDay = false;
                validDay.innerHTML = "Must be a valid day";
           }         
        }
    }
    return (noValidDay && noValidMonth && noValidYear) ? true : false;
} 


imageArrow.addEventListener("click", () =>{    
    
    if ((emptyValues(inputDay.value, inputMonth.value, inputYear.value)) && (validData())){

       calculateYear();     
    }
    
})

const calculateYear = () => {

    let today = new Date();        

   getUserYears(inputYear, today);
   getUserMonths(inputMonth, inputDay, today);
   getUserDays(inputDay, inputMonth, today);
}

const getUserYears = (inputYear, today) => {
        
    let inputValueYear = inputYear.value;
    let years = 0 ;
    
    years = parseInt(today.getFullYear()) - parseInt(inputValueYear); 
    console.log(years);    

    if ((inputMonth.value) > (today.getMonth() +1)) { 
        years--;
    }
    displayYears.innerText = years;
       
}

const getUserMonths = (inputMonth, inputDay, today) => {
    let inputValueMonth = inputMonth.value;
    let months = 0;

    // months = 12 -(parseInt(inputMonth.value)) + (today.getMonth()+1);
    // console.log(months);

    if (today.getMonth() + 1 > inputMonth.value){
        months = (today.getMonth() + 1) - inputMonth.value;
    } else {
        months = 12 -(parseInt(inputMonth.value)) + (today.getMonth()+1);
    }

    if ((inputDay.value) > (today.getDate())){
        months--;
    }

    (months != 12) ? displayMonths.innerText = months : displayMonths.innerText = 0;
}

const getUserDays = (inputDay, inputMonth, today) => {
    let days = 0;    

    if (((today.getMonth()) === 1) || ((today.getMonth()) === 3) || ((today.getMonth()) === 5) || ((today.getMonth()) === 7) || ((today.getMonth()) === 8) || ((today.getMonth()) === 10) || (today.getMonth()) === 12){
        if ((today.getDate()) > (inputDay.value)){           
            days = today.getDate() - ((inputDay.value));
        } else {
            days = (31 - inputDay.value) + today.getDate();
        }        
                
    } else if (((today.getMonth()) === 4) || ((today.getMonth()) === 6) || ((today.getMonth()) === 9) || ((today.getMonth()) === 11)){
       
        if ((today.getDate()) > (inputDay.value)){     
           days = today.getDate() - ((inputDay.value));           
        } else {
           days = (30 - inputDay.value) + today.getDate();
        }        
                
    } else {
        if (today.getFullYear() % 4 === 0){
            if ((today.getDate()) > (inputDay.value)){     
                days = today.getDate() - ((inputDay.value));           
            } else {
                days = (29 - inputDay.value) + today.getDate();
            }           

        } else {
            if ((today.getDate()) > (inputDay.value)){     
                days = today.getDate() - ((inputDay.value));           
            } else {
                days = (28 - inputDay.value) + today.getDate();
            }            
        }   
               
    }

    displayDays.innerText = days;
}

