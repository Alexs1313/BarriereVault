import {useState} from 'react';
import {Modal, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

const CustomAlert = ({visible, children}) => {
  const [showModal, setShowModal] = useState(visible);

  return (
    <Modal transparent visible={showModal} statusBarTranslucent={true}>
      <View
        style={{
          backgroundColor: 'rgba(0, 0, 0, 0.4)',
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <LinearGradient
          colors={['#302921', '#111111']}
          start={{x: 0, y: 0}}
          end={{x: 1, y: 0}}
          style={{
            width: '70%',
            paddingTop: 20,
            borderRadius: 13,
            marginTop: 15,
            borderWidth: 1,
            borderColor: '#A57B1B',
          }}>
          {children}
        </LinearGradient>
      </View>
    </Modal>
  );
};

export default CustomAlert;
