import { ReactNode, useEffect, useRef } from 'react';
// hooks
import { useTheme } from '@src/hooks/useTheme';
// components
import { Portal } from '@gorhom/portal';
import BottomSheet from '@gorhom/bottom-sheet';
import { FadeInView } from './animations/FadeInView';
import { View, BackHandler, TouchableWithoutFeedback } from 'react-native';

// ----------------------------------------------------------------------

type Props = {
  children: ReactNode;
  onClose: VoidFunction;
};

// ----------------------------------------------------------------------

export function Sheet({ children, onClose }: Props) {
  const theme = useTheme();

  const bottomSheetRef = useRef<BottomSheet>(null);

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
              position: 'absolute',
              width: '100%',
              height: '100%',
              backgroundColor: theme.palette.background.backdrop,
            }}
          />
        </TouchableWithoutFeedback>
      </Portal>

      <Portal>
        <View
          style={{
            position: 'absolute',
            width: '100%',
            height: '100%',
            display: 'flex',
            justifyContent: 'flex-end',
          }}
        >
          <BottomSheet
            ref={bottomSheetRef}
            index={0}
            snapPoints={['80%']}
            backgroundStyle={{
              backgroundColor: theme.palette.background.paper,
            }}
            handleIndicatorStyle={{
              backgroundColor: theme.palette.background.elevated,
              width: 60,
            }}
            enablePanDownToClose
            onClose={onClose}
          >
            {children}
          </BottomSheet>
        </View>
      </Portal>
    </>
  );
}
