import { ordreCutoff } from "@/utils/ordre";
import {
  Calendar,
  CalendarControls,
  CalendarDate,
  CalendarDays,
  CalendarMonth,
  CalendarMonthName,
  CalendarMonths,
  CalendarNextButton,
  CalendarPrevButton,
  CalendarValues,
  CalendarWeek,
} from "@uselessdev/datepicker";
import { da } from "date-fns/locale";
import Holidays from "date-holidays";
import * as React from "react";
const hd = new Holidays("DK");
interface KalenderProps {
  value?: Date;
  disabledDates?: Date[];
  onChange: (date: Date) => void;
}

function isCalendarDate(
  date: CalendarDate | CalendarValues
): date is CalendarDate {
  return (date as CalendarValues).start === undefined;
}

export default function Kalender({
  value,
  onChange,
  disabledDates = [],
}: KalenderProps) {
  const handleSelectDate = (date: CalendarDate | CalendarValues) => {
    if (isCalendarDate(date)) {
      onChange(new Date(date.valueOf()));
    }
  };

  return (
    <Calendar
      weekStartsOn={1}
      value={{ start: value }}
      onSelectDate={handleSelectDate}
      locale={da}
      disableDates={disabledDates}
      disableFutureDates={ordreCutoff}
      disablePastDates
      singleDateSelection
    >
      <CalendarControls>
        <CalendarPrevButton />
        <CalendarNextButton />
      </CalendarControls>

      <CalendarMonths>
        <CalendarMonth>
          <CalendarMonthName />
          <CalendarWeek />
          <CalendarDays />
        </CalendarMonth>
      </CalendarMonths>
    </Calendar>
  );
}
