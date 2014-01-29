'use strict';

// Getting rid of jshint warnings (the yellow lines and exclaimation points are annoying)
var jasmine = jasmine, describe = describe, it = it, moment = moment, expect = expect, beforeEach = beforeEach;


// TOTEST:
// Fixed Date Types
// Array Units
// Override Rule
// Export Rules
// Export Settings
// Import rules/settings on creation
// Repeats function
// Forget Rules
// getNext/getPrevious

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
    
    it("'startOfWeek' should be getable/setable with startOfWeekDay()", function() {
        recur.startOfWeekDay(1);
        expect(recur.startOfWeekDay()).toBe(1);
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
    it("can be daily", function() {
        var recurrence = moment(startDate).recur().every(2).days();
        expect(recurrence.matches( moment(startDate).add(2, "days") )).toBe(true);
    });
    
    it("can be weekly", function() {
        var recurrence = moment(startDate).recur().every(2).weeks();
        expect(recurrence.matches( moment(startDate).add(2, "weeks") )).toBe(true);
    });
    
    it("can be monthly", function() {
        var recurrence = moment(startDate).recur().every(3).months();
        expect(recurrence.matches( moment(startDate).add(3, "months") )).toBe(true);
    });
    
    it("can be yearly", function() {
        var recurrence = moment(startDate).recur().every(1).years();
        expect(recurrence.matches( moment(startDate).add(1, "year") )).toBe(true);
    });
    
    it("can match an array of intervals", function() {
        var recurrence = moment(startDate).recur().every([3,5]).days();
        expect(recurrence.matches( moment(startDate).add(3, "days"))).toBe(true);
        expect(recurrence.matches( moment(startDate).add(5, "days"))).toBe(true);
    });
    
    it("can be compound", function() {
        var recurrence = moment(startDate).recur().every(3).days().every(1).month();
        expect(recurrence.matches( moment(startDate).add(3, "days").add(1, "month") )).toBe(true);
    });
});


describe("every", function() {
    var today, recur, next;
    
    beforeEach(function() {
        today = moment(startDate);
        next = today.clone();
        recur = today.recur();
    });
    
    it("interval should not match a date before the start date", function() {
        var before = today.clone().subtract(1, "day");
        recur.every(1, "day");
        expect(recur.matches(before)).toBe(false);
    });
    
    it("interval should not match a date after the end date", function() {
        var after = moment(endDate).add(1, "day");
        recur.endDate(endDate).every(1, "day");
        expect(recur.matches(after)).toBe(false);
    });
    
    it("interval should match at specified intervals", function() {
        var matches;
        
        recur.every([2, 5], "days");
        
        matches = recur.matches(next.add(2, "days")); // 2 days
        expect(matches).toBe(true);
        
        matches = recur.matches(next.add(3, "days")); // 5 days
        expect(matches).toBe(true);
        
        matches = recur.matches(next.add(2, "days")); // 7 days
        expect(matches).toBe(false);
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