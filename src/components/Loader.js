import {
  Animated,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {useNavigation} from '@react-navigation/native';
import {useEffect, useRef, useState} from 'react';
import Layout from './Layout';
import Orientation from 'react-native-orientation-locker';

const Loader = () => {
  const navigation = useNavigation();
  const pic1Opacity = useRef(new Animated.Value(0)).current;
  const pic2Opacity = useRef(new Animated.Value(0)).current;
  const textOpacity = useRef(new Animated.Value(0)).current;
  const finalOpacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // 1. Picture 1 fades in
    Animated.timing(pic1Opacity, {
      toValue: 1,
      duration: 700,
      useNativeDriver: true,
    }).start(() => {
      // 2. Picture 1 fades out, Picture 2 fades in
      Animated.sequence([
        Animated.timing(pic1Opacity, {
          toValue: 0,
          duration: 400,
          useNativeDriver: true,
        }),
        Animated.timing(pic2Opacity, {
          toValue: 1,
          duration: 700,
          useNativeDriver: true,
        }),
      ]).start(() => {
        // 3. Text appears
        Animated.timing(textOpacity, {
          toValue: 1,
          duration: 500,
          useNativeDriver: true,
        }).start(() => {
          // 4. After 2 seconds, show final element
          setTimeout(() => {
            Animated.timing(finalOpacity, {
              toValue: 1,
              duration: 700,
              useNativeDriver: true,
            }).start();
          }, 400);
        });
      });
    });
  }, []);

  useEffect(() => {
    Orientation.lockToPortrait();
  }, []);

  return (
    <Layout>
      <View style={styles.container}>
        {/* Picture 1 */}
        <Animated.Image
          source={require('../assets/img/welcome1.png')}
          style={[styles.image, {opacity: pic1Opacity, position: 'absolute'}]}
          resizeMode="cover"
        />
        {/* Picture 2 */}
        <Animated.Image
          source={require('../assets/img/welcome2.png')}
          style={[styles.image, {opacity: pic2Opacity, position: 'absolute'}]}
          resizeMode="cover"
        />
        {/* Text */}
        <Animated.View style={{opacity: textOpacity, top: 220}}>
          <Text style={styles.subtitle}>BARRIERE</Text>
        </Animated.View>
        {/* Final element (could be another image or text) */}
        <Animated.View style={{opacity: finalOpacity, top: 190}}>
          <Text style={styles.subtitle}>VAULT</Text>
        </Animated.View>
      </View>
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 20,
    marginTop: 195,
    alignItems: 'center',
    justifyContent: 'center',
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

export default Loader;
