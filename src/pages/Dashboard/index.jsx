import { useEffect, useState } from "react"
import { createClockInRecord, getAllAttendance, getAttendance, getAttendanceRecord } from "../../lib/api"
import { PageContext } from "../../lib/context"
import { auth } from "../../lib/services"
import { DashboardView } from "./view"
import {Html5QrcodeScanner} from 'html5-qrcode'
import { message } from 'antd';

export const Dashboard = () => {
  const user = auth.getUserInfo()
  const [attendances, setAttendances] = useState([])
  const [selectAttendance, setSelectAttendance] = useState(null)
  const [attendanceRecord, setAttendanceRecord] = useState([])
  const [modal, setModal] = useState(false)
  const [loader, setLoader] = useState(true)

  const days = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat'];


  const [messageApi, contextHolder] = message.useMessage();
  const popUp = (type, content) => {
      messageApi.open({
        type,
        content,
      });
  };
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
  
  const fetchAttendanceList = async() => {
    try {
        const result = await getAllAttendance()
        const data = result?.data?.data?.filter((item) => {
          const today = days[new Date().getDay()];
          if(item.daysInAWeek.includes(today)){
            return item
          }
        }).map((item) => {
          return (
            {
              value: item._id,
              label: <p className="uppercase">{item.title}</p>,
            }
          )
        })
        setAttendances(data)
       
     } catch (error) {
        console.log(error)
        setAttendances([])
     }
  }

  const hanldeChangeAttendance = async (e) => {
    try {
      const result = await getAttendance({attendanceId: e})
      const item =result.data.data
      const clockInData = new Date(item.clockIn)
      const clockInCuttOffData = new Date(item.clockInCutOff)
      const clockOutData = new Date(item.clockOut)
      const clockOutCuttOffData = new Date(item.clockOutCutOff)
      setSelectAttendance({
        ...item,
        timeIn: `${formatAMPM(clockInData)}-${formatAMPM(clockInCuttOffData)}`,
        timeOut: `${formatAMPM(clockOutData)}-${formatAMPM(clockOutCuttOffData)}`
      })
    } catch (error) {
      console.log(error)
      setSelectAttendance(null)
    }
  }

  const checkAttendance = (date1, date2) => {
    const now = new Date()
    let timeIn = new Date(date1)
    let timeInCutOff = new Date(date2)
    timeIn.setDate(now.getDate())
    timeInCutOff.setDate(now.getDate())
    return timeIn <= now && timeInCutOff >= now
  }

  const fetchAttendanceRecord = async () => {
    try {
      const result = await getAttendanceRecord(selectAttendance._id)
      setAttendanceRecord(result.data.data.map(item => {
        return (
          {
            username: `${item.user.firstName} ${item.user.lastName}`,
            clockIn: item.clockIn ? formatAMPM(new Date(item.clockIn)) : "None",
            clockOut:  item.clockOut ? formatAMPM(new Date(item.clockOut)) : "None"
          }
        )
      }))
      setModal(true)
    } catch (error) {
      popUp('warning', 'Please Select Attendance')
      return []
    }
  }

  useEffect(() => {
    fetchAttendanceList()
    const scanner = new Html5QrcodeScanner('reader', {
          qrbox: {
              width: 250,
              height: 250
          },
          fps: 5
      })
  
      const success = async (result) => {
        scanner.clear()
          try {
              if(selectAttendance){
                  const payload = {
                    attendanceId: selectAttendance._id,
                    userId: result
                  }
                  if(checkAttendance(selectAttendance.clockIn, selectAttendance.clockInCutOff)){
                    const result = await createClockInRecord(payload)
                    popUp('success', result.data.data )
                  }
                  else if(checkAttendance(selectAttendance.clockOut, selectAttendance.clockOutCutOff)){
                    popUp('success', "Success Time Out" )
                  }else{
                    popUp('warning', "Attendance is Currently Close" )
                  } 
              }else{
                popUp('warning', "Please Select Attendance")
              }
          } catch (error) {
            popUp('warning',error.response.data.message)
          }
        scanner.render(success, {})
      }
    scanner.render(success, {})
    setLoader(false)
  }, [selectAttendance])
  const values = {
    user,
    attendances,
    selectAttendance,
    contextHolder,
    loader,
    modal,
    setModal,
    hanldeChangeAttendance,
    fetchAttendanceRecord,
    attendanceRecord
  }

  return (
    <PageContext.Provider value={values}>
      <DashboardView />
    </PageContext.Provider>
  )
}
