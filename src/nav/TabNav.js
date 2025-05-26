import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Image, StyleSheet} from 'react-native';
import Cards from '../screen/tab/Cards';
import Modeling from '../screen/tab/Modeling';
import Theories from '../screen/tab/Theories';
import Game from '../screen/tab/Game';
import Settings from '../screen/tab/Settings';

const Tab = createBottomTabNavigator();

const TabNav = () => {
  return (
    <Tab.Navigator
      initialRouteName="Game"
      screenOptions={{
        headerShown: false,
        tabBarStyle: styles.tabBar,
        tabBarShowLabel: false,
        tabBarLabelStyle: styles.tabBarLabelStyle,
        tabBarActiveTintColor: '#FFB84C',
        tabBarInactiveTintColor: '#fff',
      }}>
      <Tab.Screen
        name="Cards"
        component={Cards}
        options={{
          tabBarIcon: ({color}) => (
            <Image
              source={require('../assets/icons/cards.png')}
              tintColor={color}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Modeling"
        component={Modeling}
        options={{
          tabBarIcon: ({color}) => (
            <Image
              source={require('../assets/icons/modeling.png')}
              tintColor={color}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Theories"
        component={Theories}
        options={{
          tabBarIcon: ({color}) => (
            <Image
              source={require('../assets/icons/theories.png')}
              tintColor={color}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Game"
        component={Game}
        options={{
          tabBarIcon: ({color}) => (
            <Image
              source={require('../assets/icons/game.png')}
              tintColor={color}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Settings"
        component={Settings}
        options={{
          tabBarIcon: ({color}) => (
            <Image
              source={require('../assets/icons/settings.png')}
              tintColor={color}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: 'transparent',
    borderTopWidth: 0,
    height: 100,
    paddingBottom: 5,
    paddingTop: 16,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    elevation: 0,
  },
});

export default TabNav;
