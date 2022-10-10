import { View, Text } from "react-native";
import tw from "twrnc";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { GOOGLE_MAPS_API_KEY } from "@env";
import { useContext, useRef } from "react";
import { FontAwesome5 } from "@expo/vector-icons";
import { Theme } from "../../types";
import themeContext from "../config/themeContext";
import { destinationAtom } from "../atoms/tripAtom";
import { useRecoilState } from "recoil";


interface Props {
    setIsDestinationSelected: any
}

const DestinationAutocomplete = ({setIsDestinationSelected}: Props) => {
  const theme: Theme = useContext(themeContext);

  const ref: any = useRef(null)

  const [destination, setDestination] = useRecoilState<any>(destinationAtom)
      
  return (
    <GooglePlacesAutocomplete
        ref={ref}
      placeholder="Destination"
      textInputProps={{
        placeholderTextColor: theme.fade_text,
      }}
      nearbyPlacesAPI="GooglePlacesSearch"
      debounce={400}
      onPress={async (data, details) => {
        setDestination({
            location: details?.geometry.location,
            description: data.description
        })
      
        setIsDestinationSelected(true)
      }}
      styles={{
        textInput: tw`text-[${theme.text}] text-[18px] bg-[${theme.input_base}] px-2 h-12 rounded-2xl`,
        container: tw`px-1`,
        row: tw`bg-[${theme.base}] flex-1 w-full`,
        description: tw`text-[${theme.text}]`,
        separator: tw`bg-[${theme.border}]`,
        poweredContainer: tw`bg-[${theme.base}] border-t border-[${theme.border}] text-[${theme.text}]`,
        listView: tw`bg-[${theme.base}] absolute -left-10 top-39 w-[100]`,
        powered: tw`text-[${theme.text}]`,
      }}
    //   disableScroll={true}
      enablePoweredByContainer={false}
      fetchDetails={true}
      query={{
        key: GOOGLE_MAPS_API_KEY,
        language: "en",
        components: "country:gh"
      }}
      keepResultsAfterBlur={true}
      renderRow={(data) => (
        
        <View style={tw`flex-1 flex-row items-center`}>
          <View
            style={tw`bg-[${theme.fade_yellow}] h-12 w-12 rounded-full items-center justify-center mr-2`}
          >
            <View
              style={tw`bg-[${theme.yellow}] h-8 w-8 rounded-full items-center justify-center`}
            >
              <FontAwesome5
                name="map-marker-alt"
                size={18}
                color="#35353f"
              />
            </View>
          </View>
          <Text style={tw`text-[${theme.text}] font-bold text-[1rem]`}>{data.description}</Text>
        </View>
      )}
     
    />
  );
};

export default DestinationAutocomplete;
