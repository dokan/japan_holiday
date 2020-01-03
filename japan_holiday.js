function getJapanHolidays (date) {
    var result = [];

    var seasonHoliday = {};
    seasonHoliday.getShunbun = function (date){
	var day = 20;
	var year = date.getFullYear();
	var surplus = year % 4;
	if (1992 <= year && year <= 2023) {
	    day = surplus < 2 ? 20 : 21;
	} else if (2024 <= year && year <= 2055) {
            day = surplus < 3 ? 20 : 21;
        } else if (2056 <= year && year <= 2091) {
            day = 20;
        } else if (2092 <= year && year <= 2099) {
            day = surplus < 1 ? 19 : 20;
        } else if (2100 <= year && year <= 2123) {
            day = surplus < 1 ? 20 : 21;
        } else if (2124 <= year && year <= 2155) {
            day = surplus < 2 ? 20 : 21;
        } else if (2156 <= year && year <= 2187) {
            day = surplus < 3 ? 20 : 21;
        } else if (2188 <= year && year <= 2199) {
            day = 20;
        }
	return day;
    }

    seasonHoliday.getShuubun = function (date){
	var day = 23;
	var year = date.getFullYear();
	var surplus = year % 4;

	if (1980 <= year && year <= 2011) {
            day = 23;
        } else if (2012 <= year && year <= 2043) {
            day = surplus < 1 ? 22 : 23;
        } else if (2044 <= year && year <= 2075) {
            day = surplus < 2 ? 22 : 23;
        } else if (2076 <= year && year <= 2099) {
            day = surplus < 3 ? 22 : 23;
        } else if (2100 <= year && year <= 2103) {
            day = surplus < 3 ? 23 : 24;
        } else if (2104 <= year && year <= 2139) {
            day = 23;
        } else if (2140 <= year && year <= 2167) {
            day = surplus < 1 ? 22 : 23;
        } else if (2168 <= year && year <= 2199) {
            day = surplus < 2 ? 22 : 23;
	}
	return day;
    }

    function getFurikae (_date, holidayArray) {
	var date = new Date(_date);
	var resultArray = [];
	for(var i = 0;i < holidayArray.length;i++){
	    date.setDate(holidayArray[i]);
	    if (date.getDay() == 0) {
		resultArray.push(date.getDate() + 1);
	    }
	}
	return resultArray;
    }

    function getDynamicHoliday(_date, array) {
	var targetDate = 1;
	var date = new Date(_date);
	date.setDate(1);

	var targetWday = array[1];
	var temp = (7 - date.getDay() + targetWday) % 7;
	targetDate += temp;

	targetDate += 7 * (array[0] - 1);
	return targetDate;
    }

    function compareNum(val1, val2) {
	return val1 - val2;
    }
    
    function getKokumin(_date, array) {
	var date = new Date(_date);
	var resultArray = [];
	for(var i = 0;i < (array.length - 1);i++){
	    if ((array[i + 1] - array[i]) == 2){
		date.setDate(array[i] + 1);
		if (date.getDay() > 1) {
		    resultArray.push(array[i] + 1);
		}
	    }
	}
	return resultArray;
    }
    
    var holidays = [
        [1949, 9999, 1, 1, "元日"],
        [2000, 9999, 1, [2, 1], "成人の日"],
        [1967, 9999, 2, 11, "建国記念の日"],
	[2020, 9999, 2, 23, "天皇誕生日"]
        [1949, 2199, 3, "getShunbun", "春分の日"],
        [2007, 9999, 4, 29, "昭和の日"],
	[2019, 2019, 5, 1, "天皇の即位の日"],
        [1949, 9999, 5, 3, "憲法記念日"],
        [2007, 9999, 5, 4, "みどりの日"],
        [1949, 9999, 5, 5, "こどもの日"],
        [2003, 2019, 7, [3, 1], "海の日"],
	[2021, 9999, 7, [3, 1], "海の日"],
	[2020, 2020, 7, 23, "海の日"],
	[2020, 2020, 7, 24, "スポーツの日"],
        [2016, 2019, 8, 11, "山の日"],
	[2020, 2020, 8, 10, "山の日"],
	[2021, 9999, 8, 11, "山の日"],
        [2003, 9999, 9, [3, 1], "敬老の日"],
        [1948, 2199, 9, "getShuubun", "秋分の日"],
        [2000, 2019, 10, [2, 1], "体育の日"],
	[2021, 9999, 10, [2, 1], "スポーツの日"],
	[2019, 2019, 10, 22, "即位礼正殿の儀の行われる日"],
        [1948, 9999, 11, 3, "文化の日"],
        [1948, 9999, 11, 23, "勤労感謝の日"],
        [1989, 2018, 12, 23, "天皇誕生日"]
    ];

    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    for(var i = 0; i < holidays.length;i++){
	if (holidays[i][0] <= year && year <= holidays[i][1] && month == holidays[i][2]){
	    var dateVal = holidays[i][3];
	    switch (Object.prototype.toString.call(dateVal)) {
	    case "[object Number]":
		result.push(dateVal);
		break;
	    case "[object Array]":
		result.push(getDynamicHoliday(date, dateVal));
		break;
	    case "[object String]":
		if (dateVal in seasonHoliday &&
		    Object.prototype.toString.call(seasonHoliday[dateVal]) === "[object Function]") {
		    result.push(seasonHoliday[dateVal](date));
		}
		break;
	    }
	}
    }
    result = result.concat(getFurikae(date, result));
    result.sort(compareNum);
    result = result.concat(getKokumin(date, result));
    result.sort(compareNum);
    return result;
}
