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
import {useEffect, useState} from 'react';
import Orientation from 'react-native-orientation-locker';

import Layout from '../../components/Layout';

const Welcome = () => {
  const navigation = useNavigation();
  const [step, setStep] = useState(0);

  const handleNextStep = () => {
    if (step === 2) {
      navigation.navigate('TabNav');
    }
    setStep(step + 1);
  };

  useEffect(() => {
    Orientation.unlockAllOrientations();
  }, []);

  return (
    <Layout>
      <ScrollView>
        <View style={[styles.container, step !== 0 && {paddingTop: 160}]}>
          {step === 0 && <Text style={styles.title}>WELCOME TO</Text>}
          <Image
            source={require('../../assets/img/welcome2.png')}
            style={{marginVertical: 32}}
          />
          <View style={{marginHorizontal: 95}}>
            <Text style={styles.subtitle}>BARRIERE VAULT</Text>
          </View>
        </View>
        <View style={styles.sectionWrap}>
          <LinearGradient
            colors={['#302921', '#111111']}
            start={{x: 0, y: 0}}
            end={{x: 1, y: 0}}
            style={styles.gradientWrap}>
            <TouchableOpacity
              activeOpacity={0.7}
              style={styles.buttonWrap}
              onPress={() => setShowAlert(true)}>
              <View style={{width: '55%'}}>
                {step === 0 && (
                  <View>
                    <Text style={styles.titleText}>Explore Science</Text>
                    <Text style={styles.descriptionText}>
                      Dive into the world of groundbreaking discoveries and
                      learn about the theories that changed history.
                    </Text>
                  </View>
                )}
                {step === 1 && (
                  <View>
                    <Text style={styles.titleText}>Experiment!</Text>
                    <Text style={styles.descriptionText}>
                      Test hypotheses, connect scientific elements, and uncover
                      surprising patterns.
                    </Text>
                  </View>
                )}
                {step === 2 && (
                  <View>
                    <Text style={styles.titleText}>Push the Boundaries!</Text>
                    <Text style={styles.descriptionText}>
                      Discover the impact of breakthrough technologies and
                      innovations, shaping a new understanding of science.
                    </Text>
                  </View>
                )}
              </View>

              <TouchableOpacity
                activeOpacity={0.7}
                onPress={() => handleNextStep()}>
                <Image
                  source={require('../../assets/icons/again.png')}
                  style={{width: 83, height: 83}}
                />
              </TouchableOpacity>
            </TouchableOpacity>
          </LinearGradient>
        </View>
      </ScrollView>
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {marginHorizontal: 20, paddingTop: 125, alignItems: 'center'},
  title: {
    fontFamily: 'Afacad',
    fontWeight: '600',
    fontSize: 32,
    color: '#fff',
  },
  subtitle: {
    fontFamily: 'Afacad',
    fontWeight: '600',
    fontSize: 53,
    color: '#fff',
    textAlign: 'center',
    marginBottom: 35,
  },
  sectionWrap: {
    marginHorizontal: 20,
    marginBottom: 40,
  },
  headerTitle: {
    fontFamily: 'Afacad',
    fontSize: 24,
    fontWeight: 'semibold',
    color: '#fff',
  },
  gradientWrap: {
    width: '100%',
    paddingBottom: 40,
    paddingHorizontal: 20,
    borderRadius: 9,
    paddingTop: 10,
    height: 190,
  },
  buttonWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 20,
  },
  titleText: {
    fontFamily: 'Afacad',
    fontSize: 24,
    fontWeight: '600',
    color: '#CDA73D',
    marginBottom: 24,
  },
  descriptionText: {
    fontFamily: 'Inter',
    fontSize: 14,
    fontWeight: '400',
    color: '#fff',
  },
});

export default Welcome;
