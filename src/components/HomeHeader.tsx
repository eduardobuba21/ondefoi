// hooks
import { useAuth } from '@src/hooks/useAuth';
import { useTheme } from '@src/hooks/useTheme';
// components
import { View } from 'react-native';
import { Text, IconButton, Icon } from '@src/components/default';
import { SafeAreaView } from 'react-native-safe-area-context';

// ----------------------------------------------------------------------

export function HomeHeader() {
  const theme = useTheme();
  const { signOut } = useAuth();

  return (
    <SafeAreaView
      style={{
        height: 148,
        padding: 32,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: theme.palette.background.paper,
      }}
    >
      <View
        style={{
          width: 64,
          height: 64,
          borderRadius: 100,
          backgroundColor: theme.palette.text.disabled,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Icon name="profile" size={48} color={theme.palette.text.faded} />
      </View>

      <View style={{ flexGrow: 1, paddingHorizontal: 16 }}>
        <Text variant="h4" style={{ color: theme.palette.text.faded }}>
          Olá,
        </Text>
        <Text variant="h3">Eduardo Buba</Text>
      </View>

      <IconButton name="logout" onPress={signOut} color={theme.palette.text.faded} />
    </SafeAreaView>
  );
}
