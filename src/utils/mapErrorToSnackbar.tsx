import React from "react";
import { AxiosError } from "axios";
import { MD3Theme, Snackbar } from "react-native-paper";

export type SnackbarAction = {
  label: string;
  onPress: () => void;
  condition?: (errMsg: string) => boolean; // optional filter
};

/**
 * Maps an AxiosError into a Snackbar with optional conditional actions
 */
export default function mapErrToSnackbar(
  t: MD3Theme,
  err: AxiosError | null,
  visible: boolean,
  onDismiss: () => void,
  actions: SnackbarAction[] = []
) {
  if (!err) return null;

  let message: string;

  if (err.response?.data) {
    const data: any = err.response.data;

    if (typeof data === "object" && "message" in data) {
      message = String(data.message);
    } else if (typeof data === "string") {
      message = data;
    } else {
      message = "Unexpected server response";
    }
  } else if (err.request && !err.response) {
    message = "Network error: Unable to reach the server. Please check your connection.";
  } else if ((err as any).code === "ERR_CANCELED") {
    message = "Request cancelled";
  } else {
    message = err.message || "An unexpected error occurred";
  }

  // Pick the first matching action
  const matchedAction = actions.find(
    (a) => !a.condition || a.condition(message)
  );

  return (
    <Snackbar
      visible={visible}
      onDismiss={onDismiss}
      duration={4000}
      style={{ backgroundColor: t.colors.error }}
      action={{
        label: matchedAction?.label ?? "OK",
        onPress: matchedAction?.onPress ?? onDismiss,
      }}
    >
      {message}
    </Snackbar>
  );
}
