import { Platform } from 'react-native'

const Header = Platform.select({
  ios: () => require('./components/Header.ios'),
  android: () => require('./components/Header.android'),
})();

export default Header.default