/* eslint-disable react/prop-types */
export const CustomeTable = ({column, dataSource}) => {
    if(dataSource.length <= 0){
        return (
            <span className="w-full flex justify-center text-[#0b22b5] text-[1.5rem] font-bold text-center">No Data</span>
        )
    }

    return (
      <table className="shadow-lg w-full ">
          <thead className=" text-white font-poppins h-14 rounded-full">
              <tr className="my-5 rounded-full ">
                  {column?.map((col, index) => col.isShow && 
                      <th className="bg-[#0b22b5]"  key={index}>
                          {col.title}
                      </th>)}
              </tr>
          </thead>
          <tbody>
              {dataSource.map((item, index) => (
                  <tr key={index} className=" h-12 rounded-full w-full border-b-[#0b22b5] border-b-2 text-center">
                      {
                          column?.map((col, index) => col.isShow && 
                            <td key={index} 
                                className="break-words content-center ">
                                {item[col.index]}
                            </td>)
                      }
                  </tr>
              ))}
          </tbody>
      </table>
    )
  }
  