import React from 'react'
import { Text, View } from 'react-native';
import { PieChart } from "react-native-gifted-charts"

const AttSummary = () => {
    const pieData = [
        {
            value: 47,
            color: 'green',
            gradientCenterColor: 'lightgreen',
            focused: true,
        },
        { value: 40, color: '#93FCF8', gradientCenterColor: '#3BE9DE' },
        { value: 16, color: 'orange', gradientCenterColor: 'yellow' },
        { value: 3, color: 'red', gradientCenterColor: 'white' },
    ];

    // const renderDot = color => {
    //     return (
    //         <View
    //             style={{
    //                 height: 10,
    //                 width: 10,
    //                 borderRadius: 5,
    //                 backgroundColor: color,
    //                 marginRight: 10,
    //             }}
    //         />
    //     );
    // };

    // const renderLegendComponent = () => {
    //     return (
    //         <>
    //             <View
    //                 style={{
    //                     flexDirection: 'row',
    //                     justifyContent: 'center',
    //                     marginBottom: 10,
    //                 }}>
    //                 <View
    //                     style={{
    //                         flexDirection: 'row',
    //                         alignItems: 'center',
    //                         width: 120,
    //                         // marginRight: 20,
    //                     }}>
    //                     {renderDot('#006DFF')}
    //                     <Text style={{ color: 'white' }}>Excellent: 47%</Text>
    //                 </View>
    //                 <View
    //                     style={{ flexDirection: 'row', alignItems: 'center', width: 120 }}>
    //                     {renderDot('#8F80F3')}
    //                     <Text style={{ color: 'white' }}>Okay: 16%</Text>
    //                 </View>
    //             </View>
    //             <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
    //                 <View
    //                     style={{
    //                         flexDirection: 'row',
    //                         alignItems: 'center',
    //                         width: 120,
    //                         marginRight: 20,
    //                     }}>
    //                     {renderDot('#3BE9DE')}
    //                     <Text style={{ color: 'white' }}>Good: 40%</Text>
    //                 </View>
    //                 <View
    //                     style={{ flexDirection: 'row', alignItems: 'center', width: 120 }}>
    //                     {renderDot('#FF7F97')}
    //                     <Text style={{ color: 'white' }}>Poor: 3%</Text>
    //                 </View>
    //             </View>
    //         </>
    //     );
    // };

    return (
        <View
            style={{
                // padding: 16,
                borderRadius: 10,
                backgroundColor: '#3e0961',
                height: '100%'
            }}>
            <Text style={{
                color: 'white', fontSize: 16,
                fontWeight: 'bold',
                paddingHorizontal: 20,
                margin: 10,
                textAlign: 'center'
            }}>
                Weekly Report
            </Text>
            <View style={{ padding: 10, alignItems: 'center' }}>
                <PieChart
                    data={pieData}
                    donut
                    showGradient
                    sectionAutoFocus
                    radius={60}
                    innerRadius={40}
                    innerCircleColor={'#232B5D'}
                    centerLabelComponent={() => {
                        return (
                            <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                                <Text
                                    style={{ fontSize: 22, color: 'white', fontWeight: 'bold' }}>
                                    47%
                                </Text>
                                <Text style={{ fontSize: 10, color: 'white' }}>Perfect Time</Text>
                            </View>
                        );
                    }}
                />
            </View>
            {/* {renderLegendComponent()} */}
        </View>);
}

export default AttSummary;