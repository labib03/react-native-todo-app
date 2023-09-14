import React from "react";
import {
  StyledKeyboardAvoidingView,
  StyledSafeAreaView,
  StyledScrollView,
} from "../StyledBaseComponents/StyledBaseComponents";
import { View } from "@gluestack-ui/themed";

interface PropsType {
  children: React.ReactNode;
  footer: React.ReactNode;
}

const BaseWrapper = ({ children, footer }: PropsType) => {
  return (
    <StyledSafeAreaView bg="$secondary50">
      {/* <StatusBar style="auto" /> */}
      <StyledKeyboardAvoidingView behavior="padding">
        <View h={"$full"}>
          <StyledScrollView px={"$3.5"} py={"$3"}>
            {children}
          </StyledScrollView>
        </View>
        {footer && <View>{footer}</View>}
      </StyledKeyboardAvoidingView>
    </StyledSafeAreaView>
  );
};

export default BaseWrapper;
