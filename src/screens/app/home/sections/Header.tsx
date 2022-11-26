// hooks
import { useAuth } from '@src/hooks/useAuth';
import { useTheme } from '@src/hooks/useTheme';
// components
import { View } from 'react-native';
import { Text, IconButton, Icon } from '@src/components/default';
import { SafeAreaView } from 'react-native-safe-area-context';

// ----------------------------------------------------------------------

export function Header() {
  const theme = useTheme();
  const { signOut, user } = useAuth();

  return (
    <SafeAreaView
      style={{
        height: 148,
        padding: 32,
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'row',
        backgroundColor: theme.palette.background.paper,
      }}
    >
      <View
        style={{
          width: 64,
          height: 64,
          display: 'flex',
          borderRadius: 100,
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: theme.palette.text.disabled,
        }}
      >
        <Icon name="profile" size={48} color={theme.palette.text.faded} />
      </View>

      <View style={{ flexShrink: 1, marginRight: 'auto', paddingHorizontal: 16 }}>
        <Text variant="h4" style={{ color: theme.palette.text.faded }}>
          Olá,
        </Text>
        <Text variant="h3" numberOfLines={1}>
          {user ? user.nickname : '-'}
        </Text>
      </View>

      <IconButton name="logout" onPress={signOut} color={theme.palette.text.faded} />
    </SafeAreaView>
  );
}
