import { SafeAreaView, Text, StyleSheet } from 'react-native';

export default function AddTransaction() {
  return (
    <SafeAreaView style={styles.container}>
      <Text>입력해라</Text>
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