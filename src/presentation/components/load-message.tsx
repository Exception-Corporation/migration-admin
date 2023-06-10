const LoadMessage = ({ value }: { value: string | undefined }) => {
  return (
    <div className="w-full sign-up rounded shadow-xl p-3 mb-10">
      <h1 className="config-title text-center text-2xl font-normal">
        {value + ' '}
        <i className="em em-clock4" aria-label="CLOCK FACE FOUR OCLOCK"></i>
      </h1>
    </div>
  );
};

export default LoadMessage;
