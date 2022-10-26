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
  // ----------------------------------------------------------------------

  const [isCreateScreenOpen, setIsCreateScreenOpen] = useState(false);

  // ----------------------------------------------------------------------

  return (
    <>
      <AnimatedFAB
        icon={'plus'}
        label={'Adicionar'}
        variant="secondary"
        extended={isExtended}
        onPress={() => setIsCreateScreenOpen(true)}
        animateFrom={'right'}
        style={{
          bottom: 16,
          right: 16,
          position: 'absolute',
        }}
      />

      {isCreateScreenOpen && (
        <Sheet onClose={() => setIsCreateScreenOpen(false)}>
          <TransactionCreateEdit />
        </Sheet>
      )}
    </>
  );
}
