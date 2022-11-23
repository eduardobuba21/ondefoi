// components
import { View } from 'react-native';
import { Container } from '@src/components/default';
import { HomeHeader } from '@src/components/HomeHeader';
// sections
import { SummaryCard } from './sections/SummaryCard';

// ----------------------------------------------------------------------

export function Home() {
  return (
    <View style={{ flex: 1 }}>
      <HomeHeader />

      <Container spacing="large">
        <SummaryCard />
      </Container>
    </View>
  );
}
