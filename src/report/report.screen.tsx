import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Report from './report.component';
import reportAction from './report.action';
import { IReportProp } from './report.model';
import transactionListAction from '../transaction/transaction-list.action';

export class ReportScreenComponent extends Component<IReportProp, {}> {
    constructor(props: any) {
        super(props);
    }

    componentDidMount() {
        this.props.actions.reportInitializeStart();
    }

    static navigationOptions = {
        tabBarVisible: false
    };

    render() {
        return (
            <Report {...this.props} />
        );
    }
}

function mapStateToProps(state: any) {
    return { state: state.report };
}

function mapDispatchToProps(dispatch: any) {
    return {
        actions: {
            ...bindActionCreators<any>(transactionListAction, dispatch),
            ...bindActionCreators<any>(reportAction, dispatch)
        }
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(ReportScreenComponent);
