//SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

contract FOW_transaction {
  address public owner;

  constructor(){
    owner = msg.sender;
  }

  function send() payable public{
    require(msg.value > 0, "You can't send 0 eth");
    payable(owner).transfer(msg.value);
  }
}