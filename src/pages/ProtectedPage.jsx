import { SignedIn, SignedOut } from '@clerk/clerk-react';

const ProtectedPage = () => {
  return (
    <div>
      <SignedIn>
        <h1>Welcome to the Protected Page!</h1>
      </SignedIn>
      <SignedOut>
        <h1>Please sign in to access this page.</h1>
      </SignedOut>
    </div>
  );
};

export default ProtectedPage;
