import { Box, VStack, Heading, Text } from "@gluestack-ui/themed";
import { CustomCheckbox } from "../../atoms";
import { format } from "date-fns";
import { Pressable } from "react-native";
import { TodoType } from "$types/todo.type";
import { useDispatch } from "react-redux";
import { markChecked, markUnchecked } from "../../../store/TodosReducer";
import { MAX_CHAR_NOTES } from "../../../datas/CONST";

interface PropsType {
  item: TodoType;
  onClickCard: () => void;
}

const CardTodo = ({ item, onClickCard }: PropsType) => {
  const dispatch = useDispatch();

  const toogle = () => {
    if (item.isCompleted) {
      dispatch(markUnchecked(item.id));
      return;
    }

    dispatch(markChecked(item.id));
  };

  const renderTextNotes = (text: string) => {
    if (text.length > 100) {
      const slicedText = text.slice(0, MAX_CHAR_NOTES);

      return slicedText + "...";
    }

    return text;
  };
  return (
    <Box
      bg={item.isCompleted ? "$green200" : "$white"}
      p="$2"
      rounded={"$md"}
      softShadow="1"
    >
      <VStack space="md">
        <Box borderBottomWidth={"$1"} pb={"$1"}>
          <CustomCheckbox
            isChecked={item.isCompleted}
            label={item.title}
            onChange={() => toogle()}
          />
        </Box>

        <Pressable onPress={onClickCard}>
          <Text fontWeight="$medium" size="xs">
            Date: {format(item.date as Date, "dd MMMM yyyy")}
          </Text>
          <Text fontWeight="$medium" size="xs">
            Time: {format(item.date as Date, "HH:mm")}
          </Text>

          <Box>
            <Heading size="xs">Notes:</Heading>
            <Text
              size="xs"
              // backgroundColor="$amber300"
              fontWeight="$medium"
            >
              {renderTextNotes(item.notes)}
            </Text>
          </Box>
        </Pressable>
      </VStack>
    </Box>
  );
};

export default CardTodo;
