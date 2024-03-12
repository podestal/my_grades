import { NavigationContainer } from '@react-navigation/native';
import NoAuthNavigator from './NoAuthNavigator';

const MainNavigator = () => {


  return (
    <NavigationContainer>
        <NoAuthNavigator />
    </NavigationContainer>
  )
}

export default MainNavigator