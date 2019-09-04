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
                    outerRadius: 75 + (selectedSlice === elem.name ? 20 : 0) + '%', padAngle: selectedSlice === elem.name ? 0 : 0.02
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

        const fontSize = 20;


        const Labels = ({ slices }) => {

            return slices.map((slice, index) => {
                if (slice && slice.value > 0) {
                    const { labelCentroid, pieCentroid, data } = slice;
                    return (
                    <G key={index}>
                        <Line
                            x1={labelCentroid[0]}
                            y1={labelCentroid[1]}
                            x2={pieCentroid[0]}
                            y2={pieCentroid[1]}
                            stroke={data.svg.fill}
                        />
                        <Text
                            fill="black"
                            fontFamily="Helvetica"
                            fontWeight="bold"
                            fontSize={fontSize}
                                textAnchor="middle"
                            x={labelCentroid[0]}
                            y={labelCentroid[1]}
                            height={fontSize}
                            dy={fontSize * -0.25}
                        >
                            <TSpan x={labelCentroid[0]}>
                                
                            </TSpan>
                                <TSpan x={labelCentroid[0]} dy={labelCentroid[1]}>
                                
                            </TSpan>
                        </Text>
                            <Text 
                                fill="black"
                                fontFamily="Helvetica"
                                fontWeight="bold"
                                fontSize={fontSize}
                                textAnchor="middle"
                                y={labelCentroid[1]} 
                                dx={labelCentroid[0]}
                                height={fontSize}
                                dy={fontSize * -0.25}>
                                <TSpan x="15">{i18n.t(data.key)}</TSpan>
                                <TSpan x={labelCentroid[0] + 15} dy="15">
                                    {data.value + "%"}
                                </TSpan>
                            </Text>
                    </G>
                    )
                }
            })
        }
        return (
        <View style={{ flex: 1, flexDirection: 'row' }}>
            <PieChart
                    style={{ flex: 2 }}
                    data={data}
                    spacing={0}
                    outerRadius={'100%'}
                    innerRadius={'15%'}
                    >
            </PieChart>
            <View style={{ flex: 1, flexDirection: 'column', alignItems: 'flex-start', justifyContent: 'center'}}>
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
                        style={{ marginTop: 20, flexDirection: 'row', alignItems: 'center', justifyContent: 'center'  }} 
                        onPress={() => this.props.onSelectSlice(elem.key)}
                    >
                        <Svg width="45" height="20">
                            <Rect
                                x="25"
                                y="5"
                                width="15"
                                height="15"
                                fill={elem.svg.fill}
                                strokeWidth="1"
                                stroke="black"
                            />
                        </Svg>
                        <RNText key={index} style={{ fontWeight: this.props.selectedSlice === elem.key ? 'bold' : null}}>{i18n.t(elem.key) +" " + elem.value + "%" }</RNText>
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
