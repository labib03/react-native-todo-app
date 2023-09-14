import {
  Box,
  Button,
  ButtonText,
  CalendarDaysIcon,
  Center,
  ClockIcon,
  HStack,
  Icon,
  Text,
  Textarea,
  TextareaInput,
} from "@gluestack-ui/themed";
import { DateTimePickerAndroid } from "@react-native-community/datetimepicker";
import { forwardRef, useState } from "react";
import ActionSheet, {
  ActionSheetRef,
  SheetProps,
} from "react-native-actions-sheet";
import { Button as RNButton } from "react-native";
import { format } from "date-fns";
import { TodoType } from "$types/todo.type";
import { MAX_INPUT_TITLE_TODO } from "../../../datas/CONST";
import { useDispatch } from "react-redux";
import {
  isLoading,
  startLoading,
  stopLoading,
} from "../../../store/loadingReducer";
import { useSelector } from "react-redux";

interface PropsType extends Partial<SheetProps> {
  sheetId: string;
  onSave: (payload: TodoType) => void;
}

const color = "$secondary300";

const CreateSheet = forwardRef<ActionSheetRef, PropsType>((props, ref) => {
  const { sheetId, onSave } = props;

  const [date, setDate] = useState<Date | undefined>(new Date());
  const [formInput, setFormInput] = useState({
    title: "",
    notes: "",
  });
  const [messageError, setMessageError] = useState("");

  const dispatch = useDispatch();

  const onChangeDatePicker = (event: any, selectedDate: any) => {
    setDate(selectedDate);
  };

  const showMode = (currentMode: any) => {
    DateTimePickerAndroid.open({
      value: date as Date,
      onChange: onChangeDatePicker,
      mode: currentMode,
      is24Hour: true,
      minimumDate: new Date(),
    });
  };

  const showDatepicker = () => {
    showMode("date");
  };

  const showTimepicker = () => {
    showMode("time");
  };

  const resetField = () => {
    setFormInput({ title: "", notes: "" });
    setDate(new Date());
    setMessageError("");
  };

  const handleChange = (value: string, key: "title" | "notes") => {
    setFormInput((val) => ({
      ...val,
      [key]: value,
    }));
  };

  const handleSave = () => {
    if (!date || !formInput.notes || !formInput.title) {
      setMessageError("Isi semua field dan tanggal");
      return;
    }

    dispatch(startLoading());
    const payload: TodoType = {
      id: String(Math.floor(Math.random() * 888888888888)),
      isCompleted: false,
      ...formInput,
      date,
    };

    onSave(payload);

    resetField();
    dispatch(stopLoading());
  };

  return (
    <ActionSheet
      ref={ref}
      id={sheetId}
      containerStyle={{
        borderTopLeftRadius: 25,
        borderTopRightRadius: 25,
        paddingTop: 5,
      }}
      gestureEnabled={true}
      snapPoints={[100]}
      onBeforeClose={() => {
        resetField();
      }}
    >
      <Box px={20} pt={5} h={"$full"}>
        <Textarea
          size="lg"
          borderWidth={"$0"}
          borderBottomWidth={"$1"}
          borderBottomColor="$backgroundLight50"
          h={"$12"}
        >
          <TextareaInput
            placeholder="Title Task"
            placeholderTextColor={color}
            value={formInput.title}
            onChangeText={(e) => {
              if (e.length > MAX_INPUT_TITLE_TODO) return;

              const slicedText = e.slice(0, MAX_INPUT_TITLE_TODO);
              handleChange(slicedText, "title");
            }}
          />
        </Textarea>

        <HStack space={"sm"} alignItems={"center"} mt={"$3"}>
          <Button
            size="md"
            variant="solid"
            backgroundColor={"$emerald400"}
            isDisabled={false}
            isFocusVisible={false}
            onPress={showDatepicker}
          >
            <HStack space={"sm"} alignItems={"center"}>
              <Icon as={CalendarDaysIcon} />
              <ButtonText color={"$black"}>
                {format(date as Date, "dd MMMM yyyy")}
              </ButtonText>
            </HStack>
          </Button>

          <Button
            size="md"
            variant="solid"
            backgroundColor={"$emerald400"}
            isDisabled={false}
            isFocusVisible={false}
            onPress={showTimepicker}
          >
            <HStack space={"sm"} alignItems={"center"}>
              <Icon as={ClockIcon} />
              <ButtonText color={"$black"}>
                {format(date as Date, "HH:mm")}
              </ButtonText>
            </HStack>
          </Button>
        </HStack>

        <Box mt={"$4"}>
          <Textarea size="lg" height={300}>
            <TextareaInput
              placeholder="Notes"
              placeholderTextColor={color}
              value={formInput.notes}
              onChangeText={(e) => {
                handleChange(e, "notes");
              }}
            />
          </Textarea>
        </Box>

        <Box mt={"$5"}>
          <RNButton title="Save" onPress={handleSave} disabled={isLoading} />
        </Box>

        <Center mt="$2">
          <Text color="$error500">{messageError}</Text>
        </Center>
      </Box>
    </ActionSheet>
  );
});

export default CreateSheet;
