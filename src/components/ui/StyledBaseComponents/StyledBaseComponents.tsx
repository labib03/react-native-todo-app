import { styled } from "@gluestack-style/react";
import { KeyboardAvoidingView, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const StyledKeyboardAvoidingView = styled(KeyboardAvoidingView, {});
const StyledSafeAreaView = styled(SafeAreaView, {});
const StyledScrollView = styled(ScrollView, {
  w: "$full",
});

export { StyledKeyboardAvoidingView, StyledSafeAreaView, StyledScrollView };
