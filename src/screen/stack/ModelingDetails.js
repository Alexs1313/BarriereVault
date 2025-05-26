import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  PanResponder,
  Animated,
  useWindowDimensions,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {useNavigation} from '@react-navigation/native';
import React, {useRef, useState} from 'react';

import Layout from '../../components/Layout';
import CustomModal from '../../components/CustomModal';

const CARD_SIZE = 190;
const H_MARGIN = 56;
const V_MARGIN = 20;

const cards = [
  {
    id: 1,
    pair: 'A',
    title: 'Conductor 🟠',
    description: 'Description for Pair A',
    image: require('../../assets/img/experiment/1.jpg'),
  },
  {
    id: 2,
    pair: 'C',
    title: 'Acid ⚗️',
    description: 'Description for Pair A',
    image: require('../../assets/img/experiment/2.jpg'),
  },
  {
    id: 3,
    pair: 'B',
    title: 'Bacteria 🦠',
    description: 'Description for Pair B',
    image: require('../../assets/img/experiment/3.jpg'),
  },
  {
    id: 4,
    pair: 'A',
    title: 'Power Source 🔋',
    description: 'Description for Pair B',
    image: require('../../assets/img/experiment/4.jpg'),
  },
  {
    id: 5,
    pair: 'C',
    title: 'Metal 🏗',
    description: 'Description for Pair C',
    image: require('../../assets/img/experiment/5.jpg'),
  },
  {
    id: 6,
    pair: 'B',
    title: 'Antibiotics 💊',
    description: 'Description for Pair C',
    image: require('../../assets/img/experiment/6.jpg'),
  },
];

function getGridPositions(windowWidth, windowHeight) {
  const isLandscape = windowWidth > windowHeight;
  const columns = isLandscape ? 3 : 2;
  const rows = Math.ceil(cards.length / columns);

  const totalWidth = columns * CARD_SIZE + (columns - 2) * H_MARGIN;
  const totalHeight = rows * CARD_SIZE + (rows + 7) * V_MARGIN;

  const leftOffset = Math.max(0, (windowWidth - totalWidth) / 2);
  const topOffset = Math.max(0, (windowHeight - totalHeight) / 2);

  return cards.map((_, idx) => {
    const row = Math.floor(idx / columns);
    const col = idx % columns;
    return {
      top: topOffset + row * (CARD_SIZE + V_MARGIN),
      left: leftOffset + col * (CARD_SIZE + H_MARGIN),
    };
  });
}

const ModelingDetails = () => {
  const [isVisible, setIsVisible] = useState(false);
  const navigation = useNavigation();
  const window = useWindowDimensions();
  const initialPositions = getGridPositions(window.width, window.height);

  const [pans] = useState(() =>
    cards.map((_, idx) => new Animated.ValueXY({x: 0, y: 0})),
  );
  const cardRefs = useRef(cards.map(() => React.createRef()));

  const [dragged, setDragged] = useState(null);
  const [matchedPairs, setMatchedPairs] = useState([]);

  const panResponders = cards.map((card, idx) =>
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderGrant: () => {
        setDragged(idx);
        pans[idx].setOffset({
          x: pans[idx].x._value,
          y: pans[idx].y._value,
        });
      },
      onPanResponderMove: Animated.event(
        [null, {dx: pans[idx].x, dy: pans[idx].y}],
        {useNativeDriver: false},
      ),
      onPanResponderRelease: () => {
        pans[idx].flattenOffset();
        setDragged(null);

        cardRefs.current.forEach((ref, otherIdx) => {
          if (otherIdx === idx) return;
          if (!ref.current) return;
          ref.current.measure((fx, fy, width, height, px, py) => {
            const dropX = pans[idx].x._value + initialPositions[idx].left;
            const dropY = pans[idx].y._value + initialPositions[idx].top;
            if (
              dropX < px + width &&
              dropX + CARD_SIZE > px &&
              dropY < py + height &&
              dropY + CARD_SIZE > py &&
              card.pair === cards[otherIdx].pair
            ) {
              const pairKey = [card.id, cards[otherIdx].id].sort().join('-');
              if (!matchedPairs.includes(pairKey)) {
                setMatchedPairs(prev => [...prev, pairKey]);
                navigation.navigate('ModelingInfo', card);
              }
            } else if (card.pair === cards[otherIdx].pair) {
              setIsVisible(true);
            }
          });
        });

        Animated.spring(pans[idx], {
          toValue: {x: 0, y: 0},
          useNativeDriver: false,
        }).start();
      },
    }),
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
            onPress={() => navigation.goBack()}>
            <Image source={require('../../assets/icons/back.png')} />
          </TouchableOpacity>
          <View>
            <Text style={styles.headerTitle}>MODELING AND APPLICATION</Text>
          </View>
        </LinearGradient>

        <View style={styles.container}>
          <Text style={styles.welcomeText}>
            SELECT 2 ELEMENTS TO SEE THE EXPERIMENT.
          </Text>

          <View style={styles.container}>
            {cards.map((card, idx) => (
              <Animated.View
                ref={cardRefs.current[idx]}
                key={card.id}
                style={[
                  styles.card,
                  {
                    top: initialPositions[idx].top,
                    left: initialPositions[idx].left,
                    zIndex: dragged === idx ? 2 : 1,
                    position: 'absolute',
                    transform: [
                      {translateX: pans[idx].x},
                      {translateY: pans[idx].y},
                    ],
                  },
                ]}
                {...panResponders[idx].panHandlers}>
                <Image source={card.image} style={styles.image} />
                <Text style={styles.cardText}>{card.title}</Text>
              </Animated.View>
            ))}
          </View>
        </View>
      </ScrollView>
      {isVisible && (
        <CustomModal>
          <Text style={styles.modalTitle}>
            ⚠️ These elements do not interact.
          </Text>
          <Text style={styles.modalSubtitle}>
            🔍 To start the experiment, match the correct cards!
          </Text>
          <TouchableOpacity
            activeOpacity={0.7}
            style={styles.buttonWrap}
            onPress={() => setIsVisible(false)}>
            <Text style={styles.buttonText}>Start again!</Text>
            <Image source={require('../../assets/icons/again.png')} />
          </TouchableOpacity>
        </CustomModal>
      )}
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {marginBottom: 300},
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
  modalTitle: {
    fontFamily: 'Afacad',
    fontSize: 32,
    fontWeight: '600',
    color: '#fff',
    marginBottom: 28,
  },
  modalSubtitle: {
    fontFamily: 'Afacad',
    fontSize: 15,
    fontWeight: '600',
    color: '#9B9999',
    marginBottom: 50,
  },
  welcomeText: {
    fontFamily: 'Afacad',
    fontSize: 15,
    fontWeight: '600',
    color: '#9B9999',
    textAlign: 'center',
    // marginBottom: 30,
    marginTop: 20,
  },
  card: {
    position: 'absolute',
    width: 130,
    height: 180,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 9,
    backgroundColor: '#1B1B1A',
  },
  cardText: {
    fontSize: 16,
    fontWeight: 600,
    color: '#fff',
    fontFamily: 'Afacad',
    marginVertical: 16,
  },
  image: {
    width: '100%',
    height: 136,
    borderTopLeftRadius: 9,
    borderTopRightRadius: 9,
  },
  buttonWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 30,
  },
  buttonText: {
    fontFamily: 'Afacad',
    fontSize: 28,
    fontWeight: '600',
    color: '#CDA73D',
  },
});

export default ModelingDetails;
