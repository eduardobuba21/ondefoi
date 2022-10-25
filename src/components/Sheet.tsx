import { ReactNode, useEffect } from 'react';
// hooks
import { useTheme } from '@src/hooks/useTheme';
// components
import { Portal, Surface } from 'react-native-paper';
import { View, BackHandler, TouchableWithoutFeedback } from 'react-native';

// ----------------------------------------------------------------------

type Props = {
  children: ReactNode;
  onClose: VoidFunction;
};

// ----------------------------------------------------------------------

export function Sheet({ children, onClose }: Props) {
  const theme = useTheme();

  // ----------------------------------------------------------------------

  const handleBack = () => {
    onClose();
    return true;
  };

  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', handleBack);

    return () => {
      BackHandler.removeEventListener('hardwareBackPress', handleBack);
    };
  }, []);

  // ----------------------------------------------------------------------

  return (
    <>
      <Portal>
        <TouchableWithoutFeedback onPress={onClose}>
          <View
            style={{
              flex: 1,
              backgroundColor: theme.colors.backdrop,
            }}
          />
        </TouchableWithoutFeedback>
      </Portal>

      <Portal>
        <View
          style={{
            flex: 1,
            justifyContent: 'flex-end',
          }}
        >
          <Surface
            style={{
              maxHeight: '80%',
              overflow: 'hidden',
              borderTopLeftRadius: 15,
              borderTopRightRadius: 15,
              backgroundColor: theme.colors.background,
            }}
          >
            {children}
          </Surface>
        </View>
      </Portal>
    </>
  );
}
