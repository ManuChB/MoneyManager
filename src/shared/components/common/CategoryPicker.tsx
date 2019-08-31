import React, { Component } from 'react';
import { DataPicker } from './DataPicker';

export class CategoryPicker extends Component<IPickerProps> {

    constructor(props) {
        super(props);
        this.state = { subCategory: null };
    }

    resetState() {
        this.setState({ subCategory: null });
    }

    onSelectedData(data) {
        if(!this.state.subCategory){
            this.setState({ subCategory: data })
        }else{
            this.props.onSelect(this.state.subCategory.id, data);
            this.setState({ subCategory: null })

        }
    }

    showDataPiker() {
        const { data, label, value } = this.props;
        const { subCategory } = this.state;
        return (
            <DataPicker
                label={label}
                value={value ? value : ''}
                data={subCategory ? subCategory.data : data}
                onSelect={(data) => { this.onSelectedData(data) }}
                fieldToShow={subCategory ? 'value' : 'name'}
                noHideOnPress={!!!this.state.subCategory}
                onclose={() => this.resetState()}
                onBack={() => this.resetState()}
                showBackButton={!!this.state.subCategory}>
            </DataPicker>
        )
    }

    render() {
        return (
            this.showDataPiker()
        )
    }

}


export interface IPickerProps {
    label?: string,
    customPickerStyle?: Object,
    customLabelStyle?: Object,
    onSelect?: (categoryId: string, subCategory: object) => void,
    ref?: (ref: string) => void,
    data: Array<any>,
    showModal: boolean,
    placeHolder?: string,
    value?: string
}

