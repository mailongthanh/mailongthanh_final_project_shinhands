import "./account.scss";

import React from "react";

import AccountTable from "../../components/body/table/account/AccountTable";

function Account(props) {
  return (
    <div className="Account">
      <div className="Account__title">
        <h1 className="font-face-qsb">Account List</h1>
      </div>
      <AccountTable></AccountTable>
    </div>
  );
}
export default Account;
