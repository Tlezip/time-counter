import { useState, useEffect } from 'react'
import dayjs from 'dayjs'
import './App.css';
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter'

dayjs.extend(isSameOrAfter)

const startTime = '2021-04-11 23:03:00'
const timeFormat = 'YYYY-MM-DD HH:mm:ss'

const getDayToShow = (currentTimeObject) => {
  const startTimeObject = dayjs(startTime, timeFormat)
  const currentMonth = currentTimeObject.month()
  const anniversaryThisMonthObject = startTimeObject.set('month', currentMonth)
  const anniversaryLastMonthObject = startTimeObject.set('month', currentMonth - 1)
  const isSameOrAfterAnniversaryThisMonth = currentTimeObject.isSameOrAfter(anniversaryThisMonthObject)
  if (isSameOrAfterAnniversaryThisMonth) {
    return currentTimeObject.diff(anniversaryThisMonthObject, 'day')
  }
  return currentTimeObject.diff(anniversaryLastMonthObject, 'day')
}

function App() {
  const [currentTimeObject, setCurrentTimeObject] = useState(dayjs())
  useEffect(() => {
    setInterval(() => {
      setCurrentTimeObject(dayjs())
    }, 1000)
  }, [])
  const startTimeObject = dayjs(startTime, timeFormat)
  const yearToShow = currentTimeObject.diff(startTimeObject, 'year')
  const monthToShow = currentTimeObject.diff(startTimeObject, 'month') % 12
  const dayToShow = getDayToShow(currentTimeObject)
  const hourToShow = currentTimeObject.diff(startTimeObject, 'hour') % 24
  const minToShow = currentTimeObject.diff(startTimeObject, 'minute') % 60
  const secToShow = currentTimeObject.diff(startTimeObject, 'second') % 60
  return (
    <div className="App">
      <header className="App-header">
        <h1 className="app__header-text">
          How long have we been talking?
        </h1>
      </header>
      <div className="app__content">
        <div className="app__time-block">
          <div className="app__time">
            {yearToShow}
          </div>
          <p className="app__time-type">
            Year{yearToShow > 1 ? 's' : ''}
          </p>
        </div>
        <div className="app__time-block">
          <div className="app__time">
            {monthToShow}
          </div>
          <p className="app__time-type">
            Month{monthToShow > 1 ? 's' : ''}
          </p>
        </div>
        <div className="app__time-block">
          <div className="app__time">
            {dayToShow}
          </div>
          <p className="app__time-type">
            Days
          </p>
        </div>
        <div className="app__time-block">
          <div className="app__time">
            {hourToShow}
          </div>
          <p className="app__time-type">
            Hours
          </p>
        </div>
        <div className="app__time-block">
          <div className="app__time">
            {minToShow}
          </div>
          <p className="app__time-type">
            Minutes
          </p>
        </div>
        <div className="app__time-block">
          <div className="app__time">
            {secToShow}
          </div>
          <p className="app__time-type">
            Seconds
          </p>
        </div>
      </div>
    </div>
  );
}

export default App;
