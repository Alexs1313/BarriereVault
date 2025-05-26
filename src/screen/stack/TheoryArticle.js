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

const TheoryArticle = ({route}) => {
  const navigation = useNavigation();
  const [selectedOption, setSelectedOption] = useState(null);
  const [currentIdx, setCurrentIdx] = useState(0);
  const routeValue = route.params;

  const handlePressGoBackBtn = () => {
    if (currentIdx === 0) {
      navigation.goBack();
    } else {
      setCurrentIdx(0), setSelectedOption(null);
    }
  };

  const handleShowTheoriesDetails = option => {
    setSelectedOption(option),
      setTimeout(() => {
        setCurrentIdx(currentIdx + 1);
      }, 300);
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
            onPress={() => handlePressGoBackBtn()}>
            <Image source={require('../../assets/icons/back.png')} />
          </TouchableOpacity>
          <View>
            <Text style={styles.headerTitle}>SCIENTIFIC THEORIES</Text>
          </View>
        </LinearGradient>

        <View style={styles.container}>
          {currentIdx === 0 && (
            <View>
              {routeValue.currentTheme ? (
                <View style={styles.optionsContainer}>
                  {routeValue.theme2.map((option, idx) => (
                    <TouchableOpacity
                      style={[
                        styles.button,
                        selectedOption === option && {
                          backgroundColor: '#CDA73D',
                        },
                      ]}
                      key={idx}
                      activeOpacity={0.7}
                      onPress={() => handleShowTheoriesDetails(option)}>
                      <Text
                        style={[
                          styles.buttonText,
                          selectedOption === option && {color: '#000'},
                        ]}>
                        {option.title}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
              ) : (
                <View style={styles.optionsContainer}>
                  {routeValue.theme.map((option, idx) => (
                    <TouchableOpacity
                      style={[
                        styles.button,
                        selectedOption === option && {
                          backgroundColor: '#CDA73D',
                        },
                      ]}
                      key={idx}
                      activeOpacity={0.7}
                      onPress={() => handleShowTheoriesDetails(option)}>
                      <Text
                        style={[
                          styles.buttonText,
                          selectedOption === option && {color: '#000'},
                        ]}>
                        {option.title}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
              )}
              <View
                style={{alignItems: 'center', marginTop: 56, marginBottom: 40}}>
                {routeValue.currentTheme ? (
                  <Image
                    source={require('../../assets/img/theory/cards2.png')}
                  />
                ) : (
                  <Image
                    source={require('../../assets/img/theory/cards1.png')}
                  />
                )}
              </View>
            </View>
          )}

          {currentIdx === 1 && (
            <View>
              <Text style={styles.label}>{selectedOption.label}</Text>
              <Text style={styles.description}>
                {selectedOption.description}
              </Text>
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
  optionsContainer: {
    marginHorizontal: 100,
    gap: 20,
    marginTop: 47,
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
  label: {
    fontFamily: 'Afacad',
    fontSize: 24,
    fontWeight: '600',
    color: '#CDA73D',
    marginTop: 23,
    marginBottom: 43,
    textAlign: 'center',
  },
  description: {
    fontFamily: 'Inter',
    fontSize: 16,
    fontWeight: '400',
    color: '#fff',
  },
});

export default TheoryArticle;
