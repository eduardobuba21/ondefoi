// hooks
import { useAuth } from '@src/hooks/useAuth';
// components
import { Text, View } from 'react-native';
import { Button } from 'react-native-paper';

// ----------------------------------------------------------------------

export default function Dashboard() {
  const { signOut } = useAuth();

  return (
    <View
      style={{
        flex: 1,
        // backgroundColor: theme.palette.background.default,
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Text>Meu App!</Text>

      <Button mode="contained" onPress={signOut}>
        Registrar
      </Button>
    </View>
  );
}
