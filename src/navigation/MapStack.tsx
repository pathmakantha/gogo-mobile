import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import type { MapStackParamList } from './types';
import { RouteMapScreen } from '../screens/itinerary/RouteMapScreen';
import { OfflineMapsScreen } from '../screens/plus/OfflineMapsScreen';
import { StaysTransportScreen } from '../screens/bookings/StaysTransportScreen';
import { EmergencyCardScreen } from '../screens/emergency/EmergencyCardScreen';
import { SafetyCardScreen } from '../screens/emergency/SafetyCardScreen';

const Stack = createNativeStackNavigator<MapStackParamList>();

export function MapStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="RouteMap" component={RouteMapScreen} />
      <Stack.Screen name="OfflineMaps" component={OfflineMapsScreen} />
      <Stack.Screen name="StaysTransport" component={StaysTransportScreen} />
      <Stack.Screen name="EmergencyCard" component={EmergencyCardScreen} />
      <Stack.Screen name="SafetyCard" component={SafetyCardScreen} />
    </Stack.Navigator>
  );
}
