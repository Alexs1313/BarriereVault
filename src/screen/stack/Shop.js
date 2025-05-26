import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {useNavigation} from '@react-navigation/native';
import {useState} from 'react';

import Layout from '../../components/Layout';
import {useStore} from '../../store/context';

const Shop = () => {
  const navigation = useNavigation();
  const [selectedCard, setSelectedCard] = useState('');
  const {scientificItems, cards, setCards, shopCoins, setShopCoins} =
    useStore();

  const handleUnlockCard = () => {
    if (shopCoins >= Number(selectedCard.title)) {
      const filtered = scientificItems.find(
        val => val.type === selectedCard.type,
      );
      if (!filtered) {
        scientificItems.push(selectedCard);
        setShopCoins(shopCoins - Number(selectedCard.title));
      }

      const unlockedCards = cards.map(card => {
        if (card.title === selectedCard.title) {
          return {
            ...card,
            unlocked: true,
          };
        }
        return card;
      });
      setCards(unlockedCards);
    }
  };

  return (
    <Layout>
      <ScrollView>
        <LinearGradient
          colors={['#111111', '#302921']}
          start={{x: 0, y: 0}}
          end={{x: 1, y: 0}}
          style={styles.header}>
          <TouchableOpacity
            style={styles.back}
            onPress={() => navigation.navigate('TabNav')}>
            <Image source={require('../../assets/icons/back.png')} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>SHOP</Text>
        </LinearGradient>

        <View style={styles.container}>
          <View style={styles.welcomeContainer}>
            <Text style={styles.welcomeText}>
              Unlock access to exclusive items 🎁✨ to enhance your experience
              and dive deeper into the world of scientific discoveries!
            </Text>
            <TouchableOpacity
              disabled={!selectedCard}
              style={styles.button}
              activeOpacity={0.7}
              onPress={() => handleUnlockCard()}>
              <Text style={styles.buttonText}>Unlock</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.cardsWrapper}>
            {cards.map(card => (
              <TouchableOpacity
                activeOpacity={0.7}
                key={card.title}
                style={[
                  styles.card,
                  selectedCard.title === card.title && {
                    borderWidth: 1,
                    borderColor: '#CDA73D',
                  },
                ]}
                onPress={() => setSelectedCard(card)}>
                <LinearGradient
                  colors={['#111111', '#302921']}
                  start={{x: 0, y: 0}}
                  end={{x: 1, y: 0}}
                  style={styles.gradientContainer}>
                  <Image source={card.img} style={styles.cardImage} />
                </LinearGradient>

                <View>
                  {card.unlocked ? (
                    <Image
                      source={require('../../assets/icons/unlocked.png')}
                      style={{marginVertical: 19}}
                    />
                  ) : (
                    <View
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        gap: 10,
                      }}>
                      <Image source={require('../../assets/icons/coins.png')} />
                      <Text style={styles.cardTitle}>{card.title}</Text>
                    </View>
                  )}
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </ScrollView>
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {marginHorizontal: 20},
  header: {
    paddingTop: 80,
    paddingBottom: 14,
    backgroundColor: null,
    borderBottomLeftRadius: 9,
    borderBottomRightRadius: 9,
    alignItems: 'center',

    shadowColor: 'rgba(0, 0, 0, 0.87)',
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 1,
    shadowRadius: 8,
    elevation: 8,
  },
  back: {position: 'absolute', top: 85, left: 20},
  headerTitle: {
    fontFamily: 'Afacad',
    fontSize: 24,
    fontWeight: 'semibold',
    color: '#fff',
  },
  welcomeContainer: {
    paddingVertical: 11,
    paddingHorizontal: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.68)',
    width: '100%',
    borderRadius: 9,
    marginVertical: 32,
  },
  welcomeText: {
    fontFamily: 'Inter',
    fontSize: 14,
    fontWeight: 'regular',
    color: '#fff',
    lineHeight: 18,
    marginBottom: 30,
  },
  button: {
    width: '35%',
    paddingVertical: 17,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#CDA73D',
    borderRadius: 100,
  },
  buttonText: {
    fontFamily: 'Inter',
    fontSize: 14,
    fontWeight: 'regular',
    color: '#fff',
  },
  cardImage: {
    height: 54,
    width: 54,
  },
  card: {
    width: '30%',
    height: 210,
    backgroundColor: '#1B1B1A',
    borderRadius: 9,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardTitle: {
    fontFamily: 'Inter',
    fontSize: 16,
    fontWeight: '700',
    color: '#CDA73D',
    marginVertical: 20,
  },
  gradientContainer: {
    width: '100%',
    height: 147,
    alignItems: 'center',
    justifyContent: 'center',
    borderTopLeftRadius: 9,
    borderTopRightRadius: 9,
  },
  cardsWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 60,
    marginBottom: 40,
  },
});

export default Shop;
