"use client"
import React, { useEffect, useState } from 'react'
import { Document, Page } from 'react-pdf'

type ViewerProps = {
  file: Blob, // url of pdf file
}


export default function Viewer (props: ViewerProps) {

  const [pdfDocument, setPdfDocument] = useState<Blob>(props.file)
  const [pageNums, setPageNums] = useState<number>();
  const [currentPage, setCurrentPage] = useState<number>();

  //@ts-ignore
  const onDocumentLoadSuccess = ({ numPages }) => {
    setPageNums(numPages);
  };

  return (
    <div className='w-full min-h-full'>
      {pdfDocument && (
        <Document file={pdfDocument} onLoadSuccess={onDocumentLoadSuccess}>
          {[...Array(pageNums)].map((_, index) => (
            <Page key={index + 1} pageNumber={index + 1} />
          ))}
        </Document>
      )}
    </div>
  )
}

