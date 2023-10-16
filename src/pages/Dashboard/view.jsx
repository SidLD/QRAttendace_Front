import { Button, Modal, Select } from "antd"
import { QRCodeView } from "../../components/QRCode"
import { useContext } from "react"
import { PageContext } from "../../lib/context"
import { CustomeTable } from "../../components/CustomeTable"

export const DashboardView = () => {
    const {user, attendances, loader, hanldeChangeAttendance, selectAttendance,contextHolder,
      modal, setModal, fetchAttendanceRecord, attendanceRecord} = useContext(PageContext)
    const column = [
      {
        title: 'Username',
        index: 'username',
        isShow: true,
      },
      {
        title: 'Clock In',
        index: 'clockIn',
        isShow: true,
      },
      {
        title: 'Clock Out',
        index: 'clockOut',
        isShow: true,
      },
    ]
    if(user.role === "admin"){
      return (
        <div className="w-full">
          {contextHolder}
          {!loader && <div className="m-2">
            <Select
              style={{
                width: 150,
              }}
              onChange={hanldeChangeAttendance}
              options={attendances} />
              <Button className="" onClick={fetchAttendanceRecord}>Check your Attendance Today</Button>
          </div>}
          <div className="flex justify-center flex-col">
              <h2>Attendance: {selectAttendance?.title}</h2>
              <h2>Time In: {selectAttendance?.timeIn}</h2>
              <h2>Time Out: {selectAttendance?.timeOut}</h2>
            </div> 
          <div className="flex justify-center flex-col items-center w-full h-full">
            <div className='my-auto h-full lg:w-1/3 sm:w-2/5 w-3/4' id='reader'>
              </div>    
          </div>  
          <Modal open={modal} onCancel={() => setModal(false)} footer={false}> 
              <CustomeTable dataSource={attendanceRecord}  column={column}/>
            </Modal>
        </div>
      )
    }

  return (
    <div className=" w-full flex justify-center items-center flex-col">

        <div className="w-[50px] h-[200px] flex justify-center items-center">
            <QRCodeView />
        </div>
        <Button>Generate Code</Button>
    </div>
  )
}
