/**
 * StateDisplay is a reusable component that handles the rendering of different UI states
 * such as loading, error, empty, or success. It ensures that the appropriate content or
 * message is displayed based on the state of the data, while keeping the layout consistent
 * and centered within the parent container.
 */

import { ReactNode } from "react";

type Props = {
  loading: boolean;
  error: boolean;
  empty: boolean;
  emptyMessage?: string | ReactNode;
  errorMessage?: string;
  loadingMessage?: string;
  children: ReactNode;
};

const WithLoadingError = ({
  loading,
  error,
  empty,
  emptyMessage = "No data available",
  errorMessage = "Something went wrong",
  loadingMessage = "Loading...",
  children,
}: Props) => {
  const content = () => {
    if (loading) {
      return (
        <>
          <i className="fas fa-spinner fa-spin text-gray-500 mb-2 text-2xl"></i>
          <p className="text-[--text-secondary] w-[60%]">{loadingMessage}</p>
        </>
      );
    }

    if (error) {
      return (
        <>
          <i className="fas fa-exclamation-circle text-red-500 mb-2 text-2xl"></i>
          <p className="text-red-500 w-[60%]">{errorMessage}</p>
        </>
      );
    }

    if (empty) {
      return (
        <>
          <i className="fas fa-info-circle text-gray-400 mb-2 text-2xl"></i>
          {typeof emptyMessage === "string" ? (
            <p className="text-[--text-secondary] w-[60%]">{emptyMessage}</p>
          ) : (
            emptyMessage
          )}
        </>
      );
    }

    return <>{children}</>;
  };

  return (
    <div className="flex flex-col items-center justify-center w-full h-full text-center">
      {content()}
    </div>
  );
};

export default WithLoadingError;
