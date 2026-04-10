import { SafeAreaView, StyleSheet, Text, View } from 'react-native';

export default function FeedScreen() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Text style={styles.title}>Feed</Text>
        <Text style={styles.text}>Publicações dos pets aparecem aqui.</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#030712' },
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', gap: 8 },
  title: { color: '#ffffff', fontSize: 28, fontWeight: '700' },
  text: { color: '#d1d5db' },
});
