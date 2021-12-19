import { SafeAreaView, Text, StyleSheet } from 'react-native';

export default function Settings() {
  return (
    <SafeAreaView style={styles.container}>
      <Text>설정화면</Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});