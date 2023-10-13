import { RecordView } from "./view"
import { PageContext } from '../../lib/context.js'

export const Record = () => {
    const values = {

    }
  return (
    <PageContext.Provider value={values}>
        <RecordView />
    </PageContext.Provider>
  )
}
