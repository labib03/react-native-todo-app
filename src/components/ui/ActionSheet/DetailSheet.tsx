import {
  Box,
  Button,
  ButtonText,
  CalendarDaysIcon,
  ClockIcon,
  Fab,
  HStack,
  Heading,
  Icon,
  Text,
} from "@gluestack-ui/themed";
import { forwardRef } from "react";
import ActionSheet, {
  ActionSheetRef,
  SheetManager,
  SheetProps,
} from "react-native-actions-sheet";
import { FileEditIcon, TrashIcon } from "lucide-react-native";
import { format } from "date-fns";
import { TodoType } from "$types/todo.type";
import { useDispatch } from "react-redux";
import { deleteTodo } from "../../../store/TodosReducer";
import { Platform } from "react-native";

import * as Calendar from "expo-calendar";
import { ScrollView } from "react-native-gesture-handler";
// import * as Notifications from "expo-notifications";

interface PropsType extends SheetProps<TodoType> {
  sheetId: string;
}

async function getDefaultCalendarSource() {
  const calendars = await Calendar.getCalendarsAsync(
    Calendar.EntityTypes.EVENT
  );
  const defaultCalendars = calendars.filter(
    (each) => each.source.name === "Default"
  );
  return defaultCalendars.length
    ? defaultCalendars[0].source
    : calendars[0].source;
}

const DetailSheet = forwardRef<ActionSheetRef, PropsType>((props, ref) => {
  const { sheetId, payload } = props;

  const dispatch = useDispatch();

  async function createCalendar() {
    const defaultCalendarSource =
      Platform.OS === "ios"
        ? await getDefaultCalendarSource()
        : { isLocalAccount: true, name: "Expo Calendar", type: "test" };

    const newCalendarID = await Calendar.createCalendarAsync({
      title: "Expo Calendar",
      color: "green",
      entityType: Calendar.EntityTypes.REMINDER,
      sourceId: String(Math.random() * 9),
      source: defaultCalendarSource,
      name: "Test Integration",
      ownerAccount: "personal",
      accessLevel: Calendar.CalendarAccessLevel.OWNER,
      allowedReminders: ["test", "aja"],
    });

    // console.log(`Your new calendar ID is: ${newCalendarID}`);
    return newCalendarID;
  }

  const addNewEvent = async () => {
    try {
      const calendarId = await createCalendar();

      const res = await Calendar.createEventAsync(calendarId, {
        startDate: payload?.date,
        endDate: payload?.date,
        title: payload?.title,
        notes: payload?.notes,
      });

      Calendar.openEventInCalendar(res);
      // Alert.alert("Event Created!",);
    } catch (e) {
      console.log(e);
    }
  };

  // async function schedulePushNotification() {
  //   await Notifications.scheduleNotificationAsync({
  //     content: {
  //       title: "Pemberitahuan Acara",
  //       body: "Acara Anda akan dimulai dalam 5 menit.",
  //     },
  //     trigger: {
  //       date: payload?.date as Date,
  //       // seconds: 5 * 60, // 5 menit
  //     },
  //   });
  // }

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
    >
      <Box px={20} pt={5} h={"$full"} pb={"$32"}>
        <Heading
          size="lg"
          borderBottomWidth={"$2"}
          borderBottomColor="$backgroundLight200"
          pb={"$2"}
        >
          {payload?.title}
        </Heading>

        <HStack space={"sm"} alignItems={"center"} mt={"$3"}>
          <Box backgroundColor={"$blueGray200"} p={"$2"} rounded={"$md"}>
            <HStack space={"sm"} alignItems={"center"}>
              <Icon as={CalendarDaysIcon} />
              <ButtonText color={"$black"}>
                {format(payload?.date as Date, "dd MMMM yyyy")}
              </ButtonText>
            </HStack>
          </Box>

          <Box backgroundColor={"$blueGray200"} p={"$2"} rounded={"$md"}>
            <HStack space={"sm"} alignItems={"center"}>
              <Icon as={ClockIcon} />
              <ButtonText color={"$black"}>
                {format(payload?.date as Date, "HH:mm")}
              </ButtonText>
            </HStack>
          </Box>
        </HStack>

        <Box mt={"$2"}>
          <Button
            onPress={() => {
              addNewEvent();
            }}
          >
            <Text color="$white">Add to Calendar</Text>
          </Button>
        </Box>

        <ScrollView
          style={{
            marginTop: 15,
            paddingBottom: 30,
          }}
          showsVerticalScrollIndicator={true}
        >
          <Box mt={"$4"}>
            <Text size="lg">{payload?.notes}</Text>
          </Box>
        </ScrollView>

        <Fab
          size="lg"
          mb={"$10"}
          placement="bottom right"
          position="absolute"
          bgColor="$error400"
          onPress={() => {
            dispatch(deleteTodo(payload?.id as string));
            SheetManager.hide("detail-sheet");
          }}
        >
          <Box>
            <TrashIcon width={20} height={20} color="#fff" />
          </Box>
        </Fab>

        <Fab
          size="lg"
          mb={"$10"}
          right={"$20"}
          placement="bottom right"
          position="absolute"
          onPress={() => {
            SheetManager.hide("detail-sheet");
            SheetManager.show("edit-sheet", {
              payload,
            });
          }}
        >
          <HStack space="md" justifyContent="center" alignItems="center">
            <FileEditIcon width={20} height={20} color="#fff" />
            <Text color="$white">Edit Todo</Text>
          </HStack>
        </Fab>
      </Box>
    </ActionSheet>
  );
});

export default DetailSheet;
