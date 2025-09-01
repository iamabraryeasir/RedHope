/**
 * Node Modules
 */
import { Outlet } from "react-router";

/**
 * Local Modules
 */
import CommonLayout from "@/components/layout/CommonLayout";

/**
 * Component Logic
 */
function App() {
  return (
    <CommonLayout>
      <Outlet />
    </CommonLayout>
  );
}

export default App;
