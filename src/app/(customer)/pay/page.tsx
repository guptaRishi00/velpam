import Tabs from "@/components/create/Tabs";
import OrderSummary from "@/components/pay/OrderSummary";
import SecurePayment from "@/components/pay/SecurePayment";

type Props = {
  searchParams: Promise<{ step?: string }>;
};

export default async function Pay({ searchParams }: Props) {
  const { step = "pay" } = await searchParams;

  return (
    <div className="">
      <Tabs currentStep={step} />
      <OrderSummary />
      <SecurePayment />
    </div>
  );
}
