const dateInput = document.querySelector("#date-input");
const btnCheck = document.querySelector("#btn-check");
const outputBox = document.querySelector("#output");


function reverseString(str) {
    let listOfChar = str.split('');
    let reverseListOfChar = listOfChar.reverse();
    let reversedStr = reverseListOfChar.join("");
    return reversedStr;
}

function isPalindrome(str) {
    let reversedStr = reverseString(str);
    return str === reversedStr;
}

function convertDateToStr(date) {
    let dateStr = {
        day: "",
        month: "",
        year: ""
    };

    if (date.day < 10) {
        dateStr.day = '0' + date.day;
    } else {
        dateStr.day = date.day.toString();
    }

    if (date.month < 10) {
        dateStr.month = '0' + date.month;
    } else {
        dateStr.month = date.month.toString();
    }

    dateStr.year = date.year.toString();

    return dateStr;
}

function getAllDateFormats(date) {
    let dateStr = convertDateToStr(date);

    let ddmmyyyy = dateStr.day + dateStr.month + dateStr.year;
    let mmddyyyy = dateStr.month + dateStr.day + dateStr.year;
    let yyyymmdd = dateStr.year + dateStr.month + dateStr.day;
    let ddmmyy = dateStr.day + dateStr.month + dateStr.year.slice(-2);
    let mmddyy = dateStr.month + dateStr.day + dateStr.year.slice(-2);
    let yymmdd = dateStr.year.slice(-2) + dateStr.month + dateStr.day;

    return [ddmmyyyy, mmddyyyy, yyyymmdd, ddmmyy, mmddyy, yymmdd];
}

function checkPalindromeForAllDateFormats(date) {
    let listOfPalindromes = getAllDateFormats(date);
    let flag = false;

    for (let i = 0; i < listOfPalindromes.length; i++) {
        if (isPalindrome(listOfPalindromes[i])) {
            flag = true;
            break;
        }
    }

    return flag;
}

function leapYear(year) {
    if (year % 400 === 0){
        return true;
    }
    if (year % 100 === 0){
        return false;
    }
       
    if (year % 4 === 0){
        return true;
    }
        
    return false;
}

function getNextDate(date) {
    let day = date.day + 1;
    let month = date.month;
    let year = date.year;

    const daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

    if (month === 2) {
        if (leapYear(year)) {
            if (day > 29) {
                day = 1;
                month = 3;
            }
        } else {
            if (day > 28) {
                day = 1;
                month = 3;
            }
        }
    } else {
        if (day > daysInMonth[month - 1]) {
            day = 1;
            month++;
        }
    }

    if (month > 12) {
        month = 1;
        year++;
    }

    return {
        day: day,
        month: month,
        year: year,
    }
}

function getNextPalindromeDate(date) {
    let counter = 0;
    let nextDate = getNextDate(date);

    while(1) {
        counter++;
        var isPalindrome = checkPalindromeForAllDateFormats(nextDate);
        if(isPalindrome) {
            break;
        }

        nextDate = getNextDate(nextDate);
    }

    return [counter, nextDate]
}

function checkBtnHandler(e) {
    let bdayStr = dateInput.value;
    
    if (bdayStr !== '') {
        let listOfDate = bdayStr.split('-');

        const date = {
            day: Number(listOfDate[2]),
            month: Number(listOfDate[1]),
            year: Number(listOfDate[0])
        };

        let isPalindrome = checkPalindromeForAllDateFormats(date);
        
        if (isPalindrome) {
            outputBox.innerText = `Ohoo! your birthday is a palindrome!🥳🥳`
        } else {
            const [counter, nextDate] = getNextPalindromeDate(date);
            outputBox.innerHTML = `The next palindrome date is ${nextDate.day}-${nextDate.month}-${nextDate.year}, No worries cause date missed you by ${counter} days!👼👼 `;
        }
    }
}

btnCheck.addEventListener("click", checkBtnHandler)