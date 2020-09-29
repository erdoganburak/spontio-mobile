import React, { Component, Dispatch } from 'react';
import { View, StyleSheet, Text, TextInput } from 'react-native';
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';
import { NavigationProp } from '@react-navigation/native';
import { connect } from 'react-redux';
import { TRootReducer } from '../../../redux/store';
import { SpontioColors } from '../../../enums/spontioColors.enum';
import { NavigationProperty } from '../../../redux/reducer/navigationReducer';
import { AnyAction } from 'redux';
import { translate } from '../../../managers/language.manager';
import { OfferPriceType } from '../../../enums/offerPrice.enum';
import { OfferPriceTypes } from '../../../constants/offer-price-types.constant';
import { SegmentedControls } from 'react-native-radio-buttons'
import { OfferObject } from '../../../models/offerObject.model';
import { changeOfferPriceType, changeOfferOldPrice, changeOfferNewPrice, changeOfferDiscount, changeOfferQuota, changeOfferQuotaOldPrice, changeOfferQuotaNewPrice } from '../../../redux/actions/newOffer';
import { ThunkDispatch } from 'redux-thunk';

class NewOfferPrice extends Component<Props, State> {

    public readonly state: State = {
        selectedOption: {
            value: OfferPriceType.Price,
            label: "my_offers.price_types.price"
        }
    }

    componentDidMount() {
        let option = OfferPriceTypes.find(
            priceType => priceType.value === this.props.newOffer.priceType);
        this.setState({ selectedOption: option })
    }

    private setSelectedOption(selectedOption: any) {
        console.log(selectedOption)
        this.setState({ selectedOption: selectedOption })
        this.props.changeOfferPriceType(selectedOption.value);
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.box}>
                    <View style={styles.content}>
                        <Text style={styles.title}>
                            Price
                        </Text>
                        <View style={styles.options}>
                            <SegmentedControls
                                tint={SpontioColors.Primary}
                                selectedTint={SpontioColors.White}
                                backTint={SpontioColors.White}
                                options={OfferPriceTypes}
                                extractText={(option) => translate(option.label)}
                                allowFontScaling={true}
                                onSelection={this.setSelectedOption.bind(this)}
                                selectedOption={this.state.selectedOption}
                                optionContainerStyle={{ flex: 1 }}
                            />

                        </View>
                        <View style={styles.priceItem}>
                            {this.state.selectedOption.value === OfferPriceType.Price &&
                                <View style={styles.priceItemWrapper}>
                                    <TextInput
                                        autoCapitalize={'none'}
                                        autoCorrect={false}
                                        keyboardType="numbers-and-punctuation"
                                        placeholder={"Old Price"}
                                        placeholderTextColor={SpontioColors.Primary}
                                        style={styles.input}
                                        returnKeyType="default"
                                        value={this.props.newOffer.oldPrice}
                                        onChangeText={(oldPrice) => this.props.changeOfferOldPrice(oldPrice)}
                                    />
                                    <TextInput
                                        autoCapitalize={'none'}
                                        autoCorrect={false}
                                        keyboardType="numbers-and-punctuation"
                                        placeholder={"New Price"}
                                        placeholderTextColor={SpontioColors.Primary}
                                        style={styles.input}
                                        returnKeyType="default"
                                        value={this.props.newOffer.newPrice}
                                        onChangeText={(newPrice) => this.props.changeOfferNewPrice(newPrice)}
                                    />
                                </View>
                            }
                            {
                                this.state.selectedOption.value === OfferPriceType.Discount &&
                                <View style={styles.priceItemWrapper}>
                                    <TextInput
                                        autoCapitalize={'none'}
                                        autoCorrect={false}
                                        keyboardType="default"
                                        placeholder={"Discount"}
                                        placeholderTextColor={SpontioColors.Primary}
                                        style={styles.input}
                                        returnKeyType="default"
                                        value={this.props.newOffer.discount}
                                        onChangeText={(discount) => this.props.changeOfferDiscount(discount)}
                                    />
                                </View>
                            }
                            {
                                this.state.selectedOption.value === OfferPriceType.Quota && <View style={styles.priceItemWrapper}>
                                    <TextInput
                                        autoCapitalize={'none'}
                                        autoCorrect={false}
                                        keyboardType="numbers-and-punctuation"
                                        placeholder={"Old Price"}
                                        placeholderTextColor={SpontioColors.Primary}
                                        style={styles.input}
                                        returnKeyType="default"
                                        value={this.props.newOffer.quotaOldPrice}
                                        onChangeText={(quotaOldPrice) => this.props.changeOfferQuotaOldPrice(quotaOldPrice)}
                                    />
                                    <TextInput
                                        autoCapitalize={'none'}
                                        autoCorrect={false}
                                        keyboardType="numbers-and-punctuation"
                                        placeholder={"New Price"}
                                        placeholderTextColor={SpontioColors.Primary}
                                        style={styles.input}
                                        returnKeyType="default"
                                        value={this.props.newOffer.quotaNewPrice}
                                        onChangeText={(quotaNewPrice) => this.props.changeOfferQuotaNewPrice(quotaNewPrice)}
                                    />
                                    <TextInput
                                        autoCapitalize={'none'}
                                        autoCorrect={false}
                                        keyboardType="numbers-and-punctuation"
                                        placeholder={"Quota"}
                                        placeholderTextColor={SpontioColors.Primary}
                                        style={styles.input}
                                        returnKeyType="default"
                                        value={this.props.newOffer.quota}
                                        onChangeText={(offerQuota) => this.props.changeOfferQuota(offerQuota)}
                                    />
                                </View>
                            }
                        </View>
                    </View>
                </View>
            </View>

        );
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
    options: {
        flex: 1,
        paddingTop: moderateScale(20)
    },
    priceItem: {
        flex: 1,
    },
    priceItemWrapper: {
        flex: 1,
        padding: moderateScale(10),
    },
    input: {
        paddingVertical: moderateScale(10),
        backgroundColor: 'rgba(255,255,255,0.2)',
        color: SpontioColors.Primary,
        borderStyle: 'solid',
        fontSize: moderateScale(14)
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
    changeOfferPriceType: (priceType: OfferPriceType) => void;
    changeOfferOldPrice: (oldPrice: string) => void;
    changeOfferNewPrice: (newPrice: string) => void;
    changeOfferDiscount: (discount: string) => void;
    changeOfferQuota: (quota: string) => void;
    changeOfferQuotaOldPrice: (quotaOldPrice: string) => void;
    changeOfferQuotaNewPrice: (quotaNewPrice: string) => void;

}

const mapDispatchToProps = (dispatch: ThunkDispatch<AnyAction, {}, any>): IDispatchProps => {
    return {
        changeOfferPriceType: (priceType: OfferPriceType) => dispatch(changeOfferPriceType(priceType)),
        changeOfferOldPrice: (oldPrice: string) => dispatch(changeOfferOldPrice(oldPrice)),
        changeOfferNewPrice: (newPrice: string) => dispatch(changeOfferNewPrice(newPrice)),
        changeOfferDiscount: (discount: string) => dispatch(changeOfferDiscount(discount)),
        changeOfferQuota: (quota: string) => dispatch(changeOfferQuota(quota)),
        changeOfferQuotaOldPrice: (quotaOldPrice: string) => dispatch(changeOfferQuotaOldPrice(quotaOldPrice)),
        changeOfferQuotaNewPrice: (quotaNewPrice: string) => dispatch(changeOfferQuotaNewPrice(quotaNewPrice)),
    }
}

export interface OwnProps {
    navigation: NavigationProp<any>;
}

type State = {
    selectedOption: any;
}

type Props = IStateProps & IDispatchProps & OwnProps

export default connect<IStateProps, IDispatchProps, OwnProps>(mapStateToProps, mapDispatchToProps)(NewOfferPrice);