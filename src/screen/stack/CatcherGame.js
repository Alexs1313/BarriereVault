import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  PanResponder,
  View,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {useNavigation} from '@react-navigation/native';
import {useEffect, useRef, useState} from 'react';
import {scientificItems} from '../../store/context';
import Orientation from 'react-native-orientation-locker';

import {useStore} from '../../store/context';
import Layout from '../../components/Layout';

const {width, height} = Dimensions.get('window');

const FLASK_WIDTH = 70;
const FLASK_Y = height - 340;
const OBJECT_SIZE = 50;
const FALL_SPEED = 5;

function getRandomObject() {
  const idx = Math.floor(Math.random() * scientificItems.length);
  return scientificItems[idx];
}
function getRandomX() {
  return Math.random() * (width - OBJECT_SIZE);
}
function spawnFallingObject() {
  const obj = getRandomObject();
  return {
    ...obj,
    x: getRandomX(),
    y: 0,
    id: Math.random().toString(36).substring(2, 9),
  };
}

const CatcherGame = () => {
  const navigation = useNavigation();
  const {setShopCoins, shopCoins} = useStore();
  const [flaskX, setFlaskX] = useState(width / 2 - FLASK_WIDTH / 2);
  const [fallingObjects, setFallingObjects] = useState([
    spawnFallingObject(),
    spawnFallingObject(),
    spawnFallingObject(),
  ]);
  const [targetObject, setTargetObject] = useState(getRandomObject());
  const [points, setPoints] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [coins, setCoins] = useState(0);

  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: (_, gesture) => Math.abs(gesture.dx) > 20,
      onPanResponderMove: (_, gesture) => {
        let newX = flaskX + gesture.dx;
        newX = Math.max(0, Math.min(width - FLASK_WIDTH, newX));
        setFlaskX(newX);
      },
      onPanResponderRelease: () => {},
    }),
  ).current;

  useEffect(() => {
    Orientation.lockToPortrait();
  }, []);

  useEffect(() => {
    if (gameOver) return;
    let animId;
    function fall() {
      setFallingObjects(prevObjs => {
        let updatedObjs = prevObjs.map(obj => ({
          ...obj,
          y: obj.y + FALL_SPEED,
        }));

        const toRespawn = [];
        updatedObjs = updatedObjs.filter(obj => {
          if (
            obj.y + OBJECT_SIZE >= FLASK_Y &&
            obj.y < FLASK_Y + 80 &&
            flaskX + FLASK_WIDTH > obj.x &&
            flaskX < obj.x + OBJECT_SIZE
          ) {
            if (obj.type === targetObject.type) {
              setPoints(p => {
                const newPoints = p + 1;
                if (newPoints >= 4) {
                  setCoins(c => c + 10);
                  setTimeout(() => setPoints(0), 0);
                }
                return newPoints >= 4 ? 0 : newPoints;
              });
              setTargetObject(getRandomObject());
              toRespawn.push(obj.id);
              return false;
            } else {
              setGameOver(true);
              return false;
            }
          }

          if (obj.y > height) {
            toRespawn.push(obj.id);
            return false;
          }
          return true;
        });

        while (updatedObjs.length < 3) {
          updatedObjs.push(spawnFallingObject());
        }
        return updatedObjs;
      });
      animId = requestAnimationFrame(fall);
    }
    animId = requestAnimationFrame(fall);
    return () => cancelAnimationFrame(animId);
  }, [flaskX, gameOver, targetObject]);

  function restart() {
    setGameOver(false);
    setPoints(0);
    setFallingObjects([
      spawnFallingObject(),
      spawnFallingObject(),
      spawnFallingObject(),
    ]);
    setTargetObject(getRandomObject());
  }

  useEffect(() => {
    setShopCoins(shopCoins + coins);
  }, [coins]);

  return (
    <Layout>
      <LinearGradient
        colors={['#111111', '#302921']}
        start={{x: 0, y: 0}}
        end={{x: 1, y: 0}}
        style={styles.header}>
        <TouchableOpacity
          style={styles.back}
          onPress={() => navigation.goBack('')}>
          <Image source={require('../../assets/icons/back.png')} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>THEORY CATCHER</Text>
        <TouchableOpacity
          activeOpacity={0.6}
          style={styles.icon}
          onPress={() => {
            navigation.navigate('Shop');
            setGameOver(false);
          }}>
          <Image source={require('../../assets/icons/coins.png')} />
          <Text style={styles.iconText}>{shopCoins}</Text>
        </TouchableOpacity>
      </LinearGradient>

      <View style={styles.containerGame} {...panResponder.panHandlers}>
        {!gameOver &&
          fallingObjects.map(obj => (
            <Image
              key={obj.id}
              source={obj.img}
              style={[
                styles.object,
                {
                  left: obj.x,
                  top: obj.y,
                  width: OBJECT_SIZE,
                  height: OBJECT_SIZE,
                },
              ]}
            />
          ))}

        {points === 0 && (
          <Image
            source={require('../../assets/icons/flask.png')}
            style={[
              styles.flask,
              {left: flaskX, top: FLASK_Y, width: FLASK_WIDTH, height: 80},
            ]}
          />
        )}
        {points === 1 && (
          <Image
            source={require('../../assets/icons/flask1.png')}
            style={[
              styles.flask,
              {left: flaskX, top: FLASK_Y, width: FLASK_WIDTH, height: 80},
            ]}
          />
        )}
        {points === 2 && (
          <Image
            source={require('../../assets/icons/flask2.png')}
            style={[
              styles.flask,
              {left: flaskX, top: FLASK_Y, width: FLASK_WIDTH, height: 80},
            ]}
          />
        )}
        {points === 3 && (
          <Image
            source={require('../../assets/icons/flask3.png')}
            style={[
              styles.flask,
              {left: flaskX, top: FLASK_Y, width: FLASK_WIDTH, height: 80},
            ]}
          />
        )}
        {points === 4 && (
          <Image
            source={require('../../assets/icons/flask4.png')}
            style={[
              styles.flask,
              {left: flaskX, top: FLASK_Y, width: FLASK_WIDTH, height: 80},
            ]}
          />
        )}

        {gameOver && (
          <View style={styles.gameOver}>
            <LinearGradient
              colors={['#302921', '#111111']}
              start={{x: 0, y: 0}}
              end={{x: 1, y: 0}}
              style={styles.modalGradient}>
              <Text style={styles.modalTitle}>
                ⚠️ Oops! Try catching them again!.
              </Text>
              <Text style={styles.modalSubtitle}>
                Don’t give up, you’re on the right track! 💪
              </Text>
              <TouchableOpacity
                activeOpacity={0.7}
                style={styles.buttonWrap}
                onPress={restart}>
                <Text style={styles.buttonModalText}>Try again!</Text>
                <Image source={require('../../assets/icons/again.png')} />
              </TouchableOpacity>
            </LinearGradient>
          </View>
        )}
      </View>

      <View style={styles.footer}>
        {scientificItems.map((obj, idx) => (
          <Image
            source={obj.img}
            key={idx}
            style={[styles.targetObj, targetObject === obj && {opacity: 1}]}
          />
        ))}
      </View>
    </Layout>
  );
};

const styles = StyleSheet.create({
  containerGame: {
    flex: 1,
    justifyContent: 'flex-start',
  },
  modalTitle: {
    fontFamily: 'Afacad',
    fontSize: 32,
    fontWeight: '600',
    color: '#fff',
    marginBottom: 28,
  },
  back: {position: 'absolute', top: 85, left: 20},
  modalSubtitle: {
    fontFamily: 'Afacad',
    fontSize: 15,
    fontWeight: '600',
    color: '#9B9999',
    marginBottom: 50,
  },
  buttonWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 30,
  },
  buttonModalText: {
    fontFamily: 'Afacad',
    fontSize: 28,
    fontWeight: '600',
    color: '#CDA73D',
  },
  flask: {position: 'absolute', bottom: 120, resizeMode: 'contain'},
  object: {position: 'absolute', resizeMode: 'contain'},
  targetLabel: {fontSize: 18, marginRight: 10},
  targetImg: {width: 40, height: 40, resizeMode: 'contain'},
  points: {fontSize: 18, marginLeft: 24, color: '#333'},
  coins: {fontSize: 18, marginLeft: 20, color: '#e8b100'},
  scoreLarge: {fontSize: 28, color: '#fff', marginBottom: 20},
  gameOver: {
    ...StyleSheet.absoluteFillObject,
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 180,
    backgroundColor: '#0008',
  },
  targetObj: {opacity: 0.1},
  gameOverText: {fontSize: 36, color: '#fff', marginBottom: 20},
  restartBtn: {
    fontSize: 22,
    color: '#fff',
    backgroundColor: '#44c',
    padding: 10,
    borderRadius: 8,
  },
  header: {
    paddingTop: 80,
    paddingBottom: 14,
    backgroundColor: null,
    borderBottomLeftRadius: 9,
    borderBottomRightRadius: 9,
    alignItems: 'center',
    // position: 'absolute',
    left: 0,
    right: 0,

    shadowColor: 'rgba(0, 0, 0, 0.87)',
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 1,
    shadowRadius: 8,
    elevation: 8,
  },
  icon: {
    position: 'absolute',
    top: 80,
    right: 20,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  iconText: {
    fontFamily: 'Afacad',
    fontSize: 16,
    fontWeight: '700',
    color: '#CDA73D',
  },
  headerTitle: {
    fontFamily: 'Afacad',
    fontSize: 24,
    fontWeight: 'semibold',
    color: '#fff',
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#1B1B1A',
    paddingVertical: 40,
    paddingHorizontal: 20,
    justifyContent: 'center',
    gap: 50,
    flexDirection: 'row',
  },
  modalGradient: {
    width: '95%',
    paddingBottom: 96,
    paddingHorizontal: 20,
    borderRadius: 9,
    paddingTop: 46,
  },
});

export default CatcherGame;
