import { Injectable } from '@angular/core';
import dayjs, { ConfigType } from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import tz from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';
import { DayjsDateConstants } from './dayjs.date.constants';

@Injectable({
  providedIn: 'root'
})
export class DayjsDateService {
  /**
   *
   */
  constructor() {
    dayjs.extend(utc);
    dayjs.extend(tz);
    dayjs.extend(customParseFormat);
  }

  public parseFormatDateString(date: string | number, currentFormat: string, returnFormat: string): string {
    const dateString = typeof date === 'number' ? date?.toString() : date;
    return dayjs(dateString, currentFormat).format(returnFormat);
  }

  public parseEpoch(date: number, returnFormat: string): string {
    return dayjs(date).format(returnFormat);
  }

  public formatDate(
    dateString: ConfigType,
    returnFormat = DayjsDateConstants.YearMonthDayFormat,
    timezone = ''
  ): string {
    let date = dayjs(dateString);
    if (timezone) {
      date = dayjs.tz(dateString, timezone);
    }
    return date.format(returnFormat);
  }

  public formatDateUtc(dateString: Date, returnFormat: string): string {
    return dayjs(dateString).utc().format(returnFormat);
  }

  public getToday(): Date {
    return new Date();
  }

  public formatFromDatePicker(dateString: string, returnFormat = DayjsDateConstants.YearMonthDayFormat): string {
    return dayjs(dateString, DayjsDateConstants.DayMonthYearFormat).format(returnFormat);
  }

  public addDays(noOfDays: number): Date {
    return dayjs().add(noOfDays, 'day').toDate();
  }

  public subMonths(noOfMonths: number): Date {
    return dayjs().subtract(noOfMonths, 'month').toDate();
  }

  public subYears(noOfYears: number): Date {
    return dayjs().subtract(noOfYears, 'year').toDate();
  }

  public addMonths(noOfMonths: number): Date {
    return dayjs().add(noOfMonths, 'month').toDate();
  }

  public isSameDay(dayOne: Date, dayTwo: Date): boolean {
    return dayjs(dayOne).isSame(dayTwo, 'day');
  }

  public convertMillisecondsToDate(timeStamp: number): string {
    return dayjs(timeStamp).toString();
  }

  public isBeforeToday(date: string): boolean {
    return dayjs(date, DayjsDateConstants.YearMonthDayFormat).isBefore(new Date());
  }

  public isBefore(dateOne: string, dateTwo: string): boolean {
    return dayjs(dateOne, DayjsDateConstants.YearMonthDayFormat).isBefore(dateTwo);
  }

  public addWeeks(date: string, noOfWeeks: number): Date {
    return dayjs(date).add(noOfWeeks, 'week').toDate();
  }
}
