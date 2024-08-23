import React from 'react'
import { Text, View } from 'react-native';
import { BarChart } from "react-native-gifted-charts";
const WorkingHour = () => {
    const data = [
        { value: 2500, frontColor: '#006DFF', gradientColor: 'green', spacing: 6, label: 'Jan' },
        { value: 2400, frontColor: '#3BE9DE', gradientColor: 'red' },

        { value: 3500, frontColor: '#006DFF', gradientColor: 'green', spacing: 6, label: 'Feb' },
        { value: 3000, frontColor: '#3BE9DE', gradientColor: 'red' },

        { value: 4500, frontColor: '#006DFF', gradientColor: 'green', spacing: 6, label: 'Mar' },
        { value: 4000, frontColor: '#3BE9DE', gradientColor: 'red' },

        { value: 5200, frontColor: '#006DFF', gradientColor: 'green', spacing: 6, label: 'Apr' },
        { value: 4900, frontColor: '#3BE9DE', gradientColor: 'red' },

        { value: 3000, frontColor: '#006DFF', gradientColor: 'green', spacing: 6, label: 'May' },
        { value: 2800, frontColor: '#3BE9DE', gradientColor: 'red' },

        { value: 3500, frontColor: '#006DFF', gradientColor: 'green', spacing: 6, label: 'Jun' },
        { value: 3000, frontColor: '#3BE9DE', gradientColor: 'red' },

        { value: 4500, frontColor: '#006DFF', gradientColor: 'green', spacing: 6, label: 'Jul' },
        { value: 4000, frontColor: '#3BE9DE', gradientColor: 'red' },

        { value: 5200, frontColor: '#006DFF', gradientColor: 'green', spacing: 6, label: 'Aug' },
        { value: 4900, frontColor: '#3BE9DE', gradientColor: 'red' },

        { value: 3000, frontColor: '#006DFF', gradientColor: 'green', spacing: 6, label: 'Sep' },
        { value: 2800, frontColor: '#3BE9DE', gradientColor: 'red' },

        { value: 3500, frontColor: '#006DFF', gradientColor: 'green', spacing: 6, label: 'Oct' },
        { value: 3000, frontColor: '#3BE9DE', gradientColor: 'red' },

        { value: 4500, frontColor: '#006DFF', gradientColor: 'green', spacing: 6, label: 'Nov' },
        { value: 4000, frontColor: '#3BE9DE', gradientColor: 'red' },

        { value: 5200, frontColor: '#006DFF', gradientColor: 'green', spacing: 6, label: 'Dec' },
        { value: 4900, frontColor: '#3BE9DE', gradientColor: 'red' },
    ];

    return (
        <View
            style={{
                margin: 10,
                padding: 16,
                borderRadius: 20,
                backgroundColor: '#3e0961',
            }}>
            <Text style={{ color: 'white', fontSize: 16, fontWeight: 'bold' }}>
                Monthly Report
            </Text>
            <View style={{ paddingVertical: 20,paddingLeft:20, alignItems: 'center' }}>
                <BarChart
                    data={data}
                    barWidth={16}
                    initialSpacing={10}
                    spacing={14}
                    barBorderRadius={4}
                    showGradient
                    yAxisThickness={0}
                    xAxisType={'dashed'}
                    xAxisColor={'lightgray'}
                    yAxisTextStyle={{ color: 'lightgray' }}
                    stepValue={1000}
                    maxValue={6000}
                    noOfSections={6}
                    yAxisLabelTexts={['0', '5', '10', '15', '20', '25', '30']}
                    labelWidth={40}
                    xAxisLabelTextStyle={{ color: 'lightgray', textAlign: 'center' }}
                    showLine
                    lineConfig={{
                        color: '#F29C6E',
                        thickness: 3,
                        curved: true,
                        hideDataPoints: true,
                        shiftY: 20,
                        initialSpacing: -30,
                    }}
                />
            </View>
        </View>
    );
}

export default WorkingHour;