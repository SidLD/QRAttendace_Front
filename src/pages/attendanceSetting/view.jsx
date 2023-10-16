import { Button, Checkbox, Form, Input, Modal, message } from "antd"
import { useContext, useEffect, useState } from "react";
import { TimePicker } from 'antd';
import { PageContext } from "../../lib/context";
import { CustomeTable } from "../../components/CustomeTable";

export const AttendanceViews = () => {
    const {submitCreateAttendaceData, attendances, loader, selectAttendance, setSelectAttendance, handleDeleteAttendance} = useContext(PageContext)
    const [days, setDays] = useState([])
    const [modal, setModal] = useState(false);

    const columns = [
      {
        title: 'Title',
        index: 'title',
        isShow: true,
      },
      {
        title: 'Clock In',
        index: 'clockIn',
        isShow: true,
      },
      {
        title: 'Clock In Cut Off',
        index: 'clockInCutOff',
        isShow: true,
      },
      {
        title: 'Clock Out',
        index: 'clockOut',
        isShow: true,
      },
      {
        title: 'Clock Out Cut Off',
        index: 'clockOutCutOff',
        isShow: true,
      },
      {
        title: 'Days In a Week',
        index: 'daysInWeek',
        isShow: true,
      },
      {
        title: 'Action',
        index: 'action',
        isShow: true,
      },
    ]
    const options = [
        {
          label: 'Monday',
          value: 'mon',
        },
        {
          label: 'Tuesday',
          value: 'tue',
        },
        {
          label: 'Wednesday',
          value: 'wed',
        },
        {
          label: 'Thursday',
          value: 'thu',
        },
        {
          label: 'Friday',
          value: 'fri',
        },
        {
          label: 'Saturday',
          value: 'sat',
        },
    ];
    
    const [messageAPI, contextHolder] = message.useMessage();

    const popUpBox = (type, content) => {
      messageAPI.open({
        type,
        content,
      })
    }

    const onChange = (e) => {
        setDays(e)
    }

    const submitCreateAttendance = async(e) => {
        if(days.length > 0 && days){
           const result = await submitCreateAttendaceData({
                title: e.title,
                daysInAWeek: days,
                clockIn: e.clockIn[0],
                clockInCutOff: e.clockIn[1],
                clockOut: e.clockOut[0],
                clockOutCutOff: e.clockOut[1],
            })
            if(result){
                setModal(false)
                popUpBox('success', 'Attendance Updated')
            }else{
                popUpBox('warning', 'Update Failed')
            }
        }else{
            popUpBox('warning', 'Please select days')
        }
    }

    const submitDeleteAttendance = async () => {
     if(await handleDeleteAttendance()){
      popUpBox('success', "SUCCESS")
     }else{
      popUpBox('warning', "FAIL")
     }
    }

    useEffect(() => {
      setDays(selectAttendance?.data.daysInAWeek)
    }, [selectAttendance])

  return (
    <div className="mx-5 my-2">
        {contextHolder}
        <Modal open={modal} onCancel={() => setModal(false)} footer={false}>
        <Form
            onFinish={submitCreateAttendance}
        >
            <Form.Item label="Title"  name="title"
                rules={[{ required: true, message: 'Please input Title' }]}
            >
              <Input />
            </Form.Item>
              <Form.Item label="Day in Week" 
                  rules={[{ required: true, message: 'Please input your days in week' }]}
              >
              <Checkbox.Group
                  options={options}
                  defaultValue={['Apple']}
                  onChange={onChange}
              />
              </Form.Item>
              <Form.Item name='clockIn' label="Clock In & Cut Off"
                  rules={[{ required: true, message: 'Please input your days in week' }]}
              >
                  <TimePicker.RangePicker showTime={{ format: 'hh:mm A', use12Hours:true }}/>
              </Form.Item>
              <Form.Item name='clockOut' label="Clock Out & Cut Off"
                  rules={[{ required: true, message: 'Please input your days in week' }]}
              >
                  <TimePicker.RangePicker showTime={{ format: 'hh:mm A', use12Hours:true }}/>
              </Form.Item>
              <Form.Item>
                  <Button htmlType="submit">
                      Create Attendance
                  </Button>
              </Form.Item>
          </Form>
        </Modal>
        <Button className="float-right" onClick={() => setModal(true)}>
          Create New Attendance
        </Button>
        {!loader && <CustomeTable dataSource={attendances} column={columns} />}
        <Modal open={!!selectAttendance && selectAttendance.type === 'EDIT'} onCancel={() => setSelectAttendance(null)} footer={false}>
            {!!selectAttendance && <Form
              onFinish={submitCreateAttendance}
              initialValues={{
                title: selectAttendance.data.title
              }}
            >
            <Form.Item label="Title"  name="title"
                rules={[{ required: true, message: 'Please input Title' }]}
            >
              <Input/>
            </Form.Item>
              <Form.Item label="Day in Week" 
                  rules={[{ required: true, message: 'Please input your days in week' }]}
              >
              <Checkbox.Group
                  options={options}
                  defaultValue={selectAttendance.data.daysInAWeek}
                  onChange={onChange}
              />
              </Form.Item>
              <Form.Item name='clockIn' label="Clock In & Cut Off"
                  rules={[{ required: true, message: 'Please input your days in week' }]}
              >
                  <TimePicker.RangePicker showTime={{ format: 'hh:mm A', use12Hours:true }}/>
              </Form.Item>
              <Form.Item name='clockOut' label="Clock Out & Cut Off"
                  rules={[{ required: true, message: 'Please input your days in week' }]}
              >
                  <TimePicker.RangePicker showTime={{ format: 'hh:mm A', use12Hours:true }}/>
              </Form.Item>
              <Form.Item>
                  <Button htmlType="submit">
                      Update Attendance
                  </Button>
              </Form.Item>
          </Form>}
        </Modal>
        <Modal open={!!selectAttendance && selectAttendance.type === 'DELETE'} onCancel={() => setSelectAttendance(null)} footer={false}>
            <div>
            <Form
              onFinish={submitDeleteAttendance}
            >
              <p>Confirm Delete {selectAttendance?.data.title}?</p>
              <Form.Item>
                  <Button className="float-right bg-reed-500" htmlType="submit">
                      Confirm
                  </Button>
              </Form.Item>
          </Form>
            </div>
        </Modal>
    </div>
  )
}
