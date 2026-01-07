export default function Tabs({ currentStep }: any) {
  // Determine the width based on the step
  const progressWidth =
    currentStep === "pay"
      ? "w-full"
      : currentStep === "preview"
      ? "w-2/3"
      : "w-1/3";

  return (
    <div className="flex flex-col items-start px-10">
      <div className="flex flex-col items-start gap-5 lg:px-8 py-14">
        <p className="text-5xl font-bold text-[#470100]">Create your Valpem</p>
        <p className="text-[#47010080] font-medium text-2xl">
          Fill in the details to send a heartfelt message
        </p>
      </div>

      <div className="w-full h-auto border border-[#FE564B] rounded-3xl px-14 space-y-5 py-8 shadow-md">
        <div className="flex items-center justify-between ">
          <p
            className={`${
              currentStep === "create" ? "text-[#FE564B]" : " text-[#47010099]"
            } text-lg font-medium`}
          >
            Create
          </p>
          <p
            className={`${
              currentStep === "preview" ? "text-[#FE564B]" : " text-[#47010099]"
            } text-lg font-medium`}
          >
            Preview
          </p>
          <p
            className={`${
              currentStep === "pay" ? "text-[#FE564B]" : " text-[#47010099]"
            } text-lg font-medium`}
          >
            Pay
          </p>
        </div>
        <div className="h-4 rounded-full w-full bg-[#FEF5EF]">
          <div
            className={`h-4 rounded-full bg-[#FE564B] transition-all duration-500 ease-in-out ${progressWidth}`}
          ></div>
        </div>
      </div>
    </div>
  );
}
