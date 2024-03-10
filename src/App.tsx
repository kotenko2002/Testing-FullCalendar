import React, { useState, useEffect, useRef } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from "@fullcalendar/interaction";
import timeGridPlugin from '@fullcalendar/timegrid';
import './App.css';
import ukLocale from '@fullcalendar/core/locales/uk';
import { generateEvents, Event  } from './generateEvents';

const App: React.FC = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const calendarRef = useRef<FullCalendar>(null);
  
  useEffect(() => {
    setEvents(generateEvents());
  }, []);

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
        dayHeaderFormat={{ weekday: 'long', day: '2-digit' }} // Mon 17.03 -> Mon 17
        contentHeight="auto" // прибирає скрол
        customButtons={{
          prev: {
            click: () => {
              console.log(1);
              if (calendarRef.current) {
                let calendarApi = calendarRef.current.getApi();
                calendarApi.prev();
              }
            }
          }
        }}
        eventClick={info => alert(`Ви натиснули на подію: ${info.event.title}\n Початок: ${info.event.start}\n Кінець: ${info.event.end}`)}
      />
    </div>
  );
};

export default App;
