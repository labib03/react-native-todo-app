import {
  Box,
  Button,
  Fab,
  HStack,
  Heading,
  Spinner,
  Text,
  VStack,
  View,
} from "@gluestack-ui/themed";
import BaseWrapper from "../../components/ui/BaseWrapper/BaseWrapper";
import { CardTodo, CreateSheet } from "../../components";
import { useRef, useState } from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import { ActionSheetRef, SheetManager } from "react-native-actions-sheet";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { useDispatch } from "react-redux";
import { addTodo, createTodo } from "../../store/TodosReducer";
import { TodoType } from "$types/todo.type";
import { collection, getDocs } from "firebase/firestore";
import { FIRESTORE_DB } from "../../../firebaseConfig";
import { convertFirestoreTimestamp } from "../../utils/converter";
import { startLoading, stopLoading } from "../../store/loadingReducer";

const Home = () => {
  const [isLoading, setIsLoading] = useState(false);

  const { todos } = useSelector((state: RootState) => state.todos);

  const ref = useRef<ActionSheetRef>(null);
  const dispatch = useDispatch();

  return (
    <BaseWrapper
      footer={
        <Fab
          size="md"
          placement="bottom right"
          px={"$4"}
          // position="absolute"
          isHovered={false}
          isDisabled={false}
          isPressed={false}
          onPress={() => {
            // SheetManager.show("custom-sheet");
            // setModalVisible(true);
            // setIsLoading(false);
            ref.current?.show();
          }}
        >
          <HStack space="sm" alignItems="center" justifyContent="center">
            <Ionicons name="md-add-outline" size={28} color={"#fff"} />
            <Text color="$white">Create Todo</Text>
          </HStack>
        </Fab>
      }
    >
      <View style={{ flex: 1 }}>
        <Heading size="xl" letterSpacing={"$lg"} fontWeight="$bold">
          TODO APP
        </Heading>
        <CreateSheet
          ref={ref}
          sheetId="general-sheet"
          onSave={(payload: TodoType) => {
            ref.current?.hide({ payload: {} });
            // setIsLoading(false);
            // setData((val) => [payload, ...val]);
            dispatch(createTodo(payload));
            // setTimeout(() => {
            //   setIsLoading(false);
            //   ref.current?.hide();
            // }, 500);
          }}
        />

        <Heading size="xs" bold={false}>
          Aplikasi simple tentang manajemen todo list, yang terintegrasi dengan
          firebase dan aplikasi kalender
        </Heading>

        <Box mt={"$2"}>
          <Button
            isDisabled={false}
            onPress={() => {
              setIsLoading(true);
              setTimeout(() => {
                getDocs(collection(FIRESTORE_DB, "todos")).then(
                  (querySnapshot) => {
                    querySnapshot.forEach((doc) => {
                      const payload: TodoType = {
                        id: doc.data().id,
                        title: doc.data().title,
                        notes: doc.data().notes,
                        date: convertFirestoreTimestamp(doc.data().date),
                        isCompleted: doc.data().isCompleted,
                      };

                      dispatch(addTodo(payload));
                    });
                  }
                );
                setIsLoading(false);
              }, 2000);
            }}
          >
            {isLoading ? (
              <Spinner color={"$white"} size="small" />
            ) : (
              <Text color="$white">Sync With Firebase</Text>
            )}
          </Button>
        </Box>

        <VStack space="lg" py="$4.5" pb={"$10"}>
          {todos.map((item, idx) => (
            <CardTodo
              key={idx}
              item={item}
              onClickCard={() => {
                SheetManager.show("detail-sheet", {
                  payload: { ...item },
                });
              }}
            />
          ))}
        </VStack>
      </View>
    </BaseWrapper>
  );
};

export default Home;
