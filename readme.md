# React Native ScrollView Header

[![npm (scoped)](https://img.shields.io/badge/react--native--scrollview--header-v1.0.1-green.svg)](https://github.com/weifxn/react-native-scrollview-header)

_an Animated ScrollView Header for React Native_

<img src="https://github.com/weifxn/react-native-scrollview-header/blob/master/img/img.gif" width="300">

## Installation

```bash
$ npm install react-native-scrollview-header
```

## Usage

```js
import React from 'react'
import { View } from 'react-native'
import Header from 'react-native-scrollview-header';

class Component extends React.Component {
	render() {
		const data = [{ name: 'Pink Floyd', age: '30' }];

		return (
			<Header title="Names" barStyle={{ backgroundColor: 'grey' }}>
				{data.map(item => (
					<Text> {item.name} </Text>
				))}
			</Header>
		);
	}
}
```

## Props

| Prop  | Default  | Type | Description |
| :------------ |:---------------:| :---------------:| :-----|
| title | undefined | `string` | Title for header |
| titleStyle | undefined | `object` | Styles for header title |
| headerStyle | undefined | `object` | Styles for title container |
| barStyle | undefined | `object` | Styles for header bar |
| maxHeight | 130 | `number` | Maximum height of header (animated) |
| minHeight | 95 | `number` | Minimum height of header (animated) |
| extras | undefined | `object` | Extra items above title (icon) |