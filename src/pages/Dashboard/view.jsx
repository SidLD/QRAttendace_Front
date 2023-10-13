import { Button } from "antd"
import { QRCodeView } from "../../components/QRCode"
import { useContext } from "react"
import { PageContext } from "../../lib/context"
import { QRScanner } from "../../components/QRScanner"

export const DashboardView = () => {
    const {user} = useContext(PageContext)

    if(user.role === "admin"){
      return (
        <div className="w-full">
            <QRScanner />
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
