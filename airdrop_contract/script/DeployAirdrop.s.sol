// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import {Script, console} from "forge-std/Script.sol";
import "../src/Airdrop.sol";

contract DeployAirdrop is Script {
    function run() external {
        // Start broadcasting to simulate sending transactions
        vm.startBroadcast();

        // Deploy the Airdrop contract
        Airdrop airdrop = new Airdrop();

        // Log the deployed contract address
        console.log("Airdrop contract deployed at:", address(airdrop));

        // Stop broadcasting
        vm.stopBroadcast();
    }
}
