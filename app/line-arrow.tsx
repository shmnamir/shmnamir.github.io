type LineArrowProps = {
  direction?: "up-right" | "down-right";
};

export function LineArrow({ direction = "up-right" }: LineArrowProps) {
  return (
    <svg className="line-arrow" viewBox="0 0 20 20" aria-hidden="true" focusable="false">
      {direction === "up-right" ? (
        <path d="M4.5 15.5 15.5 4.5M7 4.5h8.5V13" />
      ) : (
        <path d="m4.5 4.5 11 11M7 15.5h8.5V7" />
      )}
    </svg>
  );
}
