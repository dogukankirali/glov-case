declare namespace Toast {
  type TypeOptions = "info" | "success" | "warning" | "error" | "default";
  type Theme = "light" | "dark" | any;
  type ToastPosition =
    | "top-right"
    | "top-center"
    | "top-left"
    | "bottom-right"
    | "bottom-center"
    | "bottom-left";

  interface IToastify {
    title: string | number;
    subtitle: string | number;
    duration?: number;
    position?: ToastPosition;
    theme?: Theme;
    type: TypeOptions;
  }
}
