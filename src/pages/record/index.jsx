import { RecordView } from "./view"
import { PageContext } from '../../lib/context.js'
import { useState } from "react"
import { getRecords } from "../../lib/api"

export const Record = () => {
  const [attendanceRecord, setAttendanceRecord] = useState([])
  const formatAMPM = (date) => {
    let hours = date.getHours();
    let minutes = date.getMinutes();
    const ampm = hours >= 12 ? 'pm' : 'am';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? '0'+minutes : minutes;
    var strTime = hours + ':' + minutes + ' ' + ampm;
    return strTime;
  }

  const changeDate = async (e) => {
    try {
      const date = new Date(e.date)
      const payload = {
        day: date.getDate(),
        month: date.getMonth(),
        year: date.getFullYear()
      }
      const result = await getRecords(payload)
      setAttendanceRecord(result.data.data.map(item => {
        return(
          {
            key: item._id,
            attendance: <p className="uppercase">{item.attendance.title}</p> ,
            username: `${item.user.firstName} ${item.user.lastName}`,
            clockIn: item.clockIn ? `${formatAMPM(new Date(item.clockIn))}` : "None",
            clockOut: item.clockOut ? `${formatAMPM(new Date(item.clockOut))}` : "None",
          }
        )
      }))
    } catch (error) {
      console.log(error)
    }
  }

    const values = {
      attendanceRecord,
      changeDate
    }
  return (
    <PageContext.Provider value={values}>
        <RecordView />
    </PageContext.Provider>
  )
}
