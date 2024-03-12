import { StatusBar } from 'expo-status-bar';
import Signup from './components/auth/Signup';
import Login from './components/auth/Login';

export default function App() {
  return (
    <>
      <Login />
      <StatusBar style="auto" />
    </>
  );
}


