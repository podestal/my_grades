import { NavigationContainer } from '@react-navigation/native';
import NoAuthNavigator from './NoAuthNavigator';
import AuthNavigator from './AuthNavigator';
import useAuth from '../hooks/useAuth';

const MainNavigator = () => {

    const {user} = useAuth()

  return (
    <NavigationContainer>
        {console.log('user from navitaor', user)}
        <NoAuthNavigator />
    </NavigationContainer>
  )
}

export default MainNavigator