import React, { Component } from 'react';
import { View } from 'react-native';
import i18n from '../../service/i18n';
import { BarChart, Grid } from 'react-native-svg-charts'
import { Text } from 'react-native-svg'
import currencyFormatter from 'currency-formatter';
import EStyleSheet from 'react-native-extended-stylesheet';

export default class Bar extends Component<IBarChartProps> {


    render() {
        const  {income, expense, currency } = this.props;
        const data = [income, expense, income - expense];
        const labs = ['reportMode.barLabels.income', 'reportMode.barLabels.expense', 'reportMode.barLabels.balance']

        const contentInset = { top: 10, bottom: 10 }
        const CUT_OFF = 0
        const Labels = ({ x, y, bandwidth, data }) => (
            data.map((value, index) => (
                <Text
                    key={index}
                    x={value > CUT_OFF ? x(0) + 10 : x(value) + 10}
                    y={y(index) + (bandwidth / 2)}
                    fontSize="15"
                    fontWeight="bold"
                    fill={value > CUT_OFF ? 'black' : '#F38266'}
                    alignmentBaseline={'middle'}
                >
                    {i18n.t(labs[index]).toUpperCase() + ": " + currencyFormatter.format(value, { code: currency ? currency : 'YPN', locale: i18n.getLocale() } ) }
                </Text>
            ))
        )

        return (
            <View style={styles.main}>
                <BarChart
                    style={styles.bar}
                    data={data}
                    horizontal={true}
                    svg={{ fill: 'rgba(134, 65, 244, 0.8)' }}
                    contentInset={contentInset}
                    spacing={0.2}
                    gridMin={0}
                >
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

const styles = EStyleSheet.create({
    main: { 
        flexDirection: 'row', 
        flex: 1, 
        margin: 20 
    },
    bar: { 
        flex: 3, 
        marginLeft: 8 
    }
});