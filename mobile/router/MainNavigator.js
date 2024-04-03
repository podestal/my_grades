import { NavigationContainer } from '@react-navigation/native';
import NoAuthNavigator from './NoAuthNavigator';
import AuthNavigator from './AuthNavigator';
import useAuth from '../hooks/useAuth';
import BottonNavigator from './BottomNavigator';

const MainNavigator = () => {

    const {user} = useAuth()

  return (
    <NavigationContainer>
        {console.log('user from navigator', user)}
        {user.isAuthenticated 
        ?
        <BottonNavigator />
        :
        <NoAuthNavigator />
        }
    </NavigationContainer>
  )
}

export default MainNavigator