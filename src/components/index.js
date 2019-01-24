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
import { Icon } from 'expo';
const HEADER_MAX_HEIGHT = 130;
const HEADER_MIN_HEIGHT = 95;
const HEADER_SCROLL_DISTANCE = HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT;

const eventList= [
		{
			id: "123sad",
			name: "Basic Java Workshop",
			password: "123123",
			column: []			
		},
		{
			id: "123sad",
			name: "Basic Java Workshop",
			password: "123123",
			column: []			
		},
		{
			id: "123sad",
			name: "Basic Java Workshop",
			password: "123123",
			column: []			
		},
		{
			id: "123sad",
			name: "Basic Java Workshop",
			password: "123123",
			column: []			
		},
		{
			id: "123sad",
			name: "Basic Java Workshop",
			password: "123123",
			column: []			
		},
		{
			id: "123sad",
			name: "Basic Java Workshop",
			password: "123123",
			column: []			
		},
		{
			id: "123sad",
			name: "Basic Java Workshop",
			password: "123123",
			column: []			
		},{
			id: "123sad",
			name: "Basic Java Workshop",
			password: "123123",
			column: []			
		},
		{
			id: "123sad",
			name: "Basic Java Workshop",
			password: "123123",
			column: []			
		},
	]

export default class ScrollViewHeader extends Component {
  constructor(props) {
    super(props);

    this.state = {
      scrollY: new Animated.Value(
        // iOS has negative initial scroll value because content inset...
        Platform.OS === 'ios' ? -HEADER_MAX_HEIGHT : 0,
      ),
      refreshing: false,
    };
  }


  _renderScrollViewContent() {
    return (
      <View style={styles.scrollViewContent}>
        {eventList.map((item, index) => (
          <TouchableOpacity
            onPress={() => this.props.onPress(item)}
            onLongPress={() => this.props.onLongPress(item)}
            key={item.id}
            style={styles.row}
          >
            <View style={{ flexDirection: 'row' }}>
              <Text style={styles.rowText}>{item.name}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </View>
    );
  }

  render() {
    const scrollY = Animated.add(
      this.state.scrollY,
      Platform.OS === 'ios' ? HEADER_MAX_HEIGHT : 100,
    );

    const imageOpacity = this.state.scrollY.interpolate({
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
          refreshControl={
            <RefreshControl
              refreshing={this.state.refreshing}
              onRefresh={() => {
                this.setState({ refreshing: true });
                setTimeout(() => this.setState({ refreshing: false }), 1000);
              }}
              // Android offset for RefreshControl
              progressViewOffset={HEADER_MAX_HEIGHT}
            />
          }
          // iOS offset for RefreshControl
          contentInset={{
            top: HEADER_MAX_HEIGHT,
          }}
          contentOffset={{
            y: -HEADER_MAX_HEIGHT,
          }}
        >
          {this._renderScrollViewContent()}
        </Animated.ScrollView>
        <Animated.View
          pointerEvents="none"
          style={[
            styles.header,
            { 
              opacity: imageOpacity,
            }
          ]}
        />
        <Animated.View
          style={[
            styles.bar,
            {
              transform: [
                { scale: titleScale },
                { translateY: titleTranslate },
              ],
            },
          ]}
        >
          <Text style={styles.title}>
            Attendance
          </Text>
        </Animated.View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  header: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    backgroundColor: "black",
    height: 95,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.5,
        shadowRadius: 15,
      },
      android: {
        elevation: 3,
      },
    }),
  },
  bar: {
    backgroundColor: 'transparent',
    marginTop: 45,
    height: 82,
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
  scrollViewContent: {
    // iOS uses content inset, which acts like padding.
    paddingTop: HEADER_MAX_HEIGHT,
    flex: 1,
  },
  row: {
    margin: 10,
    marginHorizontal: 25,
    backgroundColor: "black",
    justifyContent: 'center',
    borderRadius: 10,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.5,
        shadowRadius: 20,
      },
      android: {
        elevation: 3,
      },
    }),
  },
  rowText: {
    padding: 20,
    color: 'white',
  },
});

