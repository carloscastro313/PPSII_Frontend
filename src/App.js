import Router from "./routes/Router";
import AuthState from "./contexts/auth/AuthState";

function App() {
  return (
    <AuthState>
      <Router />
    </AuthState>
  );
}

export default App;
