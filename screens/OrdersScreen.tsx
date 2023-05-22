import {
  Alert,
  Dimensions,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import client from '../api/client';
const {width, height} = Dimensions.get('window');

const OrdersScreen = () => {
  const [ref, setRef] = useState('');
  const [order, setOrder] = useState([]);
  const getOrder = async () => {
    const result = await client.get(`/orders/${ref}`);
    setOrder(result.data);
    if (result.data.error) {
      Alert.alert('Bir şeyler yanlış gitti :(');
    }
  };

  return (
    <ScrollView>
      <View style={styles.root}>
        <TextInput
          style={styles.input}
          value={ref}
          onChangeText={setRef}
          placeholder="Your order reference"
        />
        <TouchableOpacity
          onPress={getOrder}
          style={{
            backgroundColor: '#4C3398',
            left: 5,
            width: width * 0.13,
            height: height * 0.067,
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: 5,
          }}>
          <Text
            style={{
              fontFamily: 'Poppins-SemiBold',
              fontSize: 15,
              color: 'white',
            }}>
            Ara
          </Text>
        </TouchableOpacity>
      </View>
      {order?.status !== 'OK' && (
        <Text style={{paddingLeft: 10}}>Order not found</Text>
      )}
      {order?.status === 'OK' && (
        <Text style={{padding: 10}}>{JSON.stringify(order.data, null, 2)}</Text>
      )}
    </ScrollView>
  );
};

export default OrdersScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  root: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 10,
    marginTop: 10,
  },
  input: {
    borderColor: 'lightgrey',
    borderWidth: 1,
    padding: 10,
    borderRadius: 5,
    flex: 1,
  },
});
