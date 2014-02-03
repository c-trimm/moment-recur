'use strict';

// Getting rid of jshint warnings (the yellow lines and exclaimation points are annoying)
var jasmine = jasmine, describe = describe, it = it, moment = moment, expect = expect, beforeEach = beforeEach;


// TOTEST:
// Export Rules
// Repeats function

var startDate = "01/01/2013";
var endDate = "01/01/2014";

describe("Creating a recurring moment", function() {
    
    var nowMoment = moment();
    var nowDate = nowMoment.format("L");
    
    
    it("from moment constructor, with options parameter - moment.recur(options)", function() {
        var recur = moment.recur({ start:startDate, end:endDate });
        expect(recur.start.format("L")).toBe(startDate);
        expect(recur.end.format("L")).toBe(endDate);
    });
    
    it("from moment constructor, with start parameter only - moment.recur(start)", function() {
        var recur = moment.recur(startDate);
        expect(recur.start.format("L")).toBe(startDate);
    });
    
    it("from moment constructor, with start and end parameters - moment.recur(start, end)", function() {
        var recur = moment.recur(startDate, endDate);
        expect(recur.start.format("L")).toBe(startDate);
        expect(recur.end.format("L")).toBe(endDate);
    });
    
    it("from moment function, with options parameter - moment().recur(options)", function() {
        var recur = moment().recur({ start:startDate, end:endDate });
        expect(recur.start.format("L")).toBe(startDate);
        expect(recur.end.format("L")).toBe(endDate);
    });
    
    it("from moment function, with start and end parameters - moment().recur(start, end)", function() {
        var recur = moment().recur(startDate, endDate);
        expect(recur.start.format("L")).toBe(startDate);
        expect(recur.end.format("L")).toBe(endDate);
    });
    
    it("from moment function, with starting moment and end parameter - moment(start).recur(end)", function() {
        var recur = moment(startDate).recur(endDate);
        expect(recur.start.format("L")).toBe(startDate);
        expect(recur.end.format("L")).toBe(endDate);
    });
    
    it("from moment function, starting now, with end parameter  - moment().recur(end)", function() {
        var recur = nowMoment.recur(endDate);
        expect(recur.start.format("L")).toBe(nowDate);
        expect(recur.end.format("L")).toBe(endDate);
    });
    
    it("from moment function, starting now - moment().recur()", function() {
        var recur = nowMoment.recur();
        expect(recur.start.format("L")).toBe(nowDate);
    });
});

describe("Setting", function() {
    var recur;
    
    beforeEach(function() {
        recur = moment().recur();
    });
    
    it("'start' should be getable/setable with startDate()", function() {
        recur.startDate(startDate);
        expect(recur.startDate().format("L")).toBe(startDate);
    });
    
    it("'end' should be getable/setable with endDate()", function() {
        recur.endDate(endDate);
        expect(recur.endDate().format("L")).toBe(endDate);
    });
    
    it("'from' should be getable/setable with fromDate()", function() {
        recur.fromDate(startDate);
        expect(recur.fromDate().format("L")).toBe(startDate);
    });
});

describe("The every() function", function() {
    it("should create a rule when a unit and measurement is passed", function() {
        var recurrence = moment().recur().every(1, "day");
        expect(recurrence.save().rules.length).toBe(1);
    });
    
    it("should not create a rule when only a unit is passed", function() {
        var recurrence = moment().recur().every(1);
        expect(recurrence.save().rules.length).toBe(0);
    });
    
    it("should set the temporary units property", function() {
        var recurrence = moment().recur().every(1);
        expect(recurrence.units).not.toBeNull();
    });
    
    it("should accept an array", function() {
        var recurrence = moment().recur().every([1, 2]);
        expect(recurrence.units).not.toBeNull();
    });
});

describe("An interval", function() {
    it("should not match a date before the start date", function() {
        var start = moment(startDate);
        var before = start.clone().subtract(1, "day");
        var recurrence = start.recur();
        recurrence.every(1, "day");
        expect(recurrence.matches(before)).toBe(false);
    });
    
    it("should not match a date after the end date", function() {
        var start = moment(startDate);
        var after = moment(endDate).add(1, "day");
        var recurrence = start.recur();
        recurrence.endDate(endDate).every(1, "day");
        expect(recurrence.matches(after)).toBe(false);
    });
    
    it("can be daily", function() {
        var recurrence = moment(startDate).recur().every(2).days();
        expect(recurrence.matches( moment(startDate).add(2, "days") )).toBe(true);
        expect(recurrence.matches( moment(startDate).add(3, "days") )).toBe(false);
    });
    
    it("can be weekly", function() {
        var recurrence = moment(startDate).recur().every(2).weeks();
        expect(recurrence.matches( moment(startDate).add(2, "weeks") )).toBe(true);
        expect(recurrence.matches( moment(startDate).add(3, "weeks") )).toBe(false);
    });
    
    it("can be monthly", function() {
        var recurrence = moment(startDate).recur().every(3).months();
        expect(recurrence.matches( moment(startDate).add(3, "months") )).toBe(true);
        expect(recurrence.matches( moment(startDate).add(2, "months") )).toBe(false);
    });
    
    it("can be yearly", function() {
        var recurrence = moment(startDate).recur().every(2).years();
        expect(recurrence.matches( moment(startDate).add(2, "year") )).toBe(true);
        expect(recurrence.matches( moment(startDate).add(3, "year") )).toBe(false);
    });
    
    it("can be an array of intervals", function() {
        var recurrence = moment(startDate).recur().every([3,5]).days();
        expect(recurrence.matches( moment(startDate).add(3, "days"))).toBe(true);
        expect(recurrence.matches( moment(startDate).add(5, "days"))).toBe(true);
        expect(recurrence.matches( moment(startDate).add(4, "days"))).toBe(false);
    });
});

describe("The Calendar Interval", function() {
    it("daysOfWeek should work", function() {
        var recurrence = moment.recur().every(["Sunday", 1]).daysOfWeek();
        expect(recurrence.matches( moment().day("Sunday") )).toBe(true);
        expect(recurrence.matches( moment().day(1) )).toBe(true);
        expect(recurrence.matches( moment().day(3) )).toBe(false);
    }); 
    
    it("daysOfMonth should work", function() {
        var recurrence = moment.recur().every([1, 10]).daysOfMonth();
        expect(recurrence.matches( moment().date(1) )).toBe(true);
        expect(recurrence.matches( moment().date(10) )).toBe(true);
        expect(recurrence.matches( moment().date(15) )).toBe(false);
    });
    
    it("weeksOfMonth should work", function() {
        var recurrence = moment.recur().every([1, 3]).weeksOfMonth();
        expect(recurrence.matches( moment(startDate).date(6) )).toBe(true);
        expect(recurrence.matches( moment(startDate).date(26) )).toBe(true);
        expect(recurrence.matches( moment(startDate).date(27) )).toBe(false);
    }); 
    
    it("weeksOfYear should work", function() {
        var recurrence = moment.recur().every(20).weekOfYear();
        expect(recurrence.matches( moment("05/14/2014") )).toBe(true);
        expect(recurrence.matches( moment(startDate) )).toBe(false);
    }); 
    
    it("monthsOfYear should work", function() {
        var recurrence = moment.recur().every("January").monthsOfYear();
        expect(recurrence.matches( moment().month("January") )).toBe(true);
        expect(recurrence.matches( moment().month("February") )).toBe(false);
    }); 
    
    it("rules can be combined", function() {
        var valentines = moment.recur().every(14).daysOfMonth()
                                       .every("Februray").monthsOfYear();
        expect(valentines.matches( moment("02/14/2014") )).toBe(true);
        expect(valentines.matches( moment(startDate) )).toBe(false);
    });
    
    it("can be passed units, without every()", function() {
        var recurrence = moment.recur().daysOfMonth([1,3]);
        expect(recurrence.matches("01/01/2014")).toBe(true);
        expect(recurrence.matches("01/03/2014")).toBe(true);
        expect(recurrence.matches("01/06/2014")).toBe(false);
    });
});

describe("Rules", function() {
    it("should be overridden when duplicated", function() {
        var recurrence = moment("01/01/2014").recur().every(1).day();
        recurrence.every(2).days();
        expect(recurrence.rules.length).toBe(1);
    });
    
    it("should be forgettable", function() {
        var recurrence = moment("01/01/2014").recur().every(1).day();
        recurrence.forget("days");
        expect(recurrence.rules.length).toBe(0);
    });
});

describe("Future Dates", function() {
    it("can be generated", function() {
        var recurrence, nextDates;
        recurrence = moment("01/01/2014").recur().every(2).days();
        console.log(recurrence);
        nextDates = recurrence.next(3, "L");
        console.log(nextDates);
        expect(nextDates.length).toBe(3);
        expect(nextDates[0]).toBe("01/03/2014");
        expect(nextDates[1]).toBe("01/05/2014");
        expect(nextDates[2]).toBe("01/07/2014");
    });
    
    it("can start from a temporary 'from' date", function() {
        var recurrence, nextDates;
        recurrence = moment("01/01/2014").recur().every(2).days();
        recurrence.fromDate("02/05/2014");
        nextDates = recurrence.next(3, "L");
        expect(nextDates.length).toBe(3);
        expect(nextDates[0]).toBe("02/06/2014");
        expect(nextDates[1]).toBe("02/08/2014");
        expect(nextDates[2]).toBe("02/10/2014");
    });
});

describe("Previous Dates", function() {
    it("can be generated", function() {
        var recurrence, nextDates;
        recurrence = moment("01/01/2014").recur().every(2).days();
        nextDates = recurrence.previous(3, "L");
        expect(nextDates.length).toBe(3);
        expect(nextDates[0]).toBe("12/30/2013");
        expect(nextDates[1]).toBe("12/28/2013");
        expect(nextDates[2]).toBe("12/26/2013");
    });
});

describe("Exceptions", function() {
    var mo, exception, recur;
    
    beforeEach(function() {
        mo = moment(startDate);
        exception = mo.clone().add(1, "day");
        recur = mo.clone().recur().every(1, "days");
    });
    
    it("should prevent exception days from matching", function() {
        recur.except(exception);
        expect(recur.matches(exception)).toBe(false);
    });
    
    it("should be removeable", function() {
        recur.except(exception);
        recur.forget(exception);
        expect(recur.matches(exception)).toBe(true);
    });
});

describe("Options", function() {
    it("should be importable", function() {
        var recurrence = moment().recur({
            start: "01/01/2014",
            end: "12/31/2014",
            rules: [
                { units: {  2 : true }, measure: "days" }
            ],
            exceptions: ["01/05/2014"]
        });
        
        expect(recurrence.startDate().format("L")).toBe("01/01/2014");
        expect(recurrence.endDate().format("L")).toBe("12/31/2014");
        expect(recurrence.rules.length).toBe(1);
        expect(recurrence.exceptions.length).toBe(1);
        expect(recurrence.matches("01/03/2014")).toBe(true);
        expect(recurrence.matches("01/05/2014")).toBe(false);
    });
    
    it("shold be exportable", function() {
        var recurrence = moment("01/01/2014").recur("12/31/2014").every(2, "days").except("01/05/2014");
        var data = recurrence.save();
        expect(data.start).toBe("01/01/2014");
        expect(data.end).toBe("12/31/2014");
        expect(data.exceptions[0]).toBe("01/05/2014");
        expect(data.rules[0].units[2]).toBe(true);
        expect(data.rules[0].measure).toBe("days");
    });
});

describe("The repeats() function", function() {
    it("should return true when there are rules set", function() {
        var recurrence = moment().recur().every(1).days();
        expect(recurrence.repeats()).toBe(true);
    });
    
    it("should return false when there are no rules set", function() {
        var recurrence = moment().recur();
        expect(recurrence.repeats()).toBe(false);
    });
});