import { Text, View } from 'react-native';

import { useTheme } from 'styled-components/native';

// ----------------------------------------------------------------------

export default function Dashboard() {
  const theme = useTheme();

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: theme.palette.background.default,
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Text>Meu App!</Text>
    </View>
  );
}
