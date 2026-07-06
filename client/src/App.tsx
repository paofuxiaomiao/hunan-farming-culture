import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import Landing from "./pages/Landing";
import Home from "./pages/Home";
import ThemeRoutesPage from "./pages/ThemeRoutes";
import TimelinePage from "./pages/Timeline";
import SolarTermsPage from "./pages/SolarTerms";
import ArtifactsPage from "./pages/Artifacts";

function Router() {
  return (
    <Switch>
      <Route path={"/"} component={Landing} />
      <Route path={"/map"} component={Home} />
      <Route path={"/routes"} component={ThemeRoutesPage} />
      <Route path={"/timeline"} component={TimelinePage} />
      <Route path={"/solar-terms"} component={SolarTermsPage} />
      <Route path={"/artifacts"} component={ArtifactsPage} />
      <Route path={"/404"} component={NotFound} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="light">
        <TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
