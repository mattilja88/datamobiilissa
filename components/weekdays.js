import { format, isAfter, isBefore, parse } from 'date-fns';

const getWeekNumber = (currentDate) => {
    const weekRanges = [
        // Week 1
        { start: '2024-08-16', end: '2024-08-23', week: 1 },
        // Week 2
        { start: '2024-08-24', end: '2024-08-30', week: 2 },
        // Week 3
        { start: '2024-08-31', end: '2024-09-06', week: 3 },
        
        // Syyskuun maajoukkuetauko (2.-10.9.2024) - ei viikkoa
        
        // Week 4
        { start: '2024-09-11', end: '2024-09-17', week: 4 },
        // Week 5
        { start: '2024-09-18', end: '2024-09-24', week: 5 },
        // Week 6
        { start: '2024-09-25', end: '2024-10-01', week: 6 },
        
        // Lokakuun maajoukkuetauko (7.-15.10.2024) - ei viikkoa
        
        // Week 7
        { start: '2024-10-05', end: '2024-10-12', week: 7 },
        // Week 8
        { start: '2024-10-13', end: '2024-10-19', week: 8 },
        // Week 9
        { start: '2024-10-20', end: '2024-10-26', week: 9 },
        // Week 10
        { start: '2024-10-27', end: '2024-11-02', week: 10 },
        
        // Marraskuun maajoukkuetauko (11.-19.11.2024) - ei viikkoa
        
        // Week 11 (Modified as per request)
        { start: '2024-11-09', end: '2024-11-10', week: 11 },
        // Week 12
        { start: '2024-11-11', end: '2024-11-17', week: 12 },
        // Week 13
        { start: '2024-11-18', end: '2024-11-24', week: 13 },
        // Week 14
        { start: '2024-11-25', end: '2024-12-01', week: 14 },
        // Week 15
        { start: '2024-12-02', end: '2024-12-08', week: 15 },
        // Week 16
        { start: '2024-12-09', end: '2024-12-15', week: 16 },
        // Week 17
        { start: '2024-12-16', end: '2024-12-22', week: 17 },
        // Week 18
        { start: '2024-12-23', end: '2024-12-29', week: 18 },
      
        // Week 19
        { start: '2024-12-30', end: '2025-01-05', week: 19 },
        // Week 20
        { start: '2025-01-06', end: '2025-01-12', week: 20 },
        // Week 21
        { start: '2025-01-13', end: '2025-01-19', week: 21 },
        // Week 22
        { start: '2025-01-20', end: '2025-01-26', week: 22 },
        // Week 23
        { start: '2025-01-27', end: '2025-02-02', week: 23 },
        // Week 24
        { start: '2025-02-03', end: '2025-02-09', week: 24 },
        // Week 25
        { start: '2025-02-10', end: '2025-02-16', week: 25 },
        // Week 26
        { start: '2025-02-17', end: '2025-02-23', week: 26 },
        // Week 27
        { start: '2025-02-24', end: '2025-03-02', week: 27 },
      
        // Maaliskuun maajoukkuetauko (24.3.-1.4.2025) - ei viikkoa
      
        // Week 28
        { start: '2025-04-02', end: '2025-04-08', week: 28 },
        // Week 29
        { start: '2025-04-09', end: '2025-04-15', week: 29 },
        // Week 30
        { start: '2025-04-16', end: '2025-04-22', week: 30 },
        // Week 31
        { start: '2025-04-23', end: '2025-04-29', week: 31 },
        // Week 32
        { start: '2025-04-30', end: '2025-05-06', week: 32 },
        // Week 33
        { start: '2025-05-07', end: '2025-05-13', week: 33 },
        // Week 34
        { start: '2025-05-14', end: '2025-05-20', week: 34 },
        // Week 35
        { start: '2025-05-21', end: '2025-05-27', week: 35 },
        // Week 36
        { start: '2025-05-28', end: '2025-06-03', week: 36 },
        // Week 37
        { start: '2025-06-04', end: '2025-06-10', week: 37 },
        // Week 38
        { start: '2025-05-25', end: '2025-05-31', week: 38 },
      ];      
      
  
    for (let range of weekRanges) {
      const startDate = parse(range.start, 'yyyy-MM-dd', new Date());
      const endDate = parse(range.end, 'yyyy-MM-dd', new Date());
  
      if (isAfter(currentDate, startDate) && isBefore(currentDate, endDate)) {
        return range.week;
      }
    }
  
    return null;
  };

  export default getWeekNumber