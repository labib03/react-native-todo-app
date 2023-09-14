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
  SheetManager,
  SheetProps,
} from "react-native-actions-sheet";
import { Payload } from "../../../datas/dummy";
import { Button as RNButton } from "react-native";
import { format } from "date-fns";
import { TodoType } from "$types/todo.type";
import { useDispatch } from "react-redux";
import { updateTodo } from "../../../store/TodosReducer";
import { MAX_INPUT_TITLE_TODO } from "../../../datas/CONST";

interface PropsType extends SheetProps<TodoType> {
  sheetId: string;
}

const color = "$secondary300";

const EditSheet = forwardRef<ActionSheetRef, PropsType>((props, ref) => {
  const { sheetId, payload } = props;

  const dispatch = useDispatch();

  const [date, setDate] = useState<Date | undefined>(payload?.date);
  const [formInput, setFormInput] = useState({
    title: payload?.title,
    notes: payload?.notes,
  });
  const [messageError, setMessageError] = useState("");

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

    const obj: TodoType = {
      id: payload?.id as string,
      isCompleted: payload?.isCompleted as boolean,
      title: formInput.title,
      notes: formInput.notes,
      date,
    };

    dispatch(updateTodo(obj));

    setFormInput({ title: "", notes: "" });
    setDate(new Date());
    setMessageError("");
    SheetManager.hide("edit-sheet");
  };

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

  return (
    <ActionSheet
      ref={ref}
      // useBottomSafeAreaPadding
      id={sheetId}
      containerStyle={{
        borderTopLeftRadius: 25,
        borderTopRightRadius: 25,
        paddingTop: 5,
      }}
      // indicatorStyle={{
      //   width: 100,
      // }}
      gestureEnabled={true}
      snapPoints={[100]}
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

              handleChange(e, "title");
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
          <RNButton title="Update Todo" onPress={handleSave} disabled={false} />
        </Box>

        <Center mt="$2">
          <Text color="$error500">{messageError}</Text>
        </Center>
      </Box>
    </ActionSheet>
  );
});

export default EditSheet;
