import React, { useState, useEffect } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from "@fullcalendar/interaction";
import timeGridPlugin from '@fullcalendar/timegrid';
import moment from 'moment';
import './App.css';
import ukLocale from '@fullcalendar/core/locales/uk';

type Event = {
  start: Date;
  end: Date;
  title: string;
};

const App: React.FC = () => {
  const [events, setEvents] = useState<Event[]>([]);

  useEffect(() => {
    const generateEvents = () => {
      let newEvents: Event[] = [];
      let currentEventStart = moment();

      for (let i = 1; i <= 100; i++) {
        let eventDuration = Math.floor(Math.random() * 3) + 1;
        let eventEnd = moment(currentEventStart).add(eventDuration, "hours");

        // Перевірка, чи подія закінчується в той же день
        if (eventEnd.day() !== currentEventStart.day()) {
          eventEnd = moment(currentEventStart).endOf('day');
        }

        currentEventStart = currentEventStart.startOf('hour').minutes(Math.round(currentEventStart.minute() / 5) * 5);
        eventEnd = eventEnd.startOf('hour').minutes(Math.round(eventEnd.minute() / 5) * 5);

        newEvents.push({
          start: currentEventStart.toDate(),
          end: eventEnd.toDate(),
          title: `Подія ${i}`
        });

        currentEventStart = moment(eventEnd).add(1, "hours");
      }

      return newEvents;
    };

    setEvents(generateEvents());
  }, []);

  return (
    <div className='app'>
      <FullCalendar
        plugins={[ dayGridPlugin, timeGridPlugin, interactionPlugin ]}
        initialView="timeGridWeek"
        allDaySlot={false} // прибирає слот зверху, який показує івент, що займає весь день
        slotLabelFormat={{ hour: '2-digit', minute: '2-digit', hour12: false }} // робить 13:00 замість 1PM
        locale={ukLocale} // робить 0:00 замість 24:00 + локалізація
        firstDay={1} // робить Пон першим днем
        dayHeaderFormat={{ weekday: 'long', day: '2-digit' }}
        locales={[ ukLocale ]}
        events={events}
        eventClick={info => alert(`Ви натиснули на подію: ${info.event.title}\n Початок: ${info.event.start}\n Кінець: ${info.event.end}`)}
      />
    </div>
  );
};

export default App;
