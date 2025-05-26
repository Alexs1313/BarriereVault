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

import Layout from '../../components/Layout';

const Game = () => {
  const navigation = useNavigation();

  const cards = [
    {
      title: 'Be Bold! 💪',
      image: require('../../assets/img/game/game1.jpg'),
    },
    {
      title: 'Act Fast! ⚡',
      image: require('../../assets/img/game/game2.jpg'),
    },
    {
      title: 'Break Through! 🏆',
      image: require('../../assets/img/game/game3.jpg'),
    },
  ];

  return (
    <Layout>
      <ScrollView>
        <LinearGradient
          colors={['#111111', '#302921']}
          start={{x: 0, y: 0}}
          end={{x: 1, y: 0}}
          style={styles.header}>
          <Text style={styles.headerTitle}>SCIENCE CARDS</Text>
        </LinearGradient>

        <View style={styles.container}>
          <View style={styles.welcomeContainer}>
            <Text style={styles.welcomeText}>
              Ready for an exciting challenge? Catch the most important
              scientific items, overcome barriers, and become a science master!
              The faster and more accurately you are, the higher your chances of
              winning! ⚡🧪🚀
            </Text>
            <TouchableOpacity
              style={styles.button}
              activeOpacity={0.7}
              onPress={() => navigation.navigate('CatcherGame')}>
              <Text style={styles.buttonText}>Start</Text>
            </TouchableOpacity>
          </View>

          <View style={{alignItems: 'center', marginBottom: 32}}>
            <Image source={require('../../assets/img/logo.png')} />
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginBottom: 80,
            }}>
            {cards.map(card => (
              <View key={card.title} style={styles.card}>
                <Image source={card.image} style={styles.cardImage} />
                <Text style={styles.cardTitle}>{card.title}</Text>
              </View>
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
    height: 154,
    width: '100%',
    borderTopLeftRadius: 9,
    borderTopRightRadius: 9,
  },
  card: {
    width: '30%',
    backgroundColor: '#1B1B1A',
    borderRadius: 9,
  },
  cardTitle: {
    fontFamily: 'Inter',
    fontSize: 14,
    fontWeight: 'regular',
    color: '#fff',
    textAlign: 'center',
    marginVertical: 20,
  },
});

export default Game;
