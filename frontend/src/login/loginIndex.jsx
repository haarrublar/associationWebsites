import React, { useEffect, useState } from "react";
import Login from "./login";

import ErrorBoundary from "../hooks/ErrorBoundery";


export default function LoginIndex() {
  return (
    <ErrorBoundary>
      <div className="mx-auto max-w-9/10">
        <Login />
      </div>
    </ErrorBoundary>
  );
}
