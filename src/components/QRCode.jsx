import { QRCodeCanvas } from "qrcode.react";
import { auth } from "../lib/services";

export const QRCodeView = () => {
    const user = auth.getUserInfo()
    return (
        <div>
            <QRCodeCanvas
            id="qrCode"
            value={user.id}
            size={200}
            bgColor={"#00ff00"}
            level={"H"}
            />
        </div>
  )
}
