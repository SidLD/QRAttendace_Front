import {Html5QrcodeScanner} from 'html5-qrcode'
import { useEffect, useState } from 'react'
import { message } from 'antd';

export const QRScanner = () => {
    const [, setScanResult] = useState(null) 

    const [messageApi, contextHolder] = message.useMessage();
    const popUp = (type, content) => {
        messageApi.open({
        type,
        content,
        });
    };

    useEffect(() => {
        const scanner = new Html5QrcodeScanner('reader', {
            qrbox: {
                width: 250,
                height: 250
            },
            fps: 5
        })
    
        const success = (result) => {
            setScanResult(result)
            popUp('success', "Success Login")
            setScanResult(null)
            scanner.clear()
        }

        const error = (err) => {
            console.log(err)
        }
    
        scanner.render(success, error)
    }, [])
  return (
    <div className='w-full flex justify-center items-center flex-col'>
        {contextHolder}
        <h2>Scan</h2>
        <div className='w-1/3' id='reader'>
        </div>
    </div>
  )
}
