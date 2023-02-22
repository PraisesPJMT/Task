import { SetStateAction, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faChevronCircleLeft,
  faChevronCircleRight,
} from '@fortawesome/free-solid-svg-icons';
import { DAYS, MONTHS } from '../../utilities/Data';
import './DatePicker.scss';

const getNumberOfDaysInMonth = (year: number, month: number) => {
  return new Date(year, month + 1, 0).getDate();
};

const range = (start: number, end: number, year: number, month: number) => {
  const length = Math.abs((end - start) / 1);
  const startDay = new Date(year, month, 1).getDay();

  const { result } = Array.from({ length }).reduce(
    ({ result, current, day }) => ({
      result: [...result, { date: current, day: day }],
      current: current + 1,
      day: day + 1 < 7 ? day + 1 : 0,
    }),
    { result: [], current: start, day: startDay }
  );

  return result;
};

const isToday = (
  year: number,
  month: number,
  date: number,
  calDate: number
) => {
  return (
    new Date(year, month, calDate).toString().slice(0, 15) ===
    new Date(year, month, date).toString().slice(0, 15)
  );
};

interface DatePickerProps {
  year: number;
  month: number;
  date: number;
  setYear: React.Dispatch<SetStateAction<number>>;
  setMonth: React.Dispatch<SetStateAction<number>>;
  setDate: React.Dispatch<SetStateAction<number>>;
}

const DatePicker: React.FC<DatePickerProps> = ({
  year,
  month,
  date,
  setYear,
  setMonth,
  setDate,
}) => {
  const prevMonth = () => {
    if (month > 0) {
      setMonth((prev) => prev - 1);
    } else {
      setMonth(11);
      setYear((prev) => prev - 1);
    }
  };

  const nextMonth = () => {
    if (month < 11) {
      setMonth((prev) => prev + 1);
    } else {
      setMonth(0);
      setYear((prev) => prev + 1);
    }
  };

  const getDayColor = (day: number): string => {
    if (day === 0) return '#CEEAF3';
    if (day === 6) return '#aababc88';
    return '#fff';
  };

  return (
    <section id="date-picker">
      <div className="header">
        <button type="button" onClick={prevMonth}>
          <FontAwesomeIcon icon={faChevronCircleLeft} />
          {month > 0 ? MONTHS[month - 1] : MONTHS[11]}
        </button>
        <h4>
          {MONTHS[month]} {year}
        </h4>
        <button type="button" onClick={nextMonth}>
          {month < 11 ? MONTHS[month + 1] : MONTHS[0]}
          <FontAwesomeIcon icon={faChevronCircleRight} />
        </button>
      </div>
      <div className="body">
        <div className="days">
          {range(1, getNumberOfDaysInMonth(year, month) + 1, year, month).map(
            (day, index) => (
              <button
                type="button"
                key={index}
                onClick={() => setDate(day.date)}
                style={{
                  background: isToday(year, month, day.date, date)
                    ? '#e9aca6aa'
                    : getDayColor(day.day),
                }}
              >
                <span>{day.date}</span>
                <span>{DAYS[day.day].slice(0, 3)}</span>
              </button>
            )
          )}
        </div>
      </div>
    </section>
  );
};

export default DatePicker;
