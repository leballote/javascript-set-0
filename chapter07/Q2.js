let germanHolidays = {
    "01-06": "Neujahr",
    "03-01": "Heilige Drei Könige", 
    "03-01": "Karneval", 
    "04-18": "Karfreitag", 
    "04-15": "Ostermontag", 
    "04-18": "Tag der Arbeit", 
    "05-08": "Muttertag", 
    "06-06": "Christi Himmelfahrt", 
    "06-06": "Pfingstmontag", 
    "06-16": "Fronleichnam", 
    "08-15": "Mariä Himmelfahrt", 
    "09-17": "Oktoberfest", 
    "10-03": "Tag der deutschen Einheit", 
    "10-31": "Reformationstag", 
    "11-01": "Allerheiligen", 
    "12-24": "Weihnachten", 
    "12-25": "Weihnachtstag", 
    "12-26": "Zweiter Weihnachtsfeiertag", 
    "12-31": "Silvester", 
}

let usaHolidays = {
    "01-01": "New Year's Day",
    "01-15": "Birthday of Martin Luther King, Jr.",
    "02-22": "Washington's Birthday",
    "05-30": "Memorial Day",
    "06-19": "Juneteeth National Independence Day",
    "07-04": "Independence Day",
    "09-01": "Labor Day",
    "10-12": "Colombus Day",
    "11-11": "Veterans Day",
    "11-22": "Thanksgiving Day",
    "12-25": "Christmas Day",
}

function isValidDate(y, m, d, verbose=false) {
    if (typeof y != 'number') y = parseInt(y);
    if (typeof m != 'number') m = parseInt(m);
    if (typeof d != 'number') d = parseInt(d);

    let leap = (y % 4 == 0) && (!(y % 100 == 0) || (y % 400 == 0));
    if (d <= 0 || m <= 0) return false; 
    if (m > 12) return false;
    if (m == 2 && d > 28 + leap) {
        if (verbose)
            console.log(`february of ${y} only has ${28 + leap} days`);
        return false; 
    }
    if ([1, 3, 5, 7, 8, 10, 12].includes(m) && d > 31) {
        if (verbose)
            console.log("this month only have 31 days");
        return false;
    } 
    if ([4, 6, 9, 11].includes(m) && d > 30) {
        if (verbose)
            console.log("this month only have 30 days");
        return false;
    }
    return true;
}

// mm/dd/yyyy -> dd.mm.yyyy
function fromUSAToGermany(date) {
    date = date.trim();
    let regex = /^(?<m>\d{2})\/(?<d>\d{2})\/(?<y>\d{4})$/;
    let match = regex.exec(date);
    let notValidDateError = new Error("Not valid day format");

    if (match == null) throw notValidDateError;

    let {y, m, d} = match.groups;

    if (!isValidDate(y, m, d)) throw notValidDateError;

    let key = `${m}-${d}`; 
    let holiday = germanHolidays[key];
    date = `${d}.${m}.${y}`; 
    console.log(date, holiday ? `(${holiday})`: "");
    return date;
}

// dd.mm.yyyy -> mm/dd/yyyy
function fromGermanyToUSA(date) {
    date = date.trim();
    let regex = /^(?<d>\d{2})\.(?<m>\d{2})\.(?<y>\d{4})$/;
    let match = regex.exec(date);
    let notValidDateError = new Error("Not valid day format");

    if (match == null) throw notValidDateError;

    let {y, m, d} = match.groups;

    if (!isValidDate(y, m, d)) throw notValidDateError;

    let key = `${m}-${d}`; 
    let holiday = usaHolidays[key];
    date = `${m}/${d}/${y}`; 
    console.log(date, holiday ? `(${holiday})`: "");
    return date;
}

//test cases

let date1 = fromUSAToGermany(" 11/01/2022" );
let date2 = fromGermanyToUSA("10.11.2022");
let date3 = fromGermanyToUSA("04.07.2022")
