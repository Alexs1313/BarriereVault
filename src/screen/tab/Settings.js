import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {useState} from 'react';
import LinearGradient from 'react-native-linear-gradient';

import Layout from '../../components/Layout';
import {useStore} from '../../store/context';
import CustomAlert from '../../components/CustomAlert';

const Settings = () => {
  const {setShopCoins, setCards, cards} = useStore();
  const [showAlert, setShowAlert] = useState(false);

  const handleResetProgress = () => {
    const resetCards = cards.map(card => {
      return {
        ...card,
        unlocked: false,
      };
    });
    setShopCoins(0), setCards(resetCards);
    setShowAlert(false);
  };

  return (
    <Layout>
      <ScrollView>
        <LinearGradient
          colors={['#111111', '#302921']}
          start={{x: 0, y: 0}}
          end={{x: 1, y: 0}}
          style={styles.header}>
          <Text style={styles.headerTitle}>SETTINGS</Text>
        </LinearGradient>

        <View style={styles.container}>
          <LinearGradient
            colors={['#302921', '#111111']}
            start={{x: 0, y: 0}}
            end={{x: 1, y: 0}}
            style={styles.gradientWrap}>
            <TouchableOpacity
              activeOpacity={0.7}
              style={styles.buttonWrap}
              onPress={() => setShowAlert(true)}>
              <View style={{width: 120}}>
                <Text style={styles.buttonModalText}>Reset progress</Text>
              </View>

              <Image source={require('../../assets/icons/again.png')} />
            </TouchableOpacity>
          </LinearGradient>
        </View>
      </ScrollView>
      {showAlert && (
        <CustomAlert>
          <Text style={styles.alertTitle}>Reset progress?</Text>
          <Text style={styles.alertSecondaryText}>
            Are you sure you want to reset your progress?
          </Text>
          <View style={styles.horizontalLine}></View>
          <View style={{paddingHorizontal: '20%'}}>
            <View style={styles.wrap}>
              <TouchableOpacity
                activeOpacity={0.7}
                onPress={() => handleResetProgress()}>
                <Text
                  style={[
                    styles.alertTitle,
                    {marginTop: 10, marginBottom: 20, marginRight: 25},
                  ]}>
                  Yes
                </Text>
              </TouchableOpacity>

              <View style={styles.verticalLine}></View>
              <TouchableOpacity
                activeOpacity={0.7}
                onPress={() => setShowAlert(false)}>
                <Text
                  style={[
                    styles.alertTitle,
                    {marginTop: 10, marginBottom: 20, color: '#EB1D12'},
                  ]}>
                  Cancel
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </CustomAlert>
      )}
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {marginHorizontal: 20, marginTop: 75, marginBottom: 40},
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
  buttonWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  buttonModalText: {
    fontFamily: 'Afacad',
    fontSize: 28,
    fontWeight: '600',
    color: '#CDA73D',
  },
  headerTitle: {
    fontFamily: 'Afacad',
    fontSize: 24,
    fontWeight: 'semibold',
    color: '#fff',
  },
  gradientWrap: {
    width: '100%',
    paddingBottom: 65,
    paddingHorizontal: 20,
    borderRadius: 9,
    paddingTop: 46,
  },
  alertTitle: {
    fontSize: 17,
    fontWeight: '600',
    color: '#fff',
    textAlign: 'center',
    marginBottom: 10,
  },
  alertSecondaryText: {
    fontSize: 13,
    fontWeight: '400',
    color: '#fff',
    textAlign: 'center',
    marginBottom: 20,
  },
  wrap: {justifyContent: 'space-between', flexDirection: 'row'},
  horizontalLine: {width: '100%', height: 1, backgroundColor: '#A57B1B'},
  verticalLine: {height: '100%', width: 1, backgroundColor: '#A57B1B'},
});

export default Settings;
