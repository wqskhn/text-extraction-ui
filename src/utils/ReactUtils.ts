import { Dispatch, SetStateAction } from "react";

/**
 * Update the request state.
 * @param promise the promise to execute.
 * @param setState the dispatcher to udpate the state.
 */
export function withRequest<T>(
  promise: Promise<T>,
  setState: Dispatch<SetStateAction<AsyncRequest<T>>>
) {
  setState({
    isRequesting: true,
  });

  promise
    .then((r) =>
      setState({
        data: r,
        isRequesting: false,
        retrievedTime: new Date(),
        error: undefined,
      })
    )
    .catch((err) =>
      setState({
        error: err,
        retrievedTime: undefined,
        isRequesting: false,
        data: undefined,
      })
    );
}
