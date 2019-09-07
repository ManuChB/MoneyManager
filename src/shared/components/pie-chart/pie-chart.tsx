import React, { Component } from 'react';
import { View } from 'react-native';
import i18n from '../../service/i18n';
import { Text as RNText, TouchableOpacity } from 'react-native';
import { PieChart } from 'react-native-svg-charts'
import { Svg, G, Line, Text, TSpan, Rect } from 'react-native-svg'

export default class Pie extends Component<IPieChartProps> {


    render() {
        const { selectedSlice, showIncome } = this.props;
        const colors = ['#600080', '#9900cc', '#c61aff', '#d966ff', '#ecb3ff']
        const slices = this.props.data.map((elem, index) => {

        if ((elem.percentTotalExpense > 0 && !showIncome) || (showIncome && elem.percentTotalIncome > 0)) {
            return {
                key: elem.name,
                value: showIncome ? elem.percentTotalIncome : elem.percentTotalExpense,
                svg: { fill: colors[index] },
                arc: {
                    outerRadius: 75 + (selectedSlice === elem.name ? 5 : 0) + '%', padAngle: selectedSlice === elem.name ? 0 : 0.02
                },
                onPress: () => this.props.onSelectSlice(elem.name),
                amount: showIncome ? elem.percentTotalIncome : elem.percentTotalExpense
            }
        }
        })
        const data = slices.filter(function (el) {
            return el != null;
        });

        if(data.length > 0) {
            const a = data.filter(function (el) {
                return el.key == selectedSlice;
            });
            if (a.length == 0) { this.props.onSelectSlice(data[0].key)}
        }

        return (
            <View style={styles.mainView}>
                <PieChart
                        style={styles.pieChart}
                        data={data}
                        spacing={0}
                        outerRadius={'100%'}
                        innerRadius={'45%'}
                        >
                </PieChart>
                <View style={styles.sliceInfo}>
                    {this.getSliceInfo(data)}
                </View>
                    {data.length == 0 && <RNText> No data </RNText>}
            </View>
            )
        }
  
    getSliceInfo(data){
        return data.map((elem, index) => {
            return (
                <TouchableOpacity 
                    key={index} 
                    style={styles.sliceInfoTouchabel} 
                    onPress={() => this.props.onSelectSlice(elem.key)}
                >
                    <Svg width="20" height="20">
                        <Rect
                            x="5"
                            y="5"
                            width="15"
                            height="15"
                            fill={elem.svg.fill}
                            strokeWidth="1"
                            stroke="black"
                        />
                    </Svg>
                    <RNText key={index} style={[styles.sliceText, { fontWeight: this.props.selectedSlice === elem.key ? 'bold' : null}]}>
                        {i18n.t(elem.key) +" " + elem.value + "%" }
                    </RNText>
                </TouchableOpacity>
            )
        })
    }
    
}

export interface IPieChartProps {
    onSelectSlice?: (slice: string) => void,
    selectedSlice?: string,
    data?: Array<any>,
    showIncome?: boolean
}

import EStyleSheet from 'react-native-extended-stylesheet';


const styles = EStyleSheet.create({
    mainView: { 
        flex: 1, 
        flexDirection: 'row' 
    },
    pieChart: { 
        flex: 2 
    },
    sliceInfo: {
        flex: 1, 
        flexDirection: 'column', 
        alignItems: 'flex-start', 
        justifyContent: 'center' 
    },
    sliceInfoTouchabel: { 
        marginTop: 20, 
        flexDirection: 'row', 
        alignItems: 'center', 
        justifyContent: 'center' 
    },
    sliceText: {
        marginLeft: 10
    },
    '@media (max-width: 350)': {

        pieChart: {
            flex:1.3,
        },
        sliceInfoTouchabel: {
            marginTop: 0,
            justifyContent: 'flex-start' 
        },
        sliceInfo: {
            flexDirection: 'column',
            justifyContent: 'center',
        }
    }
});
