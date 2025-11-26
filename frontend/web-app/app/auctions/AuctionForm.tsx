"use client";

import { Button, Spinner } from "flowbite-react";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";
import { FieldValues, useForm } from "react-hook-form";
import Input from "../components/Input";
import DateInput from "../components/DateInput";
import { actionFormStructure, FieldConfig } from "./AuctionFormStructure";
import { createAuction, updateAuction } from "../actions/auctionActions";
import toast from "react-hot-toast";
import { Auction } from "@/types";

type Props = {
  auction?: Auction;
};

const AuctionForm = ({ auction }: Props) => {
  const router = useRouter();
  const pathname = usePathname();
  const {
    control,
    handleSubmit,
    setFocus,
    reset,
    formState: { isSubmitting, isValid, isDirty },
  } = useForm({ mode: "onTouched" });

  useEffect(() => {
    if (auction) {
      const { make, model, color, mileage, year } = auction;
      reset({ make, model, color, mileage, year });
    }
    setFocus("make");
  }, [setFocus, auction, reset]);

  const onSubmit = async (data: FieldValues) => {
    try {
      let id = "",
        res;

      if (pathname === "/auctions/create") {
        res = await createAuction(data);
        id = res.id;
      } else {
        if (auction) {
          res = await updateAuction(data, auction.id);
          id = auction.id;
        }
      }

      if (res.error) {
        throw res.error;
      }
      router.push(`/auctions/details/${id}`);
    } catch (error: any) {
      toast.error(`${error.status} ${error.message}`);
    }
  };

  const renderField = (field: FieldConfig) => {
    if (field.type === "date") {
      return (
        <DateInput
          key={field.name}
          name={field.name}
          label={field.label}
          control={control}
          showTimeSelect
          dateFormat="dd MMMM yyyy h:mm a"
          rules={field.rules}
        />
      );
    }

    return (
      <Input
        key={field.name}
        name={field.name}
        label={field.label}
        control={control}
        rules={field.rules}
        type={field.type}
      />
    );
  };

  const isCreate = pathname === "/auctions/create";

  return (
    <form className="flex flex-col mt-3" onSubmit={handleSubmit(onSubmit)}>
      {actionFormStructure.map((row) => {
        if (Array.isArray(row)) {
          const visibleFields = row.filter((field) => {
            if (field.showOnCreateOnly && !isCreate) return false;
            return true;
          });

          if (visibleFields.length === 0) return null;

          return (
            <div
              key={visibleFields.map((f) => f.name).join("-")}
              className="grid grid-cols-2 gap-3"
            >
              {visibleFields.map(renderField)}
            </div>
          );
        }

        if (row.showOnCreateOnly && !isCreate) return null;

        return renderField(row);
      })}

      <div className="flex justify-between">
        <Button color="alternative" onClick={() => router.push("/")}>
          Cancel
        </Button>
        <Button
          outline
          color="green"
          type="submit"
          disabled={!isValid || !isDirty}
        >
          {isSubmitting && <Spinner size="sm" />}
          Submit
        </Button>
      </div>
    </form>
  );
};

export default AuctionForm;
