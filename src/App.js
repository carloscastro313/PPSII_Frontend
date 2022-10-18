import Router from "./routes/Router";
import AuthState from "./contexts/auth/AuthState";
import ErrorState from "./contexts/errorPopup/ErrorState";

function App() {
  return (
    <AuthState>
      <ErrorState>
        <Router />
      </ErrorState>
    </AuthState>
  );
}

export default App;
