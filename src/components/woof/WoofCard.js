import { StyleSheet, View } from 'react-native';
import Avatar from '../base/Avatar';
import Title from '../base/Title';

export default function WoofCard({ name, avatar }) {
  return (
    <View style={styles.card}>
      <Avatar uri={avatar} size={72} />
      <Title style={styles.title}>{name}</Title>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    width: 120,
    paddingVertical: 12,
    paddingHorizontal: 10,
    marginRight: 12,
    borderRadius: 14,
    backgroundColor: '#111827',
    borderWidth: 1,
    borderColor: '#1f2937',
    alignItems: 'center',
    gap: 10,
  },
  title: {
    textAlign: 'center',
  },
});
