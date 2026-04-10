import { StyleSheet, Text } from 'react-native';

export default function Title({ children, style }) {
  return <Text style={[styles.title, style]}>{children}</Text>;
}

const styles = StyleSheet.create({
  title: {
    color: '#f9fafb',
    fontSize: 16,
    fontWeight: '600',
  },
});
