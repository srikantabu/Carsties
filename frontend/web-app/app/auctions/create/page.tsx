import Heading from "@/app/components/Headings";
import AuctionForm from "../AuctionForm";

export default async function Create({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return (
    <div className="mx-auto max-w-[75%] shadow-lg p-10 bg-white rounded-lg">
      <Heading
        title="Sell your car!"
        subtitle="Please enter the details of your car"
      />
      <AuctionForm />
    </div>
  );
}
