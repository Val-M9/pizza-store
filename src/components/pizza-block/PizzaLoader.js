import ContentLoader from "react-content-loader";

export default function PizzaLoader() {
  return (
    <ContentLoader
      className="pizza-block"
      speed={2}
      width={280}
      height={457}
      viewBox="0 0 280 457"
      backgroundColor="#f3f3f3"
      foregroundColor="#ecebeb">
      <rect x="0" y="270" rx="5" ry="5" width="280" height="25" />
      <circle cx="140" cy="125" r="125" />
      <rect x="0" y="308" rx="6" ry="6" width="280" height="85" />
      <rect x="127" y="405" rx="22" ry="22" width="150" height="45" />
      <rect x="0" y="415" rx="5" ry="5" width="70" height="25" />
    </ContentLoader>
  );
}
