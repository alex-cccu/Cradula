import MagicCardImage from "./MagicCardImage";

const MagicCardPanel = ({ searchInputs }: { searchInputs: string[] }) => {
  return (
    <div className="grid grid-flow-row grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
      {searchInputs.map((input, index) => (
        <MagicCardImage key={index} searchInput={input} />
      ))}
    </div>
  );
};

export default MagicCardPanel;
