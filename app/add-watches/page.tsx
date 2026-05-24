import Form from "@/components/Form";

const addWatches = () => {
  return (
    <div className="px-4 md:px-12 bg-white py-20 lg:py-28">
      <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-8 md:mb-12 text-black text-center">
        Add Watches
      </h2>

      {/* {form component} */}
      <Form />
    </div>
  );
};

export default addWatches;
