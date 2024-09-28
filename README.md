# @moxorama/reanimated-numbers

Library that animates changes in numbers

## Installation

```sh
npm install @moxorama/reanimated-numbers
```

## Usage


```js
import { AnimatedNumber } from 'react-native-reanimated-numbers';

// ...
<AnimatedNumber
  value={number}
  fontSize={48}
  duration={750}
  format={new Intl.NumberFormat('en-US')}
/>
```

`number` is the number to animate.
`fontSize` is the font size of the number.
`duration` is the duration of the animation in milliseconds.
`format` (optional) is the format of the number, by default there is no formatting.

lineHeight is fontSize * 1.2


## Contributing

See the [contributing guide](CONTRIBUTING.md) to learn how to contribute to the repository and the development workflow.

## License

MIT

---

Made with [create-react-native-library](https://github.com/callstack/react-native-builder-bob)
