import { useState } from 'react';
// hooks
import { useTheme } from '@src/hooks/useTheme';
// components
import { Fab } from './Fab';
import { View, Dimensions, ScrollView } from 'react-native';
import { List, Text, Divider, IconButton } from 'react-native-paper';
// utils
import { alpha } from '@src/utils/theme';
import { fCurrency } from '@src/utils/formatNumber';
import { TTransactionByDate } from './service';

// ----------------------------------------------------------------------

type Props = {
  transactions: TTransactionByDate[];
};

//

const { height: _screenHeight } = Dimensions.get('screen');

// ----------------------------------------------------------------------

export function MonthTransactions({ transactions }: Props) {
  const theme = useTheme();

  // ----------------------------------------------------------------------

  const [isFabExtended, setIsFabExtended] = useState(true);

  // ----------------------------------------------------------------------

  return (
    <>
      {!!transactions.length && (
        <ScrollView
          onScroll={(event) => {
            const currentScrollPosition = Math.floor(event.nativeEvent.contentOffset.y) ?? 0;
            setIsFabExtended(currentScrollPosition <= 0);
          }}
        >
          <List.Section style={{ marginBottom: 90 }}>
            {transactions.map((transactionsGroup) => (
              <View key={transactionsGroup.date}>
                <List.Subheader>{transactionsGroup.label}</List.Subheader>
                <Divider />

                {transactionsGroup.transactions.map((transaction) => (
                  <View key={transaction.id}>
                    <List.Item
                      title={transaction.description}
                      description={'R$ ' + fCurrency(transaction.value)}
                      left={() => {
                        const isExit = transaction.type === 'exit';
                        return (
                          <List.Icon
                            icon={isExit ? 'call-made' : 'call-received'}
                            color={isExit ? theme.palette.error.light : theme.palette.primary.light}
                            style={{
                              backgroundColor: isExit
                                ? alpha(theme.palette.error.light, 0.1)
                                : alpha(theme.palette.primary.light, 0.1),
                              borderRadius: 100,
                            }}
                          />
                        );
                      }}
                      right={() => (
                        <View style={{ justifyContent: 'center' }}>
                          <IconButton icon="pencil" size={20} onPress={() => {}} />
                        </View>
                      )}
                    />
                    <Divider />
                  </View>
                ))}
              </View>
            ))}
          </List.Section>
        </ScrollView>
      )}

      {!transactions.length && (
        <View
          style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Text variant="bodyLarge" style={{ textAlign: 'center' }}>
            {`Nenhum registro\nno período selecionado`}
          </Text>
        </View>
      )}

      <Fab isExtended={isFabExtended} />
    </>
  );
}
