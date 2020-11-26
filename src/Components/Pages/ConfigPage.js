import React from "react"

export default function ConfigPage(){
    return <div className="ConfigPage">
        <label for="target">Target (First and Last name, see transaction with income)</label>
        <input name="target" type="text" placeholder="Pera Peric"/>
        <label for="targetAccountNumber">Target account number (see transaction with income)</label>
        <input name="target" type="text" placeholder="12345678123456687"/>
    </div>
}