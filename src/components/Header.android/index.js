import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Platform,
  FlatList,
  TouchableOpacity,
  Animated,
  RefreshControl,
  Alert,
} from 'react-native';
import PropTypes from 'prop-types';

const HEADER_MAX_HEIGHT = 130;
const HEADER_MIN_HEIGHT = 95;
const HEADER_SCROLL_DISTANCE = HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT;

export default class ScrollViewHeader extends Component {
  static propTypes = {
    title: PropTypes.string,
    maxHeight: PropTypes.number,
    minHeight: PropTypes.number,
    headerStyle: PropTypes.object,
    barStyle: PropTypes.object,
    titleStyle: PropTypes.object,
    children: PropTypes.node,
    extras: PropTypes.object,
  };

  static defaultProps = {
    maxHeight: 130,
    minHeight: 95,
  };
  constructor(props) {
    super(props);

    this.state = {
      scrollY: new Animated.Value(-HEADER_MAX_HEIGHT),
      HEADER_MAX_HEIGHT: this.props.maxHeight,
      HEADER_MIN_HEIGHT: this.props.minHeight,
      HEADER_SCROLL_DISTANCE: this.props.maxHeight - this.props.minHeight,
    };
  }

  render() {
    const {
      title,
      maxHeight,
      minHeight,
      headerStyle,
      barStyle,
      titleStyle,
      children,
      extras,
      ,,,rest
    } = this.props;

    const {
      HEADER_MAX_HEIGHT,
      HEADER_MIN_HEIGHT,
      HEADER_SCROLL_DISTANCE,
    } = this.state;

    const scrollY = Animated.add(this.state.scrollY, HEADER_MAX_HEIGHT);

    const barOpacity = this.state.scrollY.interpolate({
      inputRange: [-100, -80],
      outputRange: [0, 1],
      extrapolate: 'clamp',
    });
    const titleScale = scrollY.interpolate({
      inputRange: [0, HEADER_SCROLL_DISTANCE / 2, HEADER_SCROLL_DISTANCE],
      outputRange: [1, 1, 0.6],
      extrapolate: 'clamp',
    });
    const titleTranslate = scrollY.interpolate({
      inputRange: [0, HEADER_SCROLL_DISTANCE / 2, HEADER_SCROLL_DISTANCE],
      outputRange: [0, 0, -45],
      extrapolate: 'clamp',
    });
    return (
      <View style={{ flex: 1 }}>
        <Animated.ScrollView
          style={{ flex: 1 }}
          scrollEventThrottle={1}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { y: this.state.scrollY } } }],
            { useNativeDriver: true },
          )}
          contentInset={{
            top: HEADER_MAX_HEIGHT,
          }}
          contentOffset={{
            y: -HEADER_MAX_HEIGHT,
          }}
          {...rest}
        >
          {children}
        </Animated.ScrollView>

        <Animated.View
          pointerEvents="none"
          style={[
            styles.bar,
            barStyle,
            {
              opacity: barOpacity,
            },
          ]}
        />
        <Animated.View
          style={[
            styles.header,
            headerStyle,
            {
              transform: [
                { scale: titleScale },
                { translateY: titleTranslate },
              ],
            },
          ]}
        >
          {extras}
          <Text style={[styles.title, titleStyle]}>{title}</Text>
        </Animated.View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  bar: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    backgroundColor: 'black',
    height: 95,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.5,
        shadowRadius: 15,
      },
      android: {
        elevation: 5,
      },
    }),
  },
  header: {
    backgroundColor: 'transparent',
    marginTop: 50,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
  },
  title: {
    color: 'white',
    padding: 8,
    fontSize: 28,
  },
});
