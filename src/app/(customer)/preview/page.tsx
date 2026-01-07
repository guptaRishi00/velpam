import Tabs from "@/components/create/Tabs";
import PreviewComponent from "@/components/preview/PreviewComponent";

type Props = {
  searchParams: Promise<{ step?: string }>;
};

export default async function Preview({ searchParams }: Props) {
  const { step = "preview" } = await searchParams;

  return (
    <div className="">
      <Tabs currentStep={step} />
      <PreviewComponent />
    </div>
  );
}
