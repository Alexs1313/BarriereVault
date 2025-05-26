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

import {cards} from '../../data/cards';
import Layout from '../../components/Layout';

const CardsDetails = () => {
  const navigation = useNavigation();

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
            onPress={() => navigation.goBack()}>
            <Image source={require('../../assets/icons/back.png')} />
          </TouchableOpacity>
          <View>
            <Text style={styles.headerTitle}>SCIENCE CARDS</Text>
          </View>
        </LinearGradient>

        <View style={styles.container}>
          <Text style={styles.welcomeText}>
            SELECT A SCIENCE TO DISCOVER FASCINATING FACTS!
          </Text>

          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
            }}>
            {cards.map(card => (
              <TouchableOpacity
                onPress={() => navigation.navigate('CardFacts', card)}
                activeOpacity={0.7}
                key={card.title}
                style={styles.card}>
                <Image source={card.image} style={styles.cardImage} />
                <Text style={styles.cardTitle}>{card.title}</Text>
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
    paddingHorizontal: 20,
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
  welcomeText: {
    fontFamily: 'Afacad',
    fontSize: 15,
    fontWeight: '600',
    color: '#9B9999',
    textAlign: 'center',
    marginBottom: 30,
    marginTop: 20,
  },
  cardImage: {
    height: 154,
    width: '100%',
    borderTopLeftRadius: 9,
    borderTopRightRadius: 9,
  },
  card: {
    width: '48%',
    backgroundColor: '#1B1B1A',
    borderRadius: 9,
    marginBottom: 20,
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

export default CardsDetails;
