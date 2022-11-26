// components
import { View } from 'react-native';
import { Container } from '@src/components/default';
// sections
import { Header } from './sections/Header';
import { SummaryCard } from './sections/SummaryCard';

// ----------------------------------------------------------------------

export function Home() {
  return (
    <View style={{ flex: 1 }}>
      <Header />

      <Container spacing="large">
        <SummaryCard />
      </Container>
    </View>
  );
}
