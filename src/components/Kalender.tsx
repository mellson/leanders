import { ordreCutoff, ordreStart } from "@/utils/ordre";
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
import { eachWeekendOfInterval, isSunday, parseISO } from "date-fns";
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

  const soendage = eachWeekendOfInterval({
    start: new Date(),
    end: ordreCutoff,
  }).filter(isSunday);

  const helligdage = hd
    .getHolidays(ordreStart)
    .map((helligdag) => parseISO(helligdag.date)); // Her bruger vi parseISO fra date-fns, da en alm. new Date() ikke virker på iPhone

  console.log(helligdage);

  const datoerHvorManIkkeKanBestille = [
    ...soendage,
    ...helligdage,
    ...disabledDates,
  ];

  return (
    <Calendar
      weekStartsOn={1}
      value={{ start: value }}
      onSelectDate={handleSelectDate}
      locale={da}
      disableDates={datoerHvorManIkkeKanBestille}
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
