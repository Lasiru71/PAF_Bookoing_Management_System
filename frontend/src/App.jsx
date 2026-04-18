// App.jsx — root component, wraps everything in AuthProvider and GoogleOAuthProvider
import { AuthProvider } from "./context/AuthContext";
import { GoogleOAuthProvider } from "@react-oauth/google";
import AppRouter from "./router/AppRouter";

// Replace with your actual Google Client ID from Google Cloud Console
const GOOGLE_CLIENT_ID = "YOUR_GOOGLE_CLIENT_ID.apps.googleusercontent.com";

const App = () => {
  return (
    <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
      <AuthProvider>
        <AppRouter />
      </AuthProvider>
    </GoogleOAuthProvider>
  );
};

export default App;
