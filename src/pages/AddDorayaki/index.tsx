import React from "react";
import { Helmet } from "react-helmet";

import AuthLayout from "@/components/Layout/Auth";
import DorayakiMutate from "@/components/DorayakiMutate";

const AddDorayaki: React.FC = () => {
  return (
    <AuthLayout>
      <Helmet>
        <title>WeeDorayaki | Add dorayaki</title>
        </Helmet>
        <DorayakiMutate isAdd={true} ID={0} Rasa="" Desc="" ImgURL=""></DorayakiMutate>
    </AuthLayout>
  )
}

export default AddDorayaki;