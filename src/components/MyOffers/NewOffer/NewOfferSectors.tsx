import React, { Component, Dispatch } from 'react';
import { View, StyleSheet, Text, Picker } from 'react-native';
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';
import { NavigationProp } from '@react-navigation/native';
import { connect } from 'react-redux';
import { TRootReducer } from '../../../redux/store';
import { SpontioColors } from '../../../enums/spontioColors.enum';
import { NavigationProperty } from '../../../redux/reducer/navigationReducer';
import { AnyAction } from 'redux';
import { Sector } from '../../../enums/sector.enum';
import { Sectors } from '../../../constants/sector.constant';
import { translate } from '../../../managers/language.manager';
import { OfferObject } from '../../../models/offerObject.model';
import { changeOfferSector } from '../../../redux/actions/newOffer';
import { ThunkDispatch } from 'redux-thunk';

class NewOfferSectors extends Component<Props, State> {

    public readonly state: State = {

    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.box}>
                    <View style={styles.content}>
                        <Text style={styles.title}>
                            Sectors
                        </Text>
                        <Picker
                            selectedValue={this.props.newOffer.sector}
                            style={styles.picker}
                            onValueChange={(itemValue, itemIndex) => this.setSelectedValue(itemValue)}
                        >
                            {
                                Sectors.map((value, index) => {
                                    return <Picker.Item color={SpontioColors.Primary} key={index} label={translate(value.label)} value={value.value} />
                                })
                            }
                        </Picker>
                    </View>
                </View>
            </View>

        );
    }

    private setSelectedValue(itemValue: Sector) {
        this.props.changeOfferSector(itemValue);
    }

}

const styles = StyleSheet.create({
    container: {
        backgroundColor: SpontioColors.DarkWhite,
    },
    box: {
        backgroundColor: SpontioColors.White,
        marginVertical: moderateScale(10),
    },
    title: {
        fontSize: moderateScale(18),
        fontWeight: 'bold'
    },
    content: {
        padding: moderateScale(20),
        justifyContent: 'center'
    },
    picker: {
        flex: 1
    }
});

interface IStateProps {
    navigationProperty: NavigationProperty,
    newOffer: OfferObject
}

const mapStateToProps = (state: TRootReducer): IStateProps => {
    return {
        navigationProperty: state.navigationReducer.navigationProperty,
        newOffer: state.newOfferReducer.newOffer
    }
}

interface IDispatchProps {
    changeOfferSector: (sector: Sector) => void;
}

const mapDispatchToProps = (dispatch: ThunkDispatch<AnyAction, {}, any>): IDispatchProps => {
    return {
        changeOfferSector: (sector: Sector) => dispatch(changeOfferSector(sector)),
    }
}

export interface OwnProps {
    navigation: NavigationProp<any>;
}

type State = {

}

type Props = IStateProps & IDispatchProps & OwnProps

export default connect<IStateProps, IDispatchProps, OwnProps>(mapStateToProps, mapDispatchToProps)(NewOfferSectors);