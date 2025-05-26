import {useState} from 'react';
import {Modal, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

const CustomModal = ({visible, children}) => {
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
            width: '95%',
            paddingBottom: 96,
            paddingHorizontal: 20,
            borderRadius: 9,
            paddingTop: 46,
          }}>
          {children}
        </LinearGradient>
      </View>
    </Modal>
  );
};

export default CustomModal;
