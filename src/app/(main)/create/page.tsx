import CreateForm from "@/components/create/CreateForm";
import Tabs from "@/components/create/Tabs";

type Props = {
  searchParams: Promise<{ step?: string }>;
};

export default async function Create({ searchParams }: Props) {
  const { step = "create" } = await searchParams;

  return (
    <div className="">
      <Tabs currentStep={step} />
      <CreateForm />
    </div>
  );
}
