import classNames from "classnames";

export default function Button({ className, outline, children }) {
  return (
    <button
      className={classNames("button", className, {
        "button--outline": outline,
      })}>
      {children}
    </button>
  );
}
