import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { SignedIn, SignedOut, SignInButton, UserButton, RedirectToSignIn } from "@clerk/clerk-react";
import Home from "./pages/Home";
import { ThemeProvider } from "./components/theme-provider";
import { useUser } from "@clerk/clerk-react";
import { TooltipProvider } from "./components/ui/tooltip";

export default function App() {
  const { isSignedIn, user, isLoaded } = useUser();
  return (
    <Router>
      <ThemeProvider defaultTheme="dark" enableSystemTheme={false} storageKey='discord-theme'>
        <TooltipProvider>
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