import React, { useEffect, useState } from 'react'
import { FlatList, ActivityIndicator, Dimensions } from 'react-native';
import { View, Text } from 'react-native'
import { getCartItems, } from '../../global/cart/CartActions'
import Card from "../../components/Card";

const SCREEN_WIDTH = Dimensions.get("window").width;
const SCREEN_HEIGHT = Dimensions.get("window").height;

function index() {
    const [isLoading, setLoading] = useState(true);
    const [data, setData] = useState([]);
    const [total, setTotal] = useState(null);

    const getTotal = (items) => {
        return items.reduce((currentValue, nextValue) => {
            return currentValue + nextValue.count * nextValue.price;
        }, 0);
    };

    useEffect(() => {
        getCartItems().then(
            values => {
                setData(values)
                setTotal(getTotal(values))
                setLoading(false)
            }
        )
    }, [])

    return (
        <View style={{ flex: 1 }}>
            <Text style={{
                fontSize: 25,
                alignSelf: 'center'
            }}>Total: {total !== null ? total : 0}</Text>
            <View>
                {isLoading ? <ActivityIndicator /> :
                    < FlatList
                        style={{ marginTop: 10, marginBottom: 10 }}
                        data={data}
                        keyExtractor={({ id }, index) => id}
                        // keyExtractor={({ id }, index) => id.toString()}
                        renderItem={({ item }) => (
                            <View>
                                <Card
                                    screenWidth={SCREEN_WIDTH * 0.95}
                                    screenHeight={SCREEN_HEIGHT * 0.3}
                                    images={item.imageLink}
                                    itemName={item.name}
                                    price={item.price}
                                    cart={false}
                                />
                            </View>
                        )}
                    />
                }
            </View>
        </View>
    )
}

export default index
