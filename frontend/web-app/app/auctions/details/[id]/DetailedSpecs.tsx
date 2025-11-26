"use client";

import { Auction } from "@/types";
import { Table, TableBody, TableCell, TableRow } from "flowbite-react";

type Props = {
  auction: Auction;
};

export default function DetailedSpecs({ auction }: Props) {
  const specs = [
    { label: "Seller", value: auction.seller },
    { label: "Make", value: auction.make },
    { label: "Model", value: auction.model },
    { label: "Year manufactured", value: auction.year },
    { label: "Mileage", value: auction.mileage },
    {
      label: "Has reserve price?",
      value: auction.reservePrice > 0 ? "Yes" : "No",
    },
  ];

  return (
    <Table striped={true}>
      <TableBody className="divide-y">
        {specs.map((item) => (
          <TableRow
            key={item.label}
            className="bg-white dark:border-gray-700 dark:bg-gray-800"
          >
            <TableCell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
              {item.label}
            </TableCell>
            <TableCell>{item.value}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
