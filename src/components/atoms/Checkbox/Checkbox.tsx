import { CommonSizeUnit } from "$types/general.type";
import {
  Checkbox as CB,
  CheckIcon,
  CheckboxIcon,
  CheckboxIndicator,
  CheckboxLabel,
  Text,
} from "@gluestack-ui/themed";

interface PropsType {
  label: string;
  labelSize?: CommonSizeUnit;
  // value: string;
  isChecked: boolean;
  onChange: (e?: boolean) => void;
}

const CustomCheckbox = ({
  isChecked,
  label,
  onChange,
  // value,
  labelSize = "lg",
}: PropsType) => {
  return (
    <CB
      aria-label="check-box"
      size="md"
      isInvalid={false}
      isDisabled={false}
      // value={value}
      value="checked"
      onChange={onChange}
      isChecked={isChecked}
    >
      <CheckboxIndicator mr="$2">
        <CheckboxIcon as={CheckIcon} />
      </CheckboxIndicator>
      <CheckboxLabel
        as={Text}
        isTruncated
        color="$blueGray800"
        size={labelSize}
        fontWeight="$bold"
        strikeThrough={isChecked}
      >
        {label}
      </CheckboxLabel>
    </CB>
  );
};

export default CustomCheckbox;
