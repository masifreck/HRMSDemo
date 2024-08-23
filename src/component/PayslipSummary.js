import React from 'react'
import { Text, View } from 'react-native';
import { PieChart } from "react-native-gifted-charts"

const PayslipSummary = () => {
    const pieData = [
        {
            value: 90,
            color: 'green',
            gradientCenterColor: 'lightgreen',
            focused: true,
        },
        { value: 10, color: 'orange', gradientCenterColor: 'yellow' },
    ];
    return (
        <View style={{alignItems:'center',justifyContent:'center',width:120}}>
            <PieChart
            data={pieData}
            // donut
            showGradient
            sectionAutoFocus
            radius={60}
            innerRadius={40}
            innerCircleColor={'#232B5D'}
            centerLabelComponent={() => {
                return (
                    <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                        <Text
                            style={{ fontSize: 14, color: 'white', fontWeight: 'bold' }}>
                            20000
                        </Text>
                        <Text style={{ fontSize: 10, color: 'white' }}>Gross Pay</Text>
                    </View>
                );
            }}
        />
        </View>
    )
}

export default PayslipSummary;