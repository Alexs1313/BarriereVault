import {createStackNavigator} from '@react-navigation/stack';
import TabNav from './TabNav';
import CardsDetails from '../screen/stack/CardsDetails';
import CardFacts from '../screen/stack/CardFacts';
import ModelingDetails from '../screen/stack/ModelingDetails';
import TheoryDetails from '../screen/stack/TheoryDetails';
import TheoryArticle from '../screen/stack/TheoryArticle';
import ModelingInfo from '../screen/stack/ModelingInfo';
import CatcherGame from '../screen/stack/CatcherGame';
import Shop from '../screen/stack/Shop';
import Welcome from '../screen/stack/Welcome';

const Stack = createStackNavigator();

const StackNavigation = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="Welcome" component={Welcome} />
      <Stack.Screen name="TabNav" component={TabNav} />
      <Stack.Screen name="CardsDetails" component={CardsDetails} />
      <Stack.Screen name="CardFacts" component={CardFacts} />
      <Stack.Screen name="ModelingDetails" component={ModelingDetails} />
      <Stack.Screen name="TheoryDetails" component={TheoryDetails} />
      <Stack.Screen name="TheoryArticle" component={TheoryArticle} />
      <Stack.Screen name="ModelingInfo" component={ModelingInfo} />
      <Stack.Screen name="CatcherGame" component={CatcherGame} />
      <Stack.Screen name="Shop" component={Shop} />
    </Stack.Navigator>
  );
};

export default StackNavigation;
