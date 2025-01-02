import React from 'react';
import { SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/clerk-react';

const Header = () => {
  return (
    <header className="flex justify-between items-center p-4 bg-gray-800 text-white">
      <div className="text-lg font-bold">MyApp</div>
      <div className="flex items-center space-x-4">
        {/* Content for Signed-In Users */}
        <SignedIn>
          <span>Welcome!</span>
          <UserButton />
        </SignedIn>

        {/* Content for Signed-Out Users */}
        <SignedOut>
          <SignInButton>
            <button className="px-4 py-2 bg-blue-500 rounded hover:bg-blue-600">
              Sign In
            </button>
          </SignInButton>
        </SignedOut>
      </div>
    </header>
  );
};

export default Header;
