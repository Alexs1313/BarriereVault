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

const TheoryDetails = ({route}) => {
  const navigation = useNavigation();
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedItem, setSelectedItem] = useState(null);
  const card = route.params;

  const handlePressButton = () => {
    if (currentIdx === 3) {
      navigation.goBack();
    }
    setCurrentIdx(prev => prev + 1);
  };

  const handlePressRateButton = selectedItem => {
    setSelectedItem(selectedItem);
    setTimeout(() => {
      setCurrentIdx(prev => prev + 1);
    }, 1000);
  };

  const rate = ['👍 Useful', '🤔 Neutral', '👎 Not Useful'];

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
            <Text style={styles.headerTitle}>SCIENCE CARDS</Text>
          </View>
        </LinearGradient>

        <View style={styles.container}>
          <View style={styles.welcomeContainer}>
            <View
              style={{width: 200, paddingVertical: 11, paddingHorizontal: 20}}>
              <Text style={styles.cardTitle}>{card.title}</Text>
              <Text style={styles.cardDescription}>{card.description}</Text>
            </View>
            <Image
              source={card.image}
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
          {currentIdx === 0 && <Text style={styles.text}>{card.text}</Text>}
          {currentIdx === 1 && (
            <View>
              <Text style={[styles.text, {marginBottom: 66}]}>
                {card.moreDetails}
              </Text>
              <Text style={styles.questionText}>
                WAS THIS ARTICLE HELPFUL TO YOU?
              </Text>
            </View>
          )}
          {currentIdx === 2 && (
            <View style={{marginHorizontal: 115, marginTop: 96, gap: 20}}>
              {rate.map(item => (
                <TouchableOpacity
                  onPress={() => handlePressRateButton(item)}
                  style={[
                    styles.button,
                    selectedItem === item && {backgroundColor: '#CDA73D'},
                  ]}
                  activeOpacity={0.7}
                  key={item}>
                  <Text
                    style={[
                      styles.buttonText,
                      selectedItem === item && {color: '#000'},
                    ]}>
                    {item}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          )}
          {currentIdx === 3 && (
            <View style={{marginTop: 68}}>
              <Text style={[styles.text, {textAlign: 'center'}]}>
                We appreciate your rating! We’re committed to making science
                even more exciting. 🚀
              </Text>
            </View>
          )}
        </View>
        <View style={{marginBottom: 40}}>
          {currentIdx !== 2 && (
            <View style={{marginHorizontal: 115, marginBottom: 40}}>
              <TouchableOpacity
                onPress={() => handlePressButton()}
                style={styles.button}
                activeOpacity={0.7}>
                {currentIdx === 0 && (
                  <Text style={styles.buttonText}>More details</Text>
                )}
                {currentIdx === 1 && (
                  <Text style={styles.buttonText}>Rate</Text>
                )}
                {currentIdx === 3 && (
                  <Text style={styles.buttonText}>Back to the vault</Text>
                )}
              </TouchableOpacity>
            </View>
          )}
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
  button: {
    width: '100%',
    paddingVertical: 17,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#CDA73D',
    borderRadius: 100,
  },
  buttonText: {
    fontFamily: 'Afacad',
    fontSize: 14,
    fontWeight: '700',
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
    marginTop: 20,
    lineHeight: 20,
    marginBottom: 98,
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

export default TheoryDetails;
