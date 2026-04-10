import { Button, SafeAreaView, StyleSheet, Text, TextInput, View } from 'react-native';
import { Formik } from 'formik';

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validateSignIn(values) {
  const errors = {};

  if (!values.email.trim()) {
    errors.email = 'E-mail é obrigatório.';
  } else if (!emailPattern.test(values.email.trim())) {
    errors.email = 'Digite um e-mail válido.';
  }

  if (!values.password) {
    errors.password = 'Senha é obrigatória.';
  } else if (values.password.length < 6) {
    errors.password = 'A senha deve ter no mínimo 6 caracteres.';
  }

  return errors;
}

export default function SignInScreen({ navigation, onSignIn }) {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Text style={styles.title}>Woofstagram</Text>
        <Text style={styles.subtitle}>Entre para continuar</Text>

        <Formik
          initialValues={{ email: '', password: '' }}
          validate={validateSignIn}
          onSubmit={(values, { setStatus }) => {
            const result = onSignIn(values);
            if (!result.ok) {
              setStatus(result.error);
            }
          }}
        >
          {({ handleChange, handleBlur, handleSubmit, values, errors, touched, status }) => (
            <View style={styles.form}>
              <TextInput
                placeholder="E-mail"
                placeholderTextColor="#9ca3af"
                value={values.email}
                onChangeText={handleChange('email')}
                onBlur={handleBlur('email')}
                autoCapitalize="none"
                keyboardType="email-address"
                style={styles.input}
              />
              {touched.email && errors.email ? <Text style={styles.errorText}>{errors.email}</Text> : null}
              <TextInput
                placeholder="Senha"
                placeholderTextColor="#9ca3af"
                value={values.password}
                onChangeText={handleChange('password')}
                onBlur={handleBlur('password')}
                secureTextEntry
                style={styles.input}
              />
              {touched.password && errors.password ? (
                <Text style={styles.errorText}>{errors.password}</Text>
              ) : null}
              {status ? <Text style={styles.errorText}>{status}</Text> : null}
              <Button title="Entrar" onPress={handleSubmit} />
              <Button title="Ir para cadastro" onPress={() => navigation.navigate('SignUp')} />
              <Text style={styles.hint}>Conta de teste: demo@woofstagram.com / 123456</Text>
            </View>
          )}
        </Formik>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#0b1020',
  },
  container: {
    flex: 1,
    paddingHorizontal: 24,
    justifyContent: 'center',
    gap: 12,
  },
  title: {
    color: '#ffffff',
    fontSize: 30,
    fontWeight: '700',
    textAlign: 'center',
  },
  subtitle: {
    color: '#d1d5db',
    textAlign: 'center',
    marginBottom: 16,
  },
  form: {
    gap: 12,
  },
  input: {
    borderWidth: 1,
    borderColor: '#374151',
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 10,
    color: '#ffffff',
    backgroundColor: '#111827',
  },
  errorText: {
    color: '#fca5a5',
    fontSize: 12,
  },
  hint: {
    marginTop: 4,
    color: '#9ca3af',
    fontSize: 12,
    textAlign: 'center',
  },
});
