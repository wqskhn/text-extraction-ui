import React, {
  FunctionComponent,
  PropsWithChildren,
  useEffect,
  useState,
} from "react";
import { MdDone, MdError, MdInfo, MdWarning } from "react-icons/all";

interface AlertBoxProps {
  scheme: Scheme;
  icon?: JSX.Element;
  className?: string;
}
export type Scheme = "success" | "danger" | "warning" | "info";

export const AlertBox: FunctionComponent<AlertBoxProps> = (
  props: PropsWithChildren<AlertBoxProps>
) => {
  const getIcon = () => {
    if (props.icon !== undefined) {
      return props.icon;
    }

    switch (props.scheme) {
      case "success":
        return <MdDone size={24} />;
      case "danger":
        return <MdError size={24} />;
      case "warning":
        return <MdWarning size={24} />;
      default:
        return <MdInfo size={24} />;
    }
  };

  // the alert is displayed by default
  const [alert, setAlert] = useState(true);

  return (
    <div
      className={`${props.className ?? ""} alert alert-${
        props.scheme
      } d-flex align-items-center`}
      role="alert"
    >
      <div className="flex-grow-0 mr-4 align-content-start">{getIcon()}</div>
      <div className="flex-grow-1">{props.children}</div>
    </div>
  );
};
