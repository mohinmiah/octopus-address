export interface AddressSuggestion {
    "formatted_address"?: Array<string>;
    "thoroughfare"?: string;
    "building_name"?: string;
    "sub_building_name"?: string;
    "sub_building_number"?: string;
    "building_number"?: string;
    "line_1"?: string;
    "line_2"?: string;
    "line_3"?: string;
    "line_4"?: string;
    "locality"?: string;
    "town_or_city"?: string;
    "county"?: string;
    "district"?: string;
    "country"?: string;
    "postcode"?: string;
}

export default interface PostcodeAddressSuggestion {
    "postcode"?: string;
    "latitude"?: number;
    "longitude"?: number;
    "addresses"?: Array<AddressSuggestion>;
}