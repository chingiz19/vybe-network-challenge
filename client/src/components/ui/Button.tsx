type ButtonProps = {
  label: string;
  onClick: () => void;
  type?: "button" | "submit" | "reset";
  variant?: "primary" | "secondary" | "danger";
  size?: "small" | "medium" | "large";
  disabled?: boolean;
  loading?: boolean;
};

const Button = ({
  label,
  onClick,
  type = "button",
  variant = "primary",
  size = "medium",
  disabled = false,
  loading = false,
}: ButtonProps) => {
  const baseStyles =
    "font-semibold rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 transition duration-150 ease-in-out";
  const variantStyles = {
    primary: "bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500",
    secondary: "bg-gray-600 text-white hover:bg-gray-700 focus:ring-gray-500",
    danger: "bg-red-600 text-white hover:bg-red-700 focus:ring-red-500",
  };
  const sizeStyles = {
    small: "px-3 py-2 text-sm",
    medium: "px-4 py-2 text-base",
    large: "px-5 py-3 text-lg",
  };
  const disabledStyles = "opacity-50 cursor-not-allowed";
  const loadingStyles = "opacity-75 cursor-wait";

  return (
    <button
      type={type}
      onClick={onClick}
      className={`${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${
        disabled || loading ? disabledStyles : ""
      } ${loading ? loadingStyles : ""}`}
      disabled={disabled || loading}
    >
      {loading ? (
        <span className="flex items-center justify-center">
          <i className="fas fa-spinner fa-spin mr-2"></i>
          {label}
        </span>
      ) : (
        label
      )}
    </button>
  );
};

export default Button;
