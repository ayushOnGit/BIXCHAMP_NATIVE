// import React, { useState, useEffect } from 'react';
// import { SafeAreaView, Text, TextInput, Button, StyleSheet, View, AppState, Alert } from 'react-native';

// const App = () => {
//   const [ip, setIp] = useState('');  // Store ESP32 IP address
//   const [message, setMessage] = useState('');  // Store the message to send
//   const [appState, setAppState] = useState(AppState.currentState);

//   // Handle app state change and automatically send HTTP request when app becomes active
//   useEffect(() => {
//     const subscription = AppState.addEventListener('change', (nextAppState) => {
//       if (nextAppState === 'active') {
//         sendHTTP();
//       }
//       setAppState(nextAppState);
//     });

//     return () => {
//       subscription.remove();  // Cleanup subscription when component unmounts
//     };
//   }, []);

//   // Function to send HTTP POST request to ESP32
//   const sendHTTP = async () => {
//     if (!ip || !message) {
//       Alert.alert('Error', 'Please enter both IP address and message.');
//       return;
//     }

//     try {
//       const response = await fetch(`http://${ip}/data`, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/x-www-form-urlencoded',
//         },
//         body: `message=${message}`,  // Send message as form data
//       });

//       const responseBody = await response.text();
//       if (response.ok) {
//         Alert.alert('Success', `ESP32 Response: ${responseBody}`);
//       } else {
//         Alert.alert('Error', 'Failed to send data to ESP32');
//       }
//     } catch (err) {
//       console.error('HTTP Error:', err);
//       Alert.alert('Error', 'Failed to send HTTP request.');
//     }
//   };

//   return (
//     <SafeAreaView style={styles.container}>
//       <Text style={styles.title}>Send HTTP Request to ESP32</Text>

//       <TextInput
//         style={styles.input}
//         placeholder="Enter ESP32 IP Address"
//         value={ip}
//         onChangeText={setIp}
//         keyboardType="numeric"  // Optional: To ensure only numeric input (for IP address)
//       />

//       <TextInput
//         style={styles.input}
//         placeholder="Enter message"
//         value={message}
//         onChangeText={setMessage}
//       />

//       <Button title="Send HTTP" onPress={sendHTTP} />

//       {/* Optional: Display the current app state */}
//       <Text style={styles.appStateText}>App State: {appState}</Text>
//     </SafeAreaView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     paddingHorizontal: 24,
//   },
//   title: {
//     fontSize: 24,
//     marginBottom: 20,
//   },
//   input: {
//     height: 40,
//     borderColor: 'gray',
//     borderWidth: 1,
//     marginBottom: 20,
//     paddingHorizontal: 10,
//     width: '80%',
//   },
//   appStateText: {
//     marginTop: 20,
//     fontSize: 16,
//     color: 'gray',
//   },
// });

// export default App;


import React, { useState } from 'react';
import { SafeAreaView, StatusBar, StyleSheet, TextInput, Text, Button, View } from 'react-native';

// Replace this with your ESP32's actual IP or use user input
const ESP32_IP = "http://192.168.0.161"; // Default IP of the ESP32

const App = () => {
  const [inputValue, setInputValue] = useState('');
  const [esp32IP, setEsp32IP] = useState(ESP32_IP);
  const [status, setStatus] = useState('');

  // Function to send commands to ESP32
  const sendRequest = async (action: string) => {
    try {
      const response = await fetch(`${esp32IP}/${action}`);
      const data = await response.text();
      setStatus(data);
    } catch (error) {
      setStatus(`Error: ${error.message}`);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <Text style={styles.title}>ESP32 Camera and LED Control</Text>

      <TextInput
        style={styles.input}
        placeholder="Enter ESP32 IP Address"
        value={esp32IP}
        onChangeText={setEsp32IP}
      />
      
      <Button title="Set IP" onPress={() => setEsp32IP(inputValue)} />

      <View style={styles.buttonContainer}>
        <Button title="Turn ON LED" onPress={() => sendRequest('led_on')} />
        <Button title="Turn OFF LED" onPress={() => sendRequest('led_off')} />
        <Button title="Turn ON Camera" onPress={() => sendRequest('camera_on')} />
        <Button title="Turn OFF Camera" onPress={() => sendRequest('camera_off')} />
      </View>

      <Text style={styles.statusText}>Status: {status}</Text>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderColor: '#ddd',
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
    width: '80%',
    borderRadius: 8,
  },
  buttonContainer: {
    marginBottom: 20,
  },
  statusText: {
    fontSize: 18,
    fontWeight: '400',
    textAlign: 'center',
    marginTop: 20,
  },
});

export default App;
