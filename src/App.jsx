import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { SignedOut, RedirectToSignIn } from "@clerk/clerk-react";
import { ThemeProvider } from "./components/theme-provider";
import { useUser } from "@clerk/clerk-react";
import { TooltipProvider } from "./components/ui/tooltip";
import NavigationSidebar from "./components/custom/Navigation-Sidebar";
import Home from "./pages/Home";
import Server from "./pages/Server";

export default function App() {
  const { isSignedIn } = useUser();
  return (
    <Router>
      <ThemeProvider defaultTheme="dark" enableSystemTheme={false} storageKey='discord-theme'>
        <TooltipProvider>
        <NavigationSidebar />
      {/* <header>
        <SignedOut>
          <SignInButton />
        </SignedOut>
        <SignedIn>
          <UserButton />
        </SignedIn>
      </header> */}
      <Routes>
      
        <Route
          path="/"
          element={
            isSignedIn ? (
              <Home /> // Render Home if signed in
            ) : (
              <RedirectToSignIn /> // Redirect to sign in if not signed in
            )}
        />
        <Route
          path="/server/:serverId"
          element={
            isSignedIn ? (
              <Server/>
            ):(
              <RedirectToSignIn/>
            )
          }
        />
        <Route
          path="/app"
          element={
            <SignedOut>
              <RedirectToSignIn />
            </SignedOut>
          }
        />
      </Routes>
      </TooltipProvider>
      </ThemeProvider>
    </Router>
  );
}