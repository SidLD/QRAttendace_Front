import { Button, Checkbox, Form, message } from "antd"
import { useContext, useState } from "react";
import { TimePicker } from 'antd';
import dayjs from 'dayjs';
import { PageContext } from "../../lib/context";

export const AttendanceViews = () => {
    const {submitCreateAttendaceData} = useContext(PageContext)
    const [days, setDays] = useState([])
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
                dayInWeek: days,
                clockIn: e.clockIn[0],
                clockInCutOff: e.clockIn[1],
                clockOut: e.clockIn[0],
                clockOutCutOff: e.clockIn[1],
            })
            if(result){
                popUpBox('success', 'Attendance Updated')
            }else{
                popUpBox('warning', 'Update Failed')
            }
        }else{
            popUpBox('warning', 'Please select days')
        }
        
    }
  return (
    <div className="mx-5 my-2">
        {contextHolder}
        <Form
            onFinish={submitCreateAttendance}
        >
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
                <TimePicker.RangePicker defaultOpenValue={dayjs('00:00:00', 'HH:mm:ss')}/>
            </Form.Item>
            <Form.Item name='clockOut' label="Clock Out & Cut Off"
                rules={[{ required: true, message: 'Please input your days in week' }]}
            >
                <TimePicker.RangePicker defaultOpenValue={dayjs('00:00:00', 'HH:mm:ss')}/>
            </Form.Item>
            <Form.Item>
                <Button htmlType="submit">
                    Update
                </Button>
            </Form.Item>
        </Form>
        
    </div>
  )
}
