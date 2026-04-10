import { SafeAreaView, ScrollView, StyleSheet, View } from 'react-native';
import Heading from '../components/base/Heading';
import WoofCard from '../components/woof/WoofCard';
import WoofPost from '../components/woof/WoofPost';
import { woofData } from '../data/woofData';

export default function HomeScreen() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
        <Heading>Trending Woofs</Heading>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.horizontalList}>
          {woofData.woofs.map((woof) => (
            <WoofCard key={woof.id} name={woof.name} avatar={woof.avatar} />
          ))}
        </ScrollView>

        <Heading>New Woof Posts</Heading>
        <View>
          {woofData.posts.map((post) => (
            <WoofPost
              key={post.id}
              image={post.image}
              title={post.title}
              description={post.description}
            />
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#030712' },
  container: {
    paddingHorizontal: 16,
    paddingTop: 14,
    paddingBottom: 20,
  },
  horizontalList: {
    paddingBottom: 18,
    paddingRight: 4,
  },
});
