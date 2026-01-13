type SymbolName =
  | "white"
  | "blue"
  | "black"
  | "red"
  | "green"
  | "colourless"
  | "one";

type SymbolProps =
  | {
      name: SymbolName;
      names?: never;
      size?: number;
    }
  | {
      name?: never;
      names: SymbolName[];
      size?: number;
    };

const symbolMap: Record<SymbolName, string> = {
  white: "/Symbols/white.svg",
  blue: "/Symbols/blue.svg",
  black: "/Symbols/black.svg",
  red: "/Symbols/red.svg",
  green: "/Symbols/green.svg",
  colourless: "/Symbols/colourless.svg",
  one: "/Symbols/one.svg",
};

const MagicSymbols = ({ name, names, size = 18 }: SymbolProps) => {
  const symbolsToRender = names || (name ? [name] : []);

  return (
    <>
      {symbolsToRender.map((symbolName, index) => (
        <img
          key={`${symbolName}-${index}`}
          src={symbolMap[symbolName]}
          alt={symbolName}
          width={size}
          height={size}
          className="inline-block align-middle mx-0.5 pb-0.5"
          style={{ display: "inline" }}
        />
      ))}
    </>
  );
};

export default MagicSymbols;
