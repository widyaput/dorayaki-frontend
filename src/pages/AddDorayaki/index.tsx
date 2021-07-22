import React from "react";
import { Helmet } from "react-helmet";

import AuthLayout from "@/components/Layout/Auth";
import DorayakiMutate from "@/components/Layout/DorayakiMutate";

const AddDorayaki: React.FC = () => {
  console.log("HI");
  return (
    <AuthLayout>
      <Helmet>
        <title>WeeDorayaki | Add dorayaki</title>
        </Helmet>
        <DorayakiMutate isAdd={true} ID={0}></DorayakiMutate>
    </AuthLayout>
  )
}

export default AddDorayaki;