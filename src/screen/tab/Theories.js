import {
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Layout from '../../components/Layout';
import LinearGradient from 'react-native-linear-gradient';
import {useNavigation} from '@react-navigation/native';
import {theoryCards} from '../../data/theoryCards';
import {useEffect, useRef, useState} from 'react';
import Carousel from 'react-native-reanimated-carousel';

import {theme, theme2} from '../../data/theoryThemes';

const Pagination = ({length, activeIndex}) => (
  <View style={styles.pagination}>
    {Array.from({length}).map((_, i) => (
      <View
        key={i}
        style={[styles.dot, i === activeIndex ? styles.activeDot : null]}
      />
    ))}
  </View>
);

const Theories = () => {
  const navigation = useNavigation();
  const [index, setIndex] = useState(0);
  const [currentTheme, setCurrentTheme] = useState(false);
  const [dimensions, setDimensions] = useState(Dimensions.get('window').width);

  useEffect(() => {
    const onChange = () => {
      const windowWidth = Dimensions.get('window').width;
      console.log('Windowwidth', windowWidth);
      setDimensions(windowWidth);
    };

    const dimensionsHandler = Dimensions.addEventListener('change', onChange);
    return () => dimensionsHandler.remove();
  }, []);

  const handleFindOut = () => {
    currentTheme
      ? navigation.navigate('TheoryArticle', {theme2, currentTheme})
      : navigation.navigate('TheoryArticle', {theme, currentTheme});
  };

  return (
    <Layout>
      <ScrollView>
        <LinearGradient
          colors={['#111111', '#302921']}
          start={{x: 0, y: 0}}
          end={{x: 1, y: 0}}
          style={styles.header}>
          <Text style={styles.headerTitle}>SCIENTIFIC THEORIES</Text>
          <TouchableOpacity
            style={styles.selectorIcon}
            onPress={() => setCurrentTheme(!currentTheme)}>
            {currentTheme ? (
              <Image
                source={require('../../assets/icons/selector.png')}
                tintColor={'#CDA73D'}
              />
            ) : (
              <Image source={require('../../assets/icons/selector.png')} />
            )}
          </TouchableOpacity>
        </LinearGradient>

        <View style={{}}>
          <Carousel
            width={dimensions}
            height={210}
            data={theoryCards}
            onSnapToItem={setIndex}
            renderItem={({item}) => (
              <View style={styles.slide}>
                <View
                  style={{
                    width: 200,
                    paddingVertical: 10,
                  }}>
                  <Text style={styles.welcomeCardTitle}>{item.title}</Text>
                  <Text style={styles.cardDescription}>{item.description}</Text>
                  <TouchableOpacity
                    onPress={() => navigation.navigate('TheoryDetails', item)}
                    style={styles.exploreButton}
                    activeOpacity={0.7}>
                    <Text style={styles.buttonText}>Discover</Text>
                  </TouchableOpacity>
                </View>

                <Image source={item.image} style={styles.cardImg} />
                <LinearGradient
                  colors={['#0B0908', '#00000000']}
                  start={{x: 0, y: 0}}
                  end={{x: 0.7, y: 0}}
                  style={styles.gradientImage}
                />
              </View>
            )}
            loop={false}
            mode=""
            modeConfig={{
              snapDirection: 'left',
              stackInterval: 18,
            }}
          />
          <Pagination length={theoryCards.length} activeIndex={index} />
        </View>

        <View style={styles.container}>
          <Text style={styles.sectionTitle}>
            SELECT A SCIENCE TO DISCOVER FASCINATING FACTS!
          </Text>

          <View style={{marginHorizontal: 115}}>
            <TouchableOpacity
              style={styles.findoutButton}
              activeOpacity={0.7}
              onPress={() => handleFindOut()}>
              <Text style={styles.buttonText}>Find out</Text>
            </TouchableOpacity>
          </View>

          <View style={{marginBottom: 80}}>
            {currentTheme ? (
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}>
                {theme2.map(card => (
                  <View key={card.title} style={styles.card}>
                    <Image source={card.image} style={styles.cardImage} />
                    <Text style={styles.cardTitle}>{card.title}</Text>
                  </View>
                ))}
              </View>
            ) : (
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}>
                {theme.map(card => (
                  <View key={card.title} style={styles.card}>
                    <Image source={card.image} style={styles.cardImage} />
                    <Text style={styles.cardTitle}>{card.title}</Text>
                  </View>
                ))}
              </View>
            )}
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
  selectorIcon: {position: 'absolute', top: 80, right: 20},
  headerTitle: {
    fontFamily: 'Afacad',
    fontSize: 24,
    fontWeight: 'semibold',
    color: '#fff',
  },
  sectionTitle: {
    fontFamily: 'Afacad',
    fontSize: 15,
    fontWeight: '600',
    color: '#9B9999',
    textAlign: 'center',
    marginBottom: 10,
    marginTop: 30,
  },
  findoutButton: {
    width: '100%',
    paddingVertical: 17,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#CDA73D',
    borderRadius: 100,
    marginBottom: 20,
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
  gradient: {
    position: 'absolute',
    top: 0,
    left: '50%',
    right: 0,
    height: 188,
  },
  cardTitle: {
    fontFamily: 'Inter',
    fontSize: 11.5,
    fontWeight: 'regular',
    color: '#fff',
    textAlign: 'center',
    marginVertical: 20,
  },
  slide: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.68)',
    margin: 10,
    borderRadius: 9,
    paddingLeft: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  pagination: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 12,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 5,
    backgroundColor: '#696969',
    marginHorizontal: 6,
  },
  activeDot: {
    backgroundColor: '#CDA73D',
    width: 12,
    height: 12,
  },
  welcomeCardTitle: {
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
    marginBottom: 12,
  },
  gradientImage: {
    position: 'absolute',
    left: '55%',
    right: 0,
    height: 190,
  },
  exploreButton: {
    width: '65%',
    paddingVertical: 17,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#CDA73D',
    borderRadius: 100,
  },
  buttonText: {
    fontFamily: 'Inter',
    fontSize: 14,
    fontWeight: '700',
    color: '#CDA73D',
  },
  cardImg: {
    height: 190,
    width: '46%',
    borderTopRightRadius: 9,
    borderBottomRightRadius: 9,
  },
});

export default Theories;
