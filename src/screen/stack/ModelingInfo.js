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

const ModelingInfo = ({route}) => {
  const navigation = useNavigation();
  const [currentIdx, setCurrentIdx] = useState(0);
  const selectedCard = route.params;

  const modelingCards = [
    {
      pair: 'A',
      title: 'Electric Current ⚡',
      subtitle: 'Energy in Motion: How Electricity Flows?',
      image: require('../../assets/img/experiment/info1.jpg'),
      description:
        'Imagine electrons as tiny ⚪ balls rolling through a pipe. The 🔋 power source gives them a push, making them move through the 🟠 conductor and creating an electric current! The better the conductor, the easier the electrons flow. That’s why 🧲 copper is widely used in wires—it’s the ultimate “electron highway”!',
    },
    {
      pair: 'B',
      title: 'Antibiotics 💊',
      subtitle: 'A Microscopic Battle for Life',
      image: require('../../assets/img/experiment/info2.jpg'),
      description:
        'In 1928, an accidental discovery revealed that mold 🍄 could kill bacteria. This led to the creation of the first antibiotic—penicillin! 💊 Antibiotics work like tiny warriors 🏹, breaking down bacterial walls 🏰 or stopping their reproduction. In this simulation, you’ll see how 🦠 bacteria weaken and disappear when the medicine is introduced.',
    },
    {
      pair: 'C',
      title: 'Chemical Reaction 🔥',
      subtitle: 'When Metal Meets Acid',
      image: require('../../assets/img/experiment/info3.jpg'),
      description:
        'Remember those school experiments 🏫 with bubbling test tubes? 🧪 When metal reacts with acid, it releases gas 💨—hydrogen! In real life, this process is used for cleaning 🏗 metals and producing fertilizers 🌱. If the reaction is too intense, it can even create a mini-volcano 🌋 of fizzing liquid!',
    },
  ];

  const filteredCard = modelingCards.filter(
    card => card.pair === selectedCard.pair,
  );

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
            onPress={() =>
              currentIdx === 0
                ? navigation.goBack()
                : setCurrentIdx(prev => prev - 1)
            }>
            <Image source={require('../../assets/icons/back.png')} />
          </TouchableOpacity>
          <View>
            <Text style={styles.headerTitle}>MODELING AND APPLICATION</Text>
          </View>
        </LinearGradient>

        <View style={styles.container}>
          <View style={styles.welcomeContainer}>
            <View
              style={{width: 200, paddingVertical: 11, paddingHorizontal: 20}}>
              <Text style={styles.cardTitle}>{filteredCard[0].title}</Text>
              <Text style={styles.cardDescription}>
                {filteredCard[0].subtitle}
              </Text>
            </View>
            <Image
              source={filteredCard[0].image}
              style={styles.cardImage}
              resizeMode="cover"
            />
            <LinearGradient
              colors={['#0B0908', '#00000000']}
              start={{x: 0, y: 0}}
              end={{x: 0.7, y: 0}}
              style={styles.gradient}
            />
          </View>
          <View style={{marginTop: 48, marginBottom: 106}}>
            <Text style={styles.text}>• ℹ️ Description:</Text>
            <Text style={styles.text}>{filteredCard[0].description}</Text>
          </View>
          <TouchableOpacity
            activeOpacity={0.7}
            style={styles.buttonWrap}
            onPress={() => navigation.goBack('ModelingDetails')}>
            <Text style={styles.buttonText}>Start again!</Text>
            <Image source={require('../../assets/icons/again.png')} />
          </TouchableOpacity>
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
  welcomeContainer: {
    backgroundColor: 'rgba(0, 0, 0, 0.68)',
    width: '100%',
    borderRadius: 9,
    marginTop: 32,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  welcomeText: {
    fontFamily: 'Afacad',
    fontSize: 15,
    fontWeight: '600',
    color: '#9B9999',
    textAlign: 'center',
    marginVertical: 40,
  },
  buttonWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 30,
    marginBottom: 40,
  },
  buttonText: {
    fontFamily: 'Afacad',
    fontSize: 28,
    fontWeight: '600',
    color: '#CDA73D',
  },
  cardImage: {
    height: 188,
    width: '50%',
    borderTopRightRadius: 9,
    borderBottomRightRadius: 9,
    resizeMode: 'cover',
  },
  gradient: {
    position: 'absolute',
    top: 0,
    left: '50%',
    right: 0,
    height: 188,
  },
  cardTitle: {
    fontFamily: 'Afacad',
    fontSize: 24,
    fontWeight: '600',
    color: '#CDA73D',
  },
  cardDescription: {
    fontFamily: 'Inter',
    fontSize: 14,
    fontWeight: '400',
    color: '#fff',
    marginTop: 20,
  },
  text: {
    fontFamily: 'Inter',
    fontSize: 16,
    fontWeight: '400',
    color: '#fff',
    lineHeight: 20,
  },
  questionText: {
    fontFamily: 'Afacad',
    fontSize: 22,
    fontWeight: '600',
    color: '#9B9999',
    marginBottom: 20,
    lineHeight: 20,
    textAlign: 'center',
  },
});

export default ModelingInfo;
