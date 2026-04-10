import { Image, StyleSheet, Text, View } from 'react-native';
import Title from '../base/Title';

export default function WoofPost({ image, title, description }) {
  return (
    <View style={styles.card}>
      <View style={styles.mediaColumn}>
        <Image source={{ uri: image }} style={styles.image} />
      </View>
      <View style={styles.contentColumn}>
        <Title>{title}</Title>
        <Text numberOfLines={2} style={styles.description}>
          {description}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    borderRadius: 14,
    backgroundColor: '#111827',
    borderWidth: 1,
    borderColor: '#1f2937',
    padding: 10,
    marginBottom: 12,
  },
  mediaColumn: {
    flex: 1,
    marginRight: 10,
  },
  contentColumn: {
    flex: 2,
    justifyContent: 'center',
    gap: 6,
  },
  image: {
    width: '100%',
    height: 84,
    borderRadius: 10,
  },
  description: {
    color: '#d1d5db',
    fontSize: 13,
    lineHeight: 18,
  },
});
