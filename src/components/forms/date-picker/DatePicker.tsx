import ReactDatePicker, {
  DatePickerProps as ReactDatePickerProps,
} from 'react-datepicker';

import { InputText } from '@/components/forms/input-text';
import { DateFormat } from '@/constants/date';

import 'react-datepicker/dist/react-datepicker.css';

export type DatePickerProps = Omit<
  ReactDatePickerProps,
  | 'selectsRange'
  | 'selectsMultiple'
  | 'dateFormat'
  | 'showTimeInput'
  | 'customTimeInput'
  | 'showIcon'
  | 'selected'
  | 'selectedDates'
> & {
  label?: string;
  error?: string;
  required?: boolean;
  dateFormat?: DateFormat;
} & (
    | {
        selected?: never;
        selectedDates?: Date[];
        selectsMultiple: true;
        onChange?: (
          date: Date[] | null,
          event?:
            | React.MouseEvent<HTMLElement>
            | React.KeyboardEvent<HTMLElement>,
        ) => void;
      }
    | {
        selected?: Date | null;
        selectedDates?: never;
        selectsMultiple?: never;
        onChange?: (
          date: Date | null,
          event?:
            | React.MouseEvent<HTMLElement>
            | React.KeyboardEvent<HTMLElement>,
        ) => void;
      }
  );

export const DatePicker = ({
  label,
  error,
  disabled,
  dateFormat = DateFormat.fullDateWithSlash,
  selectedDates,
  ...props
}: DatePickerProps) => {
  return (
    <div className="w-full h-full">
      <ReactDatePicker
        {...props}
        disabled={disabled}
        selectedDates={selectedDates}
        customInput={
          <InputText
            className="flex w-full border-none border-input bg-transparent"
            error={error}
            disabled={disabled}
            autoComplete="off"
            label={label}
          />
        }
        dateFormat={dateFormat}
      />
    </div>
  );
};
