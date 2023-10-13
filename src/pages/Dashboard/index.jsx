import { PageContext } from "../../lib/context"
import { auth } from "../../lib/services"
import { DashboardView } from "./view"

export const Dashboard = () => {
  const user = auth.getUserInfo()
  const values = {
    user
  }

  return (
    <PageContext.Provider value={values}>
      <DashboardView />
    </PageContext.Provider>
  )
}
