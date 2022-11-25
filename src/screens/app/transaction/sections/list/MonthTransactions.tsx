import { useState } from 'react';
// hooks
import { useTheme } from '@src/hooks/useTheme';
// components
import { Sheet } from '@src/components/Sheet';
import { Container, Gap, Icon, IconButton, Text } from '@src/components/default';
import { View, Dimensions, ScrollView } from 'react-native';
// utils
import { alpha } from '@src/utils/theme';
import { fCurrency } from '@src/utils/formatNumber';
import { TTransactionByDate } from '@src/utils/transactions';
// sections
import { CreateFab } from './CreateFab';
import { ITransaction } from '@src/@types/transaction';
import { TransactionCreateEdit } from '../../TransactionCreateEdit';

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

  const [isEditScreenOpen, setIsEditScreenOpen] = useState(false);
  const [transactionEditData, setTransactionEditData] = useState<ITransaction>();

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
          <Container>
            <View style={{ marginBottom: 70 }}>
              {transactions.map((transactionsGroup) => (
                <View key={transactionsGroup.date}>
                  <Text
                    variant="subtitle1"
                    style={{
                      marginBottom: 8,
                      color: theme.palette.text.faded,
                    }}
                  >
                    {transactionsGroup.label}
                  </Text>

                  {transactionsGroup.transactions.map((transaction) => {
                    const isExit = transaction.type === 'exit';

                    return (
                      <View
                        key={transaction.id}
                        style={{
                          padding: 8,
                          marginBottom: 8,
                          display: 'flex',
                          alignItems: 'center',
                          flexDirection: 'row',
                          borderRadius: theme.props.borderRadius.card,
                          backgroundColor: theme.palette.background.card,
                        }}
                      >
                        <View
                          style={{
                            width: 48,
                            height: 48,
                            display: 'flex',
                            borderRadius: 100,
                            alignItems: 'center',
                            justifyContent: 'center',
                            backgroundColor: isExit
                              ? alpha(theme.palette.error.main, 0.12)
                              : alpha(theme.palette.primary.main, 0.12),
                          }}
                        >
                          <Icon
                            name={isExit ? 'made' : 'received'}
                            size="large"
                            color={isExit ? theme.palette.error.main : theme.palette.primary.main}
                          />
                        </View>

                        <View
                          style={{
                            flexGrow: 1,
                            paddingHorizontal: theme.props.padding.element,
                          }}
                        >
                          <Text variant="h4" style={{ color: theme.palette.text.secondary }}>
                            {transaction.description}
                          </Text>
                          <Text variant="subtitle1" style={{ color: theme.palette.text.faded }}>
                            {'R$ ' + fCurrency(transaction.value)}
                          </Text>
                        </View>

                        <IconButton
                          name="edit"
                          size="small"
                          onPress={() => {
                            setTransactionEditData(transaction);
                            setIsEditScreenOpen(true);
                          }}
                        />
                      </View>
                    );
                  })}

                  <Gap />
                </View>
              ))}
            </View>
          </Container>
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
          <Text
            variant="subtitle1"
            style={{ textAlign: 'center' }}
          >{`Nenhum registro\nno período selecionado`}</Text>
        </View>
      )}

      <CreateFab isExtended={isFabExtended} />

      {isEditScreenOpen && (
        <Sheet onClose={() => setIsEditScreenOpen(false)}>
          <TransactionCreateEdit
            onSuccess={() => setIsEditScreenOpen(false)}
            isEdit
            editData={transactionEditData}
          />
        </Sheet>
      )}
    </>
  );
}
