
const SectionTitle = ({firstTitle, secondTitle, describetion }) => {
    return (
        <div className="w-3/4 mx-auto mb-8">
            <h2 className="md:text-3xl font-bold uppercase text-gray-900 mb-2">{firstTitle} <span className="text-orange-600"> {secondTitle}</span></h2>
            <p className="text-gray-500 text-xs">{describetion}</p>
        </div>
    );
};

export default SectionTitle;