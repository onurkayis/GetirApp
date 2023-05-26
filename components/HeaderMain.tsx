import {Dimensions, Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Entypo from 'react-native-vector-icons/Entypo';
const {height} = Dimensions.get('window');

//ana sayfadaki headermain component kodları
const HeaderMain = () => {
  return (
    <View style={styles.headerMain}>
      {/* adres component kodları */}
      <View style={styles.headerOne}>
        {/* adresteki ev resminin kodu */}
        <Image
          style={styles.image}
          source={{uri: 'https://cdn.getir.com/misc/emoji/house.png'}}
        />
        <View style={styles.headerOneView}>
          {/* ev yazısının kodu */}
          <Text testID="place-text" style={{fontWeight: '600', fontSize: 16}}>
            Ev
          </Text>
          {/* adres bilgisinin kodu */}
          <Text
            style={{
              fontWeight: '500',
              fontSize: 11.5,
              color: '#6E7480',
              marginLeft: 6,
              marginRight: 3,
            }}>
            Dedepaşa Blv. Yenişehir Mahallesi...
          </Text>
          {/* sağ ok iconunun kodları ve özellikleri */}
          <Entypo
            testID="right-icon"
            name="chevron-right"
            size={22}
            color="#5D3EBD"
          />
        </View>
      </View>
      {/* Tv olayı */}
      <View style={styles.headerTwo}>
        {/* tvs yazısının kodu ve stili */}
        <Text
          style={{
            fontSize: 10,
            color: '#5D3EBD',
            fontWeight: 'bold',
            textAlign: 'center',
          }}>
          TVS
        </Text>
        {/* 13 yazısının kodu ve stili */}
        <Text
          style={{
            fontSize: 20,
            color: '#5D3EBD',
            fontWeight: 'bold',
            textAlign: 'center',
          }}>
          13
          {/* dk yazısının kodu ve stili */}
          <Text
            style={{
              fontSize: 16,
              color: '#5D3EBD',
              fontWeight: 'bold',
              textAlign: 'center',
            }}>
            dk
          </Text>
        </Text>
      </View>
    </View>
  );
};

export default HeaderMain;

const styles = StyleSheet.create({
  //header main viewinin stil kodları
  headerMain: {
    height: height * 0.064,
    flexDirection: 'row',
    backgroundColor: '#F7D102',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  //sağ kısımdan ayrı kalan view'in stil kodları
  headerOne: {
    height: height * 0.064,
    width: '81%',
    backgroundColor: 'white',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: '3%',
    borderTopRightRadius: 25,
    borderBottomRightRadius: 25,
  },
  //ev resminin stil kodları
  image: {
    height: 30,
    width: 30,
  },
  //adres bilgilerinin stil kodları
  headerOneView: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 8,
    paddingLeft: 8,
    borderLeftColor: '#F3F2FD',
    borderLeftWidth: 2,
    height: height * 0.035,
  },
  //sağ kısımdaki sarı bölgen view'inin stil kodları
  headerTwo: {
    width: '20%',
    height: height * 0.065,
    flexDirection: 'column',
    justifyContent: 'center',
    paddingRight: 10,
  },
});
