import { Box, Textarea, TextareaInput } from "@gluestack-ui/themed";
import { View } from "react-native";
import ActionSheet, { SheetProps } from "react-native-actions-sheet";

function CustomActionSheet(props: SheetProps) {
  return (
    <ActionSheet
      id={props.sheetId}
      containerStyle={{
        borderTopLeftRadius: 25,
        borderTopRightRadius: 25,
        paddingTop: 5,
      }}
      indicatorStyle={{
        width: 100,
      }}
      gestureEnabled={true}
    >
      <Box
        p={20}
        h={300}
        // style={{
        //   padding: 20,
        //   height: 300,
        // }}
      >
        <Textarea
          size="md"
          isReadOnly={false}
          isInvalid={false}
          isDisabled={false}
        >
          <TextareaInput
            placeholder="Your text goes here..."
            placeholderTextColor={"black"}
          />
        </Textarea>
      </Box>
    </ActionSheet>
  );
}

export default CustomActionSheet;
