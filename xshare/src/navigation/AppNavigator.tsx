import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Text } from 'react-native';
import HomeScreen from '../screens/HomeScreen';
import CollectionScreen from '../screens/CollectionScreen';

const Tab = createBottomTabNavigator();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={{
          tabBarStyle: {
            backgroundColor: '#1a1a1a',
            borderTopColor: '#2a2a2a',
          },
          tabBarActiveTintColor: '#ffffff',
          tabBarInactiveTintColor: '#555555',
          headerStyle: { backgroundColor: '#0f0f0f' },
          headerTintColor: '#ffffff',
        }}
      >
        <Tab.Screen
          name="Inicio"
          component={HomeScreen}
          options={{ tabBarIcon: () => <Text>🏠</Text>, headerShown: false }}
        />
        <Tab.Screen
          name="Colección"
          component={CollectionScreen}
          options={{ tabBarIcon: () => <Text>📚</Text> }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
