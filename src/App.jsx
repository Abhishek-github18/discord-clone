import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { SignedIn, SignedOut, SignInButton, UserButton, RedirectToSignIn } from "@clerk/clerk-react";
import ProtectedPage from "./pages/ProtectedPage";
import { ThemeProvider } from "./components/theme-provider";
export default function App() {
  return (
    <Router>
      <ThemeProvider defaultTheme="dark" enableSystemTheme={false} storageKey='discord-theme'>
      <header>
        <SignedOut>
          <SignInButton />
        </SignedOut>
        <SignedIn>
          <UserButton />
        </SignedIn>
      </header>
      <Routes>
        <Route
          path="/protected"
          element={
            <SignedIn>
              <ProtectedPage />
            </SignedIn>
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
      </ThemeProvider>
    </Router>
  );
}