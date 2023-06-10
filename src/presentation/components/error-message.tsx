const ShowMessage = ({ value }: { value: string | undefined }) => {
  return (
    <div className="bg-white py-2 px-3 w-full my-3 max-w-sm text-center mx-auto">
      <p>{value}</p>
    </div>
  );
};

export default ShowMessage;
