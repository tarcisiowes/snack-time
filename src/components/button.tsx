import {TouchableOpacity} from "react-native";

function Button({ children, ...rest }) {
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