import {createContext, useContext, useState} from 'react';

export const StoreContext = createContext();

export const useStore = () => {
  return useContext(StoreContext);
};

export const scientificItems = [
  {type: 'molecule', img: require('../assets/icons/game2.png')},
  {type: 'test_tube', img: require('../assets/icons/game3.png')},
];

export const StoreProvider = ({children}) => {
  const [cards, setCards] = useState([
    {
      type: 'atom',
      title: '50',
      img: require('../assets/icons/game1.png'),
      unlocked: false,
    },
    {
      type: 'flask',
      title: '100',
      img: require('../assets/icons/game4.png'),
      unlocked: false,
    },
    {
      type: 'pill',
      title: '150',
      img: require('../assets/icons/game5.png'),
      unlocked: false,
    },
  ]);
  const [shopCoins, setShopCoins] = useState(0);

  const value = {
    scientificItems,
    shopCoins,
    cards,
    setCards,
    setShopCoins,
  };

  return (
    <StoreContext.Provider value={value}>{children}</StoreContext.Provider>
  );
};
