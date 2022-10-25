import { useState } from 'react';
// components
import { AnimatedFAB } from 'react-native-paper';
// sections
import { Sheet } from '@src/components/Sheet';
import { TransactionCreateEdit } from '../../TransactionCreateEdit';

// ----------------------------------------------------------------------

type Props = {
  isExtended: any;
};

// ----------------------------------------------------------------------

export function Fab({ isExtended }: Props) {
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  // ----------------------------------------------------------------------

  return (
    <>
      <AnimatedFAB
        icon={'plus'}
        label={'Adicionar'}
        extended={isExtended}
        onPress={() => setIsSheetOpen(true)}
        animateFrom={'right'}
        style={{
          bottom: 16,
          right: 16,
          position: 'absolute',
        }}
      />

      {isSheetOpen && (
        <Sheet onClose={() => setIsSheetOpen(false)}>
          <TransactionCreateEdit />
        </Sheet>
      )}
    </>
  );
}
