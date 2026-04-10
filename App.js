import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SignInScreen from './src/screens/SignInScreen';
import SignUpScreen from './src/screens/SignUpScreen';
import MainNavigator from './src/navigation/MainNavigator';

const Stack = createNativeStackNavigator();
const initialUsers = [
  {
    username: 'demo',
    email: 'demo@woofstagram.com',
    password: '123456',
    pet: {
      name: 'Rex',
      birthday: '2022-05-11',
      breed: 'Golden Retriever',
      favoriteToy: 'Bola de tênis',
    },
  },
];
const MAX_ATTEMPTS = 3;
const LOCK_TIME_MS = 30_000;

export default function App() {
  const [users, setUsers] = useState(initialUsers);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [loginAttempts, setLoginAttempts] = useState({});

  const handleSignIn = ({ email, password }) => {
    const normalizedEmail = email.trim().toLowerCase();
    const now = Date.now();
    const attemptState = loginAttempts[normalizedEmail];

    if (attemptState?.lockedUntil && attemptState.lockedUntil > now) {
      const remainingSeconds = Math.ceil((attemptState.lockedUntil - now) / 1000);
      return { ok: false, error: `Muitas tentativas. Tente novamente em ${remainingSeconds}s.` };
    }

    const user = users.find((item) => item.email.toLowerCase() === normalizedEmail);

    if (!user || user.password !== password) {
      const attemptCount = (attemptState?.count || 0) + 1;
      const shouldLock = attemptCount >= MAX_ATTEMPTS;

      setLoginAttempts((previousState) => ({
        ...previousState,
        [normalizedEmail]: {
          count: shouldLock ? 0 : attemptCount,
          lockedUntil: shouldLock ? now + LOCK_TIME_MS : null,
        },
      }));

      return { ok: false, error: 'E-mail ou senha inválidos.' };
    }

    setLoginAttempts((previousState) => ({
      ...previousState,
      [normalizedEmail]: {
        count: 0,
        lockedUntil: null,
      },
    }));

    setCurrentUser(user);
    setIsAuthenticated(true);
    return { ok: true };
  };

  const handleSignUp = ({ username, email, password, petName, petBirthday, petBreed, petFavoriteToy }) => {
    const normalizedUsername = username.trim();
    const normalizedEmail = email.trim().toLowerCase();

    const emailAlreadyUsed = users.some((item) => item.email.toLowerCase() === normalizedEmail);
    const usernameAlreadyUsed = users.some(
      (item) => item.username.toLowerCase() === normalizedUsername.toLowerCase()
    );

    if (emailAlreadyUsed) {
      return { ok: false, error: 'Este e-mail já está cadastrado.' };
    }

    if (usernameAlreadyUsed) {
      return { ok: false, error: 'Este nome de usuário já está em uso.' };
    }

    const newUser = {
      username: normalizedUsername,
      email: normalizedEmail,
      password,
      pet: {
        name: petName.trim(),
        birthday: petBirthday.trim(),
        breed: petBreed.trim(),
        favoriteToy: petFavoriteToy.trim(),
      },
    };
    setUsers((previousUsers) => [...previousUsers, newUser]);
    setCurrentUser(newUser);
    setIsAuthenticated(true);
    return { ok: true };
  };

  const handleSignOut = () => {
    setCurrentUser(null);
    setIsAuthenticated(false);
  };

  return (
    <NavigationContainer>
      <StatusBar style="light" />
      <Stack.Navigator initialRouteName="SignIn" screenOptions={{ headerShown: false }}>
        {!isAuthenticated ? (
          <>
            <Stack.Screen name="SignIn">
              {(props) => <SignInScreen {...props} onSignIn={handleSignIn} />}
            </Stack.Screen>
            <Stack.Screen name="SignUp">
              {(props) => <SignUpScreen {...props} onSignUp={handleSignUp} />}
            </Stack.Screen>
          </>
        ) : (
          <Stack.Screen name="Main">
            {(props) => (
              <MainNavigator {...props} currentUser={currentUser} onSignOut={handleSignOut} />
            )}
          </Stack.Screen>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
