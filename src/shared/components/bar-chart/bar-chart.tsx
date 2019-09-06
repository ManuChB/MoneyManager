import React, { Component } from 'react';
import { View } from 'react-native';
import i18n from '../../service/i18n';
import { Text as RNText, TouchableOpacity } from 'react-native';
import { BarChart, Grid, YAxis } from 'react-native-svg-charts'
import { Svg, G, Line, Text, TSpan, Rect } from 'react-native-svg'
import currencyFormatter from 'currency-formatter';

export default class Bar extends Component<IBarChartProps> {


    render() {
        const  {income, expense, currency } = this.props;
        const data = [income, expense, income - expense];
        console.log('-----------', data);
        const labs = ['reportMode.barLabels.income', 'reportMode.barLabels.expense', 'reportMode.barLabels.balance']

        const contentInset = { top: 10, bottom: 10 }
        const CUT_OFF = 0
        const Labels = ({ x, y, bandwidth, data }) => (
            data.map((value, index) => (
                <Text
                    key={index}
                    x={value > CUT_OFF ? x(0) + 10 : x(value) + 10}
                    y={y(index) + (bandwidth / 2)}
                    fontSize={14}
                    fill={value > CUT_OFF ? 'black' : 'red'}
                    alignmentBaseline={'middle'}
                >
                    {i18n.t(labs[index]).toUpperCase() + ": " + currencyFormatter.format(value, { code: currency ? currency : 'YPN', locale: i18n.getLocale() } ) }
                </Text>
            ))
        )

        return (
            <View style={{ flexDirection: 'row', flex: 1, margin: 20 }}>
                <BarChart
                    style={{ flex: 3, marginLeft: 8 }}
                    data={data}
                    horizontal={true}
                    svg={{ fill: 'rgba(134, 65, 244, 0.8)' }}
                    contentInset={contentInset}
                    spacing={0.2}
                    gridMin={0}
                >
                    <Grid direction={Grid.Direction.VERTICAL} />
                    <Labels />
                </BarChart>
            </View>
        )
    }
}

export interface IBarChartProps {
    income?: number,
    expense?: number,
    currency?: string
}
