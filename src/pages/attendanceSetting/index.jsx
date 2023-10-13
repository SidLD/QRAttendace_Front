import { AttendanceViews } from "./view"
import {PageContext} from "../../lib/context"
export const AttendanceSetting = () => {

    const submitCreateAttendaceData = (e) => {
        try {
            console.log(e)
            return true
        } catch (error) {
            console.log(error)
            return false
        }
    }
    const values = {
        submitCreateAttendaceData
    }
    return (
        <PageContext.Provider value={values}>
            <AttendanceViews />
        </PageContext.Provider>
    )
}
