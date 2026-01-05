import Tabs from "@/components/create/Tabs";

type Props = {
  searchParams: Promise<{ step?: string }>;
};

export default async function Pay({ searchParams }: Props) {
  const { step = "pay" } = await searchParams;

  return (
    <div className="">
      <Tabs currentStep={step} />
    </div>
  );
}
