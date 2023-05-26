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

//siparişlerim sayfası kodu
const OrdersScreen = () => {
  const [ref, setRef] = useState('');
  const [order, setOrder] = useState([]);

  // veritabanından siparişi çekme
  const getOrder = async () => {
    const result = await client.get(`/orders/${ref}`);
    //gelen veriyi order'a atama
    setOrder(result.data);
    if (result.data.error) {
      Alert.alert('Bir şeyler yanlış gitti :(');
    }
  };

  return (
    // sayfaya kaydırma özelliği verme
    <ScrollView>
      <View style={styles.root}>
        {/* referans kodu girme inputu */}
        <TextInput
          style={styles.input}
          value={ref}
          onChangeText={setRef}
          placeholder="Your order reference"
        />
        {/* ara butonunun kodları ve stil kodları */}
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
      {/* hata mesajı gösterme */}
      {order?.status !== 'OK' && (
        <Text style={{paddingLeft: 10}}>Order not found</Text>
      )}
      {/* siparişi görüntüleme */}
      {order?.status === 'OK' && (
        <Text style={{padding: 10}}>{JSON.stringify(order.data, null, 2)}</Text>
      )}
    </ScrollView>
  );
};

export default OrdersScreen;

const styles = StyleSheet.create({
  //sayfanın stil kodları
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  //ana view stil kodları
  root: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 10,
    marginTop: 10,
  },
  //input stil kodları
  input: {
    borderColor: 'lightgrey',
    borderWidth: 1,
    padding: 10,
    borderRadius: 5,
    flex: 1,
  },
});
