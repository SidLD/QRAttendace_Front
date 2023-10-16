import { Button, DatePicker } from "antd"
import { CustomeTable } from "../../components/CustomeTable"
import { useContext, useState } from "react";
import { PageContext } from "../../lib/context";

export const RecordView = () => {
  const { changeDate, attendanceRecord} = useContext(PageContext)
  const [date, setDate] = useState(null)
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(10) 
  const columns = [
    {
      title: 'Attendance',
      index: 'attendance',
      isShow: true,
    },
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
    }
  ]

  const onChange = async  (date, dateString) => {
    await changeDate({date, dateString})
    setDate(dateString)
  };

  const onNextPage = async () => {
    if(users.length > postsPerPage) {
      // await fetchUsers("", currentStatus , postsPerPage * (currentPage-1), postsPerPage )
      setCurrentPage(currentPage + 1)
    }
  }

  const onPrevPage = async () => {
    if(currentPage > 1){
      // await fetchUsers("",currentStatus, postsPerPage * (currentPage-1), postsPerPage )
        setCurrentPage(currentPage - 1)
    }
  }

  const users = [
    {
      username: "Test",
      clockIn:"2019-08-30 16:45:07.0",
      clockOut: null
    }
  ]
  return (
    <>
  <div className="flex justify-start items-center gap-5 m-3">
    <DatePicker onChange={onChange} />
    <h2>Selected Date {date}</h2>
  </div>
  <CustomeTable dataSource={attendanceRecord} column={columns} />
  <div className='flex w-full justify-end h-11 my-5'>
          <div className='rounded-full p-[1px] border-green-500 border-[1px]'>
            <Button className='h-10 border-none bg-green-500 rounded-full text-white' onClick={onPrevPage} >{`<`}</Button>
              <span className='p-2'>{currentPage}</span>
            <Button className='h-10 border-none bg-green-500 rounded-full' onClick={onNextPage}>{`>`}</Button>
          </div>
        </div>
    </>
  )
}
