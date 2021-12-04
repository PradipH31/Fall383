import React, { useEffect, useState } from 'react'
import { FlatList, ActivityIndicator, Dimensions, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { View, Text } from 'react-native'
import { createOrder, getCartItems, } from '../../global/cart/CartActions'
import Colors from "../../screen/theme/Colors";
import Card from "../../components/Card";

const SCREEN_WIDTH = Dimensions.get("window").width;
const SCREEN_HEIGHT = Dimensions.get("window").height;

function index() {

    const Checkout = () => {
        return (
            <TouchableOpacity style={styles.button}
                onPress={() => {
                    createOrder(orderItems)
                    try {
                        createOrder(orderItems).then(res => {
                            console.log(res)
                            alert('Your order has been placed')
                            setEverything()
                        }).then(resp => {
                            console.log(resp)
                        })
                    } catch (e) {
                        console.log(e)
                    }
                }}
            >
                <Text style={styles.textTitle}>Checkout</Text>
            </TouchableOpacity>
        )
    }

    const [orderItems, setOrderItems] = useState([]);
    const [isLoading, setLoading] = useState(true);
    const [data, setData] = useState([]);
    const [total, setTotal] = useState(null);

    const getTotal = (items) => {
        return items.reduce((currentValue, nextValue) => {
            return currentValue + nextValue.count * nextValue.price;
        }, 0);
    };

    const setEverything = () => {
        getCartItems().then(
            values => {
                setData(values)
                setTotal(getTotal(values))
                setOrderItems(values.map(orderItem => ({
                    "menuItemId": orderItem.id,
                    "menuItemQuantity": orderItem.count
                })))
                setLoading(false)
            }
        )
    }

    const [refresh, setRefresh] = useState(false);

    useEffect(() => {
        setEverything()
    }, [refresh])

    return (
        <View style={{ flex: 1 }}>
            <Text style={{
                fontSize: 25,
                alignSelf: 'center',
                fontWeight:'bold',
            }}>Total: ${total !== null ? total : 0}</Text>
            <ScrollView>
                <View>
                    {isLoading ? <ActivityIndicator /> :
                        < FlatList
                            style={{ marginTop: 10, marginBottom: 10 }}
                            data={data}
                            keyExtractor={({ id }, index) => id.toString()}
                            renderItem={({ item }) => (
                                <View>
                                    <Card
                                        screenWidth={SCREEN_WIDTH * 0.95}
                                        screenHeight={SCREEN_HEIGHT * 0.3}
                                        images={item.imageLink}
                                        itemName={item.name}
                                        price={item.price}
                                        cart={true}
                                        remove={true}
                                        update={true}
                                        item={item}
                                        refresh={refresh}
                                        setRefresh={setRefresh}
                                    />
                                </View>
                            )}
                        />
                    }
                </View>
                {total < 1 ? <Text>Your cart is empty</Text> : <Checkout style={{ marginLeft: 50 }} />}
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    button: {
        backgroundColor: Colors.primary,
        padding: 10,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 10,
        marginBottom: 10,
        marginHorizontal: 15
    },
    textTitle: { color: Colors.white, fontSize: 16, fontWeight: "bold" },
});

export default index
