import { useEffect, useRef, useState } from 'react';
// hooks
import { useTheme } from '@src/hooks/useTheme';
// components
import { Button, IconButton } from 'react-native-paper';
import { Dimensions, FlatList, View, ViewToken } from 'react-native';
// utils
import { TMonthRef, isSameMonth, createMonthList } from './service';

// ----------------------------------------------------------------------

type Props = {
  selectedMonth: Date;
  onChangeMonth: (date: Date) => void;
};

//

const { width: _screenWidth } = Dimensions.get('screen');

// ----------------------------------------------------------------------

export function MonthSelect({ selectedMonth, onChangeMonth }: Props) {
  const theme = useTheme();

  // ----------------------------------------------------------------------

  const ref = useRef<FlatList>(null);
  const [index, setIndex] = useState<number>(0);

  // ----------------------------------------------------------------------

  const [monthList] = useState<TMonthRef[]>(createMonthList());

  useEffect(() => {
    const getCurrentMonthIndex = () => {
      const monthIndex = monthList.findIndex((_period) =>
        isSameMonth(new Date(_period.refDate), selectedMonth)
      );
      if (monthIndex > 0) setIndex(monthIndex);
    };

    getCurrentMonthIndex();
  }, [monthList]);

  // ----------------------------------------------------------------------

  const scrollToView = () => {
    if (monthList.length === 0) return;
    if (ref.current) {
      ref.current.scrollToIndex({
        index,
        animated: true,
        viewPosition: 0.5,
      });
    }
  };

  useEffect(() => {
    scrollToView();
    onChangeMonth(monthList[index].refDate);
  }, [index]);

  // ----------------------------------------------------------------------

  // const onViewableItemsChanged = ({ viewableItems }: { viewableItems: ViewToken[] }) => {
  //   if (viewableItems.length < 1) return;
  //   if (viewableItems[0] && viewableItems[0].index) {
  //     const newIndex = viewableItems[0].index;
  //     if (newIndex) {
  //       setIndex(newIndex);
  //     }
  //   }
  // };
  // const viewabilityConfig = {
  //   minimumViewTime: 1000,
  //   itemVisiblePercentThreshold: 100,
  // };
  // const viewabilityConfigCallbackPairs = useRef([{ viewabilityConfig, onViewableItemsChanged }]);

  // ----------------------------------------------------------------------

  return (
    <View
      style={{
        paddingVertical: 5,
        paddingHorizontal: 10,
        backgroundColor: theme.colors.backdrop,
      }}
    >
      <View style={{ position: 'relative' }}>
        <FlatList
          ref={ref}
          horizontal
          data={monthList}
          fadingEdgeLength={200}
          onLayout={scrollToView}
          style={{ flexGrow: 0 }}
          initialScrollIndex={index}
          keyExtractor={(item) => item.id}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingHorizontal: _screenWidth / 2 }}
          onScrollToIndexFailed={() => {
            const wait = new Promise((resolve) => setTimeout(resolve, 500));
            wait.then(() => {
              scrollToView();
            });
          }}
          // viewabilityConfigCallbackPairs={viewabilityConfigCallbackPairs.current}
          renderItem={({ item, index: fIndex }) => {
            return (
              <View style={{ justifyContent: 'center', marginHorizontal: 2 }}>
                <Button
                  mode={fIndex === index ? 'contained-tonal' : 'text'}
                  style={{ margin: 0, padding: 0, width: 120 }}
                  textColor={theme.colors.onBackground}
                  onPress={() => {
                    setIndex(fIndex);
                  }}
                >
                  {item.label}
                </Button>
              </View>
            );
          }}
        />

        <View
          style={{
            position: 'absolute',
            width: '100%',
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}
        >
          <IconButton
            size={24}
            selected
            icon="chevron-left"
            mode="contained-tonal"
            style={{ margin: 0 }}
            onPress={() => {
              if (index === 0) return;
              setIndex(index - 1);
            }}
          />

          <IconButton
            size={24}
            selected
            icon="chevron-right"
            mode="contained-tonal"
            style={{ margin: 0 }}
            onPress={() => {
              if (index === monthList.length - 1) return;
              setIndex(index + 1);
            }}
          />
        </View>
      </View>
    </View>
  );
}
