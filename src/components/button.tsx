import {TouchableOpacity, TouchableOpacityProps} from "react-native";
import {ReactNode} from "react";

type ButtonProps = TouchableOpacityProps & {
    children: ReactNode;
}

function Button({ children, ...rest }: ButtonProps) {
  return (
      <TouchableOpacity
          className="h-12 bg-lime-400 rounded-md items-center justify-center flex-row"
          activeOpacity={0.7}
          {...rest}
      >
          {children}
      </TouchableOpacity>
  )
}