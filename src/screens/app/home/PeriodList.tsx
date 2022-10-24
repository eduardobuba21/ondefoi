import { useEffect, useRef, useState } from 'react';
// hooks
import { useTheme } from '@src/hooks/useTheme';
// types
import { TMonthRef } from '@src/@types/common';
// components
import { Button, IconButton } from 'react-native-paper';
import { Dimensions, FlatList, View, ViewToken } from 'react-native';

// ----------------------------------------------------------------------

type Props = {
  periodList: TMonthRef[];
  onChange: (date: Date) => void;
};

//

const { width: _screenWidth } = Dimensions.get('screen');
const _spacing = 10;

// ----------------------------------------------------------------------

export function PeriodList({ periodList, onChange }: Props) {
  const theme = useTheme();

  const ref = useRef<FlatList>(null);
  const [index, setIndex] = useState(0);
  const [viewPosition] = useState(0.5);

  const scrollToView = () => {
    if (periodList.length === 0) return;
    ref.current?.scrollToIndex({
      index,
      animated: true,
      viewPosition,
    });
    onChangePeriod(index);
  };

  const onChangePeriod = (index: number) => {
    onChange(periodList[index].refDate);
  };

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

  useEffect(() => {
    scrollToView();
  }, [index, viewPosition]);

  return (
    <View style={{ position: 'relative' }}>
      <FlatList
        ref={ref}
        horizontal
        data={periodList}
        fadingEdgeLength={300}
        onLayout={scrollToView}
        style={{ flexGrow: 0 }}
        initialScrollIndex={index}
        keyExtractor={(item) => item.id}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: _screenWidth / 2 }}
        // viewabilityConfigCallbackPairs={viewabilityConfigCallbackPairs.current}
        renderItem={({ item, index: fIndex }) => {
          return (
            <View>
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
          paddingHorizontal: _spacing,
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
            if (index === periodList.length - 1) return;
            setIndex(index + 1);
          }}
        />
      </View>
    </View>
  );
}
