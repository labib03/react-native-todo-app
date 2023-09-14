import { TodoType } from "$types/todo.type";

export type Payload = {
  title: string;
  notes: string;
  date: Date | undefined;
};

let index = 1;
export const DummyListData: TodoType[] = [
  // {
  //   id: index++,
  //   title: "Latihan Sepakbola",
  //   notes:
  //     "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris lobortis, turpis vel vestibulum posuere, elit magna feugiat libero, eu mattis ante lectus ac erat. Pellentesque venenatis hendrerit facilisis. Proin vel rhoncus lacus. In hac habitasse platea dictumst. Aenean ut rhoncus mi. Fusce tempor eu neque eget feugiat. Etiam tincidunt pharetra felis. Donec rutrum dictum magna eget iaculis. Fusce ultrices quam tempus tellus ullamcorper dignissim. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Aliquam erat volutpat. Ut lacinia enim hendrerit tellus consequat, id hendrerit elit euismod. Sed bibendum dui ac elementum sollicitudin. In blandit quam at nulla elementum, ac molestie est porttitor. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris lobortis, turpis vel vestibulum posuere, elit magna feugiat libero, eu mattis ante lectus ac erat. Pellentesque venenatis hendrerit facilisis. Proin vel rhoncus lacus. In hac habitasse platea dictumst. Aenean ut rhoncus mi. Fusce tempor eu neque eget feugiat. Etiam tincidunt pharetra felis. Donec rutrum dictum magna eget iaculis. Fusce ultrices quam tempus tellus ullamcorper dignissim. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Aliquam erat volutpat. Ut lacinia enim hendrerit tellus consequat, id hendrerit elit euismod. Sed bibendum dui ac elementum sollicitudin. In blandit quam at nulla elementum, ac molestie est porttitor. aku adalah raja",
  //   date: new Date(),
  //   isCompleted: false,
  // },
];
