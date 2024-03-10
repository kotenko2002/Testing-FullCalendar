import moment from 'moment';

export type Event = {
  start: Date;
  end: Date;
  title: string;
};

export const generateEvents = (): Event[] => {
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
