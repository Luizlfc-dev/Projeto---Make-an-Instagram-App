import { Button, SafeAreaView, StyleSheet, Text, View } from 'react-native';

export default function AccountScreen({ currentUser, onSignOut }) {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Text style={styles.title}>Account</Text>
        <Text style={styles.text}>Área de perfil e configurações</Text>
        {currentUser ? (
          <>
            <Text style={styles.text}>Logado como: {currentUser.username}</Text>
            <Text style={styles.text}>Pet: {currentUser.pet?.name || 'N/A'}</Text>
            <Text style={styles.text}>Raça: {currentUser.pet?.breed || 'N/A'}</Text>
            <Text style={styles.text}>Brinquedo: {currentUser.pet?.favoriteToy || 'N/A'}</Text>
          </>
        ) : (
          <Text style={styles.text}>Nenhum usuário autenticado</Text>
        )}
        <Button title="Sair" onPress={onSignOut} />
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
