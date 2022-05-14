import { TestBed } from '@angular/core/testing';
import { DayjsDateConstants } from './dayjs.date.constants';
import { DayjsDateService } from './dayjs.date.service';

fdescribe('DateService', () => {
  let dateService: DayjsDateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    dateService = TestBed.inject(DayjsDateService);
  });

  it('should be created', () => {
    expect(dateService).toBeTruthy();
  });

  it('should parse when parseFormatDateString is called', () => {
    expect(
      dateService.parseFormatDateString(
        '20201231',
        DayjsDateConstants.ClientFormat,
        DayjsDateConstants.ProgramDateFormat
      )
    ).toBe('31-Dec-2020');
  });

  it('should parse Epoch date to requested date format', () => {
    expect(dateService.parseEpoch(1610499793000, DayjsDateConstants.ProgramDateFormat)).toBe('13-Jan-2021');
  });

  it('should format date to requested format', () => {
    expect(dateService.formatDate(new Date(2020, 4, 6), DayjsDateConstants.ClientFormat)).toBe('20200506');
  });

  it('should get todays date', () => {
    expect(dateService.getToday().getDate()).toBe(new Date().getDate());
  });

  it('should format datepicker time', () => {
    expect(dateService.formatFromDatePicker('06052020', DayjsDateConstants.ClientFormat)).toBe('20200506');
  });

  it('should add days to date', () => {
    const expectedDate = new Date();
    expectedDate.setDate(expectedDate.getDate() + 5);
    const actualDate = dateService.addDays(5);
    expect(actualDate.getDate()).toBe(expectedDate.getDate());
    expect(actualDate.getMonth()).toBe(expectedDate.getMonth());
    expect(actualDate.getFullYear()).toBe(expectedDate.getFullYear());
  });

  it('should subtract months from date', () => {
    const expectedDate = new Date();
    expectedDate.setMonth(expectedDate.getMonth() - 5);
    const actualDate = dateService.subMonths(5);
    expect(actualDate.getDate()).toBe(expectedDate.getDate());
    expect(actualDate.getMonth()).toBe(expectedDate.getMonth());
    expect(actualDate.getFullYear()).toBe(expectedDate.getFullYear());
  });

  it('should subtract years from date', () => {
    const expectedDate = new Date();
    expectedDate.setFullYear(expectedDate.getFullYear() - 5);
    const actualDate = dateService.subYears(5);
    expect(actualDate.getFullYear()).toBe(expectedDate.getFullYear());
  });

  it('should add months from date', () => {
    const expectedDate = new Date();
    expectedDate.setMonth(expectedDate.getMonth() + 5);
    const actualDate = dateService.addMonths(5);
    expect(actualDate.getDate()).toBe(expectedDate.getDate());
    expect(actualDate.getMonth()).toBe(expectedDate.getMonth());
    expect(actualDate.getFullYear()).toBe(expectedDate.getFullYear());
  });

  it('should check if its same day', () => {
    expect(dateService.isSameDay(new Date(2020, 1, 3), new Date(2020, 1, 3))).toBeTrue();
  });

  it('should convert miliseconds to date', () => {
    expect(dateService.convertMillisecondsToDate(1610505090586)).toBe('13-Jan-2021');
  });

  it('should check if date is before present day', () => {
    expect(dateService.isBefore('20090506')).toBeTrue();
  });
});
