import {StyleSheet, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

const Layout = ({children}) => {
  return (
    <LinearGradient
      colors={['#111111', '#302921']}
      start={{x: 0, y: 0}}
      end={{x: 1, y: 0}}
      style={styles.linearGradient}>
      {children}
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  linearGradient: {
    flex: 1,
  },
});

export default Layout;
