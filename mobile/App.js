import { StatusBar } from 'expo-status-bar';
import AuthContextProvider from './context/auth';
import MainNavigator from './router/MainNavigator';

export default function App() {
  return (
    <AuthContextProvider>
      <MainNavigator />
      <StatusBar style="auto" />
    </AuthContextProvider>
  );
}


