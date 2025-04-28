import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Survey from './survey'
import ErrorBoundary from "../hooks/ErrorBoundery";


export default function SurveyIndex() {

  const { email } = useParams(); 

  return (
    <ErrorBoundary>
      <div className="mx-auto max-w-9/10 bg-amber-500">
        <Survey />
      </div>
    </ErrorBoundary>
  );
}
