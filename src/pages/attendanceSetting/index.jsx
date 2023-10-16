import { AttendanceViews } from "./view"
import {PageContext} from "../../lib/context"
import { createAttendance, deleteAttendance, getAllAttendance, updateAttendance } from "../../lib/api"
import { useEffect, useState } from "react"
import { Button } from "antd"
export const AttendanceSetting = () => {
    const [attendances, setAttendancs] = useState([])
    const [loader, setLoader] = useState(true)
    const [selectAttendance, setSelectAttendance] = useState(null)

    const submitCreateAttendaceData = async (e) => {
        try {
            if(selectAttendance.type === 'EDIT'){
                await updateAttendance(selectAttendance.data._id,e)
            }else{
               await createAttendance(e)
            }
            await fetchAttendanceData()
            return true
        } catch (error) {
            console.log(error)
            return false
        }
    }

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

    const fetchAttendanceData = async() => {
        try {
            const result = await getAllAttendance()
            setAttendancs(result.data.data.map((item, index) => {
                const clockInData = new Date(item.clockIn)
                const clockInCuttOffData = new Date(item.clockInCutOff)
                const clockOutData = new Date(item.clockOut)
                const clockOutCuttOffData = new Date(item.clockOutCutOff)
                return {
                  index,
                  title: <p className="uppercase">{item.title}</p>,
                  key: item._id,
                  clockIn: <p className="uppercase">{formatAMPM(clockInData)}</p>,
                  clockInCutOff: <p className="uppercase">{formatAMPM(clockInCuttOffData)}</p>,
                  clockOut: <p className="uppercase">{formatAMPM(clockOutData)}</p>,
                  clockOutCutOff: <p className="uppercase">{formatAMPM(clockOutCuttOffData)}</p>,
                  daysInWeek: <p className="uppercase">{item.daysInAWeek.toString()}</p>,
                  action: <>
                  <Button className="bg-blue-500" onClick={() => setSelectAttendance({
                    data:item,
                    type: 'EDIT'
                  })}>Edit Data</Button>
                  <Button className="bg-red-500" onClick={() => setSelectAttendance({
                    data:item,
                    type: 'DELETE'
                  })}>Delete Data</Button>
                  </>
                }
            }))
           
         } catch (error) {
            console.log(error)
            setAttendancs([])
         }
    }

    const handleDeleteAttendance = async() => {
        try {
            const result = await deleteAttendance({attendanceId: selectAttendance.data._id})
            console.log(result)
            setSelectAttendance(null)
            await fetchAttendanceData()
            return true
        } catch (error) {
            console.log(error)
            return false
        }
    }

    useEffect(() => {
        fetchAttendanceData()
        setLoader(false)
    },[])
    const values = {
        submitCreateAttendaceData,
        attendances,
        loader,
        selectAttendance,
        setSelectAttendance,
        handleDeleteAttendance
    }
    return (
        <PageContext.Provider value={values}>
            <AttendanceViews />
        </PageContext.Provider>
    )
}
