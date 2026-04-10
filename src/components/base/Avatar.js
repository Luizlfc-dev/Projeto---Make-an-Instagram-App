import { Image, StyleSheet } from 'react-native';

export default function Avatar({ uri, size = 64 }) {
  return <Image source={{ uri }} style={[styles.avatar, { width: size, height: size, borderRadius: size / 2 }]} />;
}

const styles = StyleSheet.create({
  avatar: {
    borderWidth: 2,
    borderColor: '#1f2937',
    backgroundColor: '#111827',
  },
});
