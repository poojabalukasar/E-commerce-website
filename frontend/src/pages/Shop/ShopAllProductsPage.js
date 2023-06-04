import React from "react";
import AllProduct from "../../components/Shop/AllProducts";
import DashboardHeader from "../../components/Shop/Layout/DashboardHeader";
import DashboardSideBar from "../../components/Shop/Layout/DashboardSideBar";

const ShopAllProductsPage = () => {
  return (
    <div>
      <DashboardHeader />
      <div className="flex justify-between w-full">
        <div className=" w-[80px] 800px:w-[330px]">
          <DashboardSideBar active={3} />
        </div>

        <div className="w-full justify-center flex">
          <AllProduct />
        </div>
      </div>
    </div>
  );
};

export default ShopAllProductsPage;
