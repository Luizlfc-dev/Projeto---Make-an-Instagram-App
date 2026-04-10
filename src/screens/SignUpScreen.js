import { Button, SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';
import { Formik } from 'formik';
import InputWithLabel from '../components/form/InputWithLabel';

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const isoDatePattern = /^\d{4}-\d{2}-\d{2}$/;

function validateSignUp(values) {
  const errors = {};

  if (!values.username.trim()) {
    errors.username = 'Usuário é obrigatório.';
  } else if (values.username.trim().length < 3) {
    errors.username = 'Usuário precisa ter no mínimo 3 caracteres.';
  }

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

  if (!values.confirmPassword) {
    errors.confirmPassword = 'Confirmação de senha é obrigatória.';
  } else if (values.confirmPassword !== values.password) {
    errors.confirmPassword = 'As senhas não conferem.';
  }

  if (!values.petName.trim()) {
    errors.petName = 'Nome do pet é obrigatório.';
  }

  if (!values.petBirthday.trim()) {
    errors.petBirthday = 'Data de nascimento é obrigatória.';
  } else if (!isoDatePattern.test(values.petBirthday.trim())) {
    errors.petBirthday = 'Use o formato AAAA-MM-DD.';
  }

  if (!values.petBreed.trim()) {
    errors.petBreed = 'Raça é obrigatória.';
  }

  if (!values.petFavoriteToy.trim()) {
    errors.petFavoriteToy = 'Brinquedo favorito é obrigatório.';
  }

  return errors;
}

export default function SignUpScreen({ navigation, onSignUp }) {
  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
        <Text style={styles.title}>Criar conta</Text>
        <Text style={styles.subtitle}>Complete os dados do tutor e do pet para acessar a área principal</Text>

        <Formik
          initialValues={{
            username: '',
            email: '',
            password: '',
            confirmPassword: '',
            petName: '',
            petBirthday: '',
            petBreed: '',
            petFavoriteToy: '',
          }}
          validate={validateSignUp}
          onSubmit={(values, { setStatus }) => {
            const result = onSignUp(values);
            if (!result.ok) {
              setStatus(result.error);
            }
          }}
        >
          {({ handleChange, handleBlur, handleSubmit, values, errors, touched, status }) => (
            <View style={styles.form}>
              <InputWithLabel
                label="Usuário"
                placeholder="Digite seu usuário"
                value={values.username}
                onChangeText={handleChange('username')}
                onBlur={handleBlur('username')}
                error={touched.username ? errors.username : undefined}
              />
              <InputWithLabel
                label="E-mail"
                placeholder="Digite seu e-mail"
                value={values.email}
                onChangeText={handleChange('email')}
                onBlur={handleBlur('email')}
                keyboardType="email-address"
                error={touched.email ? errors.email : undefined}
              />
              <InputWithLabel
                label="Senha"
                placeholder="Digite sua senha"
                value={values.password}
                onChangeText={handleChange('password')}
                onBlur={handleBlur('password')}
                secureTextEntry
                error={touched.password ? errors.password : undefined}
              />
              <InputWithLabel
                label="Confirmar senha"
                placeholder="Digite novamente a senha"
                value={values.confirmPassword}
                onChangeText={handleChange('confirmPassword')}
                onBlur={handleBlur('confirmPassword')}
                secureTextEntry
                error={touched.confirmPassword ? errors.confirmPassword : undefined}
              />
              <InputWithLabel
                label="Nome do pet"
                placeholder="Ex.: Luna"
                value={values.petName}
                onChangeText={handleChange('petName')}
                onBlur={handleBlur('petName')}
                error={touched.petName ? errors.petName : undefined}
              />
              <InputWithLabel
                label="Nascimento do pet"
                placeholder="AAAA-MM-DD"
                value={values.petBirthday}
                onChangeText={handleChange('petBirthday')}
                onBlur={handleBlur('petBirthday')}
                error={touched.petBirthday ? errors.petBirthday : undefined}
              />
              <InputWithLabel
                label="Raça do pet"
                placeholder="Ex.: Golden Retriever"
                value={values.petBreed}
                onChangeText={handleChange('petBreed')}
                onBlur={handleBlur('petBreed')}
                error={touched.petBreed ? errors.petBreed : undefined}
              />
              <InputWithLabel
                label="Brinquedo favorito"
                placeholder="Ex.: Bola"
                value={values.petFavoriteToy}
                onChangeText={handleChange('petFavoriteToy')}
                onBlur={handleBlur('petFavoriteToy')}
                error={touched.petFavoriteToy ? errors.petFavoriteToy : undefined}
              />
              {status ? <Text style={styles.errorText}>{status}</Text> : null}
              <Button title="Cadastrar" onPress={handleSubmit} />
              <Button title="Voltar para login" onPress={() => navigation.navigate('SignIn')} />
            </View>
          )}
        </Formik>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#0b1020',
  },
  container: {
    paddingHorizontal: 24,
    paddingTop: 28,
    paddingBottom: 24,
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
  form: { gap: 2 },
  errorText: {
    color: '#fca5a5',
    fontSize: 12,
  },
});
