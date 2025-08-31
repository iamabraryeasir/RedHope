/**
 * Node Modules
 */

/**
 * Local Modules
 */
import { Button } from "@/components/ui/button";
import Navbar from "@/components/layout/Navbar";

/**
 * Component Logic
 */
function App() {
  return (
    <>
      <Navbar />
      <div className="flex min-h-svh flex-col items-center justify-center">
        <Button>Click me</Button>
      </div>
    </>
  );
}

export default App;
