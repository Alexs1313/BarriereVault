import {NavigationContainer} from '@react-navigation/native';
import TabNav from './src/nav/TabNav';
import StackNavigation from './src/nav/StackNavigation';
import CatcherGame from './src/screen/stack/CatcherGame';
import {StoreProvider} from './src/store/context';
import Loader from './src/components/Loader';
import {useEffect, useState} from 'react';

const App = () => {
  const [loader, setLoader] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setLoader(true);
    }, 4000);
  }, []);

  return (
    <NavigationContainer>
      <StoreProvider>{loader ? <StackNavigation /> : <Loader />}</StoreProvider>
    </NavigationContainer>
  );
};

export default App;
