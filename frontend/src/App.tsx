import { QueryClient, QueryClientProvider } from "react-query";
import { DriversComponent } from "@/components/local/DriversComponent";
import { Button } from "@/components/ui/button";
import { ThemeProvider } from "./components/theme-provider";
import { ModeToggle } from "@/components/mode-toggle";

const App: React.FC = () => {

  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <div className="mx-10 my-6">
        <ModeToggle />
        <DriversComponent />
        <Button >Criar novo motorista</Button>
      </div>
    </ThemeProvider>
  )
}

export default App
