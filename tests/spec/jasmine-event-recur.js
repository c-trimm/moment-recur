'use strict';

// Getting rid of jshint warnings (the yellow lines and exclaimation points are annoying)
var jasmine = jasmine, describe = describe, it = it, moment = moment, expect = expect, beforeEach = beforeEach;


// TODO:
// Unset Rule
// Override Rule
// Export/Import Rules
// Export/Import Settings


describe("Moment-Recur Tests:", function() {
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
});