import { AdminNav } from "@/components/AdminNav";
import { VehicleForm } from "@/components/VehicleForm";

export default function NewVehiclePage() {
  return (
    <>
      <AdminNav />
      <main className="mx-auto max-w-6xl px-5 sm:px-8 py-10">
        <h1 className="font-display text-3xl mb-8">Add a vehicle</h1>
        <VehicleForm />
      </main>
    </>
  );
}
