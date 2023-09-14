import { registerSheet } from "react-native-actions-sheet";
import CustomActionSheet from "./ActionSheet";
import DetailSheet from "./DetailSheet";
import EditSheet from "./EditSheet";

registerSheet("custom-sheet", CustomActionSheet);
registerSheet("detail-sheet", DetailSheet);
registerSheet("edit-sheet", EditSheet);

export { CustomActionSheet, DetailSheet, EditSheet };
