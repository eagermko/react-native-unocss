import "react-native";
import type { VirtualizedListProps } from "react-native";

declare module "react-native" {
	type ClassNameValue = string | number | boolean | undefined | null;
  type ClassNameMapping = Record<string, unknown>;
  interface ClassNameArgumentArray extends Array<ClassList> {}
  type ClassList = ClassNameValue | ClassNameMapping | ClassNameArgumentArray;

  interface FlatListProps<ItemT> extends VirtualizedListProps<ItemT> {
    className?: string;
    classList?: ClassList;
  }

  interface ImagePropsBase {
    className?: string;
    classList?: ClassList;
  }

  interface ViewProps {
    className?: string;
    classList?: ClassList;
  }

  interface TextProps {
    className?: string;
    classList?: ClassList;
  }

  interface SwitchProps {
    className?: string;
    classList?: ClassList;
  }

  interface InputAccessoryViewProps {
    className?: string;
    classList?: ClassList;
  }

  interface TouchableWithoutFeedbackProps {
    className?: string;
    classList?: ClassList;
  }

  type UnoClass<T> = {
    className?: string;
    classList?: ClassList;
  } & T;
}
