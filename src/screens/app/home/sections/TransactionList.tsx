// hooks
import { useTheme } from '@src/hooks/useTheme';
// components
import { View, Dimensions, ScrollView } from 'react-native';
import { List, Text, Divider, IconButton } from 'react-native-paper';
// utils
import { alpha } from '@src/utils/theme';
import { fCurrency } from '@src/utils/formatNumber';
import { TTransactionByDate } from './transactionService';

// ----------------------------------------------------------------------

type Props = {
  transactions: TTransactionByDate[];
};

//

const { height: _screenHeight } = Dimensions.get('screen');

// ----------------------------------------------------------------------

export function TransactionList({ transactions }: Props) {
  const theme = useTheme();

  // ----------------------------------------------------------------------

  return transactions.length ? (
    <ScrollView>
      <List.Section>
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

      <View
        style={{
          paddingVertical: 50,
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Text variant="bodyMedium" style={{ textAlign: 'center' }}>
          Você chegou ao final ;)
        </Text>
      </View>
    </ScrollView>
  ) : (
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
  );
}
