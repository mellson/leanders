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
import {
  eachWeekendOfInterval,
  eachWeekOfInterval,
  format,
  isSunday,
} from "date-fns";
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

  const fredageIuligeUger = eachWeekOfInterval(
    {
      start: ordreStart,
      end: ordreCutoff,
    },
    { weekStartsOn: 5, locale: da }
  ).filter((fredag) => {
    const ugeNummerString = format(fredag, "w", { locale: da });
    const ugeNummer = parseInt(ugeNummerString);
    return ugeNummer % 2 !== 0;
  });

  const soendage = eachWeekendOfInterval({
    start: new Date(),
    end: ordreCutoff,
  }).filter(isSunday);

  const helligdage = hd
    .getHolidays(ordreStart)
    .map((helligdag) => new Date(helligdag.date));

  const datoerHvorManIkkeKanBestille = [
    ...soendage,
    ...fredageIuligeUger,
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
