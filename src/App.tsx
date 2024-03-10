import React, { useState, useEffect, useRef } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from "@fullcalendar/interaction";
import timeGridPlugin from '@fullcalendar/timegrid';
import './App.css';
import ukLocale from '@fullcalendar/core/locales/uk';
import { generateEvents, Event  } from './generateEvents';
import { DatesSetArg } from '@fullcalendar/core';

const App: React.FC = () => {
  /*
    По суті костомні хендлери на кнопки не потрібні,
    зрозумів це після того як побачив datesSet

    Не буду видалять, хай будуть як приклад
  */
  /*
    Кст з datesSet є проблемка,
    при першому рендері - функція викликається двічі
  */
  const [events, setEvents] = useState<Event[]>([]);
  const calendarRef = useRef<FullCalendar>(null);
  
  useEffect(() => {
    setEvents(generateEvents());
  }, []);

  const handleOnTodayButtonClick = () => {
    //custom action
    if (calendarRef.current) calendarRef.current.getApi().today();
  }
  const handleOnPrevButtonClick = () => {
    //custom action
    if (calendarRef.current) calendarRef.current.getApi().prev();
  }
  const handleOnNextButtonClick = (ev: MouseEvent, element: HTMLElement) => {
    //custom action
    if (calendarRef.current) calendarRef.current.getApi().next();
  }
  
  return (
    <div className='app'>
      <FullCalendar
        ref={calendarRef}
        events={events}
        plugins={[ dayGridPlugin, timeGridPlugin, interactionPlugin ]}
        initialView="timeGridWeek"
        allDaySlot={false} // прибирає слот зверху, який показує івент, що займає весь день
        slotLabelFormat={{ hour: '2-digit', minute: '2-digit', hour12: false }} // 1PM -> 13:00 
        locale={ukLocale} // 24:00 -> 0:00 + локалізація
        firstDay={1} // робить Пон першим днем
        dayHeaderFormat={{ weekday: 'short', day: '2-digit' }} // Mon 17.03 -> Mon 17
        contentHeight="auto" // прибирає скрол
        customButtons={{
          prev: { click: handleOnPrevButtonClick },
          next: { click: handleOnNextButtonClick },
          today: { text: "Сьогодні", click: handleOnTodayButtonClick }
        }}
        datesSet={(arg: DatesSetArg) => {
          console.log(`[${arg.startStr} - ${arg.endStr}]`);
          setEvents(generateEvents());
        }}
        eventClick={info => alert(`Ви натиснули на подію: ${info.event.title}\n Початок: ${info.event.start}\n Кінець: ${info.event.end}`)}
      />
    </div>
  );
};

export default App;
