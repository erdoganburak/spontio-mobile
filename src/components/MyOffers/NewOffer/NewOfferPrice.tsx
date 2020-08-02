import React, { Component, Dispatch } from 'react';
import { View, StyleSheet, Text, TextInput } from 'react-native';
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';
import { NavigationProp } from '@react-navigation/native';
import { connect } from 'react-redux';
import { TRootReducer } from '../../../redux/store';
import { SpontioColors } from '../../../enums/spontioColors.enum';
import { NavigationProperty } from '../../../redux/reducer/navigationReducer';
import { AnyAction } from 'redux';
import { NewOfferObject } from '../../../redux/reducer/newOfferReducer';
import { changeNewOfferPriceType } from '../../../redux/actions/newOffer';
import { changeNewOfferOldPrice } from '../../../redux/actions/newOffer';
import { changeNewOfferNewPrice } from '../../../redux/actions/newOffer';
import { changeNewOfferDiscount } from '../../../redux/actions/newOffer';
import { changeNewOfferQuota } from '../../../redux/actions/newOffer';
import { changeNewOfferQuotaOldPrice } from '../../../redux/actions/newOffer';
import { changeNewOfferQuotaNewPrice } from '../../../redux/actions/newOffer';
import { translate } from '../../../managers/language.manager';
import { OfferPriceType } from '../../../enums/offerPrice.enum';
import { OfferPriceTypes } from '../../../constants/offer-price-types.constant';
import { SegmentedControls } from 'react-native-radio-buttons'

class NewOfferPrice extends Component<Props, State> {

    public readonly state: State = {
        selectedOption: {
            value: OfferPriceType.Price,
            label: "my_offers.price_types.price"
        }
    }

    componentDidMount() {
        let option = OfferPriceTypes.find(
            priceType => priceType.value === this.props.newOffer.newOfferPriceType);
            console.log("price type: " + this.props.newOffer.newOfferPriceType)
            console.log("OPTION: " + option);
        this.setState({ selectedOption: option })
    }

    private setSelectedOption(selectedOption: any) {
        console.log(selectedOption)
        this.setState({ selectedOption: selectedOption })
        this.props.changeNewOfferPriceType(selectedOption.value);
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
                                        value={this.props.newOffer.newOfferOldPrice}
                                        onChangeText={(newOfferOldPrice) => this.props.changeNewOfferOldPrice(newOfferOldPrice)}
                                    />
                                    <TextInput
                                        autoCapitalize={'none'}
                                        autoCorrect={false}
                                        keyboardType="numbers-and-punctuation"
                                        placeholder={"New Price"}
                                        placeholderTextColor={SpontioColors.Primary}
                                        style={styles.input}
                                        returnKeyType="default"
                                        value={this.props.newOffer.newOfferNewPrice}
                                        onChangeText={(newOfferNewPrice) => this.props.changeNewOfferNewPrice(newOfferNewPrice)}
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
                                        value={this.props.newOffer.newOfferDiscount}
                                        onChangeText={(newOfferDiscount) => this.props.changeNewOfferDiscount(newOfferDiscount)}
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
                                        value={this.props.newOffer.newOfferQuotaOldPrice}
                                        onChangeText={(newOfferQuotaOldPrice) => this.props.changeNewOfferQuotaOldPrice(newOfferQuotaOldPrice)}
                                    />
                                    <TextInput
                                        autoCapitalize={'none'}
                                        autoCorrect={false}
                                        keyboardType="numbers-and-punctuation"
                                        placeholder={"New Price"}
                                        placeholderTextColor={SpontioColors.Primary}
                                        style={styles.input}
                                        returnKeyType="default"
                                        value={this.props.newOffer.newOfferQuotaNewPrice}
                                        onChangeText={(newOfferQuotaNewPrice) => this.props.changeNewOfferQuotaNewPrice(newOfferQuotaNewPrice)}
                                    />
                                    <TextInput
                                        autoCapitalize={'none'}
                                        autoCorrect={false}
                                        keyboardType="numbers-and-punctuation"
                                        placeholder={"Quota"}
                                        placeholderTextColor={SpontioColors.Primary}
                                        style={styles.input}
                                        returnKeyType="default"
                                        value={this.props.newOffer.newOfferQuota}
                                        onChangeText={(newOfferQuota) => this.props.changeNewOfferQuotaNewPrice(newOfferQuota)}
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
    newOffer: NewOfferObject
}

const mapStateToProps = (state: TRootReducer): IStateProps => {
    return {
        navigationProperty: state.navigationReducer.navigationProperty,
        newOffer: state.newOfferReducer.newOffer
    }
}

interface IDispatchProps {
    changeNewOfferPriceType: (newOfferPriceType: OfferPriceType) => void;
    changeNewOfferOldPrice: (newOfferOldPrice: string) => void;
    changeNewOfferNewPrice: (newOfferNewPrice: string) => void;
    changeNewOfferDiscount: (newOfferDiscount: string) => void;
    changeNewOfferQuota: (newOfferQuota: string) => void;
    changeNewOfferQuotaOldPrice: (newOfferQuotaOldPrice: string) => void;
    changeNewOfferQuotaNewPrice: (newOfferQuotaNewPrice: string) => void;

}

const mapDispatchToProps = (dispatch: Dispatch<AnyAction>): IDispatchProps => {
    return {
        changeNewOfferPriceType: (newOfferPriceType: OfferPriceType) => dispatch(changeNewOfferPriceType(newOfferPriceType)),
        changeNewOfferOldPrice: (newOfferOldPrice: string) => dispatch(changeNewOfferOldPrice(newOfferOldPrice)),
        changeNewOfferNewPrice: (newOfferNewPrice: string) => dispatch(changeNewOfferNewPrice(newOfferNewPrice)),
        changeNewOfferDiscount: (newOfferDiscount: string) => dispatch(changeNewOfferDiscount(newOfferDiscount)),
        changeNewOfferQuota: (newOfferQuota: string) => dispatch(changeNewOfferQuota(newOfferQuota)),
        changeNewOfferQuotaOldPrice: (newOfferQuotaOldPrice: string) => dispatch(changeNewOfferQuotaOldPrice(newOfferQuotaOldPrice)),
        changeNewOfferQuotaNewPrice: (newOfferQuotaNewPrice: string) => dispatch(changeNewOfferQuotaNewPrice(newOfferQuotaNewPrice)),
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