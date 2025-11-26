"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Button, Spinner } from "flowbite-react";
import toast from "react-hot-toast";
import { deleteAuction } from "../../../actions/auctionActions";

type Props = {
  id: string;
};

const DeleteButton = ({ id }: Props) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    setLoading(true);

    deleteAuction(id)
      .then((res) => {
        if (res?.error) throw res.error;
        router.push("/");
      })
      .catch((error) => {
        toast.error(`${error.status} ${error.message}`);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <Button color="red" outline onClick={handleDelete}>
      {loading && <Spinner size="sm" className="mr-3" />}
      Delete Auction
    </Button>
  );
};

export default DeleteButton;
