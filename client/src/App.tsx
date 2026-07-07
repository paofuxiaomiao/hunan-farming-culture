import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import { routePath } from "./lib/sitePaths";
import Landing from "./pages/Landing";
import Home from "./pages/Home";
import ThemeRoutesPage from "./pages/ThemeRoutes";
import TimelinePage from "./pages/Timeline";
import SolarTermsPage from "./pages/SolarTerms";
import ArtifactsPage from "./pages/Artifacts";

const landingRoutePaths = Array.from(
  new Set(
    [
      routePath("/"),
      routePath("/").replace(/\/$/, ""),
      routePath("/index.html"),
      "/",
      "/index.html",
    ].filter((path) => path.length > 0),
  ),
);

function Router() {
  return (
    <Switch>
      {landingRoutePaths.map((path) => (
        <Route key={path} path={path} component={Landing} />
      ))}
      <Route path={routePath("/map")} component={Home} />
      <Route path={routePath("/routes")} component={ThemeRoutesPage} />
      <Route path={routePath("/timeline")} component={TimelinePage} />
      <Route path={routePath("/solar-terms")} component={SolarTermsPage} />
      <Route path={routePath("/artifacts")} component={ArtifactsPage} />
      <Route path={routePath("/404")} component={NotFound} />
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
