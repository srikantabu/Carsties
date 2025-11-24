"use client";

import { Pagination } from "flowbite-react";

type Props = {
  pageChanged: (pageNumber: number) => void;
  currentPage: number;
  pageCount: number;
};

const AppPagination = ({ pageChanged, currentPage, pageCount }: Props) => {
  return (
    <Pagination
      currentPage={currentPage}
      onPageChange={(e) => pageChanged(e)}
      totalPages={pageCount}
      layout="pagination"
      showIcons={true}
      className="text-blue-500 mb-5"
    />
  );
};

export default AppPagination;
